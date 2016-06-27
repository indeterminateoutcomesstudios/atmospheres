import Ember from 'ember';
import Sound from './sound';

export default Sound.extend({

  frequency: 7500,
  playingSources: null,

  init(...args) {
    this._super(...args);
    this.set('playingSources', Ember.A());
  },

  play(destinationNode) {
    Ember.RSVP
      .allSettled(this.get('urls').map(u => this._loadSound(u)))
      .then(promises => {
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
              let playedSource = that._playSound(buffers[index], destinationNode, false);
              that.get('playingSources').pushObject(playedSource);
            }
            loop(rand);
          }, nextDelay);
        }(0));
      });
  },

  stop() {
    this.get('playingSources').forEach(s => {
      s.stop();
      s.disconnect();
    });
    this.set('playing', false);
  }

});
