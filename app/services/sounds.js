import Ember from 'ember';

export default Ember.Service.extend({

  getSounds() {
    return [
      { name: 'Waterfall (Small)' },
      { name: 'Waterfall (Medium)' },
      { name: 'Waterfall (Large)' }
    ];
  },

  getEnvironments() {
    return [];
  }

});
