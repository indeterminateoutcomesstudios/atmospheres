import Ember from 'ember';
import fetch from 'fetch';

import config from 'ms-environments/config/environment';

export default Ember.Object.extend({

  category: '(Uncategorized)',

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
    this._loadSound(this.get('url')).then(buffer =>
      this.setProperties({
        playing: true,
        source: this._playSound(buffer, node)
      }));
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

  _loadSound(url) {
    return new Ember.RSVP.Promise((resolve, reject) =>
      fetch(config.soundsURL + url)
        .then(res => res.arrayBuffer())
        .then(res => this.get('context').decodeAudioData(res, resolve, reject)));
  },

  _playSound(buffer, destinationNode, loop = true) {
    let source = this.get('context').createBufferSource(),
        gain = this.get('gain');
    Ember.setProperties(source, { buffer, loop });
    source.connect(gain);
    gain.connect(destinationNode);
    source.start(0);
    return source;
  }

});
