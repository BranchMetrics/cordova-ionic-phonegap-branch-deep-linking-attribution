(function () {
  var path = require('path')
  var fileHelper = require('../lib/fileHelper.js')
  var FILES = ['package.json', 'plugin.xml', 'plugin.template.xml']

  module.exports = updateNpmVersion

  // updates the npm version in semantic-release pre
  function updateNpmVersion (pluginConfig, config, callback) {
    var files = readFilePaths(FILES)
    var version = config.nextRelease.version

    for (var i = 0; i < files.length; i++) {
      var file = files[i]
      var content = readContent(file)

      content = updateVersion(file, content, version)
      saveContent(file, content)
    }
  }

  function readContent (file) {
    return isFileXml(file) ? fileHelper.readFile(file) : JSON.parse(fileHelper.readFile(file))
  }

  function updateVersion (file, content, version) {
    var prev = /id="branch-cordova-sdk"[\s]*version="\d+\.\d+\.\d+"/mgi
    var next = 'id="branch-cordova-sdk"\n  version="' + version + '"'

    try {
      if (isFileXml(file)) {
        content = content.replace(prev, next)
      } else {
        content.version = version
      }
    } catch (e) {
      throw new Error('BRANCH SDK: update to update npm version with file ' + file)
    }
    return content
  }

  function saveContent (file, content) {
    return isFileXml(file) ? fileHelper.writeFile(file, content) : fileHelper.writeFile(file, JSON.stringify(content, null, 2))
  }

  function isFileXml (file) {
    return file.indexOf('xml') > 0
  }

  function readFilePaths (files) {
    var locations = []
    for (var i = 0; i < files.length; i++) {
      var file = files[i]
      var location = path.join(__dirname, '../../../', file)
      locations.push(location)
    }
    return locations
  }
})()
