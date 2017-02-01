(function () {
  // properties
  'use strict'
  var nodeDependencies = require('./lib/npm/nodeDependencies.js')

  // entry
  module.exports = run

  // before plugin install hooks
  function run (context) {
    nodeDependencies.install(context)
  }
})()
