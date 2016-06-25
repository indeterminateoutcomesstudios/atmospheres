import Ember from 'ember';

export default Ember.Route.extend({

  sounds: Ember.inject.service(),
  player: Ember.inject.service(),

  model() {
    return Ember.RSVP.hash({
      sounds: this.get('sounds').getSounds(),
      environments: this.store.findAll('environment')
    });
  },

  actions: {
    play(sound) {
      this.get('player').play(sound);
    },
    stopAll() {
      let model = this.modelFor(this.routeName);
      model.sounds.filterBy('playing').forEach(s => s.stop());
    },
    createEnvironment() {
      let model = this.modelFor(this.routeName),
          name = window.prompt('Name this environment:');

      if (!name) {
        return;
      }

      this.store.createRecord('environment', {
        name,
        sounds: model.sounds.filterBy('playing')
          .map(s => s.getProperties('name', 'volume'))
      }).save();
    },
    deleteEnvironment(environment) {
      environment.destroyRecord();
    },
    playEnvironment(environment) {
      // HACK: The 'player' service doesn't know about all the playing sounds,
      // but will need to stop sounds that aren't in the current environment.
      let model = this.modelFor(this.routeName);
      this.get('player').playEnvironment(model.sounds, environment);
    }
  }

});
