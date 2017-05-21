import Ember from 'ember';

const { get, set } = Ember;

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
    set(this, 'context', context);
  },

  play(sound) {
    if (get(sound, 'playing')) {
      sound.stop();
    } else {
      sound.play(this.masterGain);
    }
  },

  playEnvironment(allSounds, environment) {
    let sounds = get(environment, 'sounds');
    allSounds.forEach(s => {
      let soundInEnvironment = sounds.findBy('name', get(s, 'name'));
      if (soundInEnvironment) {
        set(s, 'volume', get(soundInEnvironment, 'volume'));
        if (!get(s, 'playing')) {
          s.play(this.masterGain);
        }
      } else {
        s.stop();
      }
    });
  },

});
