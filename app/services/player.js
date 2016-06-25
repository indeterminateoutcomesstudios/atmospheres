import Ember from 'ember';
import fetch from 'fetch';

import config from 'ms-environments/config/environment';

export default Ember.Service.extend({

  init() {
    let AudioContext = window.AudioContext || window.webkitAudioContext;
    this.context = new AudioContext();
  },

  play(sound) {
    let source = sound.get('source');
    if (source && sound.get('playing')) {
      source.stop();
      sound.setProperties({ playing: false, source: null });
    } else {
      this._loadSound(sound).then(buffer => {
        let source = this.context.createBufferSource();
        source.buffer = buffer;
        source.loop = true;
        source.connect(this.context.destination);
        source.start(0);
        sound.setProperties({ playing: true, source });
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
