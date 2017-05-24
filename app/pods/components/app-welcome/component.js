import Ember from 'ember';

const electron = requireNode('electron');

export default Ember.Component.extend({

  actions: {
    openSetupGuide() {
      if (!electron) return;
      electron.shell.openExternal('https://github.com/magic-stash/atmospheres/wiki/Setup-Guide');
    }
  },

});
