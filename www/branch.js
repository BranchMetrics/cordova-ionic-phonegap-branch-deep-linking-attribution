'use strict';

(function (root) {

    // Store setTimeout reference so promise-polyfill will be unaffected by
    // other code modifying setTimeout (like sinon.useFakeTimers())
    var setTimeoutFunc = setTimeout;

    function noop() {}

    // Polyfill for Function.prototype.bind
    function bind(fn, thisArg) {
        return function () {
            fn.apply(thisArg, arguments);
        };
    }

    function Promise(fn) {
        if (typeof this !== 'object') throw new TypeError('Promises must be constructed via new');
        if (typeof fn !== 'function') throw new TypeError('not a function');
        this._state = 0;
        this._handled = false;
        this._value = undefined;
        this._deferreds = [];

        doResolve(fn, this);
    }

    function handle(self, deferred) {
        while (self._state === 3) {
            self = self._value;
        }
        if (self._state === 0) {
            self._deferreds.push(deferred);
            return;
        }
        self._handled = true;
        Promise._immediateFn(function () {
            var cb = self._state === 1 ? deferred.onFulfilled : deferred.onRejected;
            if (cb === null) {
                (self._state === 1 ? resolve : reject)(deferred.promise, self._value);
                return;
            }
            var ret;
            try {
                ret = cb(self._value);
            } catch (e) {
                reject(deferred.promise, e);
                return;
            }
            resolve(deferred.promise, ret);
        });
    }

    function resolve(self, newValue) {
        try {
            // Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
            if (newValue === self) throw new TypeError('A promise cannot be resolved with itself.');
            if (newValue && (typeof newValue === 'object' || typeof newValue === 'function')) {
                var then = newValue.then;
                if (newValue instanceof Promise) {
                    self._state = 3;
                    self._value = newValue;
                    finale(self);
                    return;
                } else if (typeof then === 'function') {
                    doResolve(bind(then, newValue), self);
                    return;
                }
            }
            self._state = 1;
            self._value = newValue;
            finale(self);
        } catch (e) {
            reject(self, e);
        }
    }

    function reject(self, newValue) {
        self._state = 2;
        self._value = newValue;
        finale(self);
    }

    function finale(self) {
        if (self._state === 2 && self._deferreds.length === 0) {
            Promise._immediateFn(function() {
                if (!self._handled) {
                    Promise._unhandledRejectionFn(self._value);
                }
            });
        }

        for (var i = 0, len = self._deferreds.length; i < len; i++) {
            handle(self, self._deferreds[i]);
        }
        self._deferreds = null;
    }

    function Handler(onFulfilled, onRejected, promise) {
        this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
        this.onRejected = typeof onRejected === 'function' ? onRejected : null;
        this.promise = promise;
    }

    /**
     * Take a potentially misbehaving resolver function and make sure
     * onFulfilled and onRejected are only called once.
     *
     * Makes no guarantees about asynchrony.
     */
    function doResolve(fn, self) {
        var done = false;
        try {
            fn(function (value) {
                if (done) return;
                done = true;
                resolve(self, value);
            }, function (reason) {
                if (done) return;
                done = true;
                reject(self, reason);
            });
        } catch (ex) {
            if (done) return;
            done = true;
            reject(self, ex);
        }
    }

    Promise.prototype['catch'] = function (onRejected) {
        return this.then(null, onRejected);
    };

    Promise.prototype.then = function (onFulfilled, onRejected) {
        var prom = new (this.constructor)(noop);

        handle(this, new Handler(onFulfilled, onRejected, prom));
        return prom;
    };

    Promise.all = function (arr) {
        var args = Array.prototype.slice.call(arr);

        return new Promise(function (resolve, reject) {
            if (args.length === 0) return resolve([]);
            var remaining = args.length;

            function res(i, val) {
                try {
                    if (val && (typeof val === 'object' || typeof val === 'function')) {
                        var then = val.then;
                        if (typeof then === 'function') {
                            then.call(val, function (val) {
                                res(i, val);
                            }, reject);
                            return;
                        }
                    }
                    args[i] = val;
                    if (--remaining === 0) {
                        resolve(args);
                    }
                } catch (ex) {
                    reject(ex);
                }
            }

            for (var i = 0; i < args.length; i++) {
                res(i, args[i]);
            }
        });
    };

    Promise.resolve = function (value) {
        if (value && typeof value === 'object' && value.constructor === Promise) {
            return value;
        }

        return new Promise(function (resolve) {
            resolve(value);
        });
    };

    Promise.reject = function (value) {
        return new Promise(function (resolve, reject) {
            reject(value);
        });
    };

    Promise.race = function (values) {
        return new Promise(function (resolve, reject) {
            for (var i = 0, len = values.length; i < len; i++) {
                values[i].then(resolve, reject);
            }
        });
    };

    // Use polyfill for setImmediate for performance gains
    Promise._immediateFn = (typeof setImmediate === 'function' && function (fn) { setImmediate(fn); }) ||
            function (fn) {
                setTimeoutFunc(fn, 0);
            };

    Promise._unhandledRejectionFn = function _unhandledRejectionFn(err) {
        if (typeof console !== 'undefined' && console) {
            console.warn('Possible Unhandled Promise Rejection:', err); // eslint-disable-line no-console
        }
    };

    /**
     * Set the immediate function to execute callbacks
     * @param fn {function} Function to execute
     * @deprecated
     */
    Promise._setImmediateFn = function _setImmediateFn(fn) {
        Promise._immediateFn = fn;
    };

    /**
     * Change the function to execute on unhandled rejection
     * @param {function} fn Function to execute on unhandled rejection
     * @deprecated
     */
    Promise._setUnhandledRejectionFn = function _setUnhandledRejectionFn(fn) {
        Promise._unhandledRejectionFn = fn;
    };

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = Promise;
    } else if (!root.Promise) {
        root.Promise = Promise;
    }

})(window);

/**
 * Branch.IO SDK
 * -------------
 * Method usage:
 *     All methods are promisified, therefore you can call .then(successCallback, errorCallback) for any of the method
 *     called for executing success or error callbacks.
 */

var exec = require('cordova/exec');
var deviceVendor = window.clientInformation.vendor;
var _API_CLASS = 'BranchSDK'; // SDK Class

/**
 * Execute SDK method using cordova.exec()
 *
 * @param  (String) method - The class method to execute.
 * @param  (Array) params  - Method parameter(s) to pass.
 *
 * @return (Promise)
 */
function execute(method, params) {

    params = !params ? [] : params;

    return new Promise(function (resolve, reject) {
        exec(function (res) {
            resolve(res);
        }, function (err) {
            reject(err);
        }, _API_CLASS, method, params);
    });
}

/**
 * Set listener callback for SDK method.
 *
 * @param  (String) method      - The class method to execute.
 * @param  (Function) callback  - The method listener callback.
 * @param  (Array) params       - The method listener parameters.
 *
 * @return (Promise)
 */
function executeCallback(method, callback, params) {

    params = !params ? [] : params;

    exec(callback, function (err) {
        console.error(err);
    }, _API_CLASS, method, params);
}

/**
 * @class Branch
 */
var Branch = function Branch() {

    this.debugMode = false;
};

/**
 * Initialize the Branch instance.
 *
 * @return (Promise)
 */
Branch.prototype.initSession = function () {

    return execute('initSession');
};

/**
 * Get Mixpanel tolen/assisstance.
 * NOTE: This must be called before initSession
 *
 * @param (String) token. Default = false
 *
 * @return (Promise)
 */
Branch.prototype.setMixpanelToken = function (token) {

    return execute('setMixpanelToken', [token]);
};

/**
 * Set debug mode to simulate fresh installs.
 * NOTE: This must be called before initSession
 *
 * @param (Boolean) isEnabled. Default = false
 *
 * @return (Promise)
 */
Branch.prototype.setDebug = function (isEnabled) {

    isEnabled = (typeof isEnabled !== 'boolean') ? false : isEnabled;

    this.debugMode = isEnabled;

    return execute('setDebug', [isEnabled]);

};

/**
 * Retrieves the install session parameters.
 *
 * @return (Promise)
 */
Branch.prototype.getFirstReferringParams = function () {

    return execute('getFirstReferringParams');
};

/**
 * Retrieves the latest referring parameters.
 *
 * @return (Promise)
 */
Branch.prototype.getLatestReferringParams = function () {

    return execute('getLatestReferringParams');
};

/**
 * Sets the identity of a user and returns the data.
 *
 * @param (String) identity - A unique identifier for the user [REQUIRED]
 *
 * @return (Promise)
 *
 */
Branch.prototype.setIdentity = function (identity) {

    if (identity) {
        return execute('setIdentity', [identity]);
    } else {
        return new Promise(function (resolve, reject) {
            reject('Please set an identity');
        });
    }
};

/**
 * Logout from the current session. Replace session and identity IDs.
 *
 * @return (Promise)
 */
Branch.prototype.logout = function () {

    return execute('logout');
};

/**
 * Register custom events.
 *
 * @param (String) action - Name of the custom action
 * @param (Object) metaData - Data to pass with the action [OPTIONAL]
 *
 * @return (Promise)
 */
Branch.prototype.userCompletedAction = function (action, metaData) {

    var args = [action];

    if (metaData) {
        args.push(metaData);
    }

    return execute('userCompletedAction', args);
};

/**
 * Create an universal Branch object
 *
 * @params (Object) options
 *
 * @return (Promise)
 *
 * options:
 *    --------------------------------------------------------------
 *    |          KEY          |    TYPE    |      DESCRIPTION      |
 *    --------------------------------------------------------------
 *    |  canonicalIdentifier  |   String   | The object identifier |
 *    |         title         |   String   |   The object title    |
 *    |  contentDescription   |   String   |  Object description   |
 *    |    contentImageUrl    |   String   |     The image URL     |
 *    |  contentIndexingMode  |   String   |    Indexing Mode      |
 *    |                       |            |('private' or 'public')|
 *    |    contentMetadata    |   Object   |   Custom key/value    |
 *    --------------------------------------------------------------
 */
Branch.prototype.createBranchUniversalObject = function (options) {

    return new Promise(function (resolve, reject) {
        execute('createBranchUniversalObject', [options]).then(function (res) {

            var obj = {
                message: res.message,
                instanceId: res.branchUniversalObjectId
            };

            // Attach object functions
            /**
             * Register view count.
             *
             * @return (Promise)
             */
            obj.registerView = function () {

                return execute('registerView', [obj.instanceId]);
            };

            /**
             * Generates a short url.
             *
             * @param (Object) options
             * @param (Object) controlParameters
             *
             * @return (Promise)
             *
             * options:
             *    --------------------------------------------------
             *    |    KEY    |    TYPE    |      DESCRIPTION      |
             *    --------------------------------------------------
             *    |  feature  |   String   |   The link feature    |
             *    |   alias   |   String   |    The link alias     |
             *    |  channel  |   String   |   The link channel    |
             *    |   stage   |   String   |    The link stage     |
             *    |  duration |    Int     |   The link duration   |
             *    --------------------------------------------------
             *
             * controlParameters:
             *    -------------------------------------------------------
             *    |         KEY        |    TYPE    |    DESCRIPTION    |
             *    -------------------------------------------------------
             *    |    $fallback_url   |   String   |   Fallback URL    |
             *    |    $desktop_url    |   String   |   Desktop URL     |
             *    |    $android_url    |   String   |   Android URL     |
             *    |      $ios_url      |   String   |     iOS URL       |
             *    |      $ipad_url     |   String   |    iPad URL       |
             *    |      $fire_url     |   String   |  Kindle Fire URL  |
             *    |  $blackberry_url   |   String   |   Blackberry URL  |
             *    | $windows_phone_url |   String   |  Kindle Fire URL  |
             *    -------------------------------------------------------
             */
            obj.generateShortUrl = function (options, controlParameters) {

                return execute('generateShortUrl', [obj.instanceId, options, controlParameters]);
            };

            /**
             * Show the share dialog.
             *
             * @param (Object) options
             * @param (Object) controlParameters
             * @param (String) shareText [OPTIONAL]
             *
             * @return (Promise)
             *
             * options:
             *    --------------------------------------------------
             *    |    KEY    |    TYPE    |      DESCRIPTION      |
             *    --------------------------------------------------
             *    |  feature  |   String   |   The link feature    |
             *    |   alias   |   String   |    The link alias     |
             *    |  channel  |   String   |   The link channel    |
             *    |   stage   |   String   |    The link stage     |
             *    |  duration |    Int     |   The link duration   |
             *    --------------------------------------------------
             *
             * controlParameters:
             *    -------------------------------------------------------
             *    |         KEY        |    TYPE    |    DESCRIPTION    |
             *    -------------------------------------------------------
             *    |    $fallback_url   |   String   |   Fallback URL    |
             *    |    $desktop_url    |   String   |   Desktop URL     |
             *    |    $android_url    |   String   |   Android URL     |
             *    |      $ios_url      |   String   |     iOS URL       |
             *    |      $ipad_url     |   String   |    iPad URL       |
             *    |      $fire_url     |   String   |  Kindle Fire URL  |
             *    |  $blackberry_url   |   String   |   Blackberry URL  |
             *    | $windows_phone_url |   String   |  Kindle Fire URL  |
             *    -------------------------------------------------------
             */
            obj.showShareSheet = function (options, controlParameters, shareText) {

                if (!shareText) {
                    shareText = 'This stuff is awesome: ';
                }

                return execute('showShareSheet', [obj.instanceId, options, controlParameters, shareText]);
            };

            /**
             * Set on share sheet launched listener callback.
             *
             * @param (Function) callback
             */
            obj.onShareSheetLaunched = function (callback) {

                if (deviceVendor.indexOf('Apple') < 0) {
                    executeCallback('onShareLinkDialogLaunched', callback, [obj.instanceId]);
                }
            };

            obj.onShareSheetDismissed = function (callback) {

                executeCallback('onShareLinkDialogDismissed', callback, [obj.instanceId]);
            };

            /**
             * Set on link share listener callback.
             *
             * @param (Function) callback
             */
            obj.onLinkShareResponse = function (callback) {

                executeCallback('onLinkShareResponse', callback, [obj.instanceId]);
            };

            /**
             * Set on channel select listener callback.
             *
             * @param (Function) callback
             */
            obj.onChannelSelected = function (callback) {

                if (deviceVendor.indexOf('Apple') < 0) {
                    executeCallback('onChannelSelected', callback, [obj.instanceId]);
                }
            };

            /**
             * List item on Spotlight (iOS Only).
             */
            obj.listOnSpotlight = function () {

                return execute('listOnSpotlight', [obj.instanceId]);
            };

            resolve(obj);
        }, function (err) {
            reject(err);
        });
    });
};

/**
 * Retrieve the current reward balance.
 *
 * @return (Promise)
 */
Branch.prototype.loadRewards = function (bucket) {

    if (!bucket) {
        bucket = '';
    }

    return execute('loadRewards', [bucket]);
};

/**
 * Redeem rewards to your account.
 *
 * @param (Int) value - The amount to redeem.
 * @param (String) bucket - The value containing the name of the referral bucket to attempt to redeem credits from. [OPTIONAL]
 *
 * @return (Promise)
 */
Branch.prototype.redeemRewards = function (value, bucket) {

    var params = [value];

    if (bucket) {
        params.push(bucket);
    }

    return execute('redeemRewards', params);
};

/**
 * Retrieve the entire history of credits and redemptions from the individual user.
 *
 * @return (Promise)
 */
Branch.prototype.creditHistory = function () {

    return execute('getCreditHistory');
};

/**
 * NonBranchLinkHandler callback placeholder.
 *
 * @param {String} response
 */
window.NonBranchLinkHandler = typeof NonBranchLinkHandler === 'undefined' ? function (response) {} : NonBranchLinkHandler;

module.exports = new Branch();
//# sourceMappingURL=branch.js.map
