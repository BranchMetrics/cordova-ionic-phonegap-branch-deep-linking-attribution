const
  join = require('path').join,
  exec = require('child_process').exec,
  name = require('../../../package.json').name;

module.exports = () => new Promise((resolve, reject) => {
  console.log(`Installing external NPM dependencies for package "${name}"`);
  exec('npm install', {cwd: join('plugins', name)}, error => {
    if (error !== null) {
      console.log(`Failed with error message: ${error.message}`);
      return reject();
    }

    resolve();
  });
});
