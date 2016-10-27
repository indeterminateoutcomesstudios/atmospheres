import Ember from 'ember';

export default Ember.Controller.extend({

  actions: {
    showSoundDeleteConfirmation(sound) {
      this.set('showSoundDeleteConfirmation', sound);
    },
    cancelSoundDeleteConfirmation() {
      this.set('showSoundDeleteConfirmation', null);
    }
  }

});
