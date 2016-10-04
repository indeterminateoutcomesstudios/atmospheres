import Ember from 'ember';

export default Ember.Route.extend({

  sounds: Ember.inject.service(),

  model({ atmosphere_id }) {
    return Ember.RSVP.hash({
      environment: this.store.findRecord('environment', atmosphere_id),
      sounds: this.get('sounds').getSounds()
    });
  },

  afterModel(model) {
    let soundPointers = Ember.A();
    if (!model.environment.get('sounds.length')) { return model; }
    model.environment.get('sounds').forEach(sound => {
      soundPointers.push(model.sounds.findBy('name', sound.name));
    });
    model.environment.set('sounds', soundPointers);
  },

  setupController(controller, model) {
    this._super(controller, model.environment);
    controller.setProperties({
      newName: model.environment.get('name'),
      showEditModal: false
    });
  },

  actions: {
    save() {
      let { environment } = this.currentModel;
      environment.set('name', this.controller.get('newName'));
      environment.save();
      this.controller.set('showEditModal', false);
    }
  }

});
