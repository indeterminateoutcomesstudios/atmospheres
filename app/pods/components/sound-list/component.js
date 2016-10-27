import Ember from 'ember';

export default Ember.Component.extend({

  tagName: 'ul',
  classNames: [ 'action-list' ],

  filteredSounds: Ember.computed('sounds.@each.name', 'currentFilter', function() {
    let allSounds = this.get('sounds'),
        filter = this.get('currentFilter');
    if (!filter) {
      return allSounds;
    }
    return allSounds.filter(sound => {
      return sound.get('name').toLowerCase().indexOf(filter.toLowerCase()) > -1;
    });
  }),

});
