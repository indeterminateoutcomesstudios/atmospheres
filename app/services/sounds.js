import Ember from 'ember';

export default Ember.Service.extend({

  getSounds() {
    return [
      { name: 'Treasure Goblin', url: 'treasure goblin.mp3' },
      { name: 'Waterfall (Small)' },
      { name: 'Waterfall (Medium)' },
      { name: 'Waterfall (Large)' }
    ];
  },

  getEnvironments() {
    return [];
  }

});
