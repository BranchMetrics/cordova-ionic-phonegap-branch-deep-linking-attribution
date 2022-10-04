(function () {
  // properties

  const setPluginVersion = require("../npm/setPluginVersion.js");
  const IOS = "ios";
  const ANDROID = "android";

  // entry
  module.exports = run;

  // runs before plugin installs
  function run(context) {
    const platforms = context.opts.cordova.platforms;

    platforms.forEach(platform => {
      if (platform === IOS) {
        setPluginVersion.setIosPluginVersion(context);
      }

      if (platform === ANDROID) {
        setPluginVersion.setAndroidPluginVersion(context);
      }
    });
  }
})();
