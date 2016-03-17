# Branch Metrics Cordova/Ionic/Phonegap SDK Reference

This is a repository of our open source Cordova | Phonegap | Ionic SDK, and the information presented here serves as a reference manual for the SDK. This SDK is a See the table of contents below for a complete list of the content featured in this document.

## IMPORTANT: Upgrading to V 2.0

On 2/27, we revamped this module to be a thin wrapper around our native iOS/Android SDKs. This fixed a ton of bugs and added additional functionality, but will require you to change the interfaces. If you don't have time to do so, just use a reference to version 1.8, which we're storing in [locked branch called 'v1.8.0-locked'](https://github.com/BranchMetrics/Cordova-Ionic-PhoneGap-Deferred-Deep-Linking-SDK/tree/v1.8.0-locked).

## Get the Demo App

There's a full demo app embedded in this repository. It should serve as an example integration and help guide you in resolving any bugs you encounter. If you think you've got a bug, please first check that it's present in the demo app before writing in. You can find [the source here](https://github.com/BranchMetrics/Cordova-Ionic-PhoneGap-Deferred-Deep-Linking-SDK/blob/master/testbed).

## Additional Resources
- [Integration guide](https://dev.branch.io/recipes/add_the_sdk/cordova/) *Start Here*
- [Changelog](https://github.com/BranchMetrics/Cordova-Ionic-PhoneGap-Deferred-Deep-Linking-SDK/blob/master/ChangeLog.md)
- [Testing](https://dev.branch.io/recipes/testing_your_integration/cordova/)
- [Support portal, FAQ](http://support.branch.io)

## Installation

**The compiled iOS SDK footprint is 180kb**
**The compiled Android SDK footprint is 187kb**

### Command link install

**Install parameters:**
* `BRANCH_KEY` - Your Branch live API key. You can sign up for your own Branch key at [https://dashboard.branch.io](https://dashboard.branch.io).
* `BRANCH_TEST_KEY` - Your Branch test API key. You can sign up for your own Branch key at [https://dashboard.branch.io](https://dashboard.branch.io).
* `URI_SCHEME` - It could be your app name or the URI set in your Branch dashboard. As a reminder, the URI scheme is what you use to open your app from a browser, i.e. `yourapp://`.
* [optional] `ENCODED_ID` - This is for supporting App Links (6.0+) on Android. You can obtain the encodied id from the Branch dashboard. For more info about App Links, please see [this](https://github.com/BranchMetrics/Android-Deferred-Deep-Linking-SDK/blob/master/README.md#leverage-android-app-links-for-deep-linking) section of the Android readme.

#### Cordova

```sh
cordova plugin add https://github.com/BranchMetrics/Cordova-Ionic-PhoneGap-Deferred-Deep-Linking-SDK.git --variable BRANCH_KEY=<your-branch-key> --variable BRANCH_TEST_KEY=<your-branch-key> --variable URI_SCHEME=<your-app-uri-scheme-without-colon-and-slashes>
```
example:
```sh
cordova plugin add https://github.com/BranchMetrics/Cordova-Ionic-PhoneGap-Deferred-Deep-Linking-SDK.git --variable BRANCH_KEY=key_live_fnmRM1FXtu11t6e4LU8WsldpvDcA0bzv --variable BRANCH_TEST_KEY=key_test_oicIH5u2yxW9w3i6UZdfCiokyrixWpBJ --variable URI_SCHEME=branchsters
```

#### Phonegap

```sh
phonegap plugin add https://github.com/BranchMetrics/Cordova-Ionic-PhoneGap-Deferred-Deep-Linking-SDK.git --variable BRANCH_KEY=your-branch-key --variable BRANCH_TEST_KEY=your-branch-key --variable URI_SCHEME=your-app-uri-scheme --variable ENCODED_ID=your-encoded-id
```

example:
```sh
phonegap plugin add https://github.com/BranchMetrics/Cordova-Ionic-PhoneGap-Deferred-Deep-Linking-SDK.git --variable BRANCH_KEY=key_live_fnmRM1FXtu11t6e4LU8WsldpvDcA0bzv --variable BRANCH_TEST_KEY=key_test_oicIH5u2yxW9w3i6UZdfCiokyrixWpBJ --variable URI_SCHEME=branchsters
```

#### NPM

```sh
npm install branch-cordova-sdk --variable BRANCH_KEY=your-branch-key --variable BRANCH_TEST_KEY=your-branch-key --variable URI_SCHEME=your-app-uri-scheme
```

example:
```sh
npm install branch-cordova-sdk --variable BRANCH_KEY=key_live_fnmRM1FXtu11t6e4LU8WsldpvDcA0bzv --variable BRANCH_TEST_KEY=key_test_oicIH5u2yxW9w3i6UZdfCiokyrixWpBJ --variable URI_SCHEME=branchsters
```

### Additional App Permissions

To be able to use some of the deep linking capabilities of the app, some manifest files are needed to be configured.
Please note that you don't have to do anything anymore for setting up the `Register a URI Scheme and add your Branch key`
as this was already done for you automatically on installing the plugin.

#### iOS: Enable Universal Links

In iOS 9.2, Apple dropped support for URI scheme redirects. You must enable Universal Links if you want Branch-generated links to work in your iOS app. To do this:

1. enable `Associated Domains` capability on the Apple Developer portal when you create your app's bundle identifier.
2. In your [Dashboard Link Settings](https://dashboard.branch.io/#/settings/link), tick the `Enable Universal Links` checkbox and provide the Bundle Identifier and Apple Team ID in the appropriate boxes.
`

Add the following entry to your application's `config.xml`:

```xml
<branch-config>
    <ios-team-id value="your_ios_team_id" />
    <android-prefix value="/X9Ug" />
    <host name="bnc.lt" scheme="https" />
</branch-config>
```

You can get your iOS Team ID from the Apple Developer Portal. Once done, you have successfully enabled universal links for iOS.

---------------

## Plugin Methods

**Some methods are promisified**, therefore you can easily get its success and error callback by chaining `.then()` method.

*Example*
```js
Branch.getFirstReferringParams().then(function (res) {
  // Success Callback
  console.log(res);
}, function (err) {
  // Error Callback
  console.error(err);
});
```

1. Branch Session
  + [setDebug](#setDebug)
  + [initSession](#initSession)
  + [getLatestReferringParams](#getLatestReferringParams)
  + [getFirstReferringParams](#getFirstReferringParams)
  + [setIdentity](#setIdentity)
  + [logout](#logout)
  + [userCompletedAction](#userCompletedAction)
2. Branch Universal Object
  + [createBranchUniversalObject](#createBranchUniversalObject)
  + [registerView](#registerView)
  + [generateShortUrl](#generateShortUrl)
  + [showShareSheet](#showShareSheet)
  + [listOnSpotlight](#listOnSpotlight) **iOS only**
3. Referral System Rewarding
  + [loadRewards](#loadRewards)
  + [redeemRewards](#redeemRewards)
  + [creditHistory](#creditHistory)


### <a id="setDebug"></a>setDebug(isEnable)

Setting the SDK debug flag will generate a new device ID each time the app is installed instead of possibly using the same device id.
This is useful when testing.

**Parameters**

**options**: `boolean` - Boolean flag if debug mode should be enabled or not.

##### Usage
```js
Branch.setDebug(true);
```

### <a id="initSession"></a>initSession()

Initializes the branch instance.
**Note:** `setDebug()` should be called first before calling this method.

##### Usage
The `initSession()` method automatically also sets an internal deep link hander whose data can be accesed by implementing the **required** `DeepLinkHandler()` method. To implement, first call the method `initSession`:

```js
onDeviceReady: function() {
    Branch.initSession();
},
onResume: function() {
    Branch.initSession();
},
initialize: function() {
    document.addEventListener('resume', onResume, false);
    document.addEventListener('deviceready', onDeviceReady, false);
},
```

Then add the method `DeepLinkHandler()` which will act as our callback when the session beings. The deep link data will be included here:

```js
function DeepLinkHandler(data) {
    alert('Data from initSession: ' + data.data);
}
```

### <a id="getFirstReferringParams"></a>getFirstReferringParams()

Retrieves the install session parameters.

##### Usage
```js
Branch.getFirstReferringParams().then(function (res) {
  // Success Callback
  console.log(res);
}).catch(function (err) {
  // Error Callback
  console.error(err);
});
```

### <a id="getLatestReferringParams"></a>getLatestReferringParams()

Retrieves the session (install or open) parameters.

##### Usage
```js
Branch.getLatestReferringParams().then(function (res) {
  // Success Callback
  console.log(res);
}).catch(function (err) {
  // Error Callback
  console.error(err);
});
```

### <a id="setIdentity"></a>setIdentity(object)

Sets the identity of a user and returns the data. To use this function,
pass a unique string that identifies the user - this could be an email address, UUID, Facebook ID, etc.

**Parameters**

**identity**: `string` - A string uniquely identifying the user, ofetn a user ID or email address.

##### Usage
```js
Branch.setIdentity("new_identity").then(function (res) {
  // Success Callback
  console.log(res);
}).catch(function (err) {
  // Error Callback
  console.error(err);
});
```

### <a id="logout"></a>logout()

Logs out the current session, replaces session IDs and identity IDs.

##### Usage
```js
Branch.logout();
```

### <a id="userCompletedAction"></a>userCompletedAction(action[, metaData])

Registers custom events.

**Parameters**

**action**: `string` - A string for your custom action (e.g. "completed_purchase", "wrote_message", etc.)

**metaData**: `object` _[Optional]_ - Custom values to be passed with the action

##### Usage
```js
Branch.userCompletedAction('complete_purchase');

Branch.userCompletedAction('registered', { user: 'Test' });
```
------

## Branch Universal Object

As more methods evolved in iOS, we've found that it was increasingly hard to manage them all.
We abstracted as many as we could into the concept of a Branch Universal Object.
This is the object that is associated with the thing you want to share (content or user).
You can set all the metadata associated with the object and then call action methods on it to get a link or index in Spotlight.

### <a id="createBranchUniversalObject"></a>createBranchUniversalObject(object)

Initializes the universal Branch object.

**Parameters**

**options**: `object` - Options in creating object.

##### object

|         Key         | TYPE   |             DESCRIPTION             |
| ------------------- | ------ | ----------------------------------- |
| canonicalIdentifier | String | The object identifier               |
| title               | String | The object title                    |
| contentDescription  | String | Object Description                  |
| contentImageUrl     | String | The Image URL                       |
| contentIndexingMode | String | Indexing Mode 'private' or 'public' |
| contentMetadata     | Object | Custom key/value                    |

##### Usage
```js
var branchUniversalObj = null;

Branch.createBranchUniversalObject({
  canonicalIdentifier: 'identifier',
  title: 'Just another title',
  contentDescription: 'Just another description',
  contentImageUrl: '/img.jpg',
  contentIndexingMode: 'public'
}).then(function (newBranchUniversalObj) {
  // Success Callback
  branchUniversalObj = newBranchUniversalObj;
  console.log(newBranchUniversalObj);
}, function (err) {
  // Error Callback
  console.error(err);
});
```

### <a id="registerView"></a>registerView()

If you want to track how many times a user views a particular piece of content, you can call this method in `viewDidLoad` or `viewDidAppear`
to tell Branch that this content was viewed.

##### Usage
```js
branchUniversalObj.registerView();
```

### <a id="generateShortUrl"></a>generateShortUrl(options, controlParameters)

Once you've created your `Branch Universal Object`, which is the reference to the content you're interested in, you can then get a link back to it with the mechanism described below.

**Parameters**

**options**: `object` - Options needed to generate the URL.

|    KEY   |   TYPE   |          MEANING
| -------- | -------- |------------------------
| feature  | `string` | The feature of the link
| alias    | `string` | The alias of the link
| channel  | `string` | The channel of the link
| stage    | `string` | The stage of the link
| duration |  `int`   | duration of the link.

**controlParameters**: `object` - Link properties needed to generate the URL.

|        KEY         |   TYPE   |       MEANING
| ------------------ | -------- | --------------------
| $fallback_url      | `string` | The fallback URL
| $desktop_url       | `string` | The URL for desktop
| $android_url       | `string` | The URL for Android
| $ios_url           | `string` | The URL for iPhone
| $ipad_url          | `string` | The URL for iPad
| $fire_url          | `string` | The URL for Kindle Fire
| $blackberry_url    | `string` | The URL for Blackberry
| $windows_phone_url | `string` | The URL for Windows phone

##### Usage
```js
branchUniversalObj.generateShortUrl({
  // put your link properties here
  "feature" : "sample-feature",
  "channel" : "sample-channel",
  "stage" : "sample-stage"
}, {
  // put your control parameters here
  "$desktop_url" : "http://desktop-url.com",
}).then(function (res) {
    // Success Callback
    console.log(res.generatedUrl);
}, function (err) {
    // Error Callback
    console.error(err);
});
```

### <a id="showShareSheet"></a>showShareSheet(options, controlParameters)

UIActivityView is the standard way of allowing users to share content from your app.
Once you've created your `Branch Universal Object`, which is the reference to the content you're interested in, you can then automatically share it _without having to create a link_ using the mechanism below.

**Sample Android Share Sheet**

![Android Share Sheet](https://dev.branch.io/img/ingredients/sdk_links/android_share_sheet.png)

**Sample UIActivityView Share Sheet**

![UIActivityView Share Sheet](https://dev.branch.io/img/ingredients/sdk_links/ios_share_sheet.jpg)

The Branch iOS SDK includes a wrapper on the UIActivityViewController, that will generate a Branch short URL and automatically tag it with the channel the user selects (Facebook, Twitter, etc.).

**Parameters**

**options**: `object` - Options needed to generate the URL.

|    KEY   |   TYPE   |          MEANING
| -------- | -------- |------------------------
| feature  | `string` | The feature of the link
| alias    | `string` | The alias of the link
| channel  | `string` | The channel of the link
| stage    | `string` | The stage of the link
| duration |  `int`   | duration of the link.

**controlParameters**: `object` - Link properties needed to generate the URL.

|        KEY         |   TYPE   |       MEANING
| ------------------ | -------- | --------------------
| $fallback_url      | `string` | The fallback URL
| $desktop_url       | `string` | The URL for desktop
| $android_url       | `string` | The URL for Android
| $ios_url           | `string` | The URL for iPhone
| $ipad_url          | `string` | The URL for iPad
| $fire_url          | `string` | The URL for Kindle Fire
| $blackberry_url    | `string` | The URL for Blackberry
| $windows_phone_url | `string` | The URL for Windows phone

##### Usage
```js
branchUniversalObj.showShareSheet({
  // put your link properties here
  "feature" : "sample-feature",
  "channel" : "sample-channel",
  "stage" : "sample-stage",
  "duration" : 1,
}, {
  // put your control parameters here
  "$desktop_url" : "http://desktop-url.com",
});
```

##### Share Sheet Callbacks (Android ONLY)

To implement the callback, you must add listeners to the following events:

###### onShareSheetLaunched

The event fires when the share sheet is presented.

```js
branchUniversalObj.onShareSheetLaunched(function () {
  console.log('Share sheet launched');
});
```

###### onShareSheetDismissed

The event fires when the share sheet is dismissed.

```js
branchUniversalObj.onShareSheetDismissed(function () {
  console.log('Share sheet dimissed');
});
```

###### onLinkShareResponse

The event returns a dictionary of the response data.

```js
branchUniversalObj.onLinkShareResponse(function (res) {
  console.log('Share link response: ' + JSON.stringify(res));
});
```

###### onChannelSelected

The event fires when a channel is selected.

```js
branchUniversalObj.onChannelSelected(function (res) {
  console.log('Channel selected: ' + JSON.stringify(res));
});
```

**Note:** Callbacks in iOS are ignored. There is no need to implement them as the events are handled by `UIActivityViewController`.

**Note:** Avoid passing `alias` in iOS. Adding an `alias` key in the `options` parameter will return a Non-Universal link which will not work in iOS 9.2.

### <a id="listOnSpotlight"></a>listOnSpotlight()

**Note: iOS only.** Used for Spotlight listing

##### Usage
```js
branchUniversalObj.listOnSpotlight().then(function (res) {
  // Success Callback
  console.log(res);
}).catch(function (err) {
  // Error Callback
  console.error(err);
});
```

-------

## Referral System Rewarding

### <a id="loadRewards"></a>loadRewards()

Reward balances change randomly on the backend when certain actions are taken (defined by your rules), so you'll need to make an asynchronous call to retrieve the balance. Here is the syntax:

##### Usage
```js
Branch.loadRewards().then(function (rewards) {
  // Success Callback
  console.log(rewards);
}).catch(function (err) {
  // Error Callback
  console.error(err);
});
```

### <a id="redeemRewards"></a>redeemRewards(value)

Redeems a reward with the given amount/value.

**Parameters**

|    KEY   |   TYPE   |          MEANING
| -------- | -------- |------------------------
| value  | `int` | Amount to be redeemed.
| bucket    | `int` | Bucket where the amount will be redeemed. _optional_

##### Usage
```js
Branch.redeemRewards(100, "default").then(function (res) {
  // Success Callback
  console.log(res);
}).catch(function (err) {
  // Error Callback
  console.error(err);
});
```

### <a id="creditHistory"></a>creditHistory()

This call will retrieve the entire history of credits and redemptions from the individual user. To use this call, implement like so:

##### Usage
```js
Branch.creditHistory().then(function (history) {
  // Success Callback
  console.log(history);
}, function (err) {
  // Error Callback
  console.error(err);
});
```

The response will return an array that has been parsed from the following JSON:

```js

## Bugs / Help / Support

Feel free to report any bugs you might encounter in the repo's issues. Any support inquiries outside of bugs
please send to [support@branch.io](mailto:support@branch.io).
