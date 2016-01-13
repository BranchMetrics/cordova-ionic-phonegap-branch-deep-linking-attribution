/**
 * Branch.IO SDK
 * -------------
 *
 * 
 * Method usage:
 *     All methods are promisified, therefore you can call .then() for any of the method
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
 *
 * Method reference:
 *     Please see the native source codes for the available methods to call/execute
 *
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
var Branch = function () {};

/**
 * Get installation data.
 * 
 * @return (Object) - Installation details
 */
Branch.prototype.getInstallData = function () {

    return execute('getInstallData');

};

/**
 * Initialize the Branch instance.
 *
 * @return (Promise)
 *
 *  ---------------
 * | Sample Usage |
 * ----------------
 *
 *     Branch.initSession();
 * 
 */
Branch.prototype.initSession = function () {
    
    return execute('initSession');

};

/**
 * Set debug mode.
 * NOTE: Init session must be called first before using this method
 *
 * @param (Boolean) isEnabled. Default = false
 * 
 * @return (Promise)
 * 
 *  ---------------
 * | Sample Usage |
 * ----------------
 *
 *    Branch.setDebug(true);
 * 
 */
Branch.prototype.setDebug = function (isEnabled) {
    
    isEnabled = (typeof isEnabled === 'undefined') ? false : isEnabled;

    return execute('setDebug', [isEnabled]);
    
};

/**
 * Retrieves the install session parameters.
 *
 * @return (Promise)
 * 
 *  ---------------
 * | Sample Usage |
 * ----------------
 *
 *    Branch.getFirstReferringParams();
 */
Branch.prototype.getFirstReferringParams = function () {
    
    return execute('getFirstReferringParams');

};

/**
 * Sets the identity of a user and returns the data.
 *
 * @param (String) identity - A unique identifier for the user [REQUIRED]
 *
 * @return (Promise)
 * 
 *  ---------------
 * | Sample Usage |
 * ----------------
 *
 *     Branch.setIdentity('Batman').then(successCallback, errorCallback);
 * 
 * Wherein 'successCallback' and 'errorCallback' are callback functions.
 * 
 */
Branch.prototype.setIdentity = function (identity) {
    
    return execute('setIdentity', [identity]);

};

/**
 * Logout from the current session. Replace session and identity IDs.
 *
 * @return (Promise) 
 * 
 *  ---------------
 * | Sample Usage |
 * ----------------
 *
 *    Branch.logout();
 * 
 */
Branch.prototype.logout = function () {
    
    return execute('logout');

};

/**
 * Register custom events.
 *
 * @param (String) action - Name of the custom action
 * 
 * @return (Promise)
 * 
 *  ---------------
 * | Sample Usage |
 * ----------------
 *
 *    Branch.userCompletedAction('complete_purchase').then(successCallback, errorCallback)
 * 
 * Wherein 'successCallback' and 'errorCallback' are callback functions.
 * 
 */
Branch.prototype.userCompletedAction = function (action) {
    
    return execute('userCompletedAction', [action]);

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
 *
 *  ---------------
 * | Sample Usage |
 * ----------------
 *
 *     Branch.createBranchUniversalObject({
 *         canonicalIdentifier : "sample-id",
 *         title : "Sample",
 *         contentDescription : "This is a sample",
 *         contentImageUrl : "http://sample-host.com/media/1235904.jpg",
 *         contentIndexingMode : "private",
 *         contentMetadata : {
 *             "key" : "value",
 *             "key2" : "value2"
 *         },
 *     }).then(successCallback, errorCallback)
 *
 * Wherein 'successCallback' and 'errorCallback' are callback functions.
 * 
 */
Branch.prototype.createBranchUniversalObject = function (options) {
    
    return execute('createBranchUniversalObject', [options]);

};

/**
 * Register view count.
 *
 * @return (Promise)
 *
 *  ---------------
 * | Sample Usage |
 * ---------------
 *
 *     Branch.registerView().then(successCallback, errorCallback)
 *
 * Wherein 'successCallback' and 'errorCallback' are callback functions.
 * 
 */
Branch.prototype.registerView = function () {
    
    return execute('registerView');

};

/**
 * Generates a short url.
 * 
 * @param (Object) options [REQUIRED]
 * @param (Object) controlParameters [REQUIRED]
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
 *
 *  ---------------
 * | Sample Usage |
 * ---------------
 * 
 *    Branch.generateShortUrl({
 *        feature: 'sample-feature',
 *        alias: 'sample-alias',
 *        channel: 'sample-channel',
 *        stage: 'sample-stage',
 *        duration: 100
 *    }, {
 *        $fallback_url: 'http://this-fallback-url.com',
 *        $desktop_url:  'http://this-desktop-url.com',
 *        $android_url:  'http://this-android-url.com',
 *        $ios_url:  'http://this-ios-url.com'
 *    }).then(successCallback, errorCallback);
 *    
 * Wherein 'successCallback' and 'errorCallback' are callback functions.
 * 
 */
Branch.prototype.generateShortUrl = function (options, controlParameters) {
    
    return execute('generateShortUrl', [options, controlParameters]);

};

/**
 * Show the share dialog.
 *
 * @param (Object) options [REQUIRED]
 * @param (Object) controlParameters [REQUIRED]
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
 *
 *  ---------------
 * | Sample Usage |
 * ---------------
 * 
 *    Branch.showShareSheet({
 *        feature: 'sample-feature',
 *        alias: 'sample-alias',
 *        channel: 'sample-channel',
 *        stage: 'sample-stage',
 *        duration: 100
 *    }, {
 *        $fallback_url: 'http://this-fallback-url.com',
 *        $desktop_url:  'http://this-desktop-url.com',
 *        $android_url:  'http://this-android-url.com',
 *        $ios_url:  'http://this-ios-url.com'
 *    }).then(successCallback, errorCallback);
 *    
 * Wherein 'successCallback' and 'errorCallback' are callback functions.
 * 
 */
Branch.prototype.showShareSheet = function (options, controlParameters) {
    
    return execute('showShareSheet', [options, controlParameters]);

};

/**
 * Retrieve the current reward balance.
 *
 * @return (Promise)
 * 
 *  ---------------
 * | Sample Usage |
 * ---------------
 *
 *      Branch.loadRewards().then(successCallback, errorCallback);
 *
 * Wherein 'successCallback' and 'errorCallback' are callback functions.
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
 *
 *  ---------------
 * | Sample Usage |
 * ---------------
 *
 *     Branch.redeemRewards(100).then(successCallback, errorCallback)
 *
 * Wherein 'successCallback' and 'errorCallback' are callback functions.
 */
Branch.prototype.redeemRewards = function (value) {
    
    return execute('redeemRewards', [value]);

};

/**
 * Retrieve the entire history of credits and redemptions from the individual user.
 *
 * @return (Promise)
 *
 *  ---------------
 * | Sample Usage |
 * ---------------
 *
 *     Branch.creditHistory().then(successCallback, errorCallback);   
 *
 * Wherein 'successCallback' and 'errorCallback' are callback functions.
 * 
 */
Branch.prototype.creditHistory = function () {
    
    return execute('creditHistory');

};

module.exports = new Branch;
