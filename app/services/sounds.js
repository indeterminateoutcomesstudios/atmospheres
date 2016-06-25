import Ember from 'ember';

import Sound from 'ms-environments/models/sound';

export default Ember.Service.extend({

  player: Ember.inject.service(),

  getSounds() {
    let soundStubs = [

      { name: 'Rain (Drizzle)', url: 'weather/rain-drizzle.wav' },
      { name: 'Rain (Light)',   url: 'weather/rain-light.wav' },
      { name: 'Rain (Medium)',  url: 'weather/rain-medium.wav' },
      { name: 'Rain (Heavy)',   url: 'weather/rain-heavy.wav' },

      { name: 'Treasure Goblin', url: 'treasure goblin.mp3' },
      { name: 'Waterfall (Small)' },
      { name: 'Waterfall (Medium)' },
      { name: 'Waterfall (Large)' }

    ];
    return soundStubs.map(s => Sound.create({ ...s, context: this.get('player.context') }));
  },

  getEnvironments() {
    return Ember.A();
  }

});
