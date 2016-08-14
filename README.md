# Branch Metrics Cordova/Ionic/Phonegap SDK Reference

This is a repository of our open source Cordova | Phonegap | Ionic SDK, and the information presented here serves as a reference manual for the SDK. This SDK is a See the table of contents below for a complete list of the content featured in this document.

## IMPORTANT: Upgrading to V 2.0

On 2/27, we revamped this module to be a thin wrapper around our native iOS/Android SDKs. This fixed a ton of bugs and added additional functionality, but will require you to change the interfaces. If you don't have time to do so, just use a reference to version 1.8, which we're storing in [locked branch called 'v1.8.0-locked'](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/tree/v1.8.0-locked).

## Get the Demo App

There's a full demo app embedded in this repository. It should serve as an example integration and help guide you in resolving any bugs you encounter. If you think you've got a bug, please first check that it's present in the demo app before writing in. You can find [the source here](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/blob/master/testbed).

## Additional Resources
- [Integration guide](https://dev.branch.io/recipes/add_the_sdk/cordova/) *Start Here*
- [Changelog](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/blob/master/CHANGELOG.md)
- [Testing](https://dev.branch.io/recipes/testing_your_integration/cordova/)
- [Support portal, FAQ](http://support.branch.io)

## Installation

**The compiled iOS SDK footprint is 180kb**

**The compiled Android SDK footprint is 187kb**

**Latest libraries for [Android](http://developer.android.com/sdk/index.html) and/or iOS SDKs must be installed.**

### Command line install

**Install parameters:**
* `BRANCH_KEY` - Your Branch live API key. You can sign up for your own Branch key at [https://dashboard.branch.io](https://dashboard.branch.io).
* `URI_SCHEME` - It could be your app name or the URI set in your Branch dashboard. As a reminder, the URI scheme is what you use to open your app from a browser, i.e. `yourapp://`.

#### Add the plugin

```sh
cordova plugin add branch-cordova-sdk --variable BRANCH_KEY=<your-branch-key> --variable URI_SCHEME=<your-app-uri-scheme-without-colon-and-slashes>
```
example:
```sh
cordova plugin add branch-cordova-sdk --variable BRANCH_KEY=key_live_fnmRM1FXtu11t6e4LU8WsldpvDcA0bzv --variable URI_SCHEME=branchsters
```

### Additional App Permissions

To be able to use all of the deep linking capabilities of the Branch SDK, some manifest files need to be configured.

If you are enabling both iOS Universal Links and Android App Links, these keys in the following sections should be combined into a single parent item without duplicates.

#### Android: Resolving issue with multiple support-lib v4

Branch.IO doesn't depends on `android-support-v4` file. But in any case you will be integrating other Cordova plugins along with Branch.IO, here are possible ways to fix the issue:

* Adding `multiDexEnabled true` inside defaultConfig tag in `build.gradle`
```
defaultConfig {
    multiDexEnabled true
}
```
* Removing the `android-support-v4.jar` in Android `libs` directory.
* Executing `./gradlew clean` in the Android directory
* Excluding `android-support-v4` file for compiling
```
compile ('com.google.android.gms:play-services:6.5.87') {
    exclude module: 'support-v4'
}
```

#### iOS: Enable Universal Links

In iOS 9.2, Apple dropped support for URI scheme redirects. You must enable Universal Links if you want Branch-generated links to work in your iOS app. To do this:

1. Enable `Associated Domains` capability on the Apple Developer portal when you create your app's bundle identifier.
2. In your [Dashboard Link Settings](https://dashboard.branch.io/#/settings/link), tick the `Enable Universal Links` checkbox and provide the Bundle Identifier and Apple Team ID in the appropriate boxes.
`

Add the following entry to your application's `config.xml`:

```xml
<branch-config>
    <ios-team-id value="your_ios_team_id" />
    <host name="READ_FROM_DASHBOARD.app.link" scheme="https" />
    <host name="READ_FROM_DASHBOARD-alternate.app.link" scheme="https" />
</branch-config>
```

You can get your iOS Team ID from the Apple Developer Portal. Once done, you have successfully enabled universal links for iOS. `READ_FROM_DASHBOARD` is the four-character value in front of all your links. You can find it listed in the custom domain field at the bottom of the [Branch link settings](https://dashboard.branch.io/#/settings/link). It will look something like this: `/WSuf` (the initial `/` character should be included).

If you use a custom domain or subdomain for your Branch links, you should also add a key for `<host name="mycustomdomainorsubdomain" scheme="https" />`.

##### Support for legacy Branch links

If your links are of the form `bnc.lt`, you must still use this domain in your config file.

```xml
<branch-config>
    <ios-team-id value="your_ios_team_id" />
    <host name="bnc.lt" scheme="https" />
</branch-config>
```

#### Android: Enable App Links

Add the following entry to your application's `config.xml`:

```xml
<branch-config>
    <host name="xxxx.app.link" scheme="https" />
</branch-config>
```
If you use a custom domain or subdomain for your Branch links, you should also add a key for `<host name="mycustomdomainorsubdomain" scheme="https" />`.

##### Support for legacy Branch links

If your links are of the form `bnc.lt`, you must still use this domain in your config file.

```xml
<branch-config>
    <android-prefix value="READ_FROM_DASHBOARD" />
    <host name="bnc.lt" scheme="https" />
</branch-config>
```
`READ_FROM_DASHBOARD` is the four-character value in front of all your links. You can find it underneath the field labeled SHA256 Cert Fingerprints on the [dashboard](https://dashboard.branch.io/settings/link). It will look something like this: `/WSuf` (the initial `/` character should be included).

---------------

## Non-Branch Links
There are instances where non-branch links are detected by the plugin but not processed.
You can retrieve the url by implementing the method `NonBranchLinkHandler()` which will act as our callback to return the non-branch url.

To implement:

```js
function NonBranchLinkHandler(data) {
    if (data) {
        alert('Non-Branch Link Detected: ' + JSON.stringify(data));
    }
}
```
---------------

## Plugin Methods

**Most methods are promisified**, therefore you can easily get its success and error callback by chaining `.then()` method.

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
  + [initSession](#initSession)
  + [setMixpanelToken](#setMixpanelToken)
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
4. FAQ
  + [Android Build FAQ](#android-build-faq)

### <a id="initSession"></a>initSession()

Initializes the branch instance.

##### Usage
The `initSession()` method automatically also sets an internal deep link hander whose data can be accesed by implementing the **required** `DeepLinkHandler()` method. To implement, first call the method `initSession`:

```js
onDeviceReady: function() {
    Branch.initSession().then(function (res) {
        console.log(res);
        alert('Response: ' + JSON.stringify(res));
    }).catch(function (err) {
        console.error(err);
        alert('Error: ' + JSON.stringify(err));
    });;;
},
initialize: function() {
    document.addEventListener('deviceready', onDeviceReady, false);
},
```

Then you should **EXPLICITLY** define a global method called `DeepLinkHandler()` which will act as our callback when the session beings. The deep link data will be included here:

```js
function DeepLinkHandler(data) {
    if (data) {
        alert('Data from deep link: ' + JSON.stringify(data));
    } else {
        alert('No data found');
    }
}
```

### <a id="setMixpanelToken"></a>setMixpanelToken()

Allow Branch SDK to pass the user's Mixpanel distinct id to our servers. Branch will then pass that Distinct ID to Mixpanel when logging any event.
**Note:** This should be initialized first before `initSession()` or else Mixpanel integration won't work.

##### Usage

```js
Branch.setMixpanelToken('<your-mixpanel-token-here>');
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
Branch.logout().then(function (res) {
    console.log(res);
}).catch(function (err) {
    console.error(err);
});
```

### <a id="userCompletedAction"></a>userCompletedAction(action[, metaData])

Registers custom events.

**Parameters**

**action**: `string` - A string for your custom action (e.g. "completed_purchase", "wrote_message", etc.)

**metaData**: `object` _[Optional]_ - Custom values to be passed with the action

##### Usage
```js
Branch.userCompletedAction('complete_purchase').then(function (res) {
    console.log(res);
}).catch(function (err) {
    console.error(err);
});

Branch.userCompletedAction('registered', { user: 'Test' }).then(function (res) {
    console.log(res);
}).catch(function (err) {
    console.error(err);
});
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
  contentType: 'text',
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
| feature  | `string` | This is the feature of your app that the link might be associated with. eg: if you had built a referral program, you would label links with the feature `referral`
| alias    | `string` | Specify a link alias in place of the standard encoded short URL (e.g., `[branchsubdomain]/youralias or yourdomain.co/youralias)`. Link aliases are unique, immutable objects that cannot be deleted. **Aliases on the legacy `bnc.lt` domain are incompatible with Universal Links and Spotlight**
| channel  | `string` | Use channel to tag the route that your link reaches users. For example, tag links with ‘Facebook’ or ‘LinkedIn’ to help track clicks and installs through those paths separately
| stage    | `string` |   Use this to categorize the progress or category of a user when the link was generated. For example, if you had an invite system accessible on level 1, level 3 and 5, you could differentiate links generated at each level with this parameter
| duration |  `int`   | duration of the link.

**controlParameters**: `object` - Link properties needed to generate the URL.

|        KEY         |   TYPE   |       MEANING
| ------------------ | -------- | --------------------
| $fallback_url      | `string` | Change the redirect endpoint for all platforms - so you don’t have to enable it by platform
| $desktop_url       | `string` | Change the redirect endpoint on desktops  
| $android_url       | `string` | Change the redirect endpoint for Android
| $ios_url           | `string` | Change the redirect endpoint for iOS
| $ipad_url          | `string` | Change the redirect endpoint for iPads
| $fire_url          | `string` | Change the redirect endpoint for Amazon Fire OS 
| $blackberry_url    | `string` | Change the redirect endpoint for Blackberry OS
| $windows_phone_url | `string` | Change the redirect endpoint for Windows OS

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

![Android Share Sheet](https://dev.branch.io/img/pages/getting-started/branch-universal-object/android_share_sheet.png)

**Sample UIActivityView Share Sheet**

![UIActivityView Share Sheet](https://dev.branch.io/img/pages/getting-started/branch-universal-object/ios_share_sheet.png)

The Branch iOS SDK includes a wrapper on the UIActivityViewController, that will generate a Branch short URL and automatically tag it with the channel the user selects (Facebook, Twitter, etc.).

**Parameters**

**options**: `object` - Options needed to generate the URL.

|    KEY   |   TYPE   |          MEANING
| -------- | -------- |------------------------
| feature  | `string` | This is the feature of your app that the link might be associated with. eg: if you had built a referral program, you would label links with the feature `referral`.
| alias    | `string` | Specify a link alias in place of the standard encoded short URL (e.g., `[branchsubdomain]/youralias or yourdomain.co/youralias)`. Link aliases are unique, immutable objects that cannot be deleted. **Aliases on the legacy `bnc.lt` domain are incompatible with Universal Links and Spotlight**
| channel  | `string` | Use channel to tag the route that your link reaches users. For example, tag links with ‘Facebook’ or ‘LinkedIn’ to help track clicks and installs through those paths separately
| stage    | `string` |   Use this to categorize the progress or category of a user when the link was generated. For example, if you had an invite system accessible on level 1, level 3 and 5, you could differentiate links generated at each level with this parameter
| duration |  `int`   | duration of the link.

**controlParameters**: `object` - Link properties needed to generate the URL.

|        KEY         |   TYPE   |       MEANING
| ------------------ | -------- | --------------------
| $fallback_url      | `string` | Change the redirect endpoint for all platforms - so you don’t have to enable it by platform
| $desktop_url       | `string` | Change the redirect endpoint on desktops  
| $android_url       | `string` | Change the redirect endpoint for Android
| $ios_url           | `string` | Change the redirect endpoint for iOS
| $ipad_url          | `string` | Change the redirect endpoint for iPads
| $fire_url          | `string` | Change the redirect endpoint for Amazon Fire OS 
| $blackberry_url    | `string` | Change the redirect endpoint for Blackberry OS
| $windows_phone_url | `string` | Change the redirect endpoint for Windows OS

**shareText**: `string` - Custom share text

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
}, 'Custom share text: ');
```

##### Share Sheet Callbacks

**NOTE: Share sheet callbacks must be declared first before executing `showShareSheet` or else it won't be able to catch the `event's first trigger`.**

To implement the callback, you must add listeners to the following events:

###### onShareSheetLaunched (Android ONLY)

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

###### onChannelSelected (Android ONLY)

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

### <a id="loadRewards"></a>loadRewards([bucket])

Reward balances change randomly on the backend when certain actions are taken (defined by your rules), so you'll need to make an asynchronous call to retrieve the balance. Here is the syntax:

**Parameters**

**bucket**: `String` _[Optional]_ - Load rewards of a specific bucket. If no value provided it will use the `default` bucket.

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
[
    {
        "transaction": {
                           "date": "2014-10-14T01:54:40.425Z",
                           "id": "50388077461373184",
                           "bucket": "default",
                           "type": 0,
                           "amount": 5
                       },
        "event" : {
            "name": "event name",
            "metadata": { your event metadata if present }
        },
        "referrer": "12345678",
        "referree": null
    },
    {
        "transaction": {
                           "date": "2014-10-14T01:55:09.474Z",
                           "id": "50388199301710081",
                           "bucket": "default",
                           "type": 2,
                           "amount": -3
                       },
        "event" : {
            "name": "event name",
            "metadata": { your event metadata if present }
        },
        "referrer": null,
        "referree": "12345678"
    }
]
```

**referrer**

The id of the referring user for this credit transaction. Returns null if no referrer is involved. Note this id is the user id in developer's own system that's previously passed to Branch's identify user API call.

**referree**

The id of the user who was referred for this credit transaction. Returns null if no referree is involved. Note this id is the user id in developer's own system that's previously passed to Branch's identify user API call.

**type**

This is the type of credit transaction
1. 0 - A reward that was added automatically by the user completing an action or referral
2. 1 - A reward that was added manually
3. 2 - A redemption of credits that occurred through our API or SDKs
4. 3 - This is a very unique case where we will subtract credits automatically when we detect fraud


## Android Build FAQ

1. Gradle build cannot find `io.branch.sdk.android:library:1.+` dependency:

Go to your `build.gradle` file and find **dependencies** and add the following inside:

```
compile "io.branch.sdk.android:library:1.+"
```

## Bugs / Help / Support

Feel free to report any bugs you might encounter in the repo's issues. Any support inquiries outside of bugs
please send to [support@branch.io](mailto:support@branch.io).
