<h1 align="center">
  <a href="https://branch.io"><img src="http://i.imgur.com/Y5EPQTo.png" alt="Branch for Cordova/PhoneGap/Ionic" width="550"></a>
</h1>
<p align="center">
  <a href="https://travis-ci.org/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking"><img src="https://img.shields.io/travis/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/master.svg" alt="Travis"></a>
  <a href="https://www.npmjs.com/package/branch-cordova-sdk"><img src="https://img.shields.io/npm/dt/branch-cordova-sdk.svg" alt="npm downloads"></a>
  <a href="https://www.npmjs.com/package/branch-cordova-sdk"><img src="https://img.shields.io/npm/v/branch-cordova-sdk.svg" alt="npm version"></a>
  <a href="https://www.npmjs.com/package/branch-cordova-sdk"><img src="https://img.shields.io/npm/l/branch-cordova-sdk.svg" alt="npm version"></a>
</p>

> Hyperlinks can navigate to your website, but not to your app. Branch fixes this with deep links.

> Branch will grow your app by allowing users to install, open, and navigate to content inside your app.

> Increase discovery of your app by sharing its content, converting web users to app users, enabling user-to-user sharing, personalizing user experiences, tracking users, tracking referrals, tracking campaigns, tracking conversions, and increasing overall engagement.

<p align="center">
  <a href="https://youtu.be/MXgLQ8QDXk8"><img src="http://i.imgur.com/NF2NEDn.gif"/></a>
</p>

# Branch for Cordova, PhoneGap, and Ionic
*Questions? [Contact us](https://support.branch.io/support/tickets/new)*

- [Getting Started](#getting-started)
  - [Configure Branch](#configure-branch)
  - [Configure App](#configure-app)
  - [Initialize Branch](#initialize-branch)
  - [Test Deep Link iOS](#test-deep-link-ios)
  - [Test Deep Link Android](#test-deep-link-android)
- [Features](#features)
  - [Initialize Branch Features](#initialize-branch-features)
  - [Create Content Reference](#create-content-reference)
  - [Create Deep Link](#create-deep-link)
  - [Share Deep Link](#share-deep-link)
  - [Read Deep Link](#read-deep-link)
  - [Display Content](#display-content)
  - [Track Content](#track-content)
  - [Track User](#track-user)
  - [Track Event](#track-event)
  - [Handle Referrals](#handle-referrals)
- [Troubleshooting](#troubleshooting)
  - [Testing: Key Points](#testing-key-points)
  - [Testing: Optional App Config](#testing-optional-app-config)
  - [Testing: Branch Analytics](#testing-branch-analytics)
  - [Testing: Simulating an Install](#testing-simulating-an-install)
  - [Testing: Supported Platforms](#testing-supported-platforms)  
  - [Testing: Sample Test App](#testing-sample-test-app)
  - [Link Data: Universal Object Properties](#link-data-universal-object-properties)
  - [Link Data: Deep Link Properties](#link-data-deep-link-properties)
  - [Compiling: Cordova Dependencies](#compiling-cordova-dependencies)
  - [Compiling: Show Console Logs](#compiling-show-console-logs)
  - [Compiling: Updating Branch SDK](#compiling-updating-branch-sdk)
  - [Compiling: Incompatible Plugins](#compiling-incompatible-plugins)  
  - [Compiling: Errors](#compiling-errors)

## Getting Started

- #### Configure Branch

  - Complete your [Branch Dashboard](https://dashboard.branch.io/settings/link)

    ![image](http://i.imgur.com/wazVu3U.png)
    ![image](http://i.imgur.com/9PEylbS.png)

- #### Configure App

  - Cordova and Ionic
    ```xml
    <!-- sample config.xml -->
    <widget id="com.eneff.branch.cordovatestbed" version="0.0.1" xmlns="http://www.w3.org/ns/widgets" xmlns:cdv="http://cordova.apache.org/ns/1.0">
      <!-- Branch -->
      <plugin name="branch-cordova-sdk" spec="^2.5.0" />
      <branch-config>
        <branch-key value="key_live_ndqptlgXNE4LHqIahH1WIpbiyFlb62J3" />
        <uri-scheme value="branchcordova" />
        <link-domain value="cordova.app.link" />
        <ios-team-release value="PW4Q8885U7" />
      </branch-config>
    ```

  - PhoneGap
    ```xml
    <!-- sample config.xml -->
    <widget id="com.eneff.branch.cordovatestbed" version="1.0.0" xmlns="http://www.w3.org/ns/widgets" xmlns:gap="http://phonegap.com/ns/1.0">
      <!-- Branch -->
      <plugin name="branch-cordova-sdk" spec="^2.5.0" />
      <branch-config>
        <branch-key value="key_live_ndqptlgXNE4LHqIahH1WIpbiyFlb62J3" />
        <uri-scheme value="branchcordova" />
        <link-domain value="cordova.app.link" />
        <ios-team-release value="PW4Q8885U7" />
      </branch-config>
    ```

  - Change the following values to match your [Branch Dashboard](https://dashboard.branch.io/settings/link)
    - `com.eneff.branch.cordovatestbed`
    - `key_live_ndqptlgXNE4LHqIahH1WIpbiyFlb62J3`
    - `branchcordova`
    - `cordova.app.link`
    - `PW4Q8885U7`

- #### Initialize Branch

  - Cordova and PhoneGap
    ```js
    // sample index.js
    var app = {
      initialize: function() {
        this.bindEvents();
      },
      bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener('resume', this.onDeviceResume, false);
      },
      onDeviceReady: function() {
        app.branchInit();
      },
      onDeviceResume: function() {
        app.branchInit();
      },
      branchInit: function() {
        // Branch initialization
        Branch.initSession(function(data) {
          // read deep link data on click
          alert('Deep Link Data: ' + JSON.stringify(data));
        });
      }
    };

    app.initialize();
    ```

  - Ionic 1
    ```js
    // sample app.js
    angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

    .run(function($ionicPlatform) {
      $ionicPlatform.ready(function() {
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
          cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
          StatusBar.styleDefault();
        }

        // Branch
        $ionicPlatform.on('deviceready', function() {
          branchInit();
        });

        $ionicPlatform.on('resume', function() {
          branchInit();
        });

        function branchInit() {
          // Branch initialization
          Branch.initSession(function(data) {
            // read deep link data on click
            alert('Deep Link Data: ' + JSON.stringify(data));
          });
        }
      });
    })
    // ...
    ```

  - Ionic 2/3
    ```typescript
    // sample app.component.js
    import { Component } from '@angular/core';
    import { Platform } from 'ionic-angular';
    import { StatusBar, Splashscreen } from 'ionic-native';

    import { TabsPage } from '../pages/tabs/tabs';

    // Branch import
    declare var Branch;

    @Component({
      template: `<ion-nav [root]="rootPage"></ion-nav>`
    })
    export class MyApp {
      rootPage = TabsPage;

      constructor(platform: Platform) {
        platform.ready().then(() => {
          StatusBar.styleDefault();
          Splashscreen.hide();
          branchInit();
        });

        platform.resume.subscribe(() => {
          branchInit();
        });

        // Branch initialization
        const branchInit = () => {
          // only on devices
          if (!platform.is('cordova')) { return }
          Branch.initSession(data => {
            // read deep link data on click
            alert('Deep Link Data: ' + JSON.stringify(data));
          });
        }
      }
    }
    ```

- #### Test Deep Link iOS

  - Create a deep link from the [Branch Marketing Dashboard](https://dashboard.branch.io/marketing)

  - Delete your app from the device

  - Compile your app *(`cordova run ios` `phonegap run ios` `ionic run ios`)*

  - Paste deep link in `Apple Notes`

  - Long press on the deep link *(not 3D Touch)*

  - Click `Open in "APP_NAME"` to open your app *([example](http://i.imgur.com/VJVICXd.png))*

- #### Test Deep Link Android

  - Create a deep link from the [Branch Marketing Dashboard](https://dashboard.branch.io/marketing)

  - Delete your app from the device

  - Compile your app *(`cordova run android` `phonegap run android` `ionic run android`)*

  - Paste deep link in `Google Hangouts`

  - Click on the deep link to open your app

## Features

- #### Initialize Branch Features

  - Loads Branch into your app

  - Must be called on `deviceready` and `resume`

    ```js
    // for development and debugging only
    Branch.setDebug(true)

    // sync with Mixpanel if installed
    Branch.setMixpanelToken('your_mixpanel_token')

    // Branch initialization
    Branch.initSession(function(data) {
      // read deep link data on click
      alert('Deep Link Data: ' + JSON.stringify(data))
    }).then(function(res) {
      alert('Response: ' + JSON.stringify(res))
    }).catch(function(err) {
      alert('Error: ' + JSON.stringify(err))
    })
    ```

- #### Create Content Reference

  - The `Branch Universal Object` encapsulates the thing you want to share (content or user)

  - Link Data: [Universal Object Properties](#link-data-universal-object-properties)

    ```js
    // only canonicalIdentifier is required
    var properties = {
      canonicalIdentifier: 'content/123',
      canonicalUrl: 'https://example.com/content/123',
      title: 'Content 123 Title',
      contentDescription: 'Content 123 Description ' + Date.now(),
      contentImageUrl: 'http://lorempixel.com/400/400/',
      price: 12.12,
      currency: 'GBD',
      contentIndexingMode: 'private',
      contentMetadata: {
        custom: 'data',
        testing: 123,
        this_is: true
      }
    }

    // create a branchUniversalObj variable to reference with other Branch methods
    var branchUniversalObj = null
    Branch.createBranchUniversalObject(properties).then(function (res) {
      branchUniversalObj = res
      alert('Response: ' + JSON.stringify(res))
    }).catch(function (err) {
      alert('Error: ' + JSON.stringify(err))
    })
    ```

- #### Create Deep Link

  - Creates a deep link URL with encapsulated data

  - Needs a [Branch Universal Object](#create-content-reference)

  - Link Data: [Deep Link Properties](#link-data-deep-link-properties)

    ```js
    // optional fields
    var analytics = {
      channel: 'facebook',
      feature: 'onboarding',
      campaign: 'content 123 launch',
      stage: 'new user',
      tags: ['one', 'two', 'three']
    }

    // optional fields
    var properties = {
      $desktop_url: 'http://www.example.com/desktop',
      $android_url: 'http://www.example.com/android',
      $ios_url: 'http://www.example.com/ios',
      $ipad_url: 'http://www.example.com/ipad',
      $deeplink_path: 'content/123',
      $match_duration: 2000,
      custom_string: 'data',
      custom_integer: Date.now(),
      custom_boolean: true,
      custom_array: [1, 2, 3, 4, 5],
      custom_object: { 'random': 'dictionary' }
    }

    branchUniversalObj.generateShortUrl(analytics, properties).then(function (res) {
      alert('Response: ' + JSON.stringify(res.url))
    }).catch(function (err) {
      alert('Error: ' + JSON.stringify(err))
    })
    ```

- #### Share Deep Link

  -  Will generate a Branch deep link and tag it with the channel the user selects

  - Needs a [Branch Universal Object](#create-content-reference)

  - Link Data: [Deep Link Properties](#link-data-deep-link-properties)

    ```js
    // optional fields
    var analytics = {
      channel: 'facebook',
      feature: 'onboarding',
      campaign: 'content 123 launch',
      stage: 'new user',
      tags: ['one', 'two', 'three']
    }

    // optional fields
    var properties = {
      $desktop_url: 'http://www.example.com/desktop',
      custom_string: 'data',
      custom_integer: Date.now(),
      custom_boolean: true,
      custom_array: [1, 2, 3, 4, 5],
      custom_object: { 'random': 'dictionary' }
    }

    var message = 'Check out this link'

    // optional listeners (must be called before showShareSheet)
    branchUniversalObj.onShareSheetLaunched(function (res) {
      // android only
      console.log(res)
    })
    branchUniversalObj.onShareSheetDismissed(function (res) {
      console.log(res)
    })
    branchUniversalObj.onLinkShareResponse(function (res) {
      console.log(res)
    })
    branchUniversalObj.onChannelSelected(function (res) {
      // android only
      console.log(res)
    })

    // share sheet
    branchUniversalObj.showShareSheet(analytics, properties, message)
    ```

- #### Read Deep Link

  - Retrieve Branch data from a deep link

  - Best practice to receive data from the `listener`

  - Listener
    ```js
    // Branch initialization within your deviceready and resume
    Branch.initSession(function(deepLinkData) {
      // handler for deep link data on click
      alert('Response: ' + JSON.stringify(deepLinkData))
    })
    ```

  - First data
    ```js
    Branch.getFirstReferringParams().then(function(res) {
      alert('Response: ' + JSON.stringify(res))
    }).catch(function(err) {
      alert('Error: ' + JSON.stringify(err))
    })
    ```

  - Latest data
    ```js
    Branch.getLatestReferringParams().then(function(res) {
      alert('Response: ' + JSON.stringify(res))
    }).catch(function(err) {
      alert('Error: ' + JSON.stringify(err))
    })
    ```

- #### Display Content

  - List content on iOS Spotlight

  - Needs a [Branch Universal Object](#create-content-reference)

    ```js
    branchUniversalObj.listOnSpotlight().then(function (res) {
      alert('Response: ' + JSON.stringify(res))
    }).catch(function (err) {
      alert('Error: ' + JSON.stringify(err))
    })
    ```

- #### Track Content

  - Track how many times a user views a particular piece of content

  - Needs a [Branch Universal Object](#create-content-reference)

    ```js
    branchUniversalObj.registerView().then(function (res) {
      alert('Response: ' + JSON.stringify(res))
    }).catch(function (err) {
      alert('Error: ' + JSON.stringify(err))
    })
    ```

- #### Track User

  - Sets the identity of a user (email, ID, UUID, etc) for events, deep links, and referrals

    ```js
    var userId = '123456'
    Branch.setIdentity(userId).then(function (res) {
      alert('Response: ' + JSON.stringify(res))
    }).catch(function (err) {
      alert('Error: ' + JSON.stringify(err.message))
    })
    ```

  - Removes the identity of a user

    ```js
    Branch.logout().then(function (res) {
      alert('Response: ' + JSON.stringify(res))
    }).catch(function (err) {
      alert('Error: ' + JSON.stringify(err.message))
    })
    ```

- #### Track Event

  - Registers custom events
  
  - Events named `open`, `close`, `install`, and `referred session` are Branch restricted

  - Recommened to [Track User](#track-user) before [Track Event](#track-event) to associate custom events with a user

    ```js
    var eventName = 'clicked_on_this'
    var metadata = { 'custom_dictionary': 123, 'anything': 'everything' }
    Branch.userCompletedAction(eventName, metaData).then(function (res) {
      alert('Response: ' + JSON.stringify(res))
    }).catch(function (err) {
      alert('Error: ' + JSON.stringify(err.message))
    })
    ```

    ```js
    var eventName = 'clicked_on_this'
    Branch.userCompletedAction(eventName).then(function (res) {
      alert('Response: ' + JSON.stringify(res))
    }).catch(function (err) {
      alert('Error: ' + JSON.stringify(err.message))
    })
    ```

- #### Handle Referrals

  - Referral points are obtained from events triggered by users from rules created on the [Branch Dashboard](https://dashboard.branch.io/referrals/rules)

  - Get credits

    - Referrer is [tracked](#track-user)

    - Referrer [creates a deep link](#create-deep-link)

    - Referrer [shares the deep Link](#share-deep-link)

    - Referee clicks on deep link

    - Referee triggers a [custom event](#track-event)

    - Catch the event in your Branch Dashboard as a [rule](https://dashboard.branch.io/referrals/rules)

    - Referrer gets referral points

  - Spend credits

    ```js
    var amount = 10
    var bucket = 'this_bucket'
    Branch.redeemRewards(amount, bucket).then(function (res) {
      alert('Response: ' + JSON.stringify(res))
    }).catch(function (err) {
      alert('Error: ' + JSON.stringify(err))
    })
    ```

    ```js
    var amount = 10
    Branch.redeemRewards(amount).then(function (res) {
      alert('Response: ' + JSON.stringify(res))
    }).catch(function (err) {
      alert('Error: ' + JSON.stringify(err))
    })
    ```

  - Load credits

    ```js
    var bucket = 'this_bucket'
    Branch.loadRewards(bucket).then(function(res) {
      alert('Response: ' + JSON.stringify(res))
    }).catch(function(err) {
      alert('Error: ' + JSON.stringify(err))
    })
    ```

    ```js
    Branch.loadRewards().then(function (res) {
      alert('Response: ' + JSON.stringify(res))
    }).catch(function (err) {
      alert('Error: ' + JSON.stringify(err))
    })
    ```

  - Load history

    ```js
    Branch.creditHistory().then(function (res) {
      alert('Response: ' + JSON.stringify(res))
    }).catch(function (err) {
      alert('Error: ' + JSON.stringify(err))
    })
    ```

## Troubleshooting

- #### Testing: Key Points

  - Need to checkmark "app uses IDFA and GAID" when publishing your app

  - Best to enable [Deepviews](https://dashboard.branch.io/settings/deepviews) ([Testing: Supported Platforms](#testing-supported-platforms))

- #### Testing: Optional App Config

  ```xml
  <!-- sample config.xml -->
  <widget id="com.eneff.branch.cordovatestbed" version="1.0.0" xmlns="http://www.w3.org/ns/widgets" xmlns:cdv="http://cordova.apache.org/ns/1.0">
    <!-- Branch -->
    <plugin name="branch-cordova-sdk" spec="~2.4.2" /> <!-- optional spec -->
    <branch-config>
      <branch-key value="key_live_ndqptlgXNE4LHqIahH1WIpbiyFlb62J3" />
      <uri-scheme value="branchcordova" />
      <link-domain value="yourcustomdomain.com" />
      <link-domain value="cordova.app.link" />  <!-- optional previous link domain -->
      <link-domain value="bnc.lt" />  <!-- optional previous link domain -->
      <ios-team-release value="PW4Q8885U7" /> <!-- required if iOS app -->
      <ios-team-debug value="FG35JLLMXX" /> <!-- optional -->
      <android-prefix value="/WSuf" /> <!-- optional (for bnc.lt) -->
      <android-testmode value="true" /> <!-- optional (simulate installs) -->
    </branch-config>
  ```

  ```xml
  <widget ios-CFBundleIdentifier="com.eneff.branch.cordovatestbedios" android-packageName="com.eneff.branch.cordovatestbedandroid" version="1.0.0" xmlns="http://www.w3.org/ns/widgets" xmlns:cdv="http://cordova.apache.org/ns/1.0">
  ```

- #### Testing: Branch Analytics
  
  - Whenever a user `clicks` on a deep link and opens the app, and will trigger either an `install` or an `open`

  - `installs` represent Branch recognizing the app_id and device_id for the first time

  - `installs` represent new app users and the success rate of your Branch deep links    

  - `installs` do **not** represent App Store downloads

  - `non-Branch installs` are installs outside of Branch deep link clicks

  - `opens` are non-installs

  - If a user uninstalls and reinstalls the app, this will be an `open` because Branch recognizes the device

  - If a user has the app and clicks a Branch deep link, this will be an `open` because the user is not new

- #### Testing: Simulating an Install
  
  - Delete your app

  - **[iOS]** iPhone Device -> Settings -> Privacy -> Advertising -> Reset Advertising Identifier -> Reset Identifier

  - **[Android]** Add `<android-testmode value="true" />` to your `Config.xml` ([Testing: Optional App Config](#testing-optional-app-config))

  - Add `Branch.setDebug(true);` before `Branch.initSession();` ([Initialize Branch Features](#initialize-branch-features))   
  
  - Click on a deep link to navigate to your `$fallback_url` because your app is not installed

  - Install your app

  - Open your app

  - Read from `Branch.initSession(data)` for `+is_first_session = true` 

- #### Testing: Supported Platforms

  - Apps which support Branch deep links

    | | iOS | Details | Android | Details
    | --- | :-: | --- | :-: | ---
    | Facebook NewsFeed | ✅ | Works when [DeepViews](https://dashboard.branch.io/settings/deepviews) are enabled | ✅ |
    | Facebook Messanger | ✅ | Works when [DeepViews](https://dashboard.branch.io/settings/deepviews) are enabled | ✅ | Works except the `app.link` domain is not click-able |
    | Twitter | ✅ | | ✅ |
    | Pinterest | ✅ | Works when [DeepViews](https://dashboard.branch.io/settings/deepviews) are enabled | ✅ |
    | Slack | ✅ | | ✅ | |
    | Chrome address bar | ✅ | | ✅ |
    | Chrome web page | ✅ | | ✅ |
    | FireFox address bar | 🅾️ | | ✅ |
    | FireFox web page | ✅ | | ✅ |
    | Safari address bar | 🅾️ | | |
    | Safari web page | ✅ | | |
    | WeChat | ✅ | Works when [DeepViews](https://dashboard.branch.io/settings/deepviews) are enabled | ✅ |
    | WhatsApp | ✅ | | ✅ |
    | Hangouts | ✅ | | ✅ |
    | iMessage | ✅ | | |
    | Apple Mail | ✅ | | |
    | Gmail | ✅ | | ✅ |

- #### Testing: Sample Testing App

  - [Branch Testing App](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/tree/master/testbed)

- #### Link Data: Universal Object Properties

  - For [Create Content Reference](#create-content-reference)

  - Properties

    | Key | Default | Usage | Link Property
    | --- | :-: | --- | :-:
    | canonicalIdentifier | | **(Required)** This is the unique identifier for content that will help Branch dedupe across many instances of the same thing. Suitable options: a website with pathing, or a database with identifiers for entities | `$canonical_identifier`
    | canonicalUrl | | The canonical URL, used for SEO purposes | `$canonical_url`
    | title | | The name for the piece of content | `$og_title`
    | contentDescription | | A description for the content | `$og_description`
    | contentImageUrl | | The image URL for the content. Must be an absolute path | `$og_image_url `
    | price | | The price of the item | `$amount`
    | currency | | The currency representing the price in ISO 4217 currency code | `$currency`
    | contentIndexingMode | `"public"` | Can be set to either `"public"` or `"private"`. Public indicates that you’d like this content to be discovered by other apps. | `$publicly_indexable`
    | contentMetadata | | Any custom key-value data e.g. `{ "custom": "data" }`

- #### Link Data: Deep Link Properties

  - For [Create Deep Link](#create-deep-link) and [Share Deep Link](#share-deep-link)

  - Analytics

    | Key | Default | Usage
    | --- | :-: | ---
    | channel | | Use channel to tag the route that your link reaches users. For example, tag links with `"Facebook"` or `"LinkedIn"` to help track clicks and installs through those paths separately
    | feature | | This is the feature of your app that the link might be associated with. For example, if you had built a referral program, you would label links with the feature ‘referral’
    | campaign | | Use this field to organize the links by actual campaign. For example, if you launched a new feature or product and want to run a campaign around that
    | stage | | Use this to categorize the progress or category of a user when the link was generated. For example, if you had an invite system accessible on level 1, level 3 and 5, you could differentiate links generated at each level with this parameter
    | tags | | This is a free form entry with unlimited values `["string"]`. Use it to organize your link data with labels that don’t fit within the bounds of the above
    | alias | | Specify a link alias in place of the standard encoded short URL e.g. `yourdomain.com/youralias`. Link aliases are unique, immutable objects that cannot be deleted. You cannot change the alias of existing links. Aliases on the legacy `bnc.lt` domain are incompatible with Universal Links and Spotlight
    | type | `0` | Set to `1` to limit deep linking behavior of the generated link to a single use. Set type to `2` to make the link show up under [Marketing Dashboard](https://dashboard.branch.io/marketing) while adding `$marketing_title` to `data`. Must be an `int`. Does not work with the Cordova SDK (limitation of native SDKs)

  - Properties

    - Custom Data

      | Key | Value | Usage
      | --- | :-: | ---
      | random | `123` | Any key-value pair
      | hello | `"world"` | Any key-value pair
      | custom_data | `true` | Any key-value pair

    - Redirection

      | Key | Default | Usage
      | --- | :-: | ---
      | $fallback_url | | Change the redirect endpoint for all platforms - so you don’t have to enable it by platform. Note that Branch will forward all robots to this URL, which **overrides any OG tags** entered in the link.  System-wide Default URL (set in Link Settings)
      | $desktop_url | | Change the redirect endpoint on desktops Text-Me-The-App page (set in Link Settings)
      | $ios_url | | Change the redirect endpoint for iOS  App Store page for your app (set in Link Settings)
      | $ipad_url | | Change the redirect endpoint for iPads `$ios_url` value
      | $android_url  | | Change the redirect endpoint for Android  Play Store page for your app (set in Link Settings)
      | $windows_phone_url  | | Change the redirect endpoint for Windows OS Windows Phone default URL (set in Link Settings)
      | $blackberry_url | | Change the redirect endpoint for Blackberry OS  BlackBerry default URL (set in Link Settings)
      | $fire_url | | Change the redirect endpoint for Amazon Fire OS Fire default URL (set in Link Settings)
      | $ios_wechat_url | | Change the redirect endpoint for WeChat on iOS devices `$ios_url value`
      | $android_wechat_url | | Change the redirect endpoint for WeChat on Android devices  `$android_url` value
      | $after_click_url | | URL redirect to after the main click redirect has completed
      | $web_only | `false` | Force to open the `$fallback_url` instead of the app

    - Deep Link

      | Key | Default | Usage
      | --- | :-: | ---
      | $deeplink_path | `open?link_click_id=1234` | Set the deep link path for all platforms - so you don’t have to enable it by platform. When the Branch SDK receives a link with this parameter set, it will automatically load the custom URI path contained within
      | $android_deeplink_path | | Set the deep link path for Android apps When the Branch SDK receives a link with this parameter set, it will automatically load the custom URI path contained within
      | $ios_deeplink_path | | Set the deep link path for iOS apps. When the Branch SDK receives a link with this parameter set, it will automatically load the custom URI path contained within
      | $match_duration | `7200` | Lets you control the fingerprinting match timeout (the time that a click will wait for an app open to match) also known as attribution window. Specified in seconds
      | $always_deeplink | `true` | Set to `false` to make links always fall back to your mobile site. Does not apply to Universal Links or Android App Links.
      | $ios_redirect_timeout | `750` | Control the timeout that the client-side JS waits after trying to open up the app before redirecting to the App Store. Specified in milliseconds
      | $android_redirect_timeout | `750` | Control the timeout that the clientside JS waits after trying to open up the app before redirecting to the Play Store. Specified in milliseconds
      | $one_time_use | `false` | Set to `true` to limit deep linking behavior of the generated link to a single use. Can also be set using type
      | $custom_sms_text | | Text for SMS link sent for desktop clicks to this link. Must contain `{{ link }}` Value of Text me the app page in Settings
      | $marketing_title | | The Marketing Title for the deep link in the [Marketing Dashboard](https://dashboard.branch.io/marketing)

    - Content

      | Key | Default | Usage
      | --- | :-: | ---
      | $publicly_indexable | `1` | Cannot modify here. Needs to be set by the Branch Universal Object
      | $keywords | | Keywords for which this content should be discovered by. Just assign an array of strings with the keywords you’d like to use
      | $canonical_identifier | | This is the unique identifier for content that will help Branch dedupe across many instances of the same thing. Suitable options: a website with pathing, or a database with identifiers for entities
      | $exp_date | `0` | Cannot modify here. Needs to be set by the Branch Universal Object. Must be epoch timestamp with milliseconds
      | $content_type | | This is a label for the type of content present. Apple recommends that you use uniform type identifier as described here

    - DeepView

      | Key | Default | Usage
      | --- | :-: | ---
      | $ios_deepview | `default_template` | The name of the deepview template to use for iOS
      | $android_deepview | `default_template` | The name of the deepview template to use for Android
      | $desktop_deepview | `default_template` | The name of the deepview template to use for the Desktop

    - Open Graph

      | Key | Default | Usage
      | --- | :-: | ---
      | $og_title | | Set the title of the link as it will be seen in social media displays
      | $og_description | | Set the description of the link as it will be seen in social media displays
      | $og_image_url | | Set the image of the link as it will be seen in social media displays
      | $og_image_width | | Set the image’s width in pixels for social media displays
      | $og_image_height | | Set the image’s height in pixels for social media displays
      | $og_video | | Set a video as it will be seen in social media displays
      | $og_url | | Set the base URL of the link as it will be seen in social media displays
      | $og_type | | Set the type of custom card format link as it will be seen in social media displays
      | $og_redirect | | (Advanced, not recommended) Set a custom URL that we redirect the social media robots to in order to retrieve all the appropriate tags
      | $og_app_id | | (Rarely used) Sets the app id tag

    - Twitter

      | Key | Default | Usage
      | --- | :-: | ---
      | $twitter_card | | Set the Twitter card type of the link
      | $twitter_title | | Set the title of the Twitter card
      | $twitter_description | | Set the description of the Twitter card
      | $twitter_image_url | | Set the image URL for the Twitter card
      | $twitter_site | | Set the site for Twitter
      | $twitter_app_country | | Set the app country for the app card
      | $twitter_player | | Set the video player’s URL. Defaults to the value of `$og_video`.
      | $twitter_player_width | | Set the player’s width in pixels
      | $twitter_player_height | | Set the player’s height in pixels

- #### Compiling: Cordova Dependencies

  - Node

    ```sh
    /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)";
    brew update;
    brew install node;
    ```

  - Xcode

    - Install [Xcode](https://developer.apple.com/download/)

    - Open Xcode -> agree to SDK license agreement

    - Open Xcode -> Create new Xcode project -> Run simulator -> Agree to developer mode on mac

  - Android Studio

    - Read [instructions](https://developer.android.com/studio/install.html)

    - Install [JVM](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)

    - Install [Android Studio](https://developer.android.com/studio/index.html)

    - Open Android Studio -> configure -> appearance/system settings/android sdk -> android 6.0 -> Okay

    - Open Android Studio -> New project -> ... -> Run -> Create new emulator -> Nexus 6p 23 -> Finish

      ```sh
      # add to ~/.bash_profile
      export ANDROID_HOME=$HOME/Library/Android/sdk
      export PATH=$ANDROID_HOME/tools:$PATH
      export PATH=$ANDROID_HOME/platform-tools:$PATH
      ```

      ```sh
      source ~/.bash_profile;
      ```

      ```sh
      android update sdk;
      ```

    - Install Android SDK build-tools 24.0.1
    
    - Generate Android Keystore
    
      ```sh
      keytool -genkeypair -dname "cn=Full Name, ou=Business Unit, o=Company, c=US" -alias release -keypass aaa111 -keystore release.keystore -storepass aaa111 -validity 10000 
      keytool -list -v -keystore release.keystore
      ```

  - Genymotion *[optional]*

    - Install [Virtual Box](https://www.virtualbox.org/wiki/Downloads)

    - Install [Genymotion](https://www.genymotion.com/download/)

    - Genymotion -> Add virtual device -> Google Nexus 6P - 6.0.0 - API 23 -> Next

- #### Compiling: Show Console Logs

  - iOS Simulator

    - `cordova run ios;`

    - Safari -> Preferences -> Advance -> Show Develop menu in menu bar

    - Safari -> Develop -> Simulator -> index.html -> Console

    - *May need to unplug and replug device*

    - *May need to open Xcode and update provisioning profile*

  - iOS Xcode

    - `cordova plugin add cordova-plugin-console;`

    - `cordova build ios;`

    - Xcode -> APP_LOCATION/platforms/ios/APP_NAME.Xcodeproj

    - Xcode -> App -> General -> Signing -> Team

    - Xcode -> Product -> Run

    - Xcode -> View -> Debug Area -> Activate Console

  - Android Device

    - Plug device in

    - `cordova run android;`

    - Chrome -> [chrome://inspect/#devices](chrome://inspect/#devices) -> Console

  - Android Genymotion

    - Genymotion -> Start

    - `cordova run android;`

    - Chrome -> [chrome://inspect/#devices](chrome://inspect/#devices) -> Console

- #### Compiling: Updating Branch SDK

  ```bash
  # terminal
  cordova plugin remove io.branch.sdk
  cordova plugin remove branch-cordova-sdk
  ```

  ```xml
  <!-- config.xml -->
  <plugin name="branch-cordova-sdk" spec="^2.5.0" />
  ```

- #### Compiling: Incompatible Plugins

  - The following plugins will not work with the Branch SDK

  - [PhoneGap NFC Plugin](https://github.com/chariotsolutions/phonegap-nfc)

  - [Custom URL scheme](https://github.com/EddyVerbruggen/Custom-URL-scheme)

  - [Cordova Universal Links Plugin](https://github.com/nordnet/cordova-universal-links-plugin)

  - [Ionic Deeplinks Plugin](https://github.com/driftyco/ionic-plugin-deeplinks)

- #### Compiling: Errors

  - error

    ```sh
    ORIGINAL EXCEPTION: Branch is not defined
    ```

    ```sh
    ReferenceError: Branch is not defined
    ```

    - Branch opens and installs your app. You cannot simulate Branch in the desktop browser

      ```js
      // Ionic 2/3 - running on browser instead of device
      if (!platform.is('cordova')) { return }
      Branch.userCompletedAction('did_this')
      ```

      ```js
      // Ionic 2/3 - missing Branch import
      declare var Branch
      ```

  - error

    ```sh
    ** ARCHIVE FAILED **

    The following build commands failed:
      Check dependencies
    (1 failure)
    Error: Error code 65 for command: xcodebuild with args: -xcconfig,/Users/eneff/Desktop/active/branch/lib/cordova-ionic-phonegap-branch-deep-linking/testbed/platforms/ios/cordova/build-debug.xcconfig,-workspace,Branch Testing.xcworkspace,-scheme,Branch Testing,-configuration,Debug,-destination,generic/platform=iOS,-archivePath,Branch Testing.xcarchive,archive,CONFIGURATION_BUILD_DIR=/Users/eneff/Desktop/active/branch/lib/cordova-ionic-phonegap-branch-deep-linking/testbed/platforms/ios/build/device,SHARED_PRECOMPS_DIR=/Users/eneff/Desktop/active/branch/lib/cordova-ionic-phonegap-branch-deep-linking/testbed/platforms/ios/build/sharedpch
    ```

      - Open app in `Xcode` and launch from there (to select a `Provisioning Profile`)

  - error

    ```sh
    An invalid value 'XC com eneff branch cordova_testbed' was provided for the parameter 'appIdName'.
    ```

    ```sh
    No profiles for 'com.eneff.branch.cordova_testbed' were found
    ```

      - Don't use `cordova`, `hyphens` (Android), or `underscores` (iOS) in your bundle id (widget id)
