// read branch config from config.xml
(function () {
  // properties
  'use strict'
  var path = require('path')
  var xmlHelper = require('./xmlHelper.js')

  // entry
  module.exports = {
    read: read
  }

  // methods
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
      throw new Error('config.xml not found! Please, check that it exist in your project\'s root directory.')
    }

    return configXml
  }

  // read <branch-config> within config.xml
  function getBranchXml (configXml) {
    var branchConfig = configXml.widget['branch-config']

    if (branchConfig == null || branchConfig.length === 0) {
      throw new Error('<branch-config> tag is not set in the config.xml. The Branch SDK is not properly installed.')
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
    var uriScheme = (branchXml.hasOwnProperty('uri-scheme')) ? branchXml['uri-scheme'][0]['$']['value'] : null
    var linkDomain = (branchXml.hasOwnProperty('link-domain')) ? branchXml['link-domain'][0]['$']['value'] : null
    var iosTeamId = (branchXml.hasOwnProperty('ios-team-id')) ? branchXml['ios-team-id'][0]['$']['value'] : null
    var androidPrefix = (branchXml.hasOwnProperty('android-prefix')) ? branchXml['android-prefix'][0]['$']['value'] : null

    return {
      'projectRoot': projectRoot,
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

  // read app project location
  function getProjectRoot (context) {
    return context.opts.projectRoot
  }

  // read project platform
  function getProjectPlatform (context) {
    // pre-5.0 cordova structure
    try {
      return context.requireCordovaModule('cordova-lib/src/plugman/platforms').ios
    } catch (e) {
      return context.requireCordovaModule('cordova-lib/src/plugman/platforms/ios')
    }
  }

  // validate <branch-config> properties within config.xml
  function validateBranchPreferences (preferences) {
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
