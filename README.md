#branch-io-sdk

> Branch Metrics Cordova SDK

## What is this?

This Cordova plugin allows you to call Branch.IO API Endpoints, this shares almost the same code base as the Branch Web SDK.

## Register your Branch.IO app

You can sign up for your own Branch key at [https://dashboard.branch.io](https://dashboard.branch.io).

## Installation

There are multiple ways to add the plugin in to your app.

Thru Cordova

```sh
cordova plugin install branch-cordova-sdk --variable BRANCH_LIVE_KEY=your-branch-key --variable APP_NAME=your-app-name
```

Thru Phonegap

```sh
phonegap plugin add branch-cordova-sdk --variable BRANCH_LIVE_KEY=your-branch-key --variable APP_NAME=your-app-name
```

Thru NPM
```sh
npm install branch-cordova-sdk
```

## Additional App Permissions

Some

## Demo App

This repo includes a testbed app, that demonstrates all the features of the plugin. Please refer to the `README` inside the `testbed` folder.

---------------

## Plugin Methods

**All methods are promisified**, therefore you can easily get its success and error callback by chaining `.then()` method.

Example
```js
Branch.initSession().then(function (res) {
  // Success Callback
  console.log(res);
}, function (err) {
  // Error Callback
  console.error(err);
});
```

### initSession()

Initializes the branch instance. `setDebug()` should be called first before calling this method.

##### Usage
```js
Branch.initSession();
```

### setDebug(isEnable)

Setting the SDK debug flag will generate a new device ID each time the app is installed instead of possibly using the same device id.
This is useful when testing.

**Parameters**

**options**: `boolean` - Boolean flag if debug mode should be enabled or not.

##### Usage
```js
Branch.setDebug(true);
```

### getFirstReferringParams()

Retrieves the install session parameters.

##### Usage
```js
Branch.getFirstReferringParams();
```

### getLatestReferringParams()

Retrieves the session (install or open) parameters.

##### Usage
```js
Branch.getLatestReferringParams();
```

### setIdentity(object)

Sets the identity of a user and returns the data. To use this function,
pass a unique string that identifies the user - this could be an email address, UUID, Facebook ID, etc.

**Parameters**

**identity**: `string` - A string uniquely identifying the user, ofetn a user ID or email address.

##### Usage
```js
Branch.setIdentity("new_identity");
```

### logout()

Logs out the current session, replaces session IDs and identity IDs.

##### Usage
```js
Branch.logout();
```

### userCompletedAction(action[, metaData])

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

### createBranchUniversalObject(object)

Create an unverisal Branch object.

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
var branchObj = null;

Branch.createBranchUniversalObject({
    canonicalIdentifier: 'identifier',
    title: 'Just another title',
    contentDescription: 'Just another description',
    contentImageUrl: '/img.jpg',
    contentIndexingMode: 'public'
}).then(function (branchInstance) {
    // Success Callback
    branchObj = branchInstance;
}, function (err) {
    // Error Callback
    console.error(err);
});
```

### registerView()

If you want to track how many times a user views a particular piece of content, you can call this method in `viewDidLoad` or `viewDidAppear`
to tell Branch that this content was viewed.

##### Usage
```js
branchObj.registerView();
```

### generateShortUrl(options, controlParameters)

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
branchObj.generateShortUrl({
  "feature" : "sample-feature",
  "alias" : "sample-alias",
  "channel" : "sample-channel",
  "stage" : "sample-stage"
}, {
  "$desktop_url" : "http://desktop-url.com",
}).then(function (generatedUrl) {
    // Success Callback
    console.log(generatedUrl);
}, function (err) {
    // Error Callback
    console.error(err);
});
```

### showShareSheet(options, controlParameters)

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
branchUniversalObject.showShareSheet({
  "feature" : "sample-feature",
  "alias" : "sample-alias",
  "channel" : "sample-channel",
  "stage" : "sample-stage",
  "duration" : 1,
}, {
  "$desktop_url" : "http://desktop-url.com",
});
```

##### Event Callback
To implement some event callback such as `onShareDialogClose` or `onShareDialogInitialize`, you must add listeners to the following events:

`bio:shareLinkDialogLaunched`
- The event fires when the share sheet is presented.

`bio:shareLinkDialogDismissed`
- The event fires when the share sheet is dismissed.

`bio:shareLinkResponse`
- The event returns a dictionary of the response data.

`bio:shareChannelSelected`
- The event fires a channel is selected.

**Note:** Callbacks in iOS are ignored. There is no need to implement them as the events are handled by `UIActivityViewController`.

**Note:** Avoid passing `alias` in iOS. Adding an `alias` key in the `options` parameter will return a Non-Universal link which will not work in iOS 9.2.

-------

## Referral System Rewarding

### loadRewards()

Reward balances change randomly on the backend when certain actions are taken (defined by your rules), so you'll need to make an asynchronous call to retrieve the balance. Here is the syntax:

##### Usage
```js
Branch.loadRewards();
```

### redeemRewards(value)

Redeems a reward with the given amount/value.

**Parameters**

**value**: `int` - Amount to be redeemed.

##### Usage
```js
Branch.redeemRewards(100);
```

### creditHistory()

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

## Bugs / Help / Support

Feel free to report any bugs you might encounter in the repo's issues. Any support inquiries outside of bugs
please send to [support@branch.io](mailto:support@branch.io).
