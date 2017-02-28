'use strict';

/**
Hook is executed at the end of the 'prepare' stage. Usually, when you call 'cordova build'.

It will inject required preferences in the platform-specific projects, based on <branch-config>
data you have specified in the projects config.xml file.
*/

var configParser = require('./lib/configXmlParser.js'),
    androidManifestWriter = require('./lib/android/manifestWriter.js'),


// androidWebHook = require('./lib/android/webSiteHook.js'),
iosProjectEntitlements = require('./lib/ios/projectEntitlements.js'),
    iosProjectPreferences = require('./lib/ios/xcodePreferences.js'),
    IOS = 'ios';

module.exports = function (ctx) {
  run(ctx);
};

/**
 * Execute hook.
 *
 * @param {Object} cordovaContext - cordova context object
 */
function run(cordovaContext) {
  var pluginPreferences = configParser.readPreferences(cordovaContext),
      platformsList = cordovaContext.opts.platforms;

  // if no preferences are found - exit
  if (pluginPreferences == null) {
    return;
  }

  // if no host is defined - exit
  if (pluginPreferences.hosts == null || pluginPreferences.hosts.length == 0) {
    console.warn('No host is specified in the config.xml. Universal Links plugin is not going to work.');
    return;
  }

  platformsList.forEach(function (platform) {
    if (platform === IOS) {
      activateUniversalLinksInIos(cordovaContext, pluginPreferences);
    }
  });
}

/**
 * Activate Universal Links for iOS application.
 *
 * @param {Object} cordovaContext - cordova context object
 * @param {Object} pluginPreferences - plugin preferences from the config.xml file. Basically, content from <branch-config> tag.
 */
function activateUniversalLinksInIos(cordovaContext, pluginPreferences) {
  // modify xcode project preferences
  //iosProjectPreferences.enableAssociativeDomainsCapability(cordovaContext);

  // generate entitlements file
  var buildTypes = ['Debug', 'Release'];
  for (var x = 0; x < buildTypes.length; x++) {
    iosProjectEntitlements.generateAssociatedDomainsEntitlements(cordovaContext, pluginPreferences, buildTypes[x]);
  }
}