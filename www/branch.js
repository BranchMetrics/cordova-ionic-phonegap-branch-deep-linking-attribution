/**
 * Branch.IO SDK
 * -------------
 * Method usage:
 *     All methods are promisified, therefore you can call .then(successCallback, errorCallback) for any of the method
 *     called for executing success or error callbacks.
 */
var exec = require('cordova/exec');
var _API_CLASS = 'BranchSDK'; // SDK Class

/**
 * Execute SDK method using cordova.exec()
 *
 * @param  (String) method - The class method to execute
 * @param  (Array) params  - Method parameter(s) to pass
 *
 * @return (Promise)
 */
function execute(method, params) {

    params = ( ! params) ? [] : params;

    var self = this;

    return new Promise(function (resolve, reject) {
        exec(function (res) {
            resolve(res);
        }, function (err) {
            reject(err);
        }, _API_CLASS, method, params);
    });

}

/**
 * @class Branch
 */
var Branch = function () {
    this.debugMode = null;
};

/**
 * Initialize the Branch instance.
 *
 * @return (Promise)
 */
Branch.prototype.initSession = function () {

    if (this.debugMode !== null) {
        return execute('initSession');
    } else {
        return new Promise (function (resolve, reject) {
            reject('Please set debug mode first.');
        });
    }

};

/**
 * Set debug mode.
 * NOTE: Init session must be called first before using this method
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
 * Create an unverisal Branch object
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

            /**
             * Register view count.
             *
             * @return (Promise)
             */
            res.registerView = function () {

                return execute('registerView');

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
            res.generateShortUrl = function (options, controlParameters) {

                return execute('generateShortUrl', [options, controlParameters]);

            };

            /**
             * Show the share dialog.
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
            res.showShareSheet = function (options, controlParameters) {

                return execute('showShareSheet', [options, controlParameters]);

            };

            resolve(res);

        }, function (err) {
            reject(err);
        });
    });

};

/**
 * Register view count.
 *
 * @return (Promise)
 */
Branch.prototype.registerView = function () {

    return execute('registerView');

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
Branch.prototype.generateShortUrl = function (options, controlParameters) {

    return execute('generateShortUrl', [options, controlParameters]);

};

/**
 * Show the share dialog.
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
Branch.prototype.showShareSheet = function (options, controlParameters) {

    return execute('showShareSheet', [options, controlParameters]);

};

/**
 * List item on Spotlight (iOS Only).
 */
Branch.prototype.listOnSpotlight = function () {

    return execute('listOnSpotlight');

};

/**
 * Retrieve the current reward balance.
 *
 * @return (Promise)
 */
Branch.prototype.loadRewards = function () {

    return execute('loadRewards');

};

/**
 * Redeem rewards to your account.
 *
 * @param (Int) value - The amount to redeem
 *
 * @return (Promise)
 */
Branch.prototype.redeemRewards = function (value) {

    return execute('redeemRewards', [value]);

};

/**
 * Retrieve the entire history of credits and redemptions from the individual user.
 *
 * @return (Promise)
 */
Branch.prototype.creditHistory = function () {

    return execute('getCreditHistory');

};

module.exports = new Branch;
