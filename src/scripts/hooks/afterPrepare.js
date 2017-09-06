(function () {
  // properties
  'use strict'
  var configPreferences = require('../npm/processConfigXml.js')
  var iosDevelopmentTeam = require('../ios/updateDevelopmentTeam.js')
  var androidManifest = require('../android/updateAndroidManifest.js')
  var ANDROID = 'android'
  var IOS = 'ios'

  // entry
  module.exports = run

  // builds after platform config
  function run (context) {
    var preferences = configPreferences.read(context)
    var platforms = context.opts.cordova.platforms

    platforms.forEach(function (platform) {
      if (platform === ANDROID) {
        androidManifest.writePreferences(context, preferences)
      }
      if (platform === IOS) {
        iosDevelopmentTeam.addDevelopmentTeam(preferences)
      }
    })
  }
})()
