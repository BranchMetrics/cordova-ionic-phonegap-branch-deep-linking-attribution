(function() {
  // properties

  const path = require("path");
  const compare = require("node-version-compare");
  const IOS_DEPLOYMENT_TARGET = "8.0";
  const COMMENT_KEY = /_comment$/;
  const CODESIGNIDENTITY = "iPhone Developer";

  // entry
  module.exports = {
    enableAssociatedDomains: enableAssociatedDomains
  };

  // updates the xcode preferences to allow associated domains
  function enableAssociatedDomains(preferences) {
    const entitlementsFile = path.join(
      preferences.projectRoot,
      "platforms",
      "ios",
      preferences.projectName,
      "Resources",
      `${preferences.projectName}.entitlements`
    );

    activateAssociativeDomains(
      preferences.iosProjectModule.xcode,
      entitlementsFile
    );
    addPbxReference(preferences.iosProjectModule.xcode, entitlementsFile);
    preferences.iosProjectModule.write();
  }

  // adds entitlement files to the xcode project
  function activateAssociativeDomains(xcodeProject, entitlementsFile) {
    const configurations = removeComments(
      xcodeProject.pbxXCBuildConfigurationSection()
    );
    let config;
    let buildSettings;

    for (config in configurations) {
      buildSettings = configurations[config].buildSettings;
      buildSettings.CODE_SIGN_IDENTITY = `"${CODESIGNIDENTITY}"`;
      buildSettings.CODE_SIGN_ENTITLEMENTS = `"${entitlementsFile}"`;

      // if deployment target is less then the required one - increase it
      if (buildSettings.IPHONEOS_DEPLOYMENT_TARGET) {
        const buildDeploymentTarget = buildSettings.IPHONEOS_DEPLOYMENT_TARGET.toString();
        if (compare(buildDeploymentTarget, IOS_DEPLOYMENT_TARGET) === -1) {
          buildSettings.IPHONEOS_DEPLOYMENT_TARGET = IOS_DEPLOYMENT_TARGET;
        }
      } else {
        buildSettings.IPHONEOS_DEPLOYMENT_TARGET = IOS_DEPLOYMENT_TARGET;
      }
    }
  }

  function addPbxReference(xcodeProject, entitlementsFile) {
    const fileReferenceSection = removeComments(
      xcodeProject.pbxFileReferenceSection()
    );

    if (isPbxReferenceAlreadySet(fileReferenceSection, entitlementsFile))
      return;
    xcodeProject.addResourceFile(path.basename(entitlementsFile));
  }

  function isPbxReferenceAlreadySet(fileReferenceSection, entitlementsFile) {
    let isAlreadyInReferencesSection = false;
    let uuid;
    let fileRefEntry;

    for (uuid in fileReferenceSection) {
      fileRefEntry = fileReferenceSection[uuid];
      if (
        fileRefEntry.path &&
        fileRefEntry.path.indexOf(entitlementsFile) > -1
      ) {
        isAlreadyInReferencesSection = true;
        break;
      }
    }

    return isAlreadyInReferencesSection;
  }

  // removes comments from .pbx file
  function removeComments(obj) {
    const keys = Object.keys(obj);
    const newObj = {};

    for (let i = 0, len = keys.length; i < len; i++) {
      if (!COMMENT_KEY.test(keys[i])) {
        newObj[keys[i]] = obj[keys[i]];
      }
    }

    return newObj;
  }
})();
