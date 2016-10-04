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
    model.environment.get('sounds').forEach(sound => {
      soundPointers.push(model.sounds.findBy('name', sound.name));
    });
    model.environment.set('sounds', soundPointers);
  },

  setupController(controller, model) {
    this._super(controller, model.environment);
  }

});