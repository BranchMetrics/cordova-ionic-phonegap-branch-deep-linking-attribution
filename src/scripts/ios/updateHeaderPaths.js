(function() {
  // properties

  const fs = require("fs");

  // entry
  module.exports = {
    addHeaderPaths: addHeaderPaths
  };

  // updates the platforms/ios/cordova/build.xcconfig file with Branch's Header Paths
  // some plugins still use the old CocoaPods way to resolve config dirs or other obscure
  // ways that modify CocoaPods config. That causes the Branch plugin to fail on iOS build.
  function addHeaderPaths() {
    const filePath = "platforms/ios/cordova/build.xcconfig";
    let config = readBuildXcconfig(filePath);

    config = updateHeaderPaths(config);
    writeBuildXcconfig(filePath, config);
  }

  // update build.xcconfig with Branch's Header Paths
  function updateHeaderPaths(config) {
    config = config.split("\n")
      .map(function (line) {
        if (line.indexOf("HEADER_SEARCH_PATHS") > -1 && line.indexOf("Branch-SDK") === -1) {
          line += ' "${PODS_ROOT}/Branch/Branch-SDK"';
        }
        return line;
      });

    return config.join("\n");
  }

  function readBuildXcconfig(filePath) {
    return fs.readFileSync(filePath, "utf8");
  }

  function writeBuildXcconfig(filePath, config) {
    return fs.writeFileSync(filePath, config, { encoding: "utf8" });
  }
})();
