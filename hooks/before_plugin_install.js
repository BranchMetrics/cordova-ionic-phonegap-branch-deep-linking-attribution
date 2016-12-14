'use strict';

// before Branch SDK install hooks

(function () {
  // properties
  var nodeDependencies = require('./lib/sdk/nodeDependencies.js');

  // entry
  module.exports = function(context) {
    nodeDependencies.install(context);
  };
})();

