// before plugin install hooks
(function () {
  // properties
  'use strict'
  var nodeDependencies = require('./lib/npm/nodeDependencies.js')

  // entry
  module.exports = run

  // methods
  function run (context) {
    nodeDependencies.install(context)
  }
})()
