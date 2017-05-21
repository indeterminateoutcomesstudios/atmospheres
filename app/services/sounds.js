import Ember from 'ember';

let electron = window.requireNode('electron');
let electronApp = electron ? electron.ipcRenderer : null;

import Sound from 'ms-environments/models/sound';
import IntermittentSound from 'ms-environments/models/intermittent-sound';

export default Ember.Service.extend({

  player: Ember.inject.service(),
  cachedSounds: null,

  getSounds() {
    if (this.get('cachedSounds')) {
      return Ember.RSVP.Promise.resolve(this.get('cachedSounds'));
    }
    let strategy = electronApp ? this._getSoundsFromFileSystem : this._getSoundsFromStubs;
    return strategy().then(sounds => {
      let soundObjects = Ember.A(sounds.map(s => {
        if (s.url) {
          return Sound.create({ ...s, context: this.get('player.context') });
        } else if (s.urls) {
          return IntermittentSound.create({ ...s, context: this.get('player.context') });
        }
      }));
      this.set('cachedSounds', soundObjects);
      return soundObjects;
    });
  },

  getSoundsForEnvironment(environment) {
    return this.getSounds().then(allSounds => {
      return environment.get('sounds').map(({ name, volume }) => {
        let sound = allSounds.findBy('name', name);
        if (volume) {
          sound.set('volume', volume);
        }
        return sound;
      });
    });
  },

  _getSoundsFromStubs() {
    return Ember.RSVP.Promise.resolve([
      { name: 'Rain (Drizzle)',  category: 'Weather', url: 'weather/rain-drizzle.wav' },
      { name: 'Rain (Light)',    category: 'Weather', url: 'weather/rain-light.wav' },
      { name: 'Rain (Medium)',   category: 'Weather', url: 'weather/rain-medium.wav' },
      { name: 'Rain (Heavy)',    category: 'Weather', url: 'weather/rain-heavy.wav' },
      { name: 'Rain (Interior)', category: 'Weather', url: 'weather/rain-interior.wav' },

      // TODO: Figure out what structure we want for intermittent sounds.
      { name: 'Thunder (Close)', category: 'Weather', urls: [
        'weather/thunder-close-1.wav', 'weather/thunder-close-2.wav',
        'weather/thunder-close-3.wav', 'weather/thunder-close-4.wav'
      ] },
      { name: 'Thunder (Low)', category: 'Weather', urls: [
        'weather/thunder-low-1.wav', 'weather/thunder-low-2.wav',
        'weather/thunder-low-3.wav', 'weather/thunder-low-4.wav'
      ] },

      { name: 'Snow (Light)',    category: 'Weather', url: 'weather/snow-light.wav' },
      { name: 'Snow (Heavy)',    category: 'Weather', url: 'weather/snow-heavy.wav' },
      { name: 'Snow (Blizzard)', category: 'Weather', url: 'weather/snow-blizzard.wav' },

      { name: 'Wind (Light)',     category: 'Weather', url: 'weather/wind-light.wav' },
      { name: 'Wind (Heavy)',     category: 'Weather', url: 'weather/wind-heavy.wav' },
      { name: 'Wind (Hills)',     category: 'Weather', url: 'weather/wind-hills.wav' },
      { name: 'Wind (Mountains)', category: 'Weather', url: 'weather/wind-mountains.wav' },
      { name: 'Wind (Storm)',     category: 'Weather', url: 'weather/wind-storm.wav' },
      { name: 'Wind (Hurricane)', category: 'Weather', url: 'weather/wind-hurricane.wav' },

      // Water
      { name: 'Brook',           category: 'Water', url: 'water/brook.wav' },
      { name: 'Stream',          category: 'Water', url: 'water/stream.wav' },
      { name: 'River',           category: 'Water', url: 'water/river.wav' },
      { name: 'Waves (Shallow)', category: 'Water', url: 'water/waves-shallow.wav' },
      { name: 'Waves (Medium)',  category: 'Water', url: 'water/waves-medium.wav' },
      { name: 'Waves (Deep)',    category: 'Water', url: 'water/waves-deep.wav' },

      // Fauna
      { name: 'Wolf', category: 'Fauna', urls: [
        'fauna/wolf-1.wav', 'fauna/wolf-2.wav', 'fauna/wolf-3.wav',
        'fauna/wolf-4.wav', 'fauna/wolf-5.wav'
      ] },
      { name: 'Wolf (Distant)', category: 'Fauna', urls: [
        'fauna/wolf-distant-1.wav', 'fauna/wolf-distant-2.wav', 'fauna/wolf-distant-3.wav',
        'fauna/wolf-distant-4.wav', 'fauna/wolf-distant-5.wav'
      ] },

      // Dungeon
      { name: 'Howl',             category: 'Dungeon', url: 'dungeon/howl.wav' },
      { name: 'Frozen',           category: 'Dungeon', url: 'dungeon/frozen.wav' },
      { name: 'Mine',             category: 'Dungeon', url: 'dungeon/mine.wav' },
      { name: 'Drips (Light)',    category: 'Dungeon', url: 'dungeon/drips-light.wav' },
      { name: 'Drips (Moderate)', category: 'Dungeon', url: 'dungeon/drips-moderate.wav' },
      { name: 'Drips (Heavy)',    category: 'Dungeon', url: 'dungeon/drips-heavy.wav' },
      { name: 'Drips (Ice)',      category: 'Dungeon', url: 'dungeon/drips-ice.wav' },

    ]);
  },

  _getSoundsFromFileSystem() {
    return new Ember.RSVP.Promise(resolve =>
      electronApp.on('sounds:get:response', (event, results) => {
        resolve(results);
      }).send('sounds:get', 'ping'));
  }

});
