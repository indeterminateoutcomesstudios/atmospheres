import Ember from 'ember';

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
    let url = config.soundsURL + sound.url;
    return new Ember.RSVP.Promise((resolve, reject) => {
      let request = new XMLHttpRequest();
      request.open('GET', url, true);
      request.responseType = 'arraybuffer';

      request.onload = () => {
        this.context.decodeAudioData(request.response, resolve, reject);
      };
      request.send();
    });
  }

});
