import Ember from 'ember';

export default Ember.Route.extend({

  sounds: Ember.inject.service(),

  model({ category_slug }) {
    return this.get('sounds').getSounds()
      .then(sounds => ({
        name: category_slug,
        sounds: sounds.filterBy('category', category_slug),
        atmospheres: this.store.findAll('environment')
      }));
  },

  actions: {
    willTransition() {
      this.controller.set('showAtmospherePicker', false);
    }
  }

});
