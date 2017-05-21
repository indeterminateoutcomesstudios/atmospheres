import Ember from 'ember';
import fetch from 'fetch';

let fs = window.requireNode('fs');

import config from 'ms-environments/config/environment';

/*

  The Web Audio API provides some functions that should work better than what we're using, but...
  - `exponentialRampToValueAtTime()` doesn't work. At all.
  - `linearRampToValueAtTime()` ramps _down_ fine, but ramping _up_ is inconsistent.
  - `setValueCurveAtTime()` works as of this writing, so we're going with that.

  See MDN for details: https://developer.mozilla.org/en-US/docs/Web/API/AudioParam.

*/

export default Ember.Object.extend({

  category: '(Uncategorized)',
  fadeTime: 1.5,
  playing: false,

  init(...args) {
    this._super(...args);
    let gain = this.get('context').createGain(),
        fadeGain = this.get('context').createGain();
    fadeGain.gain.value = 0;
    fadeGain.connect(gain);
    this.setProperties({ gain, fadeGain });
  },

  volume: Ember.computed({
    get() {
      return this.get('gain').gain.value;
    },
    set(key, value) {
      this.get('gain').gain.value = value;
      this.notifyPropertyChange('volume');
    }
  }).volatile(),

  play(node) {
    this._loadSound(this.get('url')).then(buffer =>
      this.setProperties({
        playing: true,
        source: this._playSoundWithFade(buffer, node)
      }));
  },

  stop() {

    let source = this.get('source');
    if (!source) return;

    let { gain } = this.get('fadeGain'),
        { currentTime } = this.get('context'),
        fadeCurve = new Float32Array([ gain.value, 0 ]),
        adjustedFadeTime = gain.value * this.get('fadeTime');

    gain
      .cancelAndHoldAtTime(currentTime)
      .setValueCurveAtTime(fadeCurve, currentTime, adjustedFadeTime);

    this.set('playing', false);
    Ember.run.later(() => {
      source.stop();
      source.disconnect();
    }, adjustedFadeTime * 1000);

  },

  _loadSound(url) {
    return new Ember.RSVP.Promise((resolve, reject) => {
      if (fs) {
        fs.readFile(url, (err, res) => {
          if (err) {
            reject(err);
          }
          res = new Uint8Array(res).buffer;
          this.get('context').decodeAudioData(res, resolve, reject);
        });
      } else {
        fetch(config.soundsURL + url)
          .then(res => res.arrayBuffer())
          .then(res => this.get('context').decodeAudioData(res, resolve, reject));
      }
    });
  },

  _playSoundWithFade(buffer, destinationNode, loop = true) {

    let { context, gain, fadeGain } = this.getProperties('context', 'gain', 'fadeGain');
    let source = context.createBufferSource();

    source.connect(fadeGain);
    gain.connect(destinationNode);

    let { currentTime } = context,
        fadeCurve = new Float32Array([ fadeGain.gain.value, 1 ]),
        adjustedFadeTime = (1 - fadeGain.gain.value) * this.get('fadeTime');

    fadeGain.gain
      .cancelAndHoldAtTime(currentTime)
      .setValueCurveAtTime(fadeCurve, currentTime, adjustedFadeTime);

    Ember.setProperties(source, { buffer, loop });
    source.start();
    return source;

  },

  _playSound(buffer, destinationNode, loop = true) {

    let { context, gain } = this.getProperties('context', 'gain');
    let source = context.createBufferSource();

    source.connect(destinationNode);

    Ember.setProperties(source, { buffer, loop });
    source.start(0);
    return source;

  }

});
