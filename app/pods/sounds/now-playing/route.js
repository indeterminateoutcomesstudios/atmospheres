import Ember from 'ember';

export default Ember.Route.extend({

  sounds: Ember.inject.service(),

  model() {
    return this.get('sounds').getSounds();
  },

  setupController(controller, model) {
    this._super(controller, model.filterBy('playing'));
  }

});
