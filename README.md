#branch-io-sdk

> Branch Metrics Cordova SDK

## What is this?

This Cordova plugin allows you to call Branch.IO API Endpoints, this shares almost the same code base as the Branch Web SDK.

## Installation

There are multiple ways to add the plugin in to your app.

Thru Cordova

```
cordova plugin install io.branch.sdk --variable BRANCH_LIVE_KEY=your-branch-key --variable APP_NAME=your-app-name
```

Thru Phonegap

```
phonegap plugin add io.branch.sdk --variable BRANCH_LIVE_KEY=your-branch-key --variable APP_NAME=your-app-name
```

## Testbed App

This repo includes a testbed app, that demonstrates all the features of the plugin. Please refer to the `README` inside the `testbed` folder.

---------------

## Methods

### initSession()

Initialize branch session

##### Sample
```
Branch.initSession().then(function (res) {
    // Success callback
    console.log(res);
}, function (err) {
    // Error callback
    console.error(err);
});
```

### setDebug(boolean)

Sets the library to function in debug mode, enabling logging of all requests.
If you want to flag debug, call this **before** `initUserSession`

##### Sample
```
Branch.setDebug(true);
```

### getFirstReferringParams()

Returns the parameters associated with the link that referred the user.
This is only set once, the first time the user is referred by a link.
Think of this as the user referral parameters.
It is also only set if isReferrable is equal to true, which by default is only true on a fresh install (not upgrade or reinstall).
This will change on setIdentity (if the user already exists from a previous device) and logout.

##### Sample
```
Branch.getFirstReferringParams().then(function (res) {
    // Success Callback
    console.log(res);
}, function (err) {
    // Error Callback
    console.error(err);
});
```

### getLatestReferringParams()

Returns the parameters associated with the link that referred the session.
If a user clicks a link, and then opens the app, initSession will return the paramters
of the link and then set them in as the latest parameters to be retrieved by this method.
By default, sessions persist for the duration of time that the app is in focus.
For example, if you minimize the app, these parameters will be cleared when closeSession is called.

##### Sample
```
Branch.getLatestReferringParams().then(function (res) {
    // Success Callback
    console.log(res);
}, function (err) {
    // Error Callback
    console.error(err);
});
```

### setIdentity(object)

Identifies the current user to the Branch API by supplying a unique identifier as a String value.

##### Sample
```
Branch.setIdentity("new_identity");
```

### logout()

Logs out the current session, replaces session IDs and identity IDs.

##### Sample
```
Branch.logout();
```

### userCompletedAction(action[, metaData])

A void call to indicate that the user has performed a specific action and for that to be reported to the Branch API.

##### Sample
```
Branch.userCompletedAction("registered");
```

### createBranchUniversalObject(object)

Create an unverisal Branch object.

##### object

    --------------------------------------------------------------
    |          KEY          |    TYPE    |      DESCRIPTION      |
    --------------------------------------------------------------
    |  canonicalIdentifier  |   String   | The object identifier |
    |         title         |   String   |   The object title    |
    |  contentDescription   |   String   |  Object description   |
    |    contentImageUrl    |   String   |     The image URL     |
    |  contentIndexingMode  |   String   |    Indexing Mode      |
    |                       |            |('private' or 'public')|
    |    contentMetadata    |   Object   |   Custom key/value    |
    --------------------------------------------------------------

##### Sample
```
var branchObj = Branch.createBranchUniversalObject({
                    canonicalIdentifier: 'identifier',
                    title: 'Just another title',
                    contentDescription: 'Just another description',
                    contentImageUrl: '/img.jpg',
                    contentIndexingMode: 'public'
                });
```

### loadRewards()

##### Sample

### redeemRewards(int)

##### Sample

### creditHistory()

##### Sample

---------------
