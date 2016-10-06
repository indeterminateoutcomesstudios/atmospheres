import Ember from 'ember';

export default Ember.Controller.extend({

  player: Ember.inject.service(),
  sounds: Ember.inject.service(),
  showCreateModal: false,

  playingSounds: Ember.computed.filterBy('model', 'playing'),

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
    stopAll() {
      this.get('playingSounds').invoke('stop');
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
