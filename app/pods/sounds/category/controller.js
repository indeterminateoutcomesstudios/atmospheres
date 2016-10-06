import Ember from 'ember';

export default Ember.Controller.extend({

  sounds: Ember.inject.controller(),

  soundToAdd: null,
  targetAtmosphere: null,

  filteredSounds: Ember.computed('model.sounds.@each.name', 'sounds.filter', function() {
    let allSounds = this.get('model.sounds'),
        filter = this.get('sounds.filter');
    if (!filter) {
      return allSounds;
    }
    return allSounds.filter(sound => {
      return sound.get('name').toLowerCase().indexOf(filter.toLowerCase()) > -1;
    });
  }),

  actions: {
    addSoundToAtmosphere() {
      let atmosphere = this.get('targetAtmosphere'),
          soundToAdd = this.get('soundToAdd');
      if (atmosphere.get('sounds').findBy('name', soundToAdd.name)) {
        return;
      }
      atmosphere.get('sounds').pushObject(soundToAdd);
      atmosphere.save();
      this.setProperties({
        soundToAdd: null,
        targetAtmosphere: null,
        showAtmospherePicker: false
      });
    },
    showAtmospheres(sound) {
      let soundToAdd = sound.getProperties('name', 'volume');
      this.setProperties({
        soundToAdd,
        targetAtmosphere: null,
        showAtmospherePicker: true
      });
    }
  }

});
