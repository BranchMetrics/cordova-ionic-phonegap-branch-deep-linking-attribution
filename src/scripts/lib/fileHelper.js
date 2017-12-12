(function () {
  // properties
  'use strict'
  var fs = require('fs')

  // entry
  module.exports = {
    readFile: readFile,
    writeFile: writeFile,
    accessFile: accessFile
  }

  // access file
  function accessFile (file) {
    try {
      return fs.accessSync(file)
    } catch (err) {
      throw new Error('BRANCH SDK: Cannot access file ' + file)
    }
  }

  // read file
  function readFile (file) {
    try {
      return fs.readFileSync(file, 'utf8')
    } catch (err) {
      throw new Error('BRANCH SDK: Cannot read file ' + file)
    }
  }

  // write file
  function writeFile (file, content) {
    try {
      fs.writeFileSync(file, content, 'utf8')
    } catch (err) {
      throw new Error('BRANCH SDK: Cannot write file ' + file + ' with content ' + content)
    }
  }
})()
