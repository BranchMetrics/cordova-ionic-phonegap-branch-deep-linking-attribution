(function() {
  // properties

  const nodeDependencies = require("../npm/downloadNpmDependencies.js");

  // entry
  module.exports = run;

  // builds before plugin install hooks
  function run(context) {
    return nodeDependencies.install(context);
  }
})();
