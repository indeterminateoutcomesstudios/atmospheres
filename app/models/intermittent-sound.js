import Ember from 'ember';
import Sound from './sound';

export default Sound.extend({

  frequency: 30000,
  playingSources: null,

  init(...args) {
    this._super(...args);
    this.set('playingSources', Ember.A());
  },

  play(destinationNode) {
    Ember.RSVP
      .allSettled(this.get('urls').map(u => this._loadSound(u)))
      .then(promises => {
        let { context, gain, fadeGain } = this.getProperties('context', 'gain', 'fadeGain');
        gain.connect(destinationNode);
        let { currentTime } = context,
            adjustedFadeTime = (1 - fadeGain.gain.value) * this.get('fadeInTime');
        fadeGain.gain
          .setValueAtTime(0, currentTime)
          .linearRampToValueAtTime(1, currentTime + adjustedFadeTime);
        let buffers = promises.mapBy('value');
        this.set('playing', true);
        // TODO: There's some context fun to figure out here. `loop` is undefined
        // if we bind these functions to the component's context.
        let that = this;
        (function loop(nextDelay) {
          var rand = Math.round(Math.random() * that.get('frequency') + that.get('frequency'));
          setTimeout(() => {
            if (that.get('playing')) {
              let index = Math.round(Math.random() * (buffers.length - 1));
              let playedSource = that._playSound(buffers[index], fadeGain, false);
              that.get('playingSources').pushObject(playedSource);
            }
            loop(rand);
          }, nextDelay);
        }(0));
      });
  },

  stop() {
    let { gain } = this.get('fadeGain'),
        { currentTime } = this.get('context'),
        adjustedFadeTime = gain.value * this.get('fadeOutTime');
    gain
      .cancelScheduledValues(currentTime)
      .setValueAtTime(1, currentTime)
      .exponentialRampToValueAtTime(0.001, currentTime + adjustedFadeTime);
    this.set('playing', false);
    Ember.run.later(() => this.get('playingSources').forEach(s => {
        s.stop();
        s.disconnect();
      }), adjustedFadeTime * 1000);
  }

});
