import Ember from 'ember';

export default Ember.Route.extend({

  model({ atmosphere_id }) {
    return this.store.findRecord('environment', atmosphere_id);
  },

  setupController(controller, model) {
    this._super(...arguments);
    controller.setProperties({
      newName: model.get('name'),
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
      if (!window.confirm('Are you sure you want to delete this Atmosphere?')) { return; }
      this.currentModel.destroyRecord();
      this.transitionTo('atmospheres');
    },
    destroySound(soundPointer) {
      if (!window.confirm('Are you sure you want to remove this sound?')) { return; }
      let sounds = this.currentModel.get('sounds'),
          sound = sounds.findBy('name', soundPointer.get('name'));
      sounds.removeObject(sound);
      this.currentModel.save();
    }
  }

});
