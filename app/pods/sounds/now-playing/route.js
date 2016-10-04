import Ember from 'ember';

export default Ember.Route.extend({

  sounds: Ember.inject.service(),

  model() {
    return this.get('sounds').getSounds()
      .then(sounds => ({
        name: 'Now Playing',
        sounds: sounds.filterBy('playing', true)
      }));
  }

});
