// install the node dependencies for Branch SDK
(function () {
  // properties
  'use strict'
  var SDK = 'branch-cordova-sdk'
  var fs = require('fs')
  var path = require('path')
  var exec = require('child_process').exec
  var installFlagName = '.installed'
  var installFlagLocation
  var dependencies
  var deferral
  var q

  // entry
  module.exports = {
    install: install
  }

  // methods
  function install (context) {
    // set properties
    q = context.requireCordovaModule('q')
    deferral = new q.defer() // eslint-disable-line
    installFlagLocation = path.join(context.opts.projectRoot, 'plugins', context.opts.plugin.id, installFlagName)
    dependencies = require(path.join(context.opts.projectRoot, 'plugins', context.opts.plugin.id, 'package.json')).dependencies

    // only run once
    if (getPackageInstalled()) {
      return
    }

    // install node modules
    var modules = getNodeModulesToInstall(dependencies)
    installNodeModules(modules, function (err) {
      if (err) {
        // handle error
        throw new Error('Failed to install the Branch SDK')
      } else {
        // only run once
        setPackageInstalled()
        removeEtcDirectory()
      }
      deferral.resolve()
    })

    // wait until callbacks from the all the npm install complete
    return deferral.promise
  }

  // installs the node modules via npm install one at a time
  function installNodeModules (modules, callback) {
    // base case
    if (modules.length <= 0) {
      return callback(false)
    }

    // install one at a time
    var module = modules.pop()
    console.log('Installing "' + module + '"')

    var install = 'npm install --prefix ./plugins/' + SDK + ' -D ' + module
    exec(install, function (err, stdout, stderr) {
      // handle error
      if (err) {
        callback(true)
        throw new Error('Failed to install Branch Dependency: "' + module + '"')
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
  function getPackageInstalled () {
    try {
      fs.readFileSync(installFlagLocation)
      return true
    } catch (err) {
      return false
    }
  }

  // set that the Branch SDK package has been installed
  function setPackageInstalled () {
    fs.closeSync(fs.openSync(installFlagLocation, 'w'))
  }

  // artifact caused by 'npm install --prefix'
  function removeEtcDirectory () {
    var remove = 'rm -r ./plugins/' + SDK + '/etc'
    exec(remove)
  }
})()
