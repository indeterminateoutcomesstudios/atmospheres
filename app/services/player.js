import Ember from 'ember';

const { get, set, observer } = Ember;

export default Ember.Service.extend({

  muted: false,

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
    this.masterMute = context.createGain();
    this.masterMute.connect(context.destination);
    this.masterGain = context.createGain();
    this.masterGain.connect(this.masterMute);
    set(this, 'context', context);
  },

  updateMute: observer('muted', function() {
    this.masterMute.gain.value = get(this, 'muted') ? 0 : 1;
  }),

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
