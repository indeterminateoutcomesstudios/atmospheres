import Ember from 'ember';

export default Ember.Controller.extend({

  soundToAdd: null,
  targetAtmosphere: null,

  actions: {
    addSoundToAtmosphere() {
      let atmosphere = this.get('targetAtmosphere'),
          soundToAdd = this.get('soundToAdd');
      if (atmosphere.get('sounds').findBy('name', soundToAdd.name)) { return; }
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
