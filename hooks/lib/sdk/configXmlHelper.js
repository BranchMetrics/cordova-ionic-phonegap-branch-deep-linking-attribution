'use strict';

// read cordova config.xml

(function() {
  // properties
  var path = require('path');
  var xmlHelper = require('./xmlHelper.js');
  var ANDROID = 'android';
  var IOS = 'ios';
  var CONFIG_FILE_NAME = 'config.xml';
  var context;
  var projectRoot;

  // entry
  module.exports = ConfigXmlHelper;

  function ConfigXmlHelper(cordovaContext) {
    context = cordovaContext;
    projectRoot = context.opts.projectRoot;
  }

  ConfigXmlHelper.prototype.read = function() {
    var filePath = getConfigXmlFilePath();

    return xmlHelper.readXmlAsJson(filePath);
  }

  ConfigXmlHelper.prototype.getPackageName = function(platform) {
    var configFilePath = getConfigXmlFilePath();
    var config = getCordovaConfigParser(configFilePath);
    var packageName;

    switch (platform) {
      case ANDROID: {
        packageName = config.android_packageName();
        break;
      }
      case IOS: {
        packageName = config.ios_CFBundleIdentifier();
        break;
      }
    }
    if (packageName === undefined || packageName.length == 0) {
      packageName = config.packageName();
    }

    return packageName;
  }

  ConfigXmlHelper.prototype.getProjectName = function() {
    return getProjectName();
  }

  function getCordovaConfigParser(configFilePath) {
    var ConfigParser;

    // If Cordova 5.4+ use parser from cordova-common.
    try {
      ConfigParser = context.requireCordovaModule('cordova-common/src/ConfigParser/ConfigParser');
    } catch (e) {
      ConfigParser = context.requireCordovaModule('cordova-lib/src/configparser/ConfigParser')
    }

    return new ConfigParser(configFilePath);
  }

  function getConfigXmlFilePath() {
    return path.join(projectRoot, CONFIG_FILE_NAME);
  }

  function getProjectName() {
    var configFilePath = getConfigXmlFilePath();
    var config = getCordovaConfigParser(configFilePath);

    return config.name();
  }
})();
