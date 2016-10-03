/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    svgstore: {
      excludeSourceFiles: true,
      files: {
        sourceDirs: [ 'public/icons' ],
        outputFile: '/assets/icons.svg',
      }
    }
  });

  return app.toTree();
};
