'use strict';

// update the associated domains from the link-domain field of the app's config.xml

(function() {
  // properties
  var path = require('path');
  var fs = require('fs');
  var plist = require('plist');
  var mkpath = require('mkpath');
  var ASSOCIATED_DOMAINS = 'com.apple.developer.associated-domains';

  // entry
  module.exports = {
    addAssociatedDomains: addAssociatedDomains
  };

  function addAssociatedDomains(preferences) {
    var file = path.join(preferences.projectRoot, 'platforms', 'ios', preferences.bundleName, 'Resources', preferences.bundleName + '.entitlements');
    var entitlements = getEntitlements(file);

    entitlements = updateEntitlements(entitlements, preferences);

    setEntitlements(file, entitlements);
  }

  // helper methods
  function setEntitlements(file, entitlements) {
    var plistContent = plist.build(entitlements);

    mkpath.sync(path.dirname(file));

    fs.writeFileSync(file, plistContent, 'utf8');
  }

  function getEntitlements(file) {
    var content;

    try {
      content = fs.readFileSync(file, 'utf8');
    } catch (err) {
      return {};
    }

    return plist.parse(content);
  }

  function updateEntitlements(entitlements, preferences) {
    entitlements[ASSOCIATED_DOMAINS] = updateAssociatedDomains(preferences);

    return entitlements;
  }

  function updateAssociatedDomains(preferences) {
    var domainList = [];
    var prefix = 'applinks:';

    domainList.push(prefix + preferences.linkDomain);

    if (preferences.linkDomain.indexOf('app.link') !== -1) {
      var first = preferences.linkDomain.split('.')[0];
      var second = preferences.linkDomain.split('.')[1];
      var rest = preferences.linkDomain.split('.').slice(2).join('.');
      var alternate = first + '-alternate';
      var test = 'test-' + second;

      domainList.push(prefix + alternate + '.' + second + '.' + rest);
      domainList.push(prefix + first + '.' + test + '.' + rest);
      domainList.push(prefix + alternate + '.' + test + '.' + rest);
    }

    return domainList;
  }
})();
