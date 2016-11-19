<h1 align="center">
  <a href="https://branch.io"><img src="http://i.imgur.com/Y5EPQTo.png" alt="Branch for Cordova/PhoneGap/Ionic" width="600"></a>
</h1>
<p align="center">
  <a href="https://travis-ci.org/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking"><img src="https://img.shields.io/travis/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/master.svg" alt="Travis"></a>
  <a href="https://www.npmjs.com/package/branch-cordova-sdk"><img src="https://img.shields.io/npm/dt/branch-cordova-sdk.svg" alt="npm downloads"></a>
  <a href="https://www.npmjs.com/package/branch-cordova-sdk"><img src="https://img.shields.io/npm/v/branch-cordova-sdk.svg" alt="npm version"></a>
  <a href="https://www.npmjs.com/package/branch-cordova-sdk"><img src="https://img.shields.io/npm/l/branch-cordova-sdk.svg" alt="npm version"></a>
</p>

# Branch for Cordova/PhoneGap/Ionic
*Questions? [Contact us](https://support.branch.io/support/tickets/new)*

- [Integration](#integration)
  - [Configure Branch](#configure-branch)
  - [Install Branch](#install-branch)
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
  - [Testing: Sample Testing App](#testing-sample-testing-app)
  - [Testing: Sample Integration App](#testing-sample-integration-app)
  - [Testing: Show Console Logs](#testing-show-console-logs)
  - [Testing: Supported Platforms](#testing-supported-platforms)
  - [Testing: Simulating an Install](#testing-simulating-an-install)
  - [Link Domain: Custom](#link-domain-custom)
  - [Link Domain: Bnc.lt](#link-domain-bnclt)
  - [Link Data: Convert to Ionic/Angular](#link-data-convert-to-ionicangular)
  - [Link Data: Global Listener Warning](#link-data-global-listener-warning)
  - [Compiling: Updating the Branch SDK](#compiling-updating-the-branch-sdk)
  - [Compiling: Cordova Dependencies](#compiling-cordova-dependencies)
  - [Compiling: Visual Studio TACO](#compiling-visual-studio-taco)
  - [Compiling: Multiple support-lib v4s](#compiling-multiple-support-lib-v4s)
  - [Compiling: Missing Android Dependency](#compiling-missing-android-dependency)
- [Additional Documentation](#additional-documentation)

# Integration

- #### Configure Branch

  - Complete your [Branch Dashboard](https://dashboard.branch.io/settings/link)
  
  - <details><summary>Example</summary>
    ![image](http://i.imgur.com/tkEolFM.png)
    </details>

- #### Install Branch

  - Change `key_live_hiuejxqEdbHR8Tc1L92nmiijrse9OBpq` and `branchcordova` to the values in your [Branch Dashboard](https://dashboard.branch.io/settings/link)

  - <details><summary>Cordova and PhoneGap and Ionic</summary>
    ```sh
    # terminal
    cordova plugin remove io.branch.sdk;
    cordova plugin add branch-cordova-sdk --variable BRANCH_KEY=key_live_hiuejxqEdbHR8Tc1L92nmiijrse9OBpq --variable URI_SCHEME=branchcordova;
    ```
    </details>

- #### Configure App

  - Change `com.eneff.branch.cordova`, `PW4Q8885U7`, `2d0s.app.link`, and `2d0s-alternate.app.link` to the values in your [Branch Dashboard](https://dashboard.branch.io/settings/link)

  - <details><summary>Cordova and Ionic</summary>
    ```xml
    <!-- sample config.xml -->
    <widget id="com.eneff.branch.cordova" version="0.0.1" xmlns="http://www.w3.org/ns/widgets" xmlns:cdv="http://cordova.apache.org/ns/1.0">
      <branch-config>
        <ios-team-id value="PW4Q8885U7"/>
        <host name="2d0s.app.link" scheme="https" />
        <host name="2d0s-alternate.app.link" scheme="https" />
      </branch-config>
    ```
    </details>

  - <details><summary>PhoneGap</summary>
    ```xml
    <!-- sample config.xml -->
    <widget id="com.eneff.branch.cordova" version="1.0.0" xmlns="http://www.w3.org/ns/widgets" xmlns:gap="http://phonegap.com/ns/1.0">
      <branch-config>
        <ios-team-id value="PW4Q8885U7"/>
        <host name="2d0s.app.link" scheme="https" />
        <host name="2d0s-alternate.app.link" scheme="https" />
      </branch-config>
    ```
    </details>

- #### Initialize Branch

  - <details><summary>Cordova and PhoneGap</summary>  
    ```js
    var app = {
      initialize: function() {
        this.bindEvents();
      },
      bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener('resume', this.onDeviceReady, false);
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
    </details>

  - <details><summary>Ionic 1</summary>
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

        // Branch initialization
        Branch.initSession(function(data) {
          // read deep link data on click
          alert('Deep Link Data: ' + JSON.stringify(data));
        });
      });
    })
    // ...
    ```
    </details>

  - <details><summary>Ionic 2</summary>
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

          // Branch initialization
          Branch.initSession(function(data) {
            // read deep link data on click
            alert('Deep Link Data: ' + JSON.stringify(data));
          });
        });
      }
    }
    ```
    </details>

- #### Test Deep Link iOS

  - Wait 15 minutes after saving changes on the [Branch Dashboard](https://dashboard.branch.io/settings/link)

  - Create a deep link from the [Branch Marketing Dashboard](https://dashboard.branch.io/marketing)

  - Delete your app from the device *(reset the Apple AASA scraping)*

  - Compile your app *(`cordova build ios` `phonegap build ios` `ionic build ios`)*

  - Launch your app to device from Xcode *(not TestFlight or Simulator)*

  - Paste deep link in Apple Notes

  - Long press on the deep link *(not 3D Touch)*

  - Click `Open in "APP_NAME"` to open app

  - <details><summary>Example</summary>
    ![image](http://i.imgur.com/VJVICXd.png)
    </details>

- #### Test Deep Link Android

  - Wait 15 minutes after saving changes on the [Branch Dashboard](https://dashboard.branch.io/settings/link)

  - Create a deep link from the [Branch Marketing Dashboard](https://dashboard.branch.io/marketing)

  - Delete your app from the device

  - Compile your app *(`cordova build android` `phonegap build android` `ionic build android`)*

  - Launch your app to device

  - Paste deep link in Google Hangouts

  - Tap on the deep link to open app

# Features

- #### Initialize Branch Features

  - Load Branch into your app. Must be called on `deviceReady`

  - <details><summary>Example</summary>
    ```js
    // for development and debugging only
    Branch.setDebug(true);

    // sync with Mixpanel if installed
    Branch.setMixpanelToken('your_mixpanel_token');

    // Branch initialization
    Branch.initSession(function(data) {
      // read deep link data on click
      alert('Deep Link Data: ' + JSON.stringify(data)); 
    }).then(function(res) {
      alert('Response: ' + JSON.stringify(res));
    }).catch(function(err) {
      alert('Error: ' + JSON.stringify(err));
    });
    ```
    </details>

- #### Create Content Reference

  - The Branch Universal Object encapsulates the thing you want to share (content or user)

  - <details><summary>Properties</summary>

    | Key | Default | Usage | Link Property
    | --- | :-: | --- | :-:
    | canonicalIdentifier | | **(Required)** This is the unique identifier for content that will help Branch dedupe across many instances of the same thing. Suitable options: a website with pathing, or a database with identifiers for entities | `$canonical_identifier`
    | canonicalUrl | | The canonical URL, used for SEO purposes | `$canonical_url`
    | title | | The name for the piece of content | `$og_title`
    | contentDescription | | A description for the content | `$og_description`
    | contentImageUrl | | The image URL for the content | `$og_image_url `
    | price | | The price of the item | `$amount`
    | currency | | The currency representing the price in ISO 4217 currency code | `$currency`
    | contentIndexMode | `"public"` | Can be set to either `"public"` or `"private"`. Public indicates that you’d like this content to be discovered by other apps. | `$publicly_indexable`
    | contentMetadata | | Any custom key-value data e.g. `{ "custom": "data" }`
    </details>

  - <details><summary>Example</summary>
    ```js
    // only canonicalIdentifier is required
    var properties = {
        canonicalIdentifier: '123',
        canonicalUrl: 'http://example.com/123',
        title: 'Content 123',
        contentDescription: 'Content 123 ' + Date.now(),
        contentImageUrl: 'http://lorempixel.com/400/400/',
        price: 12.12,
        currency: 'GBD',
        contentIndexingMode: 'private',
        contentMetadata: {
            'custom': 'data',
            'testing': 123,
            'this_is': true
        }
    };

    // create a branchUniversalObj variable to reference with other Branch methods
    var branchUniversalObj = null;
    Branch.createBranchUniversalObject(properties).then(function(res) {
        branchUniversalObj = res;
        alert('Response: ' + JSON.stringify(res));
    }).catch(function(err) {
        alert('Error: ' + JSON.stringify(err));
    });
    ```
    </details>

- #### Create Deep Link

  - Creates a deep link URL with encapsulated data

  - Needs a [Branch Universal Object](#create-content-reference)

  - <details><summary>Analytics</summary>

    | Key | Default | Usage
    | --- | :-: | ---
    | channel | | Use channel to tag the route that your link reaches users. For example, tag links with `"Facebook"` or `"LinkedIn"` to help track clicks and installs through those paths separately
    | feature | | This is the feature of your app that the link might be associated with. For example, if you had built a referral program, you would label links with the feature ‘referral’
    | campaign | | Use this field to organize the links by actual campaign. For example, if you launched a new feature or product and want to run a campaign around that
    | stage | | Use this to categorize the progress or category of a user when the link was generated. For example, if you had an invite system accessible on level 1, level 3 and 5, you could differentiate links generated at each level with this parameter
    | tags | | This is a free form entry with unlimited values `["string"]`. Use it to organize your link data with labels that don’t fit within the bounds of the above
    | alias | | Specify a link alias in place of the standard encoded short URL e.g. `yourdomain.com/youralias`. Link aliases are unique, immutable objects that cannot be deleted. Aliases on the legacy `bnc.lt` domain are incompatible with Universal Links and Spotlight
    | type | `0` | Set to `1` to limit deep linking behavior of the generated link to a single use. Set type to `2` to make link show up under [Marketing Dashboard](https://dashboard.branch.io/marketing)
    </details>

  - <details><summary>Properties</summary>

    - <details><summary>Custom Data</summary>

      | Key | Value | Usage
      | --- | :-: | ---
      | random | `123` | Any key-value pair
      | hello | `"world"` | Any key-value pair
      | custom_data | `true` | Any key-value pair
      </details>

    - <details><summary>Redirection</summary>

      | Key | Default | Usage
      | --- | :-: | ---
      | $fallback_url | | Change the redirect endpoint for all platforms - so you don’t have to enable it by platform. Note that Branch will forward all robots to this URL, overriding any OG tags entered in the link.  System-wide Default URL (set in Link Settings)
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
      </details>

    - <details><summary>Deep Link</summary>

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
      </details>

    - <details><summary>Content</summary>

      | Key | Default | Usage
      | --- | :-: | ---
      | $publicly_indexable | `1` | Cannot modify here. Needs to be set by the Branch Universal Object
      | $keywords | | Keywords for which this content should be discovered by. Just assign an array of strings with the keywords you’d like to use
      | $canonical_identifier | | This is the unique identifier for content that will help Branch dedupe across many instances of the same thing. Suitable options: a website with pathing, or a database with identifiers for entities
      | $exp_date | `0` | Cannot modify here. Needs to be set by the Branch Universal Object
      | $content_type | | This is a label for the type of content present. Apple recommends that you use uniform type identifier as described here
      </details>

    - <details><summary>DeepView</summary>

      | Key | Default | Usage
      | --- | :-: | ---
      | $ios_deepview | `default_template` | The name of the deepview template to use for iOS
      | $android_deepview | `default_template` | The name of the deepview template to use for Android
      | $desktop_deepview | `default_template` | The name of the deepview template to use for the Desktop
      </details>

    - <details><summary>Open Graph</summary>

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
      </details>

    - <details><summary>Twitter</summary>

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
      </details>

    </details>

  - <details><summary>Example</summary>
    ```js
    // optional fields
    var analytics = {
        channel: 'channel',
        feature: 'feature',
        campaign: 'campaign',
        stage: 'stage',
        tags: ['one', 'two', 'three']
    };

    // optional fields
    var properties = {
        $fallback_url: 'www.example.com',
        $desktop_url: 'www.desktop.com',
        $android_url: 'www.android.com',
        $ios_url: 'www.ios.com',
        $ipad_url: 'www.ipad.com',
        more_custom: 'data',
        even_more_custom: true,
        this_is_custom: 321
    };

    branchUniversalObj.generateShortUrl(analytics, properties).then(function(res) {
        alert('Response: ' + JSON.stringify(res.url));
    }).catch(function(err) {
        alert('Error: ' + JSON.stringify(err));
    });
    ```
    </details>

- #### Share Deep Link

  -  Will generate a Branch deep link and tag it with the channel the user selects

  - Needs a [Branch Universal Object](#create-content-reference)

  - `Analytics` and `Properties` use the same key-value pairs as [Create Deep Link](#create-deep-link)

  - <details><summary>Example</summary>
    ```js
    // optional fields
    var analytics = {
        channel: 'channel',
        feature: 'feature',
        campaign: 'campaign',
        stage: 'stage',
        tags: ['one', 'two', 'three']
    };

    // optional fields
    var properties = {
        $fallback_url: 'www.example.com',
        $desktop_url: 'www.desktop.com',
        $android_url: 'www.android.com',
        $ios_url: 'www.ios.com',
        $ipad_url: 'www.ipad.com',
        more_custom: 'data',
        even_more_custom: true,
        this_is_custom: 321
    };

    var message = "Check out this link";

    // optional listeners (must be called before showShareSheet)
    branchUniversalObj.onShareSheetLaunched(function(res) {
      // android only
      alert('Response: ' + JSON.stringify(res));
    });
    branchUniversalObj.onShareSheetDismissed(function(res) {
      alert('Response: ' + JSON.stringify(res));
    });
    branchUniversalObj.onLinkShareResponse(function(res) {
      alert('Response: ' + JSON.stringify(res));
    });
    branchUniversalObj.onChannelSelected(function(res) {
      // android only
      alert('Response: ' + JSON.stringify(res));
    });

    // share sheet
    branchUniversalObj.showShareSheet(analytics, properties, message);
    ```
    </details>

- #### Read Deep Link

  - Retrieve Branch data from a deep link

  - Best practice to receive data from the `listener`

  - <details><summary>Example (listener)</summary>
    ```js
    // Branch initialization within your deviceReady
    Branch.initSession(function(deepLinkData) {
      // handler for deep link data on click
      alert(JSON.stringify(deepLinkData));
    });
    ```
    </details>

  - <details><summary>Example (listener) *[depreciated]*</summary>
    ```html
    <!-- sample index.html -->
        <script>
          // required
          function DeepLinkHandler(data) {
            if (data) {
              alert('Data Link Data Response: ' + JSON.stringify(data));
            }
          }

          // optional
          function NonBranchLinkHandler(data) {
            if (data) {
              alert('Non-Branch Link Detected: ' + JSON.stringify(data));
            }
          }
        </script>
      </body>
    </html>
    ```
    </details>

  - <details><summary>Example (first data)</summary>
    ```js
    Branch.getFirstReferringParams().then(function(res) {
      alert('Response: ' + JSON.stringify(res));
    }).catch(function(err) {
      alert('Error: ' + JSON.stringify(err));
    });
    ```
    </details>

  - <details><summary>Example (latest data)</summary>
    ```js
    Branch.getLatestReferringParams().then(function(res) {
      alert('Response: ' + JSON.stringify(res));
    }).catch(function(err) {
      alert('Error: ' + JSON.stringify(err));
    });
    ```
    </details>

- #### Show Content

  - List content on iOS Spotlight

  - Needs a [Branch Universal Object](#create-content-reference)

  - <details><summary>Example</summary>
    ```js
    branchUniversalObj.listOnSpotlight().then(function(res) {
      alert('Response: ' + JSON.stringify(res));
    }).catch(function(err) {
      alert('Error: ' + JSON.stringify(err));
    });
    ```
    </details>

- #### Track Content

  - Track how many times a user views a particular piece of content

  - Needs a [Branch Universal Object](#create-content-reference)

  - <details><summary>Example</summary>
    ```js
    branchUniversalObj.registerView().then(function(res) {
      alert('Response: ' + JSON.stringify(res));
    }).catch(function(err) {
      alert('Error: ' + JSON.stringify(err));
    });
    ```
    </details>

- #### Track User

  - Sets the identity of a user (email, ID, UUID, etc) for events, deep links, and referrals

  - <details><summary>Example (set)</summary>
    ```js
    var userId = 'email_or_id';
    Branch.setIdentity(userId).then(function(res) {
      alert('Response: ' + JSON.stringify(res));
    }).catch(function(err) {
      alert('Error: ' + JSON.stringify(err));
    });
    ```
    </details>

  - <details><summary>Example (logout)</summary>
    ```js
    Branch.logout().then(function(res) {
      alert(JSON.stringify(res));
    }).catch(function(err) {
      alert('Error: ' + JSON.stringify(err));
    });
    ```
    </details>

- #### Track Event

  - Registers custom events

  - Must [Track User](#track-user) before [Track Event](#track-event) to associate events with a user

  - <details><summary>Example</summary>
    ```js
    var eventName = 'clicked_on_this';
    var metaData = { custom_dictionary: 123 }; // optional
    Branch.userCompletedAction(eventName, metaData).then(function(res) {
      alert('Response: ' + JSON.stringify(res));
    }).catch(function(err) {
      alert('Error: ' + JSON.stringify(err));
    });
    ```
    ```js
    var eventName = "clicked_on_this";
    Branch.userCompletedAction(eventName).then(function(res) {
      alert('Response: ' + JSON.stringify(res));
    }).catch(function(err) {
      alert('Error: ' + JSON.stringify(err));
    });
    ```
    </details>

- #### Handle Referrals

  - Referral points are obtained from events triggered by users from rules created on the [Branch Dashboard](https://dashboard.branch.io/referrals/rules)

  - <details><summary>Example (get credits)</summary>
    - Referrer is [tracked](#track-user)
    
    - Referrer [creates a deep link](#create-deep-link)
    
    - Referrer [shares the deep Link](#share-deep-link)
    
    - Referee clicks on deep link
    
    - Referee triggers a [custom event](#track-event)
    
    - Catch the event in your Branch Dashboard as a [rule](https://dashboard.branch.io/referrals/rules)
    
    - Referrer gets referral points

    </details>

  - <details><summary>Example (spend credits)</summary>
    ```js
    var amount = 10;
    var bucket = 'this_bucket'; // optional
    Branch.redeemRewards(amount, bucket).then(function(res) {
      alert('Response: ' + JSON.stringify(res));
    }).catch(function(err) {
      alert('Error: ' + JSON.stringify(err));
    });
    ```

    ```js
    var amount = 10;
    Branch.redeemRewards(amount).then(function(res) {
      alert('Response: ' + JSON.stringify(res));
    }).catch(function(err) {
      alert('Error: ' + JSON.stringify(err));
    });
    ```
    </details>

  - <details><summary>Example (load credits)</summary>
    ```js
    var bucket = 'this_bucket'; // optional
    Branch.loadRewards(bucket).then(function(res) {
      alert('Response: ' + JSON.stringify(res));
    }).catch(function(err) {
      alert('Error: ' + JSON.stringify(err));
    });
    ```

    ```js
    Branch.loadRewards().then(function(res) {
      alert('Response: ' + JSON.stringify(res));
    }).catch(function(err) {
      alert('Error: ' + JSON.stringify(err));
    });
    ```
    </details>

  - <details><summary>Example (load history)</summary>
    ```js
    Branch.creditHistory().then(function(res) {
      alert('Response: ' + JSON.stringify(res));
    }).catch(function(err) {
      alert('Error: ' + JSON.stringify(err));
    });
    ```
    </details>

# Troubleshooting

- #### Testing: Key Points

  - Use the Branch `key_live`
  
  - Always use the `DeepLinkHandler` to read Deep Link data

  - Always test on `device` (`simulator` `browser` `genymotion` will break)
  
  - Other deep link plugins (ex `cordova-universal-links-plugin`) will interferer with Branch

- #### Testing: Sample Testing App

  - [Branch Testing App](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/tree/master/testbed)

- #### Testing: Sample Integration App

  - <details><summary>Example (Ionic)</summary>
    
    - **Install**
    ```bash
    npm install -g cordova ionic;
    ionic start t3 tabs;
    cd t3;
    ionic platform add ios;
    ionic platform add android;
    ionic plugin remove io.branch.sdk;
    # values should be from your Branch Dashboard https://dashboard.branch.io/settings/link
    ionic plugin add https://github.com/BranchMetrics/Cordova-Ionic-PhoneGap-Deferred-Deep-Linking-SDK.git --variable BRANCH_KEY=key_live_jnBhaHwt5K8xtn4g4hblHoleqsocI6C2 --variable URI_SCHEME=branchionic;
    ```

    - **Update config.xml**
    ```xml
    <!-- values should be from your Branch Dashboard https://dashboard.branch.io/settings/link -->
    <widget id="com.eneff.branch.ionic" version="0.0.1" xmlns="http://www.w3.org/ns/widgets" xmlns:cdv="http://cordova.apache.org/ns/1.0">
      <branch-config>
        <ios-team-id value="PW4Q8885U7"/>
        <host name="cluv.app.link" scheme="https"/>
        <host name="cluv-alternate.app.link" scheme="https"/>
      </branch-config>
    ```  

    - **update app.js**
    ```js
    // global function
    function DeepLinkHandler(data) {
      if (data) {
        alert('Data Link handler response: ' + JSON.stringify(data));
      }
    }

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
        $ionicPlatform.on('deviceready', function(){
          Branch.setDebug(true);
          Branch.initSession();
        });
      });
    })

    // ...
    ```

    - **Delete app off device**

    - **Compile ionic**
    ```bash
    ionic build ios;
    ```

    - **Run on device through xcode**
    ```bash
    open -a Xcode platforms/ios/t3.xcodeproj;
    ```

    - **Click on a deep link in iMessage to open the app**
       - For example, the deep link [https://cluv.app.link/6TOiVlCqXx](https://cluv.app.link/6TOiVlCqXx) can be created from your [Branch Dashboard](https://dashboard.branch.io/marketing)

      - ![image](http://i.imgur.com/YzeE14X.gif)

    </details>

- #### Testing: Show Console Logs

  - <details><summary>iOS Simulator</summary>
    - `cordova run ios;`

    - Safari -> Preferences -> Advance -> Show Develop menu in menu bar

    - Safari -> Develop -> Simulator -> index.html -> Console

    - *May need to unplug and replug device*

    - *May need to open Xcode and update provisioning profile*

    </details>

  - <details><summary>iOS Xcode</summary>
    - `cordova plugin add cordova-plugin-console;`

    - `cordova build ios;`

    - Xcode -> APP_LOCATION/platforms/ios/APP_NAME.Xcodeproj

    - Xcode -> App -> General -> Signing -> Team

    - Xcode -> Product -> Run

    - Xcode -> View -> Debug Area -> Activate Console

    </details>

  - <details><summary>Android Device</summary>
    - Plug device in

    - `cordova run android;`

    - Chrome -> [chrome://inspect/#devices](chrome://inspect/#devices) -> Console

    </details>

  - <details><summary>Android Genymotion</summary>
    - Genymotion -> Start

    - `cordova run android;`

    - Chrome -> [chrome://inspect/#devices](chrome://inspect/#devices) -> Console

    </details>

- #### Testing: Supported Platforms

  - <details><summary>Apps which support Branch deep links</summary>

    | | iOS | Details | Android | Details 
    | --- | :-: | --- | :-: | ---
    | Facebook NewsFeed | ✅ | Works when [DeepViews](https://dashboard.branch.io/settings/deepviews) are enabled | ✅ | 
    | Facebook Messanger | ✅ | Works when [DeepViews](https://dashboard.branch.io/settings/deepviews) are enabled | ✅ | Works except the `app.link` domain is not click-able |
    | Twitter | ✅ | | ✅ |
    | Pinterest | ✅ | Works when [DeepViews](https://dashboard.branch.io/settings/deepviews) are enabled | 🅾️ | 
    | Slack | ✅ | | ✅ | |
    | Chrome address bar | 🅾️ | | 🅾️ |
    | Chrome web page | ✅ | | ✅ |
    | FireFox address bar | 🅾️ | | ✅ |
    | FireFox web page | ✅ | | ✅ |
    | Safari address bar | 🅾️ | | |
    | Safari web page | ✅ | | |
    | WeChat | 🅾️ | | 🅾️ |
    | WhatsApp | ✅ | | ✅ |
    | Hangouts | ✅ | | ✅ |
    | iMessage | ✅ | | |
    | Apple Mail | ✅ | | |
    | Gmail | ✅ | | ✅ |
    </detail>

- #### Testing: Simulating an Install
  
  - Add `Branch.setDebug(true);` before `Branch.initSession();`

  - Delete app

  - *[iOS only]* iPhone -> Settings -> Privacy -> Advertising -> Reset Advertising Identifier -> Reset Identifier

  - Click on deep link

  - Install app

  - Read from `DeepLinkHandler` for `+is_first_session = true`

- #### Link Domain: Custom

  - Change `PW4Q8885U7` and `custom.domain.com` to the values in your [Branch Dashboard](https://dashboard.branch.io/settings/link)

  - <details><summary>Cordova and PhoneGap and Ionic</summary>
    ```xml
    <!-- sample config.xml -->
    <branch-config>
      <ios-team-id value="PW4Q8885U7"/>
      <host name="custom.domain.com" scheme="https" />
    </branch-config>
    ```
    </details>

- #### Link Domain: Bnc.lt

  - Change `PW4Q8885U7` and `/WSuf` to the values in your [Branch Dashboard](https://dashboard.branch.io/settings/link)

  - <details><summary>Cordova and PhoneGap and Ionic</summary>
    ```xml
    <!-- sample config.xml -->
    <branch-config>
      <ios-team-id value="PW4Q8885U7"/>
      <android-prefix value="/WSuf" />
      <host name="bnc.lt" scheme="https" />
    </branch-config>
    ```
    </details>

- #### Link Data: Convert to Ionic/Angular

  - Convert Branch deep link data from `DeepLinkHandler` into Ionic and Angular

  - <details><summary>Listen to Branch data, and save it into an Angular `DeepLink` factory</summary>
    ```js
    // must be a global function
    function DeepLinkHandler(data) {
      if (data) {
        // access the angular Factory("DeepLink")
        angular.element(document.querySelector('[ng-app]')).injector().get("DeepLink").set(data);
        console.log('Data Link handler response: ' + JSON.stringify(data));
      }
    }
    ```
    </details>

  - <details><summary>Create a `DeepLink` factory</summary>
    ```js
    angular.module("starter.services", [])
    .factory("DeepLink", function($window, $timeout) {
      var data = {};

      return {
        get: function() {
          return data;
        },
        set: function(json) {
          // use the angular version of timeout
          $timeout(function() {
            // set the data
            data = json;
            // navigate example
            $window.location = "#/tab/chats/3";
          }, 0);
        }
      };
    });
    ```
    </details>

  - <details><summary>Access `DeepLink` factory</summary>
    ```js
    angular.module("starter.controllers", [])

    .controller("DashCtrl", function($scope, DeepLink) {
      $scope.content = {}
      $scope.buttonPressed = function() {
        // put branch data into a label that has ng-model content.data
        $scope.content.data = JSON.stringify(DeepLink.get());
      };
    })
    ```
    </details>

- #### Link Data: Global Listener Warning

  - After Branch SDK `2.4.0`, deep link data is handled within `Branch.initSession(DeepLinkDataFunction);`

  - Use `Branch.disableGlobalListenersWarnings();` to turn off the warning errors generated from `DeepLinkHandler` and `NonBranchLinkHandler`

- #### Compiling: Updating the Branch SDK

  - Change `xxxx`, and `xxxx` to the values in your [Branch Dashboard](https://dashboard.branch.io/settings/link)

  - <details><summary>Example</summary>
    ```bash
    # update cordova
    npm install -g cordova;

    # remove old Branch SDK cache
    cordova platform remove ios;
    cordova platform remove android;
    cordova platform remove browser;

    # update Branch SDK
    cordova plugin remove io.branch.sdk;
    cordova plugin add branch-cordova-sdk --variable BRANCH_KEY=xxxx --variable URI_SCHEME=xxxx;

    # add platforms back
    cordova platform add ios;
    cordova platform add android;

    # compile platform code
    cordova build ios;
    cordova build android;
    ```
    </details>

- #### Compiling: Cordova Dependencies

  - <details><summary>Node</summary>
    ```sh
    /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)";
    brew update;
    brew install node;
    ```
    </details>

  - <details><summary>Xcode</summary>
    - Install [Xcode](https://developer.apple.com/download/)

    - Open Xcode -> agree to SDK license agreement

    - Open Xcode -> Create new Xcode project -> Run simulator -> Agree to developer mode on mac

    </details>

  - <details><summary>Android Studio</summary>
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

    </details>

  - <details><summary>Genymotion *[optional]*</summary>
    - Install [Virtual Box](https://www.virtualbox.org/wiki/Downloads)

    - Install [Genymotion](https://www.genymotion.com/download/)

    - Genymotion -> Add virtual device -> Google Nexus 6P - 6.0.0 - API 23 -> Next

    </details>

- #### Compiling: Visual Studio TACO

  - Download the latest [source code](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/releases) and import the Branch SDK locally

- #### Compiling: Multiple support-lib v4s

  - Branch does not depend on the `android-support-v4` file, but other Cordova plugins could cause an issue

  - <details><summary>Add `multiDexEnabled true` inside defaultConfig tag in `build.gradle`</summary>
    ```sh
    defaultConfig {
      multiDexEnabled true
    }
    ```
    </details>

  - Remove the `android-support-v4.jar` in Android `libs` directory

  - Run `./gradlew clean` in the Android directory

  - <details><summary>Run `android-support-v4` file for compiling</summary>
    ```sh
    compile ("com.google.android.gms:play-services-ads:9.+") {
      exclude module: "support-v4"
    }
    ```
    </details>

- #### Compiling: Missing Android Dependency

  - Gradle build cannot find `io.branch.sdk.android:library:2.+` dependency

  - <details><summary>Add into your `build.gradle` file</summary>
    ```sh
    compile "io.branch.sdk.android:library:2.+"
    ```
    </details>

# Additional Documentation

- [Branch Dashboard](https://dashboard.branch.io/settings/link)

- [Branch Docs](https://dev.branch.io/)

- [Change Log](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/blob/master/CHANGELOG.md)

- [Contributing to the SDK](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/blob/master/DEVELOPING.md)
