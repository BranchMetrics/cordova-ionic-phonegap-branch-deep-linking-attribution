'use strict';

function installNodeModule(exec, modules, callback) {
  if (modules.length <= 0) {
    return callback(false);
  }

  var module = modules.pop();
  var install = 'npm install --prefix ./plugins/io.branch.sdk -D ' + module;

  console.log('Installing "' + module + '"');
  exec(install, function (err, stdout, stderr) {
    if (err) {
      console.error('Failed to install Branch Dependency: "' + module + '"');
      return callback(true);
    } else {
      installNodeModule(exec, modules, callback);
    }
  });
}

function getUninstalledNodeModules(dependencies) {
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

function getPackageInstalled(filesave, installFlagLocation) {
  try {
    var exists = filesave.readFileSync(installFlagLocation);
    return true;
  } catch (err) {
    return false;
  }
}

function setPackageInstalled(filesave, installFlagLocation) {
  filesave.closeSync(filesave.openSync(installFlagLocation, 'w'));
}

// hook's entry point
module.exports = function (context) {
  var q = context.requireCordovaModule('q');
  var async = new q.defer();
  var filesave = require('fs');
  var path = require('path');
  var exec = require('child_process').exec;
  var installFlagName = '.installed';
  var installFlagLocation = path.join(context.opts.projectRoot, 'plugins', context.opts.plugin.id, installFlagName);
  var dependencies = require(path.join(context.opts.projectRoot, 'plugins', context.opts.plugin.id, 'package.json')).dependencies;

  if (getPackageInstalled(filesave, installFlagLocation)) {
    return;
  }

  var modules = getUninstalledNodeModules(dependencies);
  installNodeModule(exec, modules, function (err) {
    if (err) {
      console.error('Failed to install the Branch SDK');
    } else {
      setPackageInstalled(filesave, installFlagLocation);
    }
    async.resolve();
  });

  return async.promise;
};