import Ember from 'ember';

export default Ember.Route.extend({

  sounds: Ember.inject.service(),
  player: Ember.inject.service(),

  model() {
    return this.get('sounds').getSounds();
  },

  actions: {
    play(sound) {
      this.get('player').play(sound);
    },
    playEnvironment(environment) {
      // HACK: The 'player' service doesn't know about all the playing sounds,
      // but will need to stop sounds that aren't in the current environment.
      this.get('player').playEnvironment(this.currentModel, environment);
    },
    showCreateModal() {
      this.controller.setProperties({
        showCreateModal: true,
        name: null
      });
    },
    createAtmosphere() {
      let name = this.controller.get('name');
      if (!name) { return; }
      let sounds = this.currentModel.filterBy('playing')
        .map(s => s.getProperties('name', 'volume'));
      this.store.createRecord('environment', { name, sounds }).save().then(atmos => {
        this.controller.set('showCreateModal', false);
        this.transitionTo('atmospheres.details', atmos.id);
      });

    },
  }

});
