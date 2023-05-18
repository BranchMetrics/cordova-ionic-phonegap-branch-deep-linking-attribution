var exec = require("cordova/exec");
var deviceVendor =
  typeof window.clientInformation != "undefined" &&
  typeof window.clientInformation.vendor != "undefined"
    ? window.clientInformation.vendor
    : "unknownVendor";

// SDK Class
var API_CLASS = "BranchSDK";

const standardEvent = {
  STANDARD_EVENT_ADD_TO_CART: "ADD_TO_CART",
  STANDARD_EVENT_ADD_TO_WISHLIST: "ADD_TO_WISHLIST",
  STANDARD_EVENT_VIEW_CART: "VIEW_CART",
  STANDARD_EVENT_INITIATE_PURCHASE: "INITIATE_PURCHASE",
  STANDARD_EVENT_ADD_PAYMENT_INFO: "ADD_PAYMENT_INFO",
  STANDARD_EVENT_PURCHASE: "PURCHASE",
  STANDARD_EVENT_SEARCH: "SEARCH",
  STANDARD_EVENT_VIEW_ITEM: "VIEW_ITEM",
  STANDARD_EVENT_VIEW_ITEMS: "VIEW_ITEMS",
  STANDARD_EVENT_RATE: "RATE",
  STANDARD_EVENT_SHARE: "SHARE",
  STANDARD_EVENT_INITIATE_STREAM: "INITIATE_STREAM",
  STANDARD_EVENT_COMPLETE_STREAM: "COMPLETE_STREAM",
  STANDARD_EVENT_COMPLETE_REGISTRATION: "COMPLETE_REGISTRATION",
  STANDARD_EVENT_COMPLETE_TUTORIAL: "COMPLETE_TUTORIAL",
  STANDARD_EVENT_ACHIEVE_LEVEL: "ACHIEVE_LEVEL",
  STANDARD_EVENT_UNLOCK_ACHIEVEMENT: "UNLOCK_ACHIEVEMENT",
  STANDARD_EVENT_INVITE: "INVITE",
  STANDARD_EVENT_LOGIN: "LOGIN",
  STANDARD_EVENT_SUBSCRIBE: "SUBSCRIBE",
  STANDARD_EVENT_START_TRIAL: "START_TRIAL"
}

// Branch prototype
var Branch = function Branch() {
  this.enableLogging = false;
  this.trackingDisabled = false;
  this.sessionInitialized = false;
};

// JavaScript to SDK wrappers
function execute(method, params) {
  var output = !params ? [] : params;

  if (method == "getStandardEvents") {
    return new Promise(function promise(resolve, reject) {
      resolve(standardEvent);  
    });
  }

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

// Branch interface
Branch.prototype.disableTracking = function disableTracking(isEnabled) {
  var value = typeof isEnabled === "boolean" ? isEnabled : false;
  this.trackingDisabled = value;
  return execute("disableTracking", [value]);
};

Branch.prototype.enableTestMode = function initSession() {
  if (this.sessionInitialized) {
    return executeReject("[enableTestMode] should be called before [initSession]");
  }
  return execute("enableTestMode");
};

Branch.prototype.initSession = function initSession() {
  this.sessionInitialized = true;
  return execute("initSession");
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

// Deprecated. Replaced by setLogging(isEnabled) and test devices. https://help.branch.io/using-branch/docs/adding-test-devices
Branch.prototype.setDebug = function setDebug(isEnabled) {
  return new Promise(function promise(resolve, reject) {
    resolve(false);
  });
};

// For early lifecycle logging, we recommend you enable logging in the native iOS or Android code.
Branch.prototype.setLogging = function setLogging(isEnabled) {
  var value = typeof isEnabled !== "boolean" ? false : isEnabled;
  this.enableLogging = value;

  return execute("enableLogging", [value]);
};

Branch.prototype.setCookieBasedMatching = function setCookieBasedMatching(
  linkDomain
) {
  return linkDomain && deviceVendor.indexOf("Apple") < 0
    ? execute("setCookieBasedMatching", [linkDomain])
    : null;
};

//DEPRECATED
Branch.prototype.delayInitToCheckForSearchAds = function delayInitToCheckForSearchAds(
  isEnabled
) {
  // stub call from known issue calling it from JS
  return new Promise(function promise(resolve, reject) {
    resolve(false);
  });

  // var value = typeof isEnabled !== "boolean" ? false : isEnabled;

  // return execute("delayInitToCheckForSearchAds", [value]);
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

//DEPRECATED
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

//DEPRECATED
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


Branch.prototype.getStandardEvents = function getStandardEvents() {
  return execute("getStandardEvents");

};

Branch.prototype.sendBranchEvent = function sendBranchEvent(
  action,
  metaData
) {
  var args = [action];
  if (!action) {
    return executeReject("Please set a standard event");
  }

  if (metaData) {
    args.push(metaData);
  }

  return execute("sendBranchEvent", args);
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

Branch.prototype.crossPlatformIds = function crossPlatformIds() {
  return execute("crossPlatformIds");
};

Branch.prototype.lastAttributedTouchData = function lastAttributedTouchData() {
  return execute("lastAttributedTouchData");
};

Branch.prototype.getBranchQRCode = function getBranchQRCode(
  qrCodeSettings,
  branchUniversalObject,
  analytics,
  properties
) {
  var args = [];
  if (qrCodeSettings) {
    args.push(qrCodeSettings);
  }
  if (branchUniversalObject) {
    args.push(branchUniversalObject.instanceId);
  }
  if (analytics) {
    args.push(analytics);
  }
  if (properties) {
    args.push(properties);
  }

  return execute("getBranchQRCode", args);
};


// export Branch object
module.exports = new Branch();
