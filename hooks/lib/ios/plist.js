(function () {
  // properties
  'use strict'
  var fs = require('fs')
  var plist = require('plist')
  var SDK = 'branch-cordova-sdk'

  // entry
  module.exports = {
    addBranchSettings: addBranchSettings
  }

  // updates the platforms/ios/app.plist file with branch settings within app/config.xml
  function addBranchSettings (preferences) {
    console.log('BRANCH SDK: Updating iOS info.plist')

    var filePath = 'platforms/ios/' + preferences.bundleName + '/' + preferences.bundleName + '-Info.plist'
    var xml = readPlist(filePath)
    var obj = convertXmlToObject(xml)

    obj = appendPlist(obj, preferences)
    xml = convertObjectToXml(obj)

    writePList(filePath, xml)
  }

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

  // adds Branch data to pList:
  //    <key>CFBundleURLTypes</key>
  //    <array>
  //      <dict>
  //        <key>CFBundleURLName</key>
  //        <string>branch-cordova-sdk</string>
  //        <key>CFBundleURLSchemes</key>
  //        <array>
  //          <string>enefftest</string>
  //        </array>
  //      </dict>
  //    </array>
  //    <key>branch_key</key>
  //    <string>key_live_icCccJIpd7GlYY5oOmoEtpafuDiuyXhT</string>
  //    <key>branch_app_domain</key>
  //    <string>rawsr.app.link</string>
  function appendPlist (obj, preferences) {
    var urlType = {
      CFBundleURLName: SDK,
      CFBundleURLSchemes: [preferences.uriScheme]
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
          url.CFBundleURLSchemes = [preferences.uriScheme]
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
    obj.branch_key = preferences.branchKey
    obj.branch_app_domain = preferences.linkDomain

    return obj
  }
})()
