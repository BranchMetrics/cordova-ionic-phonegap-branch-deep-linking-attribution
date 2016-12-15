// update the platforms/ios/app.plist file with branch settings within app/config.xml
(function () {
  // properties
  'use strict'
  var fs = require('fs')
  var plist = require('plist')
  var SDK = 'branch-cordova-sdk'

  // entry
  module.exports = {
    update: update
  }

  function update (perferences) {
    var filePath = 'platforms/ios/' + perferences.bundleName + '/' + perferences.bundleName + '-Info.plist'
    var xml = readPlist(filePath)
    var obj = convertXmlToObject(xml)

    obj = appendPlist(obj, perferences)
    xml = convertObjectToXml(obj)

    writePList(filePath, xml)
  }

  // helper methods
  function convertXmlToObject (xml) {
    return plist.parse(xml)
  }

  function convertObjectToXml (obj) {
    return plist.build(obj)
  }

  function readPlist (filePath) {
    return fs.readFileSync(filePath, 'utf8')
  }

  function writePList (filePath, xml) {
    return fs.writeFileSync(filePath, xml, { encoding: 'utf8' })
  }

  function appendPlist (obj, perferences) {
    var urlType = {
      CFBundleURLName: SDK,
      CFBundleURLSchemes: [perferences.uriScheme]
    }

    if (!obj.hasOwnProperty('CFBundleURLTypes')) {
      // add
      obj.CFBundleURLTypes = [urlType]
    } else {
      var urls = obj.CFBundleURLTypes
      var found = false

      // rename
      for (var i = urls.length - 1; i >= 0; i--) {
        var url = urls[i]
        if (url.hasOwnProperty('CFBundleURLName') && url.CFBundleURLName === SDK) {
          url.CFBundleURLSchemes = [perferences.uriScheme]
          found = true
          break
        }
      }
      // append
      if (!found) {
        obj.CFBundleURLTypes.push(urlType)
      }
    }

    // override
    obj.branch_key = perferences.branchKey
    obj.branch_app_domain = perferences.linkDomain

    return obj
  }
})()
