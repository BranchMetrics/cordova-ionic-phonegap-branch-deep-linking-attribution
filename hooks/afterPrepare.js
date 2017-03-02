(function () {
  // properties
  'use strict'
  var configPrefrences = require('./lib/sdk/configXml.js')
  var iosPlist = require('./lib/ios/plist.js')
  var iosCapabilities = require('./lib/ios/capabilities.js')
  var iosAssociatedDomains = require('./lib/ios/associatedDomains.js')
  var iosDevelopmentTeam = require('./lib/ios/developmentTeam.js')
  var androidManifest = require('./lib/android/androidManifest.js')
  var IOS = 'ios'
  var ANDROID = 'android'

  // entry
  module.exports = run

  // after prepare hooks based on platform
  function run (context) {
    var preferences = configPrefrences.read(context)
    var platforms = context.opts.platforms

    platforms.forEach(function (platform) {
      if (platform === ANDROID) {
        androidManifest.writePreferences(context, preferences)
      }
      if (platform === IOS) {
        iosPlist.addBranchSettings(preferences)
        iosCapabilities.enableAssociatedDomains(preferences)
        iosAssociatedDomains.addAssociatedDomains(preferences)
        iosDevelopmentTeam.addDevelopmentTeam(preferences)
      }
    })
  }
})()
