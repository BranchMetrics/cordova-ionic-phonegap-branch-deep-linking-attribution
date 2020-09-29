(function() {
  // properties

  const fs = require("fs");
  const path = require("path");

  // entry
  module.exports = {
    addBranchJson: addBranchJson
  };

  // updates the platforms/ios/*.xcodeproj/project.pbxproj file and adds branch.json file
  function addBranchJson(context, preferences) {
    if (preferences.branchJson.exists && preferences.iosProjectModule.xcode) {
      const destination = path.join(
        context.opts.projectRoot,
        "platforms",
        "ios",
        "branch.json"
      );
      fs.copyFileSync(preferences.branchJson.path, destination);
      preferences.iosProjectModule.xcode.addResourceFile(destination);
      preferences.iosProjectModule.write();
    }
  }
})();
