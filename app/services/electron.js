/* eslint-env node */

import Ember from 'ember';

const electron = window.requireNode('electron');

export default Ember.Service.extend({

  on(...args) {
    if (!electron) return;
    let { ipcRenderer: electronApp } = electron;
    electronApp.on.call(electronApp, ...args);
  }

});
