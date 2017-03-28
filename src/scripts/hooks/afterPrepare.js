(function () {
  // properties
  'use strict'
  var configPreferences = require('../npm/processConfigXml.js')
  var iosPlist = require('../ios/updatePlist.js')
  var iosCapabilities = require('../ios/enableEntitlements.js')
  var iosAssociatedDomains = require('../ios/updateAssociatedDomains.js')
  var androidManifest = require('../android/updateAndroidManifest.js')
  var IOS = 'ios'
  var ANDROID = 'android'

  // entry
  module.exports = run

  // after prepare hooks based on platform
  function run (context) {
    var preferences = configPreferences.read(context)
    var platforms = context.opts.platforms

    platforms.forEach(function (platform) {
      if (platform === ANDROID) {
        androidManifest.writePreferences(context, preferences)
      }
      if (platform === IOS) {
        iosPlist.addBranchSettings(preferences)
        iosCapabilities.enableAssociatedDomains(preferences)
        iosAssociatedDomains.addAssociatedDomains(preferences)
      }
    })
  }
})()
