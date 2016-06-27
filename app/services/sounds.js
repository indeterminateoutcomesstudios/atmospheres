import Ember from 'ember';

import Sound from 'ms-environments/models/sound';
import IntermittentSound from 'ms-environments/models/intermittent-sound';

export default Ember.Service.extend({

  player: Ember.inject.service(),

  getSounds() {
    let soundStubs = [

      { name: 'Rain (Drizzle)', category: 'Weather', url: 'weather/rain-drizzle.wav' },
      { name: 'Rain (Light)',   category: 'Weather', url: 'weather/rain-light.wav' },
      { name: 'Rain (Medium)',  category: 'Weather', url: 'weather/rain-medium.wav' },
      { name: 'Rain (Heavy)',   category: 'Weather', url: 'weather/rain-heavy.wav' },

      // TODO: Figure out what structure we want for intermittent sounds.
      { name: 'Thunder',   category: 'Weather', urls: [
        'weather/thunder-1.wav', 'weather/thunder-2.wav',
        'weather/thunder-3.wav', 'weather/thunder-4.wav'
      ] },

      // Water
      { name: 'Brook',           category: 'Water', url: 'water/brook.wav' },
      { name: 'Stream',          category: 'Water', url: 'water/stream.wav' },
      { name: 'River',           category: 'Water', url: 'water/river.wav' },
      { name: 'Waves (Shallow)', category: 'Water', url: 'water/waves-shallow.wav' },
      { name: 'Waves (Medium)',  category: 'Water', url: 'water/waves-medium.wav' },
      { name: 'Waves (Deep)',    category: 'Water', url: 'water/waves-deep.wav' }

    ];
    return Ember.A(soundStubs.map(s => {
      if (s.url) {
        return Sound.create({ ...s, context: this.get('player.context') });
      } else if (s.urls) {
        return IntermittentSound.create({ ...s, context: this.get('player.context') });
      }
    }));
  },

  getEnvironments() {
    return Ember.A();
  }

});
