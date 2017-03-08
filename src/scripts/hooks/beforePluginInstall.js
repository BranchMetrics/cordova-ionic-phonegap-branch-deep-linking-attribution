(function () {
  // properties
  'use strict'
  var nodeDependencies = require('../npm/downloadNpmDependencies.js')

  // entry
  module.exports = run

  // before plugin install hooks
  function run (context) {
    nodeDependencies.install(context)
  }
})()
