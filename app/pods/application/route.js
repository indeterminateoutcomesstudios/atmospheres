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
    }
  }

});
