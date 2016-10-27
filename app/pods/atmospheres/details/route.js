import Ember from 'ember';

export default Ember.Route.extend({

  sounds: Ember.inject.service(),

  model({ atmosphere_id }) {
    return this.store.findRecord('environment', atmosphere_id)
      .then(environment => Ember.RSVP.hash({
        environment,
        sounds: this.get('sounds').getSoundsForEnvironment(environment)
      }));
  },

  setupController(controller, { environment, sounds }) {
    this._super(controller, { ...environment.toJSON(), sounds: sounds });
    controller.setProperties({
      newName: environment.get('name'),
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
