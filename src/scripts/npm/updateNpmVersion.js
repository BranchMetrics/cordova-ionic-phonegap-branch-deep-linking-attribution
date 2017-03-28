(function () {
  // properties
  'use strict'
  var path = require('path')
  var exec = require('child_process').exec
  var fileHelper = require('../lib/fileHelper.js')
  var FILES = ['package.json', 'plugin.xml', 'plugin.template.xml']
  var isChange = false

  // entry
  module.exports = updateNpmVersion

  // updates the npm version in semantic-release pre
  function updateNpmVersion (pluginConfig, config, callback) {
    var files = readFilePaths(FILES)
    var version = config.nextRelease.version
    var git = ''

    for (var i = 0; i < files.length; i++) {
      // update
      var file = files[i]
      var content = readContent(file)
      var updated = updateVersion(file, content, version)

      // save
      git += 'git add ' + file + ' && '
      saveContent(file, updated)
    }
    // publish
    isChange && commitChanges(git, version)
  }

  // handle content
  function readContent (file) {
    return isFileXml(file) ? fileHelper.readFile(file) : JSON.parse(fileHelper.readFile(file))
  }

  function saveContent (file, content) {
    return isFileXml(file) ? fileHelper.writeFile(file, content) : fileHelper.writeFile(file, JSON.stringify(content, null, 2) + '\n')
  }

  function isFileXml (file) {
    return file.indexOf('xml') > 0
  }

  // update content based on xml or json
  function updateVersion (file, content, version) {
    var prev = /id="branch-cordova-sdk"[\s]*version="\d+\.\d+\.\d+"/mgi
    var next = 'id="branch-cordova-sdk"\n  version="' + version + '"'

    try {
      if (isFileXml(file)) {
        content = content.replace(prev, next)
      } else {
        isChange = content.version !== version
        content.version = version
      }
    } catch (e) {
      throw new Error('BRANCH SDK: update to update npm version with file ' + file)
    }
    return content
  }

  // get the absolute path of the files within the root directory
  function readFilePaths (files) {
    var locations = []
    for (var i = 0; i < files.length; i++) {
      var file = files[i]
      var location = path.join(__dirname, '../../../', file)
      locations.push(location)
    }
    return locations
  }

  // push file code changes to github
  function commitChanges (git, version) {
    git += 'git commit -m "chore: updated npm version to ' + version + '" && git push'
    exec(git, function (err, stdout, stderr) {
      if (err) {
        throw new Error('BRANCH SDK: Failed to commit git changes for the npm version. Docs https://goo.gl/GijGKP')
      }
    })
  }
})()
