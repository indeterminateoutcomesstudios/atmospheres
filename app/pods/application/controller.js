import Ember from 'ember';

export default Ember.Controller.extend({

  player: Ember.inject.service(),
  sounds: Ember.inject.service(),
  showCreateModal: false,

  playingSounds: Ember.computed.filterBy('model', 'playing'),

  actions: {
    stopAll() {
      this.get('playingSounds').invoke('stop');
    },
    hideCreateModal() {
      if (this.get('currentPath') === 'atmospheres.create') {
        this.transitionToRoute('atmospheres');
      }
      this.set('showCreateModal', false);
    }
  }

});
