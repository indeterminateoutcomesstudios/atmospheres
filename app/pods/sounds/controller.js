import Ember from 'ember';

export default Ember.Controller.extend({

  allCategories: Ember.computed.mapBy('filteredModel', 'category'),
  categories: Ember.computed.uniq('allCategories'),

  filter: null,
  filteredModel: Ember.computed('model.@each', 'filter', function() {
    let allSounds = this.get('model'),
        filter = this.get('filter');
    if (!filter) {
      return allSounds;
    }
    return allSounds.filter(sound => {
      return sound.get('name').toLowerCase().indexOf(filter.toLowerCase()) > -1;
    });
  })

});
