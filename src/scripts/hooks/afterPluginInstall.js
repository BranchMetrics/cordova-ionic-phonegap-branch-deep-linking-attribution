(function () {
  // properties

  const configPreferences = require("../npm/processConfigXml.js");
  const iosPlist = require("../ios/updatePlist.js");
  const iosAssociatedDomains = require("../ios/updateAssociatedDomains.js");
  const iosHeaderPaths = require("../ios/updateHeaderPaths.js");
  const iosPbxproj = require("../ios/updatePbxproj.js");
  const androidAssets = require("../android/updateAssets.js");
  const IOS = "ios";
  const ANDROID = "android";

  // entry
  module.exports = run;

  // builds before platform config
  function run(context) {
    const preferences = configPreferences.read(context);
    const platforms = context.opts.cordova.platforms;

    platforms.forEach(platform => {
      if (platform === ANDROID) {
        androidAssets.addBranchJson(context, preferences);
      }

      if (platform === IOS) {
        iosPlist.addBranchSettings(preferences);
        iosAssociatedDomains.addAssociatedDomains(preferences);
        iosHeaderPaths.addHeaderPaths();
        iosPbxproj.addBranchJson(context, preferences);
      }
    });
  }
})();
