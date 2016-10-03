import Ember from 'ember';

export default Ember.Controller.extend({

  allCategories: Ember.computed.mapBy('model', 'category'),
  categories: Ember.computed.uniq('allCategories')

});
