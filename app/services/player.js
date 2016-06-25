import Ember from 'ember';
import fetch from 'fetch';

import config from 'ms-environments/config/environment';

export default Ember.Service.extend({

  init() {
    let AudioContext = window.AudioContext || window.webkitAudioContext;
    this.context = new AudioContext();
  },

  play(sound) {
    this._loadSound(sound).then(buffer => {
      let source = this.context.createBufferSource();
      source.buffer = buffer;
      source.connect(this.context.destination);
      source.start(0);
    });
  },

  _loadSound(sound) {
    return new Ember.RSVP.Promise((resolve, reject) =>
      fetch(config.soundsURL + sound.url)
        .then(res => res.arrayBuffer())
        .then(res => this.context.decodeAudioData(res, resolve, reject)));
  }

});
