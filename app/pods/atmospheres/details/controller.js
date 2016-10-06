import Ember from 'ember';

export default Ember.Controller.extend({

  sounds: Ember.inject.service(),
  soundPointers: null,

  init() {
    this._super(...arguments);
    this.get('sounds').getSounds()
      .then(soundPointers => this.set('soundPointers', soundPointers));
  },

  environmentSounds: Ember.computed('model.sounds.@each', function() {
    return this.get('model.sounds').map(({ name, volume }) => {
      let sound = this.get('soundPointers').findBy('name', name);
      if (volume) {
        sound.set('volume', volume);
      }
      return sound;
    });
  }),

  actions: {
    showSoundDeleteConfirmation(sound) {
      this.set('showSoundDeleteConfirmation', sound);
    },
    cancelSoundDeleteConfirmation() {
      this.set('showSoundDeleteConfirmation', null);
    }
  }

});
