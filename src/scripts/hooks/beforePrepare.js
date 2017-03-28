(function () {
  // properties
  'use strict'
  var configPreferences = require('../npm/processConfigXml.js')
  var iosDevelopmentTeam = require('../ios/updateDevelopmentTeam.js')
  var IOS = 'ios'

  // entry
  module.exports = run

  // after prepare hooks based on platform
  function run (context) {
    var preferences = configPreferences.read(context)
    var platforms = context.opts.platforms

    platforms.forEach(function (platform) {
      if (platform === IOS) {
        iosDevelopmentTeam.addDevelopmentTeam(preferences)
      }
    })
  }
})()
