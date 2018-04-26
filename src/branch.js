var exec = require("cordova/exec");
var deviceVendor = window.clientInformation.vendor;
var API_CLASS = "BranchSDK"; // SDK Class
var runOnce = true;
var previousLinkTimestamp = null;
var isDisableGlobalListenersWarnings = false;
var Branch = function Branch() {
  this.debugMode = false;
  this.trackingDisabled = false;
};

// javscript to sdk
function execute(method, params) {
  var output = !params ? [] : params;

  return new Promise(function promise(resolve, reject) {
    exec(
      function success(res) {
        resolve(res);
      },
      function failure(err) {
        reject(err);
      },
      API_CLASS,
      method,
      output
    );
  });
}

function executeCallback(method, callback, params) {
  var output = !params ? [] : params;

  exec(
    callback,
    function failure(err) {
      console.error(err);
    },
    API_CLASS,
    method,
    output
  );
}

function executeReject(message) {
  return new Promise(function promise(resolve, reject) {
    reject(message);
  });
}

// Branch prototype
Branch.prototype.disableGlobalListenersWarnings = function disableGlobalListenersWarnings() {
  isDisableGlobalListenersWarnings = true;
};

Branch.prototype.disableTracking = function disableTracking(isEnabled) {
  var value = typeof isEnabled === "boolean" ? isEnabled : false;
  this.trackingDisabled = value;
  return execute("disableTracking", [value]);
};

Branch.prototype.initSession = function initSession(deepLinkDataListener) {
  // handle double init from onResume on iOS
  if (!runOnce) {
    return executeReject("");
  }
  runOnce = deviceVendor.indexOf("Apple") < 0;

  // private method to filter out +clicked_branch_link = false in deep link callback
  function deepLinkDataParser(deepLinkData) {
    var timestamp = "+click_timestamp";
    var isBranchLink = "+clicked_branch_link";
    var isNonBranchLink = "+non_branch_link";

    var isBranchLinkClick =
      Object.prototype.hasOwnProperty.call(deepLinkData, isBranchLink) &&
      deepLinkData[isBranchLink] === true;
    var isNonBranchLinkClick = Object.prototype.hasOwnProperty.call(
      deepLinkData,
      isNonBranchLink
    );
    var currentLinkTimestamp = Object.prototype.hasOwnProperty.call(
      deepLinkData,
      timestamp
    )
      ? deepLinkData[timestamp]
      : Date.now();

    // is +clicked_branch_link' = true || +non_branch_link && !previousLinkTimestamp
    if (
      (isBranchLinkClick || isNonBranchLinkClick) &&
      currentLinkTimestamp !== previousLinkTimestamp
    ) {
      deepLinkDataListener(deepLinkData);
    }

    // handle Ionic 1 double data on iOS terminated
    previousLinkTimestamp = currentLinkTimestamp;
  }

  if (
    !isDisableGlobalListenersWarnings &&
    !deepLinkDataListener &&
    !window.DeepLinkHandler
  ) {
    // missing deep link data return
    console.warn(
      "BRANCH SDK: No callback in initSession and no global DeepLinkHandler method. No Branch deep link data will be returned. Docs https://goo.gl/GijGKP"
    );
  } else if (
    !isDisableGlobalListenersWarnings &&
    window.DeepLinkHandler !== undefined &&
    window.DeepLinkHandler.toString() !== deepLinkDataParser.toString()
  ) {
    // deprecated 2.5.0: open and non deep link data will pass into DeepLinkHandler
    console.warn(
      "BRANCH SDK: Your DeepLinkHandler has changed. It will now pass non-Branch data. Docs https://goo.gl/GijGKP"
    );
  } else {
    // from iOS and Android SDKs to JavaScript
    window.DeepLinkHandler = deepLinkDataParser;
  }

  return execute("initSession");
};

// deprecated for setRequestMetadata()
Branch.prototype.setMixpanelToken = function setMixpanelToken(token) {
  return this.setRequestMetadata("$mixpanel_distinct_id", token);
};

Branch.prototype.setRequestMetadata = function setRequestMetadata(key, val) {
  if (!key || typeof key !== "string") {
    return executeReject("Please set key");
  }
  if (!val || typeof val !== "string") {
    return executeReject("Please set value");
  }
  return execute("setRequestMetadata", [key, val]);
};

Branch.prototype.setDebug = function setDebug(isEnabled) {
  var value = typeof isEnabled !== "boolean" ? false : isEnabled;
  this.debugMode = value;

  return execute("setDebug", [value]);
};

Branch.prototype.setCookieBasedMatching = function setCookieBasedMatching(
  linkDomain
) {
  return linkDomain && deviceVendor.indexOf("Apple") < 0
    ? execute("setCookieBasedMatching", [linkDomain])
    : null;
};

Branch.prototype.getFirstReferringParams = function getFirstReferringParams() {
  return execute("getFirstReferringParams");
};

Branch.prototype.getLatestReferringParams = function getLatestReferringParams() {
  return execute("getLatestReferringParams");
};

Branch.prototype.setIdentity = function setIdentity(identity) {
  if (identity) {
    return execute("setIdentity", [String(identity)]);
  }
  return executeReject("Please set an identity");
};

Branch.prototype.logout = function logout() {
  return execute("logout");
};

Branch.prototype.userCompletedAction = function userCompletedAction(
  action,
  metaData
) {
  var args = [action];
  if (!action) {
    return executeReject("Please set an event name");
  }

  if (metaData) {
    args.push(metaData);
  }

  return execute("userCompletedAction", args);
};

Branch.prototype.sendCommerceEvent = function sendCommerceEvent(
  action,
  metaData
) {
  var args = [action];
  if (!action) {
    return executeReject("Please set a commerce event");
  }

  if (metaData) {
    args.push(metaData);
  }

  return execute("sendCommerceEvent", args);
};

Branch.prototype.createBranchUniversalObject = function createBranchUniversalObject(
  options
) {
  return new Promise(function promise(resolve, reject) {
    execute("createBranchUniversalObject", [options]).then(
      function success(res) {
        var obj = {
          message: res.message,
          instanceId: res.branchUniversalObjectId
        };

        obj.registerView = function registerView() {
          return execute("registerView", [obj.instanceId]);
        };

        obj.generateShortUrl = function generateShortUrl(
          analytics,
          properties
        ) {
          return execute("generateShortUrl", [
            obj.instanceId,
            analytics,
            properties
          ]);
        };

        obj.showShareSheet = function showShareSheet(
          analytics,
          properties,
          shareText
        ) {
          var message = !shareText ? "This stuff is awesome: " : shareText;

          return execute("showShareSheet", [
            obj.instanceId,
            analytics,
            properties,
            message
          ]);
        };

        obj.onShareSheetLaunched = function onShareSheetLaunched(callback) {
          if (deviceVendor.indexOf("Apple") < 0) {
            executeCallback("onShareLinkDialogLaunched", callback, [
              obj.instanceId
            ]);
          }
        };

        obj.onShareSheetDismissed = function onShareSheetDismissed(callback) {
          executeCallback("onShareLinkDialogDismissed", callback, [
            obj.instanceId
          ]);
        };

        obj.onLinkShareResponse = function onLinkShareResponse(callback) {
          executeCallback("onLinkShareResponse", callback, [obj.instanceId]);
        };

        obj.onChannelSelected = function onChannelSelected(callback) {
          if (deviceVendor.indexOf("Apple") < 0) {
            executeCallback("onChannelSelected", callback, [obj.instanceId]);
          }
        };

        obj.listOnSpotlight = function listOnSpotlight() {
          if (!(deviceVendor.indexOf("Apple") < 0)) {
            return execute("listOnSpotlight", [obj.instanceId]);
          }
          return executeReject("iOS Spotlight only");
        };

        resolve(obj);
      },
      function failure(err) {
        reject(err);
      }
    );
  });
};

Branch.prototype.loadRewards = function loadRewards(bucket) {
  var output = !bucket ? "" : bucket;

  return execute("loadRewards", [output]);
};

Branch.prototype.redeemRewards = function redeemRewards(value, bucket) {
  var params = [value];
  if (bucket) {
    params.push(bucket);
  }

  return execute("redeemRewards", params);
};

Branch.prototype.creditHistory = function creditHistory() {
  return execute("getCreditHistory");
};

// export
module.exports = new Branch();
