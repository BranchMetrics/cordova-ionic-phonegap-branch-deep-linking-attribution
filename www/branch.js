'use strict'

var exec = require('cordova/exec')
var deviceVendor = window.clientInformation.vendor
var _API_CLASS = 'BranchSDK' // SDK Class

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

var Branch = function Branch () {
  this.debugMode = false
}

var disableGlobalListenersWarnings = false
Branch.prototype.disableGlobalListenersWarnings = function () {
  disableGlobalListenersWarnings = true
}

var branchLinkListener = null

function onBranchLinkStub (data) {
  branchLinkListener(data)
}

Branch.prototype.initSession = function (onBranchLinkHook) {
  if (!onBranchLinkHook && !disableGlobalListenersWarnings) {
    console.log('WARNING: branch link hook is not being passed to initSession. ' + 'Falling back to global DeepLinkHandler method. See https://goo.gl/GijGKP for details.')
  } else {
    var currentHook = window.DeepLinkHandler
    if (currentHook !== undefined && currentHook !== onBranchLinkStub) {
      if (!disableGlobalListenersWarnings) {
        console.log('WARNING: you are calling initSession with a branch link hook when an ' + 'existing global DeepLinkHandler is defined. The global ' + 'DeepLinkHandler will be overwritten. See https://goo.gl/GijGKP ' + 'for details.')
      }
    }
    if (onBranchLinkHook) {
      branchLinkListener = onBranchLinkHook
      window.DeepLinkHandler = onBranchLinkStub
    }
  }

  return execute('initSession')
}

var nonBranchLinkListener = null

function onNonBranchLinkStub (data) {
  nonBranchLinkListener(data)
}

Branch.prototype.onNonBranchLink = function (newHook) {
  if (!newHook) {
    throw new Error('non branch link hook is falsy, expected a function, not: "' + newHook + '"')
  }

  var currentHook = window.NonBranchLinkHandler
  if (currentHook !== undefined && currentHook !== onNonBranchLinkStub && currentHook !== defaultNonBranchLinkHandler) {
    if (!disableGlobalListenersWarnings) {
      console.log('WARNING: you are calling onNonBranchLink when an ' + 'existing global NonBranchLinkHandler is defined. The global ' + 'NonBranchLinkHandler will be overwritten. See https://goo.gl/GijGKP ' + 'for details.')
    }
  }
  nonBranchLinkListener = newHook
  window.NonBranchLinkHandler = onNonBranchLinkStub
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
    return execute('setIdentity', [identity])
  } else {
    return new Promise(function (resolve, reject) {
      reject('Please set an identity')
    })
  }
}

Branch.prototype.logout = function () {
  return execute('logout')
}

Branch.prototype.userCompletedAction = function (action, metaData) {
  if (!action) {
    return new Promise(function (resolve, reject) {
      reject('Please set an event name')
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
        if (deviceVendor.indexOf('Apple') < 0) {
          return execute('listOnSpotlight', [obj.instanceId])
        } else {
          return new Promise(function (resolve, reject) {
            reject('iOS Spotlight only')
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

var defaultNonBranchLinkHandler = function defaultNonBranchLinkHandler (response) {}
window.NonBranchLinkHandler = typeof NonBranchLinkHandler === 'undefined' ? defaultNonBranchLinkHandler : window.NonBranchLinkHandler

module.exports = new Branch()
