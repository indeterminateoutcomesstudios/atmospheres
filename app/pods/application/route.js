import Ember from 'ember';

export default Ember.Route.extend({

  sounds: Ember.inject.service(),

  model() {
    return Ember.RSVP.hash({
      sounds: this.get('sounds').getSounds(),
      environments: this.get('sounds').getEnvironments()
    });
  }

});
