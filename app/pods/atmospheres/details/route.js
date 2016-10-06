import Ember from 'ember';

export default Ember.Route.extend({

  model({ atmosphere_id }) {
    return this.store.findRecord('environment', atmosphere_id);
  },

  setupController(controller, model) {
    this._super(...arguments);
    controller.setProperties({
      newName: model.get('name'),
      showDeleteConfirmation: false,
      showSoundDeleteConfirmation: null,
      showEditModal: false
    });
  },

  actions: {
    save() {
      this.currentModel.set('name', this.controller.get('newName'));
      this.currentModel.save();
      this.controller.set('showEditModal', false);
    },
    destroy() {
      this.currentModel.destroyRecord();
      this.transitionTo('atmospheres');
    },
    destroySound(soundPointer) {
      let sounds = this.currentModel.get('sounds'),
          sound = sounds.findBy('name', soundPointer.get('name'));
      sounds.removeObject(sound);
      this.currentModel.save();
      this.controller.set('showSoundDeleteConfirmation', null);
    }
  }

});
