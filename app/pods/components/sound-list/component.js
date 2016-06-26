import Ember from 'ember';
import groupBy from 'ember-group-by';

export default Ember.Component.extend({

  categories: groupBy('sounds', 'category')

});
