import Ember from 'ember';

export default Ember.Controller.extend({

  player: Ember.inject.service(),

  playingSounds: Ember.computed.filterBy('model.sounds', 'playing'),

});
