import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('sounds', function() {
    this.route('now-playing', { path: 'now-playing' });
    this.route('category', { path: ':category_slug' });
  });
});

export default Router;
