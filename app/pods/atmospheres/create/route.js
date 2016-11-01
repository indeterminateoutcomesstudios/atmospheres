import Ember from 'ember';

export default Ember.Route.extend({

  actions: {
    didTransition() {
      this.controllerFor('application').send('showCreateModal');
    },
    willTransition() {
      this.controllerFor('application').set('hideCreateModal', false);
    }
  }

});
