// read the app/config.xml
// read the sdk/package.json
(function () {
  // properties
  'use strict'
  var ConfigXmlHelper = require('./lib/sdk/configXmlHelper.js')
  var iosPlist = require('./lib/ios/plist.js')
  var iosPreferences = require('./lib/ios/preferences.js')
  var iosAssociatedDomains = require('./lib/ios/associatedDomains.js')
  var iosDevelopmentTeam = require('./lib/ios/developmentTeam.js')
  // var androidManifest = require('.lib/android/androidManifest.js')
  var IOS = 'ios'
  var ANDROID = 'android'

  // entry
  module.exports = install

  function install (context) {
    var preferences = readPreferences(context)
    var platforms = context.opts.platforms

    validatePreferences(preferences)
    updatePlatforms(context, preferences, platforms)
  }

  // helper methods
  function updatePlatforms (context, preferences, platforms) {
    platforms.forEach(function (platform) {
      if (platform === ANDROID) {

      }
      if (platform === IOS) {
        iosPlist.addBranchSettings(preferences)
        iosPreferences.enableAssociatedDomains(preferences)
        iosAssociatedDomains.addAssociatedDomains(preferences)
        iosDevelopmentTeam.addDevelopmentTeam(context, preferences)
      }
    })
  }

  function readPreferences (context) {
    // read data from projects root config.xml file
    var configXml = new ConfigXmlHelper(context).read()
    validateConfigXml(configXml)

    var branchXml = configXml.widget['branch-config']
    validateBranchXml(branchXml)

    var branchXmlPerferences = branchXml[0]

    var projectPlatform
    try {
      // pre-5.0 cordova structure
      projectPlatform = context.requireCordovaModule('cordova-lib/src/plugman/platforms').ios
    } catch (e) {
      // post-5.0 cordova structure
      projectPlatform = context.requireCordovaModule('cordova-lib/src/plugman/platforms/ios')
    }

    var bundleId = (configXml.widget['$'].hasOwnProperty('id')) ? configXml.widget['$']['id'] : null
    var bundleName = (configXml.widget.hasOwnProperty('name')) ? configXml.widget.name[0] : null
    var branchKey = (branchXmlPerferences.hasOwnProperty('branch-key')) ? branchXmlPerferences['branch-key'][0]['$']['value'] : null
    var uriScheme = (branchXmlPerferences.hasOwnProperty('uri-scheme')) ? branchXmlPerferences['uri-scheme'][0]['$']['value'] : null
    var linkDomain = (branchXmlPerferences.hasOwnProperty('link-domain')) ? branchXmlPerferences['link-domain'][0]['$']['value'] : null
    var iosTeamId = (branchXmlPerferences.hasOwnProperty('ios-team-id')) ? branchXmlPerferences['ios-team-id'][0]['$']['value'] : null
    var androidPrefix = (branchXmlPerferences.hasOwnProperty('android-prefix')) ? branchXmlPerferences['android-prefix'][0]['$']['value'] : null

    return {
      'projectRoot': context.opts.projectRoot,
      'projectPlatform': projectPlatform,
      'bundleId': bundleId,
      'bundleName': bundleName,
      'branchKey': branchKey,
      'uriScheme': uriScheme,
      'linkDomain': linkDomain,
      'iosTeamId': iosTeamId,
      'androidPrefix': androidPrefix
    }
  }

  function validateConfigXml (configXml) {
    if (configXml == null) {
      throw new Error('config.xml not found! Please, check that it exist in your project\'s root directory.')
    }
  }

  function validateBranchXml (branchXml) {
    if (branchXml == null || branchXml.length === 0) {
      throw new Error('<branch-config> tag is not set in the config.xml. The Branch SDK is not properly installed.')
    }
  }

  function validatePreferences (preferences) {
    if (preferences.bundleId === null) {
      throw new Error('Branch SDK plugin is missing "widget id" in your config.xml')
    }
    if (preferences.bundleName === null) {
      throw new Error('Branch SDK plugin is missing "name" in your config.xml')
    }
    if (preferences.branchKey === null) {
      throw new Error('Branch SDK plugin is missing "branch-key" in <branch-config> in your config.xml')
    }
    if (preferences.uriScheme === null) {
      throw new Error('Branch SDK plugin is missing "uri-scheme" in <branch-config> in your config.xml')
    }
    if (preferences.linkDomain === null) {
      throw new Error('Branch SDK plugin is missing "uri-scheme" in <branch-config> in your config.xml')
    }
    if (preferences.iosTeamId === null) {
      throw new Error('Branch SDK plugin is missing "ios-team-id" in <branch-config> in your config.xml')
    }
  }
})()
