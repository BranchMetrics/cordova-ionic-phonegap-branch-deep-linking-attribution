'use strict';

// update the xcode preferences to allow associated domains

(function() {
  // properties
  var path = require('path');
  var compare = require('node-version-compare');
  var ConfigXmlHelper = require('../sdk/configXmlHelper.js');
  var IOS_DEPLOYMENT_TARGET = '8.0';
  var COMMENT_KEY = /_comment$/;
  var context;

  // entry
  module.exports = {
    enableAssociatedDomains: enableAssociatedDomains
  };

  function enableAssociatedDomains(cordovaContext) {
    context = cordovaContext;

    var projectFile = loadProjectFile();

    // adjust preferences
    activateAssociativeDomains(projectFile.xcode);

    // add entitlements file to pbxfilereference
    addPbxReference(projectFile.xcode);

    // save changes
    projectFile.write();
  }

  function activateAssociativeDomains(xcodeProject) {
    var configurations = nonComments(xcodeProject.pbxXCBuildConfigurationSection());
    var entitlementsFilePath = pathToEntitlementsFile();
    var config;
    var buildSettings;
    var deploymentTargetIsUpdated;

    for (config in configurations) {
      buildSettings = configurations[config].buildSettings;
      buildSettings.CODE_SIGN_ENTITLEMENTS = '"' + entitlementsFilePath + '"';

      // if deployment target is less then the required one - increase it
      if (buildSettings.IPHONEOS_DEPLOYMENT_TARGET) {
        var buildDeploymentTarget = buildSettings.IPHONEOS_DEPLOYMENT_TARGET.toString();
        if (compare(buildDeploymentTarget, IOS_DEPLOYMENT_TARGET) == -1) {
          buildSettings.IPHONEOS_DEPLOYMENT_TARGET = IOS_DEPLOYMENT_TARGET;
          deploymentTargetIsUpdated = true;
        }
      }
      else {
        buildSettings.IPHONEOS_DEPLOYMENT_TARGET = IOS_DEPLOYMENT_TARGET;
        deploymentTargetIsUpdated = true;
      }
    }

    if (deploymentTargetIsUpdated) {
      console.log('IOS project now has deployment target set as: ' + IOS_DEPLOYMENT_TARGET);
    }

    console.log('IOS project Code Sign Entitlements now set to: ' + entitlementsFilePath);
  }

  function addPbxReference(xcodeProject) {
    var fileReferenceSection = nonComments(xcodeProject.pbxFileReferenceSection());
    var entitlementsRelativeFilePath = pathToEntitlementsFile();

    if (isPbxReferenceAlreadySet(fileReferenceSection, entitlementsRelativeFilePath)) {
      console.log('Entitlements file is in reference section.');
      return;
    }

    console.log('Entitlements file is not in references section, adding it');
    createPbxFileReference(xcodeProject, entitlementsRelativeFilePath);
  }

  function isPbxReferenceAlreadySet(fileReferenceSection, entitlementsRelativeFilePath) {
    var isAlreadyInReferencesSection = false;
    var uuid;
    var fileRefEntry;

    for (uuid in fileReferenceSection) {
      fileRefEntry = fileReferenceSection[uuid];
      if (fileRefEntry.path && fileRefEntry.path.indexOf(entitlementsRelativeFilePath) > -1) {
        isAlreadyInReferencesSection = true;
        break;
      }
    }

    return isAlreadyInReferencesSection;
  }

  function createPbxFileReference(xcodeProject, entitlementsRelativeFilePath) {
    xcodeProject.addResourceFile(path.basename(entitlementsRelativeFilePath));
  }

  function loadProjectFile() {
    var platform_ios;
    var projectFile;

    try {
      // try pre-5.0 cordova structure
      platform_ios = context.requireCordovaModule('cordova-lib/src/plugman/platforms').ios;
      projectFile = platform_ios.parseProjectFile(iosPlatformPath());
    } catch (e) {
      // let's try cordova 5.0 structure
      platform_ios = context.requireCordovaModule('cordova-lib/src/plugman/platforms/ios');
      projectFile = platform_ios.parseProjectFile(iosPlatformPath());
    }

    return projectFile;
  }


  function nonComments(obj) {
    var keys = Object.keys(obj);
    var newObj = {};

    for (var i = 0, len = keys.length; i < len; i++) {
      if (!COMMENT_KEY.test(keys[i])) {
        newObj[keys[i]] = obj[keys[i]];
      }
    }

    return newObj;
  }

  function iosPlatformPath() {
    return path.join(projectRoot(), 'platforms', 'ios');
  }

  function projectRoot() {
    return context.opts.projectRoot;
  }

  function pathToEntitlementsFile() {
    var configXmlHelper = new ConfigXmlHelper(context);
    var projectName = configXmlHelper.getProjectName();
    var fileName = projectName + '.entitlements';

    return path.join(projectName, 'Resources', fileName);
  }
})();
