(function() {
  // properties

  const configPreferences = require("../npm/processConfigXml.js");
  const iosDevelopmentTeam = require("../ios/updateDevelopmentTeam.js");
  const androidManifest = require("../android/updateAndroidManifest.js");
  const ANDROID = "android";
  const IOS = "ios";

  // entry
  module.exports = run;

  // builds after platform config
  function run(context) {
    const preferences = configPreferences.read(context);
    const platforms = context.opts.cordova.platforms;

    platforms.forEach(platform => {
      if (platform === ANDROID) {
        androidManifest.writePreferences(context, preferences);
      }
      if (platform === IOS) {
        iosDevelopmentTeam.addDevelopmentTeam(preferences);
      }
    });
  }
})();
