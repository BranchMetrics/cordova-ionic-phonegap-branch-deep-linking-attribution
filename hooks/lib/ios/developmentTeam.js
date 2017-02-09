// TODO: does not work. Automatic Signing of Provisioning Profile is not updating (https://pewpewthespells.com/blog/migrating_code_signing.html#automatic-signing-xcode-7)
// TODO: users will have to bypass by always opening up Xcode
(function () {
  // properties
  'use strict'
  var fs = require('fs')
  var path = require('path')

  var fileName = 'build.json'

  // entry
  module.exports = {
    addDevelopmentTeam: addDevelopmentTeam
  }

  // updates the development team for Universal Links
  function addDevelopmentTeam (preferences) {
    console.log('BRANCH SDK: Updating iOS development team')

    var file = path.join(preferences.projectRoot, fileName)
    var content = getBuildJson(file)
    content = convertStringToJson(content)

    createDefaultBuildJson(content)
    updateDevelopmentTeam(content, preferences)

    content = convertJsonToString(content)
    setBuildJson(file, content)
  }

  // json helper functions
  function convertJsonToString (content) {
    try {
      // pretty-json
      return JSON.stringify(content, null, 2)
    } catch (err) {
      throw new Error('Branch SDK cannot write build.json within your root directory.')
    }
  }

  function convertStringToJson (content) {
    // handle blank file
    content = !content ? '{}' : content
    try {
      return JSON.parse(content)
    } catch (err) {
      throw new Error('Branch SDK cannot read build.json within your root directory.')
    }
  }

  // read build.json
  function getBuildJson (file) {
    try {
      return fs.readFileSync(file, 'utf8')
    } catch (err) {
      // handle no file
      return '{}'
    }
  }

  // write build.json
  function setBuildJson (file, content) {
    fs.writeFileSync(file, content, 'utf8')
  }

  // creates basic build.json if key-value pairs are missing
  //    {
  //      "ios": {
  //        "debug": {
  //          "developmentTeam": "FG35JLLMXX4A"
  //        },
  //        "release": {
  //          "developmentTeam": "FG35JLLMXX4A"
  //        }
  //      }
  //    }
  function createDefaultBuildJson (content) {
    if (!content.ios) {
      content.ios = {}
    }
    if (!content.ios.debug) {
      content.ios.debug = {}
    }
    if (!content.ios.release) {
      content.ios.release = {}
    }
  }

  // update build.json with developmentTeam from config.xml
  function updateDevelopmentTeam (content, preferences) {
    var release = preferences.iosTeamProd
    var debug = (preferences.iosTeamDev) ? preferences.iosTeamDev : preferences.iosTeamProd

    content.ios.release.developmentTeam = release
    content.ios.debug.developmentTeam = debug
  }
})()
