(function() {
  // properties

  const configPreferences = require("../npm/processConfigXml.js");
  const iosPlist = require("../ios/updatePlist.js");
  const iosCapabilities = require("../ios/enableEntitlements.js");
  const iosAssociatedDomains = require("../ios/updateAssociatedDomains.js");
  const IOS = "ios";

  // entry
  module.exports = run;

  // builds before platform config
  function run(context) {
    const preferences = configPreferences.read(context);
    const platforms = context.opts.cordova.platforms;

    platforms.forEach(platform => {
      if (platform === IOS) {
        iosPlist.addBranchSettings(preferences);
        iosCapabilities.enableAssociatedDomains(preferences);
        iosAssociatedDomains.addAssociatedDomains(preferences);
      }
    });
  }
})();
