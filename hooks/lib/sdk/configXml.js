(function () {
  // properties
  'use strict'
  var path = require('path')
  var xmlHelper = require('./xmlHelper.js')

  // entry
  module.exports = {
    read: read
  }

  // read branch config from config.xml
  function read (context) {
    var configXml = getConfigXml(context)
    var branchXml = getBranchXml(configXml)
    var branchPreferences = getBranchPreferences(context, configXml, branchXml)

    validateBranchPreferences(branchPreferences)

    return branchPreferences
  }

  // read config.xml
  function getConfigXml (context) {
    var projectRoot = getProjectRoot(context)
    var pathToConfigXml = path.join(projectRoot, 'config.xml')
    var configXml = xmlHelper.readXmlAsJson(pathToConfigXml)

    if (configXml == null) {
      throw new Error('BRANCH SDK: A config.xml is not found in project\'s root directory. Docs https://goo.gl/GijGKP')
    }

    return configXml
  }

  // read <branch-config> within config.xml
  function getBranchXml (configXml) {
    var branchConfig = configXml.widget['branch-config']

    if (branchConfig == null || branchConfig.length === 0) {
      throw new Error('BRANCH SDK: <branch-config> tag is not set in the config.xml. Docs https://goo.gl/GijGKP')
    }

    return branchConfig[0]
  }

  // read <branch-config> properties within config.xml
  function getBranchPreferences (context, configXml, branchXml) {
    var projectRoot = getProjectRoot(context)
    var projectPlatform = getProjectPlatform(context)
    var bundleId = (configXml.widget['$'].hasOwnProperty('id')) ? configXml.widget['$']['id'] : null
    var bundleName = (configXml.widget.hasOwnProperty('name')) ? configXml.widget.name[0] : null
    var branchKey = (branchXml.hasOwnProperty('branch-key')) ? branchXml['branch-key'][0]['$']['value'] : null
    var linkDomain = (branchXml.hasOwnProperty('link-domain')) ? branchXml['link-domain'][0]['$']['value'] : null
    var uriScheme = (branchXml.hasOwnProperty('uri-scheme')) ? branchXml['uri-scheme'][0]['$']['value'] : null
    var iosTeamRelease = (branchXml.hasOwnProperty('ios-team-release')) ? branchXml['ios-team-release'][0]['$']['value'] : null
    var iosTeamDebug = (branchXml.hasOwnProperty('ios-team-debug')) ? branchXml['ios-team-debug'][0]['$']['value'] : null
    var androidPrefix = (branchXml.hasOwnProperty('android-prefix')) ? branchXml['android-prefix'][0]['$']['value'] : null
    var androidTestMode = (branchXml.hasOwnProperty('android-testmode')) ? branchXml['android-testmode'][0]['$']['value'] : 'false'

    return {
      'projectRoot': projectRoot,
      'projectPlatform': projectPlatform,
      'bundleId': bundleId,
      'bundleName': bundleName,
      'branchKey': branchKey,
      'uriScheme': uriScheme,
      'linkDomain': linkDomain,
      'iosTeamRelease': iosTeamRelease,
      'iosTeamDebug': iosTeamDebug, // optional
      'androidPrefix': androidPrefix, // optional
      'androidTestMode': androidTestMode // optional
    }
  }

  // read app project location
  function getProjectRoot (context) {
    return context.opts.projectRoot
  }

  // read project platform
  function getProjectPlatform (context) {
    // try pre-5.0 cordova structure
    try {
      return context.requireCordovaModule('cordova-lib/src/plugman/platforms').ios
    } catch (e) {
      return context.requireCordovaModule('cordova-lib/src/plugman/platforms/ios')
    }
  }

  // validate <branch-config> properties within config.xml
  function validateBranchPreferences (preferences) {
    if (preferences.bundleId === null) {
      throw new Error('BRANCH SDK: Invalid "widget id" in your config.xml. Docs https://goo.gl/GijGKP')
    }
    if (preferences.bundleName === null) {
      throw new Error('BRANCH SDK: Invalid "name" in your config.xml. Docs https://goo.gl/GijGKP')
    }
    if (preferences.branchKey === null) {
      throw new Error('BRANCH SDK: Invalid "branch-key" in <branch-config> in your config.xml. Docs https://goo.gl/GijGKP')
    }
    if (preferences.uriScheme === null || !/^[a-zA-Z0-9-.]*$/.test(preferences.uriScheme)) {
      throw new Error('BRANCH SDK: Invalid "uri-scheme" in <branch-config> in your config.xml. Docs https://goo.gl/GijGKP')
    }
    if (preferences.linkDomain === null || !/^(?!.*?www).*([a-zA-Z0-9]+(\.[a-zA-Z0-9]+)+.*)$/.test(preferences.linkDomain)) {
      throw new Error('BRANCH SDK: Invalid "link-domain" in <branch-config> in your config.xml. Docs https://goo.gl/GijGKP')
    }
    if (preferences.iosTeamRelease === null || !/^[a-zA-Z0-9]{10}$/.test(preferences.iosTeamRelease)) {
      throw new Error('BRANCH SDK: Invalid "ios-team-release" in <branch-config> in your config.xml. Docs https://goo.gl/GijGKP')
    }
    if (preferences.iosTeamDebug !== null && !/^[a-zA-Z0-9]{10}$/.test(preferences.iosTeamDebug)) {
      throw new Error('BRANCH SDK: Invalid "ios-team-debug" in <branch-config> in your config.xml. Docs https://goo.gl/GijGKP')
    }
    if (preferences.androidPrefix !== null && !/^[/].[a-zA-Z0-9]{3}$/.test(preferences.androidPrefix)) {
      throw new Error('BRANCH SDK: Invalid "android-prefix" in <branch-config> in your config.xml. Docs https://goo.gl/GijGKP')
    }
    if (!(preferences.androidTestMode === 'true' || preferences.androidTestMode === 'false')) {
      throw new Error('BRANCH SDK: Invalid "android-testmode" in <branch-config> in your config.xml. Docs https://goo.gl/GijGKP')
    }
  }
})()
