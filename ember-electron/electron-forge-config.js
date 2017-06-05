module.exports = {
  "make_targets": {
    "win32": [
      "squirrel"
    ],
    "darwin": [
      "zip"
    ],
    "linux": [
      "deb",
      "rpm"
    ]
  },
  "electronPackagerConfig": {
    appCopyright: 'Copyright © 2017 Tim G. Thomas',
    name: '<%= productName %>',
    icon: 'ember-electron/resources/icon.icns'
  },
  "electronWinstallerConfig": {
    "name": ""
  },
  "electronInstallerDebian": {},
  "electronInstallerRedhat": {},
  "github_repository": {
    "owner": "",
    "name": ""
  },
  "windowsStoreConfig": {
    "packageName": ""
  }
};
