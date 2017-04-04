// properties
'use strict'
var exec = require('cordova/exec')
var deviceVendor = window.clientInformation.vendor
var _API_CLASS = 'BranchSDK' // SDK Class

// javscript to sdk
function execute (method, params) {
  params = !params ? [] : params

  return new Promise(function (resolve, reject) {
    exec(function (res) {
      resolve(res)
    }, function (err) {
      reject(err)
    }, _API_CLASS, method, params)
  })
}

function executeCallback (method, callback, params) {
  params = !params ? [] : params

  exec(callback, function (err) {
    console.error(err)
  }, _API_CLASS, method, params)
}

// Branch prototype
var Branch = function Branch () {
  this.debugMode = false
}

var disableGlobalListenersWarnings = false
Branch.prototype.disableGlobalListenersWarnings = function () {
  disableGlobalListenersWarnings = true
}

Branch.prototype.initSession = function (deepLinkDataListener) {
  // private method to filter out +clicked_branch_link = false in deep link callback
  var previous = ''
  var deepLinkDataParser = function (deepLinkData) {
    var isBranchLink = '+clicked_branch_link'
    var isNonBranchLink = '+non_branch_link'
    // TODO: figure out why iOS SDK passes data twice on Ionic 2 terminated and no network connection
    var isNewData = JSON.stringify(deepLinkData) !== previous
    var isBranchLinkClick = deepLinkData.hasOwnProperty(isBranchLink) && deepLinkData[isBranchLink] === true
    var isNonBranchLinkClick = deepLinkData.hasOwnProperty(isNonBranchLink)

    // is +clicked_branch_link' = true || +non_branch_link
    if (isNewData && (isBranchLinkClick || isNonBranchLinkClick)) {
      // to Branch.initSession(function(data) {})
      deepLinkDataListener(deepLinkData)
    }
    previous = JSON.stringify(deepLinkData)
  }

  if (!disableGlobalListenersWarnings && !deepLinkDataListener && !window.DeepLinkHandler) {
    // missing deep link data return
    console.warn('BRANCH SDK: No callback in initSession and no global DeepLinkHandler method. No Branch deep link data will be returned. Docs https://goo.gl/GijGKP')
  } else if (!disableGlobalListenersWarnings && window.DeepLinkHandler !== undefined && window.DeepLinkHandler.toString() !== deepLinkDataParser.toString()) {
    // deprecated 3.0.0: open and non deep link data will pass into DeepLinkHandler
    console.warn('BRANCH SDK: Your DeepLinkHandler has changed. It will now pass non-Branch data. Docs https://goo.gl/GijGKP')
  } else {
    // from iOS and Android SDKs to JavaScript
    window.DeepLinkHandler = deepLinkDataParser
  }

  return execute('initSession')
}

Branch.prototype.setMixpanelToken = function (token) {
  return execute('setMixpanelToken', [token])
}

Branch.prototype.setDebug = function (isEnabled) {
  isEnabled = typeof isEnabled !== 'boolean' ? false : isEnabled
  this.debugMode = isEnabled

  return execute('setDebug', [isEnabled])
}

Branch.prototype.getFirstReferringParams = function () {
  return execute('getFirstReferringParams')
}

Branch.prototype.getLatestReferringParams = function () {
  return execute('getLatestReferringParams')
}

Branch.prototype.setIdentity = function (identity) {
  if (identity) {
    return execute('setIdentity', [String(identity)])
  } else {
    return new Promise(function (resolve, reject) {
      reject(new Error('Please set an identity'))
    })
  }
}

Branch.prototype.logout = function () {
  return execute('logout')
}

Branch.prototype.userCompletedAction = function (action, metaData) {
  if (!action) {
    return new Promise(function (resolve, reject) {
      reject(new Error('Please set an event name'))
    })
  }

  var args = [action]
  if (metaData) {
    args.push(metaData)
  }

  return execute('userCompletedAction', args)
}

Branch.prototype.createBranchUniversalObject = function (options) {
  return new Promise(function (resolve, reject) {
    execute('createBranchUniversalObject', [options]).then(function (res) {
      var obj = {
        message: res.message,
        instanceId: res.branchUniversalObjectId
      }

      obj.registerView = function () {
        return execute('registerView', [obj.instanceId])
      }

      obj.generateShortUrl = function (options, controlParameters) {
        return execute('generateShortUrl', [obj.instanceId, options, controlParameters])
      }

      obj.showShareSheet = function (options, controlParameters, shareText) {
        if (!shareText) {
          shareText = 'This stuff is awesome: '
        }

        return execute('showShareSheet', [obj.instanceId, options, controlParameters, shareText])
      }

      obj.onShareSheetLaunched = function (callback) {
        if (deviceVendor.indexOf('Apple') < 0) {
          executeCallback('onShareLinkDialogLaunched', callback, [obj.instanceId])
        }
      }

      obj.onShareSheetDismissed = function (callback) {
        executeCallback('onShareLinkDialogDismissed', callback, [obj.instanceId])
      }

      obj.onLinkShareResponse = function (callback) {
        executeCallback('onLinkShareResponse', callback, [obj.instanceId])
      }

      obj.onChannelSelected = function (callback) {
        if (deviceVendor.indexOf('Apple') < 0) {
          executeCallback('onChannelSelected', callback, [obj.instanceId])
        }
      }

      obj.listOnSpotlight = function () {
        if (!(deviceVendor.indexOf('Apple') < 0)) {
          return execute('listOnSpotlight', [obj.instanceId])
        } else {
          return new Promise(function (resolve, reject) {
            reject(new Error('iOS Spotlight only'))
          })
        }
      }

      resolve(obj)
    }, function (err) {
      reject(err)
    })
  })
}

Branch.prototype.loadRewards = function (bucket) {
  if (!bucket) {
    bucket = ''
  }

  return execute('loadRewards', [bucket])
}

Branch.prototype.redeemRewards = function (value, bucket) {
  var params = [value]
  if (bucket) {
    params.push(bucket)
  }

  return execute('redeemRewards', params)
}

Branch.prototype.creditHistory = function () {
  return execute('getCreditHistory')
}

// export
module.exports = new Branch()
