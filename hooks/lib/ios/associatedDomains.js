// update the associated domains from the link-domain field of the app's config.xml
(function () {
  // properties
  'use strict'
  var path = require('path')
  var fs = require('fs')
  var plist = require('plist')
  var mkpath = require('mkpath')
  var ASSOCIATED_DOMAINS = 'com.apple.developer.associated-domains'

  // entry
  module.exports = {
    addAssociatedDomains: addAssociatedDomains
  }

  // methods
  function addAssociatedDomains (preferences) {
    var file = path.join(preferences.projectRoot, 'platforms', 'ios', preferences.bundleName, 'Resources', preferences.bundleName + '.entitlements')
    var entitlements = getEntitlements(file)

    console.log('BRANCH SDK: Updating Associated Domains')
    entitlements = updateEntitlements(entitlements, preferences)
    setEntitlements(file, entitlements)
  }

  function setEntitlements (file, entitlements) {
    var plistContent = plist.build(entitlements)

    mkpath.sync(path.dirname(file))

    fs.writeFileSync(file, plistContent, 'utf8')
  }

  function getEntitlements (file) {
    var content

    try {
      content = fs.readFileSync(file, 'utf8')
    } catch (err) {
      return {}
    }

    return plist.parse(content)
  }

  function updateEntitlements (entitlements, preferences) {
    var domains = []
    var prev = entitlements[ASSOCIATED_DOMAINS]
    var next = updateAssociatedDomains(preferences)

    prev = removePreviousAssociatedDomains(prev)
    entitlements[ASSOCIATED_DOMAINS] = domains.concat(prev, next)

    return entitlements
  }

  function removePreviousAssociatedDomains (domains) {
    var output = []
    for (var i = 0; i < domains.length; i++) {
      var domain = domains[i]
      if (domain.indexOf('bnc.lt') > 0 || domain.indexOf('app.link') > 0) continue
      output.push(domain)
    }

    return output
  }

  function updateAssociatedDomains (preferences) {
    var domainList = []
    var prefix = 'applinks:'

    domainList.push(prefix + preferences.linkDomain)

    if (preferences.linkDomain.indexOf('app.link') !== -1) {
      var first = preferences.linkDomain.split('.')[0]
      var second = preferences.linkDomain.split('.')[1]
      var rest = preferences.linkDomain.split('.').slice(2).join('.')
      var alternate = first + '-alternate'

      domainList.push(prefix + alternate + '.' + second + '.' + rest)
    }

    return domainList
  }
})()
