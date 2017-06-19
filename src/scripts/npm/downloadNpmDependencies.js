(function () {
  // properties
  'use strict'
  var SDK = 'branch-cordova-sdk'
  var fs = require('fs')
  var path = require('path')
  var exec = require('child_process').exec
  var INSTALLFLAGNAME = '.installed'

  // entry
  module.exports = {
    install: install
  }

  // install the node dependencies for Branch SDK
  function install (context) {
    // set properties
    var q = context.requireCordovaModule('q')
    var async = new q.defer() // eslint-disable-line
    var installFlagLocation = path.join(context.opts.projectRoot, 'plugins', context.opts.plugin.id, INSTALLFLAGNAME)
    var dependencies = require(path.join(context.opts.projectRoot, 'plugins', context.opts.plugin.id, 'package.json')).dependencies

    // only run once
    if (getPackageInstalled(installFlagLocation)) return

    // install node modules
    var modules = getNodeModulesToInstall(dependencies)
    if (modules.length === 0) return async.promise

    installNodeModules(modules, function () {
      // only run once
      setPackageInstalled(installFlagLocation)
      removeEtcDirectory()
      async.resolve()
    })

    // wait until callbacks from the all the npm install complete
    return async.promise
  }

  // installs the node modules via npm install one at a time
  function installNodeModules (modules, callback) {
    // base case
    if (modules.length <= 0) {
      return callback()
    }

    // install one at a time
    var module = modules.pop()
    console.log('BRANCH SDK: Installing node dependency ' + module)

    var install = 'npm install --prefix ./plugins/' + SDK + ' -D ' + module
    exec(install, function (err, stdout, stderr) {
      // handle error
      if (err) {
        throw new Error('BRANCH SDK: Failed to install Branch node dependency ' + module + '. Docs https://goo.gl/GijGKP')
      } else {
        // next module
        installNodeModules(modules, callback)
      }
    })
  }

  // checks to see which node modules need to be installed from package.json.dependencies
  function getNodeModulesToInstall (dependencies) {
    var modules = []
    for (var module in dependencies) {
      if (dependencies.hasOwnProperty(module)) {
        try {
          require(module)
        } catch (err) {
          modules.push(module)
        }
      }
    }
    return modules
  }

  // if the Branch SDK package has already been installed
  function getPackageInstalled (installFlagLocation) {
    try {
      fs.readFileSync(installFlagLocation)
      return true
    } catch (err) {
      return false
    }
  }

  // set that the Branch SDK package has been installed
  function setPackageInstalled (installFlagLocation) {
    fs.closeSync(fs.openSync(installFlagLocation, 'w'))
  }

  // artifact caused by 'npm install --prefix'
  function removeEtcDirectory () {
    var remove = 'rm -r ./plugins/' + SDK + '/etc'
    exec(remove)
  }
})()
