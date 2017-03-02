'use strict';

// installs the node modules via npm install one at a time
// @return {callback(error)}
function installNodeModules(exec, modules, callback) {
  // base case
  if (modules.length <= 0) {
    return callback(false);
  }

  // install one at a time
  var module = modules.pop();
  console.log('Installing "' + module + '"');

  var install = 'npm install --prefix ./plugins/io.branch.sdk -D ' + module;
  exec(install, function(err, stdout, stderr) {
    // handle error
    if (err) {
      console.error('Failed to install Branch Dependency: "' + module + '"');
      return callback(true);
    }
    // next module
    else {
      installNodeModules(exec, modules, callback);
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
function getPackageInstalled(filesave, installFlagLocation) {
  try {
    var exists = filesave.readFileSync(installFlagLocation);
    return true;
  } catch (err) {
    return false;
  }
}

// set that the Branch SDK package has been installed
// @return {void} based on .installed file is created
function setPackageInstalled(filesave, installFlagLocation) {
  filesave.closeSync(filesave.openSync(installFlagLocation, 'w'));
}

// hooks entry point
// @return {void} based on async npm install completion
module.exports = function(context) {
  // properties
  var q = context.requireCordovaModule('q');
  var async = new q.defer();
  var filesave = require('fs');
  var path = require('path');
  var exec = require('child_process').exec;
  var installFlagName = '.installed';
  var installFlagLocation = path.join(context.opts.projectRoot, 'plugins', context.opts.plugin.id, installFlagName);
  var dependencies = require(path.join(context.opts.projectRoot, 'plugins', context.opts.plugin.id, 'package.json')).dependencies;

  // only run once
  if (getPackageInstalled(filesave, installFlagLocation)) {
    return;
  }

  // install node modules
  var modules = getNodeModulesToInstall(dependencies);
  installNodeModules(exec, modules, function(err) {
    // handle error
    if (err) {
      console.error('Failed to install the Branch SDK');
    }
    // only run once
    else {
      setPackageInstalled(filesave, installFlagLocation);
    }
    // async complete
    async.resolve();
  });

  // wait until callbacks from the all the npm install complete
  return async.promise;
};
