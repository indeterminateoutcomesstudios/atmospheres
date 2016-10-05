import Ember from 'ember';

export default Ember.Controller.extend({

  player: Ember.inject.service(),
  sounds: Ember.inject.service(),
  showCreateModal: false,

  actions: {
    createAtmosphere() {
      let name = this.get('name');
      if (!name) { return; }
      this.get('sounds').getSounds().then(allSounds => {
        let sounds = allSounds.filterBy('playing')
          .map(s => s.getProperties('name', 'volume'));
        this.store.createRecord('environment', { name, sounds }).save();
        this.set('showCreateModal', false);
      });
    },
    showCreateModal() {
      this.setProperties({
        showCreateModal: true,
        name: null
      });
    },
    hideCreateModal() {
      this.set('showCreateModal', false);
    }
  }

});
