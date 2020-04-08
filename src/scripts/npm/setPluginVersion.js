(function() {
  // properties

  const fs = require("fs");
  const path = require("path");

  // entry
  module.exports = {
    setAndroidPluginVersion: setAndroidPluginVersion,
    setIosPluginVersion: setIosPluginVersion
  };

  // set plugin version to BranchSDK.java
  function setAndroidPluginVersion(context) {
    const filePath = getAndroidSdkPath(context);
    updatePluginVersion(context, filePath);
  }

  // set plugin version to BranchSDK.m
  function setIosPluginVersion(context) {
    const filePath = getIosSdkPath(context);
    updatePluginVersion(context, filePath);
  }

  function getAndroidSdkPath(context) {
    return path.join(
      context.opts.projectRoot,
      'plugins',
      context.opts.plugin.pluginInfo.id,
      'src',
      'android',
      'io',
      'branch',
      'BranchSDK.java'
    );
  }

  function getIosSdkPath(context) {
    return path.join(
      context.opts.projectRoot,
      'plugins',
      context.opts.plugin.pluginInfo.id,
      'src',
      'ios',
      'BranchSDK.m'
    );
  }

  function updatePluginVersion(context, filePath) {
    let content = fs.readFileSync(filePath, "utf8");
    content = content.replace("%BRANCH_PLUGIN_VERSION%", context.opts.plugin.pluginInfo.version);
    fs.writeFileSync(filePath, content, "utf8");
  }
})();
