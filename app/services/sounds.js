import Ember from 'ember';

export default Ember.Service.extend({

  getSounds() {
    let soundStubs = [
      { name: 'Rain (Drizzle)', url: 'weather/rain-drizzle.wav' },
      { name: 'Treasure Goblin', url: 'treasure goblin.mp3' },
      { name: 'Waterfall (Small)' },
      { name: 'Waterfall (Medium)' },
      { name: 'Waterfall (Large)' }
    ];
    return soundStubs.map(s => Ember.Object.create(s));
  },

  getEnvironments() {
    return [];
  }

});
