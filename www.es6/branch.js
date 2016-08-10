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

    params = (!params) ? [] : params;

    return new Promise(function(resolve, reject) {
        exec(function(res) {
            resolve(res);
        }, function(err) {
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

    params = (!params) ? [] : params;

    exec(callback, function(err) {
        console.error(err);
    }, _API_CLASS, method, params);

}

/**
 * @class Branch
 */
var Branch = function() {

    this.debugMode = false;

};

/**
 * Initialize the Branch instance.
 *
 * @return (Promise)
 */
Branch.prototype.initSession = function() {

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
Branch.prototype.setMixpanelToken = function(token) {

    return execute('setMixpanelToken', [ token ]);

};

/**
 * Retrieves the install session parameters.
 *
 * @return (Promise)
 */
Branch.prototype.getFirstReferringParams = function() {

    return execute('getFirstReferringParams');

};

/**
 * Retrieves the latest referring parameters.
 *
 * @return (Promise)
 */
Branch.prototype.getLatestReferringParams = function() {

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
Branch.prototype.setIdentity = function(identity) {

    if (identity) {
        return execute('setIdentity', [ identity ]);
    }
 else {
        return new Promise(function(resolve, reject) {
            reject('Please set an identity');
        });
    }

};

/**
 * Logout from the current session. Replace session and identity IDs.
 *
 * @return (Promise)
 */
Branch.prototype.logout = function() {

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
Branch.prototype.userCompletedAction = function(action, metaData) {

    var args = [ action ];

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
Branch.prototype.createBranchUniversalObject = function(options) {

    return new Promise(function(resolve, reject) {
        execute('createBranchUniversalObject', [ options ]).then(function(res) {

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
            obj.registerView = function() {

                return execute('registerView', [ obj.instanceId ]);

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
            obj.generateShortUrl = function(options, controlParameters) {

                return execute('generateShortUrl', [ obj.instanceId, options, controlParameters ]);

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
            obj.showShareSheet = function(options, controlParameters, shareText) {

                if (!shareText) {
                    shareText = 'This stuff is awesome: ';
                }

                return execute('showShareSheet', [ obj.instanceId, options, controlParameters, shareText ]);

            };

            /**
             * Set on share sheet launched listener callback.
             *
             * @param (Function) callback
             */
            obj.onShareSheetLaunched = function(callback) {

                if (deviceVendor.indexOf('Apple') < 0) {
                    executeCallback('onShareLinkDialogLaunched', callback, [ obj.instanceId ]);
                }

            };

            obj.onShareSheetDismissed = function(callback) {

                executeCallback('onShareLinkDialogDismissed', callback, [ obj.instanceId ]);

            }

            /**
             * Set on link share listener callback.
             *
             * @param (Function) callback
             */
            obj.onLinkShareResponse = function(callback) {

                executeCallback('onLinkShareResponse', callback, [ obj.instanceId ]);

            };

            /**
             * Set on channel select listener callback.
             *
             * @param (Function) callback
             */
            obj.onChannelSelected = function(callback) {

                if (deviceVendor.indexOf('Apple') < 0) {
                    executeCallback('onChannelSelected', callback, [ obj.instanceId ]);
                }

            };

            /**
             * List item on Spotlight (iOS Only).
             */
            obj.listOnSpotlight = function() {

                return execute('listOnSpotlight', [ obj.instanceId ]);

            };

            resolve(obj);

        }, function(err) {
            reject(err);
        });
    });

};

/**
 * Retrieve the current reward balance.
 *
 * @return (Promise)
 */
Branch.prototype.loadRewards = function(bucket) {

    if (!bucket) {
        bucket = '';
    }

    return execute('loadRewards', [ bucket ]);

};

/**
 * Redeem rewards to your account.
 *
 * @param (Int) value - The amount to redeem.
 * @param (String) bucket - The value containing the name of the referral bucket to attempt to redeem credits from. [OPTIONAL]
 *
 * @return (Promise)
 */
Branch.prototype.redeemRewards = function(value, bucket) {

    var params = [ value ];

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
Branch.prototype.creditHistory = function() {

    return execute('getCreditHistory');

};

/**
 * NonBranchLinkHandler callback placeholder.
 *
 * @param {String} response
 */
window.NonBranchLinkHandler = (typeof NonBranchLinkHandler === 'undefined') ? function(response) {} : NonBranchLinkHandler;

module.exports = new Branch;
