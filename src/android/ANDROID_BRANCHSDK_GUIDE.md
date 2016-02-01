#ANDROID_BRANCHSDK_GUIDE

> Android Cordova SDK

## What is this?

This is the Android source code for Branch SDK plugin.

## NOTE

All methods were incorporated to Cordova, therefore it's not advisable to extend this class for other purposes.
**Also all methods returns are done with Cordova promise callbacks**.

## Register your BranchSDK.IO app

You can sign up for your own Branch key at [https://dashboard.BranchSDK.io](https://dashboard.BranchSDK.io).

---------------

## SDK Methods

The following are the Android implementation for Android Cordova SDK.

1. Branch Session
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
3. Referral System Rewarding
  + [loadRewards](#loadRewards)
  + [redeemRewards](#redeemRewards)
  + [creditHistory](#creditHistory)

### <a id="initSession"></a>initSession()

Initializes the branch instance. `setDebug()` should be called first before calling this method.

##### Usage
```js
BranchSDK.initSession();
```

### <a id="setDebug"></a>setDebug(isEnable)

Sets the library to function in debug mode, enabling logging of all requests. If you want to flag debug, call this <b>before</b> initUserSession

**Parameters**

**options**: `boolean` - Boolean flag if debug mode should be enabled or not.

##### Usage
```js
BranchSDK.setDebug(true);
```

### <a id="getFirstReferringParams"></a>getFirstReferringParams()

Returns the parameters associated with the link that referred the user. This is only set once, the first time the user is referred by a link. Think of this as the user referral parameters. It is also only set if isReferrable is equal to true, which by default is only true on a fresh install (not upgrade or reinstall). This will change on setIdentity (if the user already exists from a previous device) and logout.

##### Usage
```js
BranchSDK.getFirstReferringParams();
```

### <a id="getLatestReferringParams"></a>getLatestReferringParams()

Returns the parameters associated with the link that referred the session. If a user clicks a link, and then opens the app, initSession will return the paramters of the link and then set them in as the latest parameters to be retrieved by this method. By default, sessions persist for the duration of time that the app is in focus. For example, if you minimize the app, these parameters will be cleared when closeSession is called.

##### Usage
```js
BranchSDK.getLatestReferringParams();
```

### <a id="setIdentity"></a>setIdentity(object)

Identifies the current user to the Branch API by supplying a unique identifier as a String value.

**Parameters**

**identity**: `string` - A string uniquely identifying the user, ofetn a user ID or email address.

##### Usage
```js
BranchSDK.setIdentity("new_identity");
```

### <a id="logout"></a>logout()

This method should be called if you know that a different person is about to use the app. For example, if you allow users to log out and let their friend use the app, you should call this to notify Branch to create a new user for this device. This will clear the first and latest params, as a new session is created.

##### Usage
```js
BranchSDK.logout();
```

### <a id="userCompletedAction"></a>userCompletedAction(action[, metaData])

A void call to indicate that the user has performed a specific action and for that to be reported to the Branch API.

**Parameters**

**action**: `string` - A string for your custom action (e.g. "completed_purchase", "wrote_message", etc.)

**metaData**: `JSONObject` _[Optional]_ - Custom values to be passed with the action

##### Usage
```js
JSONObject opts = new JSONObject();

opts.put('user', 'Test');

BranchSDK.userCompletedAction('complete_purchase');
BranchSDK.userCompletedAction('registered', opts);
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

**options**: `JSONObject` - Options in creating object.

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
JSONObject opts = new JSONObject();

opts.put('canonicalIdentifier', 'identifier');
opts.put('title', 'Just another title');
opts.put('contentDescription', 'And also another description');
opts.put('contentImageUrl', 'https://imgur.com/jd1Wr');
opts.put('contentIndexingMode', 'public');

BranchSDK.createBranchUniversalObject(opts);
```

### <a id="registerView"></a>registerView()

If you want to track how many times a user views a particular piece of content, you can call this method in `viewDidLoad` or `viewDidAppear`
to tell Branch that this content was viewed.

##### Usage
```js
BranchSDK.registerView();
```

### <a id="generateShortUrl"></a>generateShortUrl(options, controlParameters)

Once you've created your `Branch Universal Object`, which is the reference to the content you're interested in, you can then get a link back to it with the mechanism described below.

**Parameters**

**options**: `JSONObject` - Options needed to generate the URL.

|    KEY   |   TYPE   |          MEANING
| -------- | -------- |------------------------
| feature  | `string` | The feature of the link
| alias    | `string` | The alias of the link
| channel  | `string` | The channel of the link
| stage    | `string` | The stage of the link
| duration |  `int`   | duration of the link.

**controlParameters**: `JSONObject` - Link properties needed to generate the URL.

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
JSONObject opts = new JSONObjec();
JSONObject ctrlParams = new JSONObjec();

opts.put('feature', 'sample-feature');
opts.put('alias', 'sample-feature');

ctrlParams.put('desktop_url', 'sample-url');

BranchSDK.generateShortUrl(opts, ctrlParams);
```

### <a id="showShareSheet"></a>showShareSheet(options, controlParameters)

Display a popup of the share sheet.

**Sample Android Share Sheet**

![Android Share Sheet](https://dev.BranchSDK.io/img/ingredients/sdk_links/android_share_sheet.png)

**Parameters**

**options**: `JSONObject` - Options needed to generate the URL.

|    KEY   |   TYPE   |          MEANING
| -------- | -------- |------------------------
| feature  | `string` | The feature of the link
| alias    | `string` | The alias of the link
| channel  | `string` | The channel of the link
| stage    | `string` | The stage of the link
| duration |  `int`   | duration of the link.

**controlParameters**: `JSONObject` - Link properties needed to generate the URL.

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
JSONObject opts = new JSONObject();
JSONObject ctrlParams = new JSONObject();

opts.put('feature', 'sample-feature');
opts.put('alias', 'sample-alias');
opts.put('channel', 'sample-channel');
opts.put('stage', 'sample-stage');
opts.put('duration', 1);

ctrlParams.put('$desktop_url', 'http://desktop-url.com');

BranchSDK.showShareSheet(opts, ctrlParams);
```

-------

## Referral System Rewarding

### <a id="loadRewards"></a>loadRewards()

Redeems the specified number of credits from the "default" bucket, if there are sufficient credits within it. If the number to redeem exceeds the number available in the bucket, all of the available credits will be redeemed instead.

##### Usage
```js
BranchSDK.loadRewards();
```

### <a id="redeemRewards"></a>redeemRewards(value)

Redeems a reward with the given amount/value.

**Parameters**

**value**: `int` - Amount to be redeemed.

##### Usage
```js
BranchSDK.redeemRewards(100);
```

### <a id="creditHistory"></a>creditHistory()

This call will retrieve the entire history of credits and redemptions from the individual user. To use this call, implement like so:

##### Usage
```js
BranchSDK.creditHistory();
```

## Bugs / Help / Support

Feel free to report any bugs you might encounter in the repo's issues. Any support inquiries outside of bugs
please send to [support@BranchSDK.io](mailto:support@BranchSDK.io).
