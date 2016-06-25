import Ember from 'ember';

export default Ember.Route.extend({

  sounds: Ember.inject.service(),
  player: Ember.inject.service(),

  model() {
    return Ember.RSVP.hash({
      sounds: this.get('sounds').getSounds(),
      environments: this.get('sounds').getEnvironments()
    });
  },

  actions: {
    play(sound) {
      this.get('player').play(sound);
    },
    createEnvironment() {
      let model = this.modelFor(this.routeName);

      model.environments.pushObject({
        name: '(New Environment)',
        sounds: model.sounds.filterBy('playing')
          .map(s => s.getProperties('name', 'volume'))
      });
    },
    playEnvironment(environment) {
      // HACK: The 'player' service doesn't know about all the playing sounds,
      // but will need to stop sounds that aren't in the current environment.
      let model = this.modelFor(this.routeName);
      this.get('player').playEnvironment(model.sounds, environment);
    }
  }

});
