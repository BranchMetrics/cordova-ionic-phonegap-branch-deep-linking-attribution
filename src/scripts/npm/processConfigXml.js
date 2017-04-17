(function () {
  // properties
  'use strict'
  var path = require('path')
  var xmlHelper = require('../lib/xmlHelper.js')

  // entry
  module.exports = {
    read: read
  }

  // read branch config from config.xml
  function read (context) {
    var projectRoot = getProjectRoot(context)
    var configXml = getConfigXml(projectRoot)
    var branchXml = getBranchXml(configXml)
    var branchPreferences = getBranchPreferences(context, configXml, branchXml)

    validateBranchPreferences(branchPreferences)

    return branchPreferences
  }

  // read config.xml
  function getConfigXml (projectRoot) {
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
    return {
      'projectRoot': getProjectRoot(context),
      'projectName': getProjectName(configXml),
      'branchKey': getBranchValue(branchXml, 'branch-key'),
      'linkDomain': getBranchLinkDomains(branchXml, 'link-domain'),
      'uriScheme': getBranchValue(branchXml, 'uri-scheme'),
      'iosBundleId': getBundleId(configXml, 'ios'),
      'iosProjectModule': getProjectModule(context),
      'iosTeamRelease': getBranchValue(branchXml, 'ios-team-release'), // optional
      'iosTeamDebug': getBranchValue(branchXml, 'ios-team-debug'), // optional
      'androidBundleId': getBundleId(configXml, 'android'), // optional
      'androidPrefix': getBranchValue(branchXml, 'android-prefix'), // optional
      'androidTestMode': getBranchValue(branchXml, 'android-testmode') // optional
    }
  }

  // read project root from cordova context
  function getProjectRoot (context) {
    return context.opts.projectRoot || null
  }

  // read project name from config.xml
  function getProjectName (configXml) {
    return (configXml.widget.hasOwnProperty('name')) ? configXml.widget.name[0] : null
  }

  // read branch value from <branch-config>
  function getBranchValue (branchXml, key) {
    return (branchXml.hasOwnProperty(key)) ? branchXml[key][0]['$']['value'] : null
  }

  // read branch value from <branch-config> for multiple <link-domain>
  function getBranchLinkDomains (branchXml, key) {
    var output = []
    if (branchXml.hasOwnProperty(key)) {
      for (var i = 0; i < branchXml[key].length; i++) {
        var item = branchXml[key][i]
        output.push(item['$']['value'])
      }
    }
    return output
  }

  // read bundle id from config.xml (optional values override widget-id)
  function getBundleId (configXml, platform) {
    var output = null
    var key = platform === 'ios' ? 'ios-CFBundleIdentifier' : 'android-packageName'

    if (configXml.widget['$'].hasOwnProperty(key)) {
      output = configXml.widget['$'][key]
    } else if (configXml.widget['$'].hasOwnProperty('id')) {
      output = configXml.widget['$']['id']
    }

    return output
  }

  // read iOS project module from cordova context
  function getProjectModule (context) {
    // try pre-5.0 cordova structure
    try {
      return context.requireCordovaModule('cordova-lib/src/plugman/platforms').ios
    } catch (e) {
      return context.requireCordovaModule('cordova-lib/src/plugman/platforms/ios')
    }
  }

  // validate <branch-config> properties within config.xml
  function validateBranchPreferences (preferences) {
    if (preferences.projectRoot === null) {
      throw new Error('BRANCH SDK: Invalid "root" in your config.xml. Docs https://goo.gl/GijGKP')
    }
    if (preferences.projectPlatform === null) {
      throw new Error('BRANCH SDK: Invalid "platform" in your config.xml. Docs https://goo.gl/GijGKP')
    }
    if (preferences.projectName === null) {
      throw new Error('BRANCH SDK: Invalid "name" in your config.xml. Docs https://goo.gl/GijGKP')
    }
    if (preferences.branchKey === null) {
      throw new Error('BRANCH SDK: Invalid "branch-key" in <branch-config> in your config.xml. Docs https://goo.gl/GijGKP')
    }
    if (preferences.uriScheme === null || !/^[a-zA-Z0-9-.]+$/.test(preferences.uriScheme)) {
      throw new Error('BRANCH SDK: Invalid "uri-scheme" in <branch-config> in your config.xml. Docs https://goo.gl/GijGKP')
    }
    if (preferences.linkDomain === null || !/^(?!.*?www).*([a-zA-Z0-9]+(\.[a-zA-Z0-9]+)+.*)$/.test(preferences.linkDomain)) {
      throw new Error('BRANCH SDK: Invalid "link-domain" in <branch-config> in your config.xml. Docs https://goo.gl/GijGKP')
    }
    if (preferences.iosBundleId === null || !/^[a-zA-Z0-9.-]+$/.test(preferences.iosBundleId)) {
      throw new Error('BRANCH SDK: Invalid "id" or "ios-CFBundleIdentifier" in <widget> in your config.xml. Docs https://goo.gl/GijGKP')
    }
    if (preferences.iosTeamRelease !== null && !/^[a-zA-Z0-9]{10}$/.test(preferences.iosTeamRelease)) {
      throw new Error('BRANCH SDK: Invalid "ios-team-release" in <branch-config> in your config.xml. Docs https://goo.gl/GijGKP')
    }
    if (preferences.iosTeamDebug !== null && !/^[a-zA-Z0-9]{10}$/.test(preferences.iosTeamDebug)) {
      throw new Error('BRANCH SDK: Invalid "ios-team-debug" in <branch-config> in your config.xml. Docs https://goo.gl/GijGKP')
    }
    if (preferences.androidBundleId !== null && !/^[a-zA-Z0-9._]+$/.test(preferences.androidBundleId)) {
      throw new Error('BRANCH SDK: Invalid "id" or "android-packageName" in <widget> in your config.xml. Docs https://goo.gl/GijGKP')
    }
    if (preferences.androidPrefix !== null && !/^[/].[a-zA-Z0-9]{3}$/.test(preferences.androidPrefix)) {
      throw new Error('BRANCH SDK: Invalid "android-prefix" in <branch-config> in your config.xml. Docs https://goo.gl/GijGKP')
    }
    if (!(preferences.androidTestMode === 'true' || preferences.androidTestMode === 'false' || preferences.androidTestMode === null)) {
      throw new Error('BRANCH SDK: Invalid "android-testmode" in <branch-config> in your config.xml. Docs https://goo.gl/GijGKP')
    }
  }
})()
