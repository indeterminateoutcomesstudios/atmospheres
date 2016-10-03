import Ember from 'ember';

export default Ember.Route.extend({

  sounds: Ember.inject.service(),

  model({ category_slug }) {
    return this.get('sounds').getSounds()
      .then(sounds => sounds.filterBy('category', category_slug));
  }

});
