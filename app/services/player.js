import Ember from 'ember';
import fetch from 'fetch';

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
    if (sound.get('playing')) {
      sound.stop();
    } else {
      sound.play(this.masterGain);
    }
  },

  playEnvironment(allSounds, { sounds }) {
    allSounds.forEach(s => {
      let soundInEnvironment = sounds.findBy('name', s.get('name'));
      if (soundInEnvironment) {
        s.set('volume', soundInEnvironment.volume);
        if (!s.get('playing')) {
          s.play(this.masterGain);
        }
      } else {
        s.stop();
      }
    });
  }

});
