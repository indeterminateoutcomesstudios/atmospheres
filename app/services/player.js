import Ember from 'ember';
import fetch from 'fetch';

import config from 'ms-environments/config/environment';

export default Ember.Service.extend({

  masterVolume: Ember.computed({
    get() {
      return this.masterGain.gain.value;
    },
    set(key, value) {
      this.masterGain.gain.value = value;
    }
  }),

  init() {
    let AudioContext = window.AudioContext || window.webkitAudioContext;
    let context = new AudioContext();
    this.masterGain = context.createGain();
    this.masterGain.connect(context.destination);
    this.set('context', context);
  },

  play(sound) {
    let source = sound.get('source');
    if (source && sound.get('playing')) {
      source.stop();
      source.disconnect();
      sound.setProperties({
        playing: false,
        source: null
      });
    } else {
      this._loadSound(sound).then(buffer => {
        let source = this.context.createBufferSource(),
            gain = sound.get('gain');
        source.buffer = buffer;
        source.loop = true;
        source.connect(gain);
        gain.connect(this.masterGain);
        source.start(0);
        sound.setProperties({
          playing: true,
          source
        });
      });
    }
  },

  _loadSound(sound) {
    return new Ember.RSVP.Promise((resolve, reject) =>
      fetch(config.soundsURL + sound.url)
        .then(res => res.arrayBuffer())
        .then(res => this.context.decodeAudioData(res, resolve, reject)));
  }

});
