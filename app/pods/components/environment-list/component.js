import Ember from 'ember';

export default Ember.Component.extend({

  name: null,
  isCreating: false,

  actions: {
    enterCreateMode() {
      this.set('isCreating', true);
    },
    save() {
      this.onCreate(this.get('name'))
        .then(() => this.send('leaveCreateMode'));
    },
    leaveCreateMode() {
      this.setProperties({
        name: null,
        isCreating: false
      });
    }
  }

});
