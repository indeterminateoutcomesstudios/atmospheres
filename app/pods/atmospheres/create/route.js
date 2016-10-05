import Ember from 'ember';

export default Ember.Route.extend({

  sounds: Ember.inject.service(),

  setupController(controller) {
    controller.set('name', null);
    this._super(...arguments);
  },

  actions: {
    create() {
      let name = this.controller.get('name');
      if (!name) { return; }
      this.get('sounds').getSounds().then(allSounds => {
        let sounds = allSounds.filterBy('playing'),
            newEnv = this.store.createRecord('environment', {
              name: this.controller.get('name'),
              sounds: sounds.map(s => s.getProperties('name', 'volume'))
            });
        newEnv.save().then(() => this.transitionTo('atmospheres.details', newEnv.id));
      });
    }
  }

});
