'use strict';

/*
Script creates entitlements file with the list of hosts, specified in config.xml.
File name is: ProjectName.entitlements
Location: ProjectName/

Script only generates content. File it self is included in the xcode project in another hook: xcodePreferences.js.
*/
(function () {

  var path = require('path'),
      fs = require('fs'),
      plist = require('plist'),
      mkpath = require('mkpath'),
      ConfigXmlHelper = require('../configXmlHelper.js'),
      ASSOCIATED_DOMAINS = 'com.apple.developer.associated-domains',
      context,
      projectRoot,
      projectName,
      entitlementsFilePath;

  module.exports = {
    generateAssociatedDomainsEntitlements: generateEntitlements
  };

  // region Public API

  /**
   * Generate entitlements file content.
   *
   * @param {Object} cordovaContext - cordova context object
   * @param {Object} pluginPreferences - plugin preferences from config.xml; already parsed
   * @param {String} buildType - optional value to control which entitlement file to update
   */
  function generateEntitlements(cordovaContext, pluginPreferences, buildType) {
    context = cordovaContext;

    var currentEntitlements = getEntitlementsFileContent(buildType),
        newEntitlements = injectPreferences(currentEntitlements, pluginPreferences);

    saveContentToEntitlementsFile(newEntitlements, buildType);
  }

  // endregion

  // region Work with entitlements file

  /**
   * Save data to entitlements file.
   *
   * @param {Object} content - data to save; JSON object that will be transformed into xml
   * @param {String} buildType - optional value to control which entitlement file to update
   */
  function saveContentToEntitlementsFile(content, buildType) {
    var plistContent = plist.build(content),
        filePath = pathToEntitlementsFile();

    // ensure that file exists
    mkpath.sync(path.dirname(filePath));

    // save it's content
    fs.writeFileSync(filePath, plistContent, 'utf8');

    if (buildType) {
      filePath = pathToEntitlementsFile(buildType);
      mkpath.sync(path.dirname(filePath));
      // save it's content
      fs.writeFileSync(filePath, plistContent, 'utf8');
    }
  }

  /**
   * Read data from existing entitlements file. If none exist - default value is returned
   * @param {String} buildType - optional value to control which entitlement file to update
   * @return {String} entitlements file content
   */
  function getEntitlementsFileContent(buildType) {
    var pathToFile = pathToEntitlementsFile(buildType),
        content;

    try {
      content = fs.readFileSync(pathToFile, 'utf8');
    } catch (err) {
      return defaultEntitlementsFile();
    }

    return plist.parse(content);
  }

  /**
   * Get content for an empty entitlements file.
   *
   * @return {String} default entitlements file content
   */
  function defaultEntitlementsFile() {
    return {};
  }

  /**
   * Inject list of hosts into entitlements file.
   *
   * @param {Object} currentEntitlements - entitlements where to inject preferences
   * @param {Object} pluginPreferences - list of hosts from config.xml
   * @return {Object} new entitlements content
   */
  function injectPreferences(currentEntitlements, pluginPreferences) {
    var newEntitlements = currentEntitlements,
        content = generateAssociatedDomainsContent(pluginPreferences);

    newEntitlements[ASSOCIATED_DOMAINS] = content;

    return newEntitlements;
  }

  /**
   * Generate content for associated-domains dictionary in the entitlements file.
   *
   * @param {Object} pluginPreferences - list of hosts from conig.xml
   * @return {Object} associated-domains dictionary content
   */
  function generateAssociatedDomainsContent(pluginPreferences) {
    var domainsList = [],
        link;

    // generate list of host links
    pluginPreferences.hosts.forEach(function (host) {
      link = domainsListEntryForHost(host);
      domainsList.push(link);
    });

    return domainsList;
  }

  /**
   * Generate domain record for the given host.
   *
   * @param {Object} host - host entry
   * @return {String} record
   */
  function domainsListEntryForHost(host) {
    return 'applinks:' + host.name;
  }

  // endregion

  // region Path helper methods

  /**
   * Path to entitlements file.
   * @param {String} buildType - optional value to control which entitlement file to update
   * @return {String} absolute path to entitlements file
   */
  function pathToEntitlementsFile(buildType) {
    if (buildType) {
      var validTypes = ['Debug', 'Release'];
      if (validTypes.indexOf(buildType) === -1) {
        throw Error('pathToEntitlementsFile invalid build type specified: ' + buildType);
      }
      return path.join(getProjectRoot(), 'platforms', 'ios', getProjectName(), 'Entitlements-' + buildType + '.plist');
    } else {
      return path.join(getProjectRoot(), 'platforms', 'ios', getProjectName(), 'Resources', getProjectName() + '.entitlements');
    }
  }

  /**
   * Projects root folder path.
   *
   * @return {String} absolute path to the projects root
   */
  function getProjectRoot() {
    return context.opts.projectRoot;
  }

  /**
   * Name of the project from config.xml
   *
   * @return {String} project name
   */
  function getProjectName() {
    if (projectName === undefined) {
      var configXmlHelper = new ConfigXmlHelper(context);
      projectName = configXmlHelper.getProjectName();
    }

    return projectName;
  }

  // endregion
})();