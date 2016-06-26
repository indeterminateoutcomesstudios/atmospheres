import Ember from 'ember';

export default Ember.Component.extend({

  player: Ember.inject.service(),

  playingSounds: Ember.computed.filterBy('sounds', 'playing')

});
