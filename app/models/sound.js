import Ember from 'ember';

export default Ember.Object.extend({

  init(...args) {
    this._super(...args);
    this.set('gain', this.get('context').createGain());
  },

  volume: Ember.computed({
    get() {
      return this.get('gain').gain.value;
    },
    set(key, value) {
      this.get('gain').gain.value = value;
    }
  })

});
