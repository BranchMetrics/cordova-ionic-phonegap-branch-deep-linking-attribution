'use strict';

// install the node dependencies for Branch SDK

(function () {
  // properties
  var SDK = 'branch-cordova-sdk';
  var fs = require('fs');
  var path = require('path');
  var exec = require('child_process').exec;
  var installFlagName = '.installed';
  var installFlagLocation;
  var dependencies;
  var async;
  var q;

  // hook entry
  module.exports = {
    install: install
  };

  // main
  // @return {void} based on async npm install completion
  function install(context) {
    q = context.requireCordovaModule('q');
    async = new q.defer();
    installFlagLocation = path.join(context.opts.projectRoot, 'plugins', context.opts.plugin.id, installFlagName);
    dependencies = require(path.join(context.opts.projectRoot, 'plugins', context.opts.plugin.id, 'package.json')).dependencies;

    // only run once
    if (getPackageInstalled()) {
      return;
    }

    // install node modules
    var modules = getNodeModulesToInstall(dependencies);
    installNodeModules(modules, function (err) {
      // handle error
      if (err) {
        throw new Error('Failed to install the Branch SDK');
      }
      // only run once
      else {
        setPackageInstalled();
      }
      // async complete
      async.resolve();
    });

    // wait until callbacks from the all the npm install complete
    return async.promise;
  };

  // installs the node modules via npm install one at a time
  // @return {callback(error)}
  function installNodeModules(modules, callback) {
    // base case
    if (modules.length <= 0) {
      return callback(false);
    }

    // install one at a time
    var module = modules.pop();
    console.log('Installing "' + module + '"');

    var install = 'npm install --prefix ./plugins/' + SDK + ' -D ' + module;
    exec(install, function (err, stdout, stderr) {
      // handle error
      if (err) {
        throw new Error('Failed to install Branch Dependency: "' + module + '"');
        return callback(true);
      }
      // next module
      else {
        installNodeModules(modules, callback);
      }
    });
  }

  // checks to see which node modules need to be installed
  // @return {[string]} of node modules from package.json.dependencies
  function getNodeModulesToInstall(dependencies) {
    var modules = [];
    for (var module in dependencies) {
      if (dependencies.hasOwnProperty(module)) {
        try {
          var exists = require(module);
        } catch (err) {
          modules.push(module);
        }
      }
    }
    return modules;
  }

  // if the Branch SDK package has already been installed
  // @return {boolean} based on .installed file is found
  function getPackageInstalled() {
    try {
      var exists = fs.readFileSync(installFlagLocation);
      return true;
    } catch (err) {
      return false;
    }
  }

  // set that the Branch SDK package has been installed
  // @return {void} based on .installed file is created
  function setPackageInstalled() {
    fs.closeSync(fs.openSync(installFlagLocation, 'w'));
  }
})();
