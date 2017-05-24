/* eslint-env node */

const electron = require('electron');
const { app, Menu, shell } = electron;

const appName = app.getName();

const menu = [
  {
    label: appName,
    submenu: [
      { role: 'about', label: `About ${appName}` },
      { type: 'separator' },
      { role: 'services', submenu: [] },
      { type: 'separator' },
      { role: 'hide', label: `Hide ${appName}` },
      { role: 'hideothers' },
      { role: 'unhide' },
      { type: 'separator' },
      { role: 'quit', label: `Quit ${appName}` }
    ]
  },
  {
    label: 'Edit',
    submenu: [
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' },
      { role: 'selectall' },
      { type: 'separator' }
    ]
  },
  {
    role: 'help',
    submenu: [
      {
        label: `Report an Issue...`,
        click() { shell.openExternal('https://github.com/magic-stash/atmospheres/issues/new'); }
      },
      { type: 'separator' },
      {
        label: 'Welcome Guide',
        click(item, browserWindow) {
          if (browserWindow) {
            browserWindow.webContents.send('show:welcome');
          }
        }
      },
    ]
  }
];

module.exports = Menu.buildFromTemplate(menu);
