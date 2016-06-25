import Ember from 'ember';
import fetch from 'fetch';

import config from 'ms-environments/config/environment';

export default Ember.Object.extend({

  init(...args) {
    this._super(...args);
    this.set('gain', this.get('context').createGain());
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
    this._loadSound().then(buffer => {
      let source = this.get('context').createBufferSource(),
          gain = this.get('gain');
      source.buffer = buffer;
      source.loop = true;
      source.connect(gain);
      gain.connect(node);
      source.start(0);
      this.setProperties({
        playing: true,
        source
      });
    });
  },

  stop() {
    let source = this.get('source');
    if (!source) {
      return;
    }
    source.stop();
    source.disconnect();
    this.setProperties({
      playing: false,
      source: null
    });
  },

  _loadSound(sound) {
    return new Ember.RSVP.Promise((resolve, reject) =>
      fetch(config.soundsURL + this.get('url'))
        .then(res => res.arrayBuffer())
        .then(res => this.get('context').decodeAudioData(res, resolve, reject)));
  }

});
