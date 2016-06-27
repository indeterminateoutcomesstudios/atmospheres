import Ember from 'ember';
import fetch from 'fetch';

import config from 'ms-environments/config/environment';

export default Ember.Object.extend({

  category: '(Uncategorized)',
  fadeTime: 1.5,

  init(...args) {
    this._super(...args);
    let gain = this.get('context').createGain(),
        fadeGain = this.get('context').createGain();
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
    if (!source) {
      return;
    }
    let fadeGain = this.get('fadeGain');
    let { currentTime } = this.get('context');
    fadeGain.gain
      .setValueAtTime(1, currentTime)
      .linearRampToValueAtTime(0, currentTime + this.get('fadeTime'));
    this.set('playing', false);
    Ember.run.later(() => {
      source.stop();
      source.disconnect();
      this.set('source', null);
    }, this.get('fadeTime') * 1000);
  },

  _loadSound(url) {
    return new Ember.RSVP.Promise((resolve, reject) =>
      fetch(config.soundsURL + url)
        .then(res => res.arrayBuffer())
        .then(res => this.get('context').decodeAudioData(res, resolve, reject)));
  },

  _playSoundWithFade(buffer, destinationNode, loop = true) {
    let { context, gain, fadeGain } = this.getProperties('context', 'gain', 'fadeGain');
    let source = context.createBufferSource();
    Ember.setProperties(source, { buffer, loop });
    source.connect(fadeGain);
    gain.connect(destinationNode);
    let { currentTime } = context;
    fadeGain.gain
      .setValueAtTime(0, currentTime)
      .linearRampToValueAtTime(1, currentTime + this.get('fadeTime'));
    source.start(0);
    return source;
  },

  _playSound(buffer, destinationNode, loop = true) {
    let { context, gain } = this.getProperties('context', 'gain');
    let source = context.createBufferSource();
    Ember.setProperties(source, { buffer, loop });
    source.connect(destinationNode);
    source.start(0);
    return source;
  }

});
