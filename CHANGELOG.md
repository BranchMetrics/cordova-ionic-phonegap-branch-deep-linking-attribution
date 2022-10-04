5.2.0 August 8th, 2022
* Update iOS SDK to 1.43.1
* Update Android SDK to 5.2.0
* Added method to generate Branch QR codes, getBranchQRCode().

5.1.0 May 27, 2022
* Update iOS SDK to 1.42.0
* Update Android SDK to 5.1.5
* Update 3rd party dependencies. Of note the plist vulnerability. (Thanks Sujay-shetty)
* Replace setDebug with setLogging and test devices. https://help.branch.io/using-branch/docs/adding-test-devices

5.0.2 February 9, 2022
* Update dependencies to latest non-breaking versions, of note the shelljs vulnerability. (Thanks again Sujay-shetty!)

5.0.1 February 8, 2022
* Remove request package (thanks for catching Sujay-shetty)

5.0.0 January 21, 2022
* Add content items support in sendBranchEvent
* Remove sendCommerceEvent
* Fix bug where custom data would clobber other fields when creating event in Android plugin
* Update iOS SDK to 1.40.2
* Update Android SDK to 5.0.15

4.2.4 - May 3, 2021

CORE-1898 correct iOS API signature for LATD
Fix alternate link domain issue - Thanks MaximBelov
Fix exist check - Thanks MaximBelov

4.2.3 - April 29, 2021

Update Android SDK to 5.0.8

4.2.2 - April 28, 2021

Update iOS SDK to 1.39.2
Update Android SDK to 5.0.7

# [4.2.1](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/compare/v4.2.0...v4.2.1) (2020-11-05)

# [4.2.0](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/compare/v4.1.3...v4.2.0) (2020-8-26)

* Update iOS SDK to 0.35.0

# [4.1.3](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/compare/v4.1.2...v4.1.3) (2020-2-20)

* Fix intra-app linking.

# [4.1.2](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/compare/v4.1.1...v4.1.2) (2020-2-12)

* Allow Cordova 8. Update readme with instructions.

# [4.1.1](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/compare/v4.1.0...v4.1.1) (2020-2-3)

* Hotfix removing typo in iOS code

# [4.1.0](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/compare/v4.0.0...v4.1.0) (2020-2-3)

* Update update iOS SDK 0.31.x
* Update update Android SDK 4.3.2
* Set plugin type/name and version

# [4.0.0](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/compare/v3.2.0...v4.0.0) (2019-10-15)

* Update iOS SDK to 0.29.1
* Update Android SDK to 4.1.1
* Switch to Cocoapods
* Switch to Maven
* Add Event Alias
* Add CPID and LATD methods
* Add Amazon Fire ID
* Fix foreground linking

Known issues:
* iOS command line build fails due a cordova issue, workaround is to build from xcode.  SDK-558  https://github.com/apache/cordova-ios/issues/659
* Android installation hooks require Android platform to be added before the plugin.  SDK-585
* CPID and LATD methods do not work on Android.  SDK-557

<a name="3.2.0"></a>
# [3.2.0](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/compare/v3.1.6...v3.2.0) (2019-5-24)

* Fix Cordova 9 incompatibility.
* Fix aar not found on Android builds.

<a name="3.1.6"></a>
# [3.1.6](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/compare/v3.1.5...v3.1.6) (2019-2-28)

* Upgraded base Branch SDKs to iOS 0.25.11 and Android 3.0.4

<a name="3.1.5"></a>
# [3.1.5](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/compare/v3.1.4...v3.1.5) (2018-12-05)

* Fix iOS dependency issue.

<a name="3.1.4"></a>
# [3.1.4](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/compare/v3.1.3...v3.1.4) (2018-12-04)

* Revert Cocoapods & Gradle support temporarily.([#478](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/pull/531))

<a name="3.1.3"></a>
# [3.1.3](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/compare/v3.1.0...v3.1.3) (2018-11-26)

* Fixed open URL conflict with URI schemes on iOS. DEVEX-782 ([#478](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/478))

<a name="3.1.0"></a>
# [3.1.0](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/compare/v3.0.1...v3.1.0) (2018-10-01)

* Added `sendBranchEvent` for compatibility with v2/event. DEVEX-782 ([55c09b6](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/pull/485/commits/55c09b6))
* Added Apple Search Ad methods, `delayInitToCheckForSearchAds` and `setAppleSearchAdsDebugMode`. DEVEX-767 ([1b26156]https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/1b26156bd7480b2f7fe8609a0483969be3c6d850)
* Upgraded base Branch SDKs to iOS 0.25.5 and Android 2.19.4.

<a name="3.0.1"></a>
# [3.0.1](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/compare/v3.0.0...v3.0.1) (2018-05-07)

### Bug Fixes

* Add check for `window.clientInformation` ([55c09b6](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/pull/485/commits/55c09b6))

<a name="3.0.0"></a>
# [3.0.0](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/compare/v2.7.1...v3.0.0) (2018-05-07)


### Bug Fixes

* removed DeepLinkHandler for callback ([c9c1543](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/c9c1543))


### BREAKING CHANGES

* deep link data must be read from the Branch.initSession().then(data => {}) promise. See https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking#migrating-branch-cordova-sdk-from-v25-to-v30

<a name="2.7.1"></a>
## [2.7.1](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/compare/v2.7.0...v2.7.1) (2018-05-03)


### Bug Fixes

* android-prefix no longer needed for custom link domains ([0a9100e](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/0a9100e))

<a name="2.7.0"></a>
# [2.7.0](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/compare/v2.6.24...v2.7.0) (2018-04-27)


### Bug Fixes

* added back options to buo methods ([8b5c50d](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/8b5c50d))
* added cordova plugin console for debugging ([54a3c5a](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/54a3c5a))
* added disabletracking to testbed ([05f3ade](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/05f3ade))
* added examples to github ([5868fd2](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/5868fd2))
* added examples to github ([09e4861](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/09e4861))
* added framework for example generation ([bb25057](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/bb25057))
* added more ci ([4b585c8](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/4b585c8))
* added more ignores ([9351f1d](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/9351f1d))
* added more to ignore ([2f17543](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/2f17543))
* added npm publish and npm version update to circle ci ([53d27e3](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/53d27e3))
* allow long url on iOS if tracking disabled ([b74bfda](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/b74bfda))
* cleaned up dependencies ([741f5a3](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/741f5a3))
* cleaned up npm dependencies ([597461a](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/597461a))
* converted everything to vanilla ([48809d7](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/48809d7))
* corrected android long url with no tracking ([628734b](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/628734b))
* corrected double init callback on iOS ([7a4cf38](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/7a4cf38))
* corrected nasty stacktrace error messages ([5752f87](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/5752f87))
* corrected testbed for gdpr tracking ([9a5591a](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/9a5591a))
* corrected the ignores ([f71e990](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/f71e990))
* relocted example script to prepare for templates ([06acfe2](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/06acfe2))
* removed circle ci support for node 6 ([8f28f84](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/8f28f84))
* removed cordova dependency ([9028ff2](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/9028ff2))
* removed gulp dependency ([c41897b](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/c41897b))
* removed gulp standard linting ([4792400](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/4792400))
* removed mixpanel token ([043ca84](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/043ca84))
* removed redundancy with reject ([3ed7caf](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/3ed7caf))
* removed the testbed ([8b8e375](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/8b8e375))
* updated Android SDK to 2.17.1 ([6d1a257](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/6d1a257))
* updated circle ci to run on node 7 and 6 ([acf9874](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/acf9874))
* updated dependencies ([9901a87](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/9901a87))
* updated ignores ([cf11810](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/cf11810))
* updated iOS SDK to 0.24.2 ([ec9511e](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/ec9511e))
* updated testbed with tracking disabled ([bacd590](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/bacd590))
* updated the ignores ([e89ac26](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/e89ac26))
* updated the ignores ([54ddbbd](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/54ddbbd))
* updated yarn lock ([1a8b93e](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/1a8b93e))


### Features

* added disable tracking for gdpr ([191f580](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/191f580))
* added script to build test examples ([eafc6cd](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/eafc6cd))
* added tracking disabled for gdpr ([44325d4](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/44325d4))
* created script to auto generate examples ([0b4d902](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/0b4d902))

# CHANGELOG
Questions? [Contact us](https://support.branch.io/support/tickets/new)

## [v2.6.18](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/releases/tag/v2.6.18) (2017-11-10)

- **Completed Changes**
  - Merge pull request #391 from BranchMetrics/fix-associated-domainsfix: corrected the duplication of custom link domains in the iOS enti… ([f67eb](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/f67eb65fdde31e1c0f04a4d0c5fd72880ba4bdba))

- **Closed Issues**
  - Cold Start ([#397](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/397))
  - Cannot resolve module 'cordova/exec' in branch.js ([#396](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/396))
  - iOS distribution error, applinks not supported ([#395](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/395))
  - ios - Terminating app due to uncaught exception 'NSUnknownKeyException', reason: '[<BranchUniversalObject 0x1c42ece80> setValue:forUndefinedKey:]: this class is not key value coding-compliant for the key integer.' ([#390](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/390))

## [v2.6.17](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/releases/tag/v2.6.17) (2017-11-09)

- **Completed Changes**
  - Merge branch 'master' into fix-associated-domains ([24919](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/24919563eab3a83469683cee1d6a4eb6f31b0be8))
  - fix: corrected the duplication of custom link domains in the iOS entitlements ([99901](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/999016b1eb9e6e4332574cb33aea6e7abdc51521))
  - Merge pull request #388 from BranchMetrics/updatesUpdates ([eb064](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/eb06417ac73780a37cee7aa8877bb04b7d807d84))

- **Closed Issues**
  - Getting Error: Cannot read property '$' of undefined while building android apk ([#389](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/389))
  - Android app not receiving Branch link data ([#387](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/387))

## [v2.6.16](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/releases/tag/v2.6.16) (2017-10-31)

- **Completed Changes**
  - chore: relocated known issues in contributing ([82371](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/823718b93d2f456098d6c77981eaf41c3438d018))
  - chore: updated the changelog ([a452c](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/a452c23e051f247c36d4c4881cc99b14d97523c8))
  - chore: updated npm version to 2.6.17 ([212d3](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/212d380bd4148e5326b06618abe4a99416a38ebe))
  - fix: updated android to 2.13.1Hot fix : Referral params are not returned when initSession is called mutiple times while an init session is in progress ([aec99](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/aec99398eaef6cdb38143e5372ff6c03fe6f7f87))
  - docs: added testing steps to updating the sdk ([15374](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/15374b0824e7315f87afed891df76418f570ff3c))
  - Merge pull request #385 from BranchMetrics/bulkylots of fixes ([b1185](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/b11855a0c8cd670dccd076ccc69e0635e5d99c15))

- **Closed Issues**
  - Unable to get working with phonegap build ([#386](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/386))
  - Branch Deep Linking not working in Android ([#384](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/384))
  - What is "ios-team-release"? where can I take it from? ([#383](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/383))

## [v2.6.15](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/releases/tag/v2.6.15) (2017-10-17)

- **Completed Changes**
  - fix: fixes #380 by ripping out Android multidexing because of complications with Android Studio 2.3+ ([24316](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/243165a925f6107d4d5e53c164ccd5268e7b8343))
  - fix: fixes #384 by referencing the Android SDK jar instead of gradle version ([8869e](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/8869e87b4497ff2e75dd5ca9282fd39f71a04cc1))
  - chore: update iOS SDK to 0.20.2 ([84787](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/847874ee92682f0d13a3044c5640f9e5deb4efc8))
  - chore: updated npm version to 2.6.16 ([2feaa](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/2feaaafff2f6d1f2d0c17ce671ec432a9df60628))
  - fix: corrected App Links -alternate on Android ([5ffeb](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/5ffebb59beb5bd4dbb270bf54c584599d4d22751))
  - Merge pull request #382 from BranchMetrics/more_fixesMore fixes ([70176](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/7017650390fdaeb9fa494e8433d0f3f52321325a))

- **Closed Issues**
  - CSP violation unsafe-eval ([#381](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/381))
  - Android build fails: Could not find any version that matches com.android.support:multidex:25.+. ([#380](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/380))
  - Typescript typings ([#379](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/379))

## [v2.6.14](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/releases/tag/v2.6.14) (2017-09-28)

- **Completed Changes**
  - fix: added more precise measurement for link data duplication on init ([f3748](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/f3748a209202b40d01b3938173868d144fb0e7c0))
  - fix: corrected testbed flexbox styling for iOS 11 ([5d5d1](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/5d5d1d87cbf4f185233d57f40966fcd5b85c4c85))
  - chore: updated npm version to 2.6.15 ([2490d](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/2490d1e768e8f6c61a7404ec5d0b0bde6d4e3dec))
  - fix: removed csp violation (#381) ([75ef4](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/75ef406124720330455f6681c0e15d453900191d))
  - Merge pull request #377 from BranchMetrics/update-versionschore: update ios 0.19.5 ([49821](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/4982186079f9960b4a7056a859cbcce0f9b5cc67))
  - chore: update ios 0.19.5 ([872f6](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/872f6da3b8c83da9f8f07395313fc7212f8418fb))
  - Merge pull request #375 from BranchMetrics/ionic1-fixfix: ionic1 double data ([4cebd](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/4cebdcf679d017dd0c7d0b0834954894f7a2f6e5))

- **Closed Issues**
  - Problem with external deep links on iOS ([#378](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/378))
  - Failed to fetch plugin ([#376](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/376))
  - Branch Links Cutoff in iMessage ([#374](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/374))
  - Error in createObj: "Branch instance not set. Please execute initSession() first" ([#373](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/373))

## [v2.6.13](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/releases/tag/v2.6.13) (2017-09-28)

- **Completed Changes**
  - fix: trying changlog into travis ci ([7926b](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/7926b439c39dcdc9c56b292ceb006c6a43adb2ea))
  - fix: updated changelog script ([d04fb](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/d04fb884272dd876078576665d4f8b5d10ba3ad1))
  - chore: updated npm version to 2.6.14 ([c5800](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/c5800ed1643158229cdc7413ef2fb27dfdd83bba))
  - fix: fixed ionic1 double data on ios terminated ([2789c](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/2789cdd89063fd77a634af808ba430c0c012deb0))
  - Merge pull request #372 from BranchMetrics/update_sdksUpdate sdks ([6193f](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/6193fdf00c8d775520b5ae6e4328bee88ca26ac3))

- **Closed Issues**
  - android-prefix using custom deepview ([#371](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/371))

## [v2.6.12](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/releases/tag/v2.6.12) (2017-09-07)

- **Completed Changes**
  - fix: corrected iOS 0.18.8 compiler error with Cordova ([8616c](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/8616c6aa7b4eef8690ad6922eb3beba42fd1c40d))
  - chore: updated npm version to 2.6.13 ([2d7a2](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/2d7a20508e425053186e111befd909c9aedc96dc))
  - fix: updated android 2.12.1 ios 0.18.8 ([18665](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/186657253fe06cd050d95f81e51085dae95db8ee))
  - Merge pull request #366 from BranchMetrics/android-single-taskAndroid single task ([1dcdb](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/1dcdb7617179450147d75fd68bbacbba55884b9e))

- **Closed Issues**
  - QUESTION: *Action required* Upgrade Branch Android SDK ([#370](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/370))
  - Error: BRANCH SDK: Invalid "android-prefix" in <branch-config> in your config.xml ([#369](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/369))
  - Handle Non-Branch Deep links ([#368](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/368))
  - deepLinkDataListener not called if app is already running on Android ([#367](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/367))

## [v2.6.11](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/releases/tag/v2.6.11) (2017-09-06)

- **Completed Changes**
  - chore: updated npm version to 2.6.12 ([0b1e4](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/0b1e4923a2d5e896489c8893f9406afd3c376bdc))
  - fix: override singleTop to singleTask on android ([7ae78](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/7ae78dd517bea153315549765ba0ceb9e6641b1f))
  - Merge branch 'master' of github.com:BranchMetrics/cordova-ionic-phonegap-branch-deep-linking ([d50d4](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/d50d48bab5e211293e26221d3a2c1415cac85c04))

- **Closed Issues**
  - iOS: Only one branch link per session? ([#364](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/364))

## [v2.6.10](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/releases/tag/v2.6.10) (2017-08-28)

- **Completed Changes**
  - fix: added support for phonegap-plugin-push ([a9ed2](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/a9ed27fbf96bfdf40c20c4926bd43cf1f47f6388))
  - chore: updated npm version to 2.6.11 ([eb113](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/eb11309973671a3f7bdc436965242713fbf9a41e))
  - fix: removed empty promise error in initsession ([f319a](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/f319a59ca8fcc4bc4df1d5edb1a9fe8a8d145674))
  - Merge pull request #365 from LeblancErwan/track-event-documentationdocs: fixed variable declaration ([c2b5a](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/c2b5a495ecbb2a191c5c59cf6ee5c1e5f6cfdfbf))
  - docs: one more metadata correction ([5abe4](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/5abe439cb7c03a80d8d7eaef19f9c4426a21aca9))
  - docs: fixed variable declaration ([c8e93](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/c8e939c3d405e7531dab27f0ed9dea5fcf909fe1))
  - docs: fixed missing branch init ([12303](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/12303e1fb78bdc9322251b2aa41a55a1ba8428be))
  - Merge pull request #363 from BranchMetrics/fix-double-open-on-ios-backgroundFix double open on iOS background ([e7019](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/e70191992fcbd5ba3963354dac97944cea087ac1))

- **Closed Issues**
  - Ios does not add .plist intries when android platform is present ([#362](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/362))
  - TypeError: Cannot read property 'navCtrl' of undefined ([#361](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/361))
  - Branch io not working in my android device ([#360](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/360))

## [v2.6.9](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/releases/tag/v2.6.9) (2017-08-28)

- **Completed Changes**
  - chore: updated npm version to 2.6.10 ([9f09a](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/9f09a37f547bbd55358260de757c159b2256c384))
  - fix: corrected double opens on iOS background ([0868d](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/0868ddebf215ae6213fd407b7f52b10751d9959f))
  - chore: removed un-used CoreTelephony framework ([9389b](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/9389bedf1b66a1646add0c3ea7d34e6acc75a4ce))
  - Merge branch 'master' of github.com:BranchMetrics/cordova-ionic-phonegap-branch-deep-linking ([2e56e](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/2e56e224eccdb17991dba6ceabe44db0bb35ad39))

- **Closed Issues**
  - how to avoid handling a deep link twice on cordova android application? ([#358](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/358))

## [v2.6.8](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/releases/tag/v2.6.8) (2017-08-17)

- **Completed Changes**
  - chore: updated npm version to 2.6.9 ([2832f](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/2832f1d5d123cb12cc0d81c24dce9a843afe8d24))
  - fix: support mulitple platforms with hooks #362 and #334 ([5811c](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/5811c59fd85ca6568dac5822e50e7b7c3b3f8682))
  - docs: updated supported platforms ([13de6](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/13de6f827f0c9d5e4328b1a11430149ec47236dc))
  - docs: fixed branch init being called twice because of premissions ([c1a54](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/c1a54e688eb1b55793382fcd6da53cc99c26df11))
  - Merge pull request #359 from BranchMetrics/fix-stuffFix stuff ([9a58c](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/9a58cb33b484187c0e55a1c9d0839a53631d55fa))

- **Closed Issues**
  - Adding plugin removes aps-environment entitlement from subsequent Xcode archives ([#357](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/357))
  - BranchSDK not found ([#356](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/356))
  - Link not clickable on Whatsapp ([#355](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/355))

## [v2.6.7](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/releases/tag/v2.6.7) (2017-08-07)

- **Completed Changes**
  - fix: corrected testbed init with latest cordova ([14697](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/146974f4facc4407e7fea18bb85344cc445b9eb4))
  - fix: duplication of data requests ([2c2b5](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/2c2b58637c5e8c4b5d38861bca671165696e3ff8))
  - style: renamed node script ([7eb70](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/7eb70ea6b18eb465cd99536cd9ebe3d22c41ae4b))
  - fix: updated ios 0.17.9 and android 2.11.1 ([19501](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/19501b077f8dbad7fbf64998faaad74f9b53ab3b))
  - fix: updated node dependencies ([a5ebe](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/a5ebe750711c88935f2ee57a8e14a5460ceb5907))
  - chore: updated npm version to 2.6.8 ([fb6b6](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/fb6b68ef55fc522a22d7cb2e996798d3629d58b1))
  - fix: potential fix for #356 ([e3873](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/e3873d182f22e5027fdfe4fb35c8126d36cc58c3))
  - docs: updated whatsapp expected behavior ([48713](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/487133a8551f8adc9cfb886f2cdd0eeed4331a89))
  - Merge pull request #353 from BranchMetrics/android-dependenciesfixed conflicting android dependencies ([5e329](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/5e329ae2ba480ad286eb5a5b7bc6bd05db681200))

- **Closed Issues**
  -  Domain is incorrectly set up ([#354](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/354))
  - Cannot find module 'xml2js' ([#352](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/352))
  - Invalid "android-prefix" in <branch-config> in your config.xml. Docs https://goo.gl/GijGKP ([#351](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/351))

## [v2.6.6](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/releases/tag/v2.6.6) (2017-08-02)

- **Completed Changes**
  - chore: updated npm version to 2.6.7 ([4f34c](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/4f34c79bd8e3f3cd7bfb315059181793692345c9))
  - fix: android dependency conflicts ([66a0e](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/66a0e015fba9a9ad93971547bd0fedfb3db9c301))
  - Merge pull request #349 from BranchMetrics/event-commercefix: updating dependencies ([53b46](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/53b468578e572019b75e8f420e759e3d6fc3ef69))

- **Closed Issues**
  - Android build failure after upgrade to 2.6.6 ([#350](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/350))

## [v2.6.5](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/releases/tag/v2.6.5) (2017-07-13)

- **Completed Changes**
  - fix: android crash when init was not called on main thread ([1fca2](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/1fca20652a94aad1dd78e03e9f6cd0545fd6b220))
  - fix: updated testbed init after errors in cordova ([a6391](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/a6391d00654e2607cafec3aeea568aa7abc6715c))
  - fix: added yarn ([f2abf](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/f2abfa4b20572658e75c27f8a9b78c9207e82e32))
  - fix: updated testbed init and updated dependencies ([47209](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/472098140e1d2f5d1a9249884f6e4cb3b15b15ce))
  - fix: updated testbed script for node globals ([f6dcf](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/f6dcfd71b1713b61d9ddeeca788163d1bafc2783))
  - chore: updated npm version to 2.6.6 ([b8fc1](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/b8fc1d6d624b37961a433253290da6393b333ddc))
  - fix: updated ios and android dependencies ([2a1c0](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/2a1c03695854fbbd99d3d67a14cbaf1a87e3b0c0))
  - docs: fixed links ([21b9c](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/21b9caaef83f3c8c4bf6369dd6dcd6474c371c8f))
  - docs: fixed links ([eb898](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/eb8989d2f69abe49c963404527de220c527d0815))
  - Merge pull request #347 from BranchMetrics/changelogfix: change log update ([76c3f](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/76c3fc2d3bfd5e630cf78cb15d0ea7245709cebc))

- **Closed Issues**
  - Play services version conflict with other plugins ([#344](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/344))

## [v2.6.4](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/releases/tag/v2.6.4) (2017-07-13)

- **Completed Changes**
  - chore: updated npm version to 2.6.5 ([d268f](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/d268f7d0f1a6ea15f672523b8fa25fc388ad747e))
  - fix: updated change log ([13276](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/13276cc0f72d00d4f499ec4852cfb3585c320c47))
  - Merge pull request #346 from BranchMetrics/testing-npm-updateTesting npm update ([d772c](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/d772c5b5006afe5e919aa72d21fe1eadf29c62e1))

- **Closed Issues**
  - createBranchUniversalObject Error (Ionic) ([#340](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/340))

## [v2.6.0](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/releases/tag/v2.6.0) (2017-05-25)

- **Completed Changes**
  - chore: updated npm version to 2.6.4 ([14973](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/149735a261450d6aa9e9e32390ee8c00b218df8c))
  - fix: test npm publish ([a6285](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/a628585665c9cd774fdfef00f4dbbaf8392f2acc))
  - Merge pull request #345 from BranchMetrics/npm-updatefix: removed google play services ([779a9](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/779a9a0d009fd98bc096b413672b0d7e06aefabb))
  - chore: removed the end line new line ([26868](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/2686897d666204ea4398e185b556cbf29f1495cd))
  - Merge branch 'npm-update' of github.com:BranchMetrics/cordova-ionic-phonegap-branch-deep-linking into npm-update ([58a62](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/58a62976f1810670c183e6bfbc22631a6a5aeff5))
  - fix: removed google play services as it conflicts with other plugins ([d0bf5](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/d0bf552f57c8db7e08c1704d9377e6b94819259e))
  - chore: updated npm version to 2.6.3 ([298c6](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/298c6744cc4c18ac790dcf5ade199ea4f1a6448c))
  - fix: removed google play services as it conflicts with other plugins ([f12e6](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/f12e6e6f6c1957f2c7f0cc7f201e80f3b09ac14a))
  - docs: fixed broken link ([e4650](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/e465000827fc0a1728fd3e6e238ab5cc9f4aac62))
  - Merge pull request #343 from BranchMetrics/test-npm-versionTest npm version ([b7b2d](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/b7b2d62f356c4c991fa1f0315f837b0c51278000))
  - chore: updated npm version to 2.6.3 ([30349](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/30349baa8ce6f370c9be3688a55ba41b55a7c0bd))
  - fix: correct semantic release ([33462](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/334628667d9d6bb928bf53b4272782fdf7d4c478))
  - Merge pull request #342 from BranchMetrics/test-npm-updatefix: added npm-check for dependencies ([18688](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/1868825b1801bb4c1fa0bce281a8bd04e65932fb))
  - fix: added npm-check for dependencies ([0ab40](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/0ab40bd77aa0c5f1c01f574dcde408ccaef5a75f))
  - Merge pull request #341 from BranchMetrics/test-npm-deployTest npm deploy ([13c77](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/13c774cae1d225b1bd747713758dcebbc8f8b4f5))
  - chore: updated npm version to 2.6.2 ([bf753](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/bf7533931c5918ee978784bd4544cb96272d3acc))
  - fix: testing npm deploy ([cfc59](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/cfc595d58562988e72f0b44910072fac614e7f48))
  - Merge pull request #337 from BranchMetrics/npm-updatefix: updated node dependencies ([e80e7](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/e80e7e384eb15e90c7461b94a73fa0aeb1716e78))
  - fix: added android multidexing for all branch required frameworks ([edc54](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/edc548092b66eeb9e578ac3588c86312e42deb1b))
  - fix: added android chrome tabs for better matching ([92bfe](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/92bfefe4da37df4147f9e23e31e7056444cd06aa))
  - docs: updated how to test each file ([a66ca](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/a66caaebd9207ea5937935a69b166ead9cc02bbc))
  - fix: cordova iso-sim error correction only for runs on ios ([0c4fe](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/0c4fe2dc20824d4882c6ea6dfbd000b0c31e8a2a))
  - fix: cordova iso-sim error when building testbed ([256bd](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/256bd0c487bdd6575d484bbe612940ebebc6cae2))
  - fix: removed testbed/config.xml from GitHub since cordova 7.0.0 overrides defaults ([c5752](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/c575200f4cf6be8c2ff79c8d3409751de5b95a20))
  - fix: updated node dependencies ([5c59d](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/5c59d53821dedee703f9be31e9e1f97063467d0b))
  - Merge pull request #336 from BranchMetrics/force-npm-updatefix: correction on deferred deep linking comment ([2eaff](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/2eaff0709332741273b4c4b74aaaec3cea8efffa))
  - fix: correction on deferred deep linking comment ([5b769](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/5b7691e84acb1b1c3048a943995300fe26a78d57))
  - Merge pull request #334 from harshabonthu/masterMove Before prepare and After prepare hooks to after plugin install, add ([69cfa](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/69cfaed949d52df5f46213c35d2aece085a73357))
  - chore: updated npm version to 2.6.1 ([ef754](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/ef75476a82bdff8fef4e4027d6215399cd9f29a3))
  - fix: move before_prepare and after_prepare hooks to after_plugin install, addThis fixes the bug mentioned here: https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/333 ([44a7a](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/44a7ac1ff2656ae5f3fbc6b0d29ed6221a80d95e))
  - Merge pull request #331 from BranchMetrics/routineRoutine ([8426c](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/8426cbd7270a0cea0e482fc4a936e860dbf851b3))
  - chore: updated changelog ([c5045](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/c50453f66a92ad5c1911d354407ad2e3749521e0))
  - chore: updated iOS sdk to 0.15.3 ([42ea9](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/42ea93ded32e5f94281996093f7e8cebd63ea842))
  - docs: update run for ionic3 ([62537](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/62537d04de93d510ef1b18cb740aee9a4ca31266))
  - docs: added indention to currencies ([549a0](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/549a042568f3635b61dbd385f6282ca70dd78e51))
  - Merge pull request #328 from BranchMetrics/fix-cordovaadded commerce events ([720cc](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/720cc2605544f209cba533d31daeca01aeb59c9e))

- **Closed Issues**
  - ios notes uses default Branch image rather than contentImageUrl ([#339](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/339))
  - Branch.initSession seems to execute too early ([#338](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/338))
  - Associated domain capabilities not copied to Xcode ([#333](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/333))
  - Deeplink from app content ([#332](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/332))
  - Branch.io init returning 400 bad request ([#330](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/330))
  - iOS: Instead of opening application directly, Branch.io takes me to safari ([#329](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/329))
  - Instead of opening application directly, Branch.io takes me to the App Store ([#327](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/327))
  - Multiple Dex Exception on latest build branch-cordova-sdk 2.5.16 ([#326](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/326))

## [v2.5.17](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/releases/tag/v2.5.17) (2017-05-10)

- **Completed Changes**
  - docs: relocated commerce properties to new section ([572a8](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/572a8893e23a5abcd94f3ed0108d47c2b6361e2e))
  - fix: correctly commerce currency on iOS to match Android ([47ade](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/47adeea8427f0dd87162f89b5b9ad90b2b65abc2))
  - feat: added commerce events to android ([2639f](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/2639ffc62d19652be0a981c5109e0d9ca134d83a))
  - style: fixed padding ([4a4c3](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/4a4c38cee2aa4873621df2729557572aa36ac66d))
  - fix: update android sdk to 2.8.0 ([dfc14](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/dfc149ff7a0747969e363d394474d83b87f995c6))
  - docs: minor spelling and version changes ([8d309](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/8d3096b457e7bc35f6b56c8d0341e78725dd07d3))
  - chore: updated npm version to 2.6.0 ([707a0](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/707a05c927d52675d9d880ebef177dcb2669caec))
  - feat: added commerce events to iOS ([faa3f](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/faa3fb094348548d076b54cd2be91c7949f06de0))
  - style: tabs to spaces ([545ae](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/545ae679fc8752efc0cd71386ea8a8ddf4967a78))
  - fix: updated openURL to latest syntax ([bc7c2](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/bc7c25d46fa3fe388ebcb1c2bb673dfaf42213b3))
  - chore: updated npm version to 2.5.18 ([7b54a](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/7b54a9db8a522c1e16fa1146a2666adc16b0c95e))
  - fix: android-prefix now required for custom domains ([d4417](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/d4417ac77de04ee5c560618d8957c3c96e6981e8))
  - docs: fixed data flow for contributing ([5661e](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/5661e0ac71109a3213c8570517c1757124554674))
  - docs: added data flow to contributing ([d14bf](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/d14bfd45f6df7cbcbe520c5f4cddf75a8d40189a))
  - docs: toc grammar update ([c5db7](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/c5db7ddf79dfe64631ce8328374791ddcc1ffc82))
  - Merge pull request #325 from BranchMetrics/fix-cordova-7fix: added support for cordova 7.0.0 ([14256](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/14256589c44376533a9d3e706557e2d78d1c5c54))

- **Closed Issues**
  - Branch.initSession bugged ([#324](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/324))
  - Error with cordova 7.0.0 ([#323](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/323))
  - Query Parameter getting stripped off ([#322](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/322))

## [v2.5.16](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/releases/tag/v2.5.16) (2017-04-18)

- **Completed Changes**
  - fix: cleaned up cordova 7.0.0 fix ([6f1a2](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/6f1a2a5b032f8d6a32f0417f56ff218b5ec793b2))
  - fix: added support for cordova 7.0.0 ([862f1](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/862f14e510ccccd2f44372ed4d5fc9ed29e88b89))
  - fix: removed es6-promise-plugin dependency ([de7cc](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/de7cc9db43712d0a9e00d648c0f620f5cc87df51))
  - chore: updated npm version to 2.5.17 ([0312d](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/0312dca92c4fd0c8543c31b5bd52ae843f16e856))
  - fix: updated plist dependency to 2.1.0 ([1f8b8](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/1f8b81e7b4f1413ae4f211ee327af6c5b23ef924))
  - docs: added error for incorrect minimum android version ([2a848](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/2a8483c92d575bf231fa1f0d544fd23a71673391))
  - docs: made building testbed more understandable ([df568](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/df5689c148a81c14be99ba929f1b65ac3e52d4e5))
  - docs: added methods to test each function ([80ca7](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/80ca7594eb73e30c6b1318204b9018b9c19b3522))
  - Merge pull request #318 from BranchMetrics/fix-release-schemefix: able to have release schemes and archive in ios ([96db6](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/96db6caac4095f161e7c659debb6e881d9c05faf))

- **Closed Issues**
  - Init Error ([#321](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/321))
  - Missing : Commerce event tracking ([#320](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/320))
  - custom url schema support ([#319](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/319))

## [v2.5.15](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/releases/tag/v2.5.15) (2017-04-17)

- **Completed Changes**
  - Merge remote-tracking branch 'origin/fix-release-scheme' into fix-release-scheme ([6e669](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/6e66953d9a0eb4d8b91d4ab9659cdc57f050ee5d))
  - chore: updated Android to 2.6.1 ([c4b8a](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/c4b8a68fd6c4665f3ca5f636d2ff5c01b6813a7b))
  - chore: updated iOS to 0.14.12 ([85557](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/855576d8e459c5583cee9d90521222bbb7e22348))
  - chore: updated npm version to 2.5.16 ([a6eb1](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/a6eb1c58425fefd0c8255c89be27ed5df3239aca))
  - chore: corrected merge conflict with master ([e9570](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/e957041baa20237061549ff221005185c0ef3f2f))
  - chore: updated changelog ([ef917](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/ef917d21c5cf4fb8e6d85b9b8daf49d4e0d6d3c0))
  - fix: able to have release schemes and archive in ios ([14912](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/149128f2685b57c7e6b0fe0806c9040ead7ecd78))
  - chore: updated Android to 2.6.1 ([c0c66](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/c0c66dee28a848e47b5ba5f729eb210f5595b3a8))
  - chore: updated iOS to 0.14.12 ([66ee9](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/66ee9dc0746ed80fb09e8620ce743bffe5662583))
  - chore: updated npm version to 2.5.16 ([df39b](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/df39b9ad36791d1cf276eb9e651bfbb986f6517a))
  - chore: updated changelog ([2743b](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/2743b69aaac973720b50abce2f038935d1f1c89e))
  - fix: able to have release schemes and archive in ios ([82300](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/823003cc3b28a8b9b2090e609952e57e552eea44))
  - Merge pull request #317 from BranchMetrics/fix-bundle-idFix bundle id ([89cf3](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/89cf3d7cd90992c2eef1e0cfdcbf18ce0f5a5fb2))

- **Closed Issues**
  - Building the project for iOS seems to be creating an entitlements file directly under Resources for some reason. ([#316](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/316))

## [v2.5.14](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/releases/tag/v2.5.14) (2017-04-04)

- **Completed Changes**
  - docs: updated based on hyphens and underscores ([ccddd](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/ccdddc354fb28eb319a1b1a25a87deb578f98d14))
  - chore: updated npm version to 2.5.15 ([414a1](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/414a184e23d51ae9c8a0e9bb309755ad238eae53))
  - fix: bundle is correction for android no hyphen and ios no underscore ([86fe1](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/86fe14b44803b801a40f6bd2cb2a1870430659cc))
  - docs: added ionic 3 support ([6d166](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/6d1668b86d983a7475cfdd6af5299a52b19185df))
  - Merge pull request #314 from BranchMetrics/fix-duplicate-deep-link-dataFix duplicate deep link data ([6e843](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/6e84333a2ad7f9dc7a131e94793f9f29022d485b))

- **Closed Issues**
  - Universal Object is not creating in IOS ([#315](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/315))
  - Documentation the README steps could include the part where we turn on Associated domains ([#313](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/313))
  - Error: BRANCH SDK: <branch-config> tag is not set in the config.xml. Docs https://goo.gl/GijGKP ([#312](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/312))

## [v2.5.13](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/releases/tag/v2.5.13) (2017-03-30)

- **Completed Changes**
  - chore: updated npm version to 2.5.14 ([da818](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/da818e2a3b3df5893b47dcd9a50e933f5a05897d))
  - fix: prevented duplicate data return on ionic 2 terminate and no network ([d2888](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/d2888547a73fbc370cceeaed535241ea56cf6609))
  - docs: fixed spelling error ([7e3aa](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/7e3aadfe4682329d54784f02664621d963f45a18))
  - docs: styling fix ([fb0cc](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/fb0cc072d4df5ec3c453515e7113312c01c22bda))
  - docs: indention fix ([54ca7](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/54ca7e139b1d5a8f3d5d403adfac18c11ae9f245))
  - docs: testing key points and update to lastest sdk ([6d1fd](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/6d1fd3ec006055ef5cc68c1fd34fd0099e07eac9))
  - docs: og image must be an absolute path, not relative path ([51768](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/51768052cb9b2203b386791b3296c8ae3a69488c))
  - docs: track event update ([e092e](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/e092eba99509df4512f6ca0cd7f3d29cbb3d9016))
  - docs: added ios-team-release if iOS app ([846d3](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/846d30ed4bec64bd7ef7fb293c19bce205df09f3))
  - docs: fixed spacing ([043f4](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/043f417f1182543a01e07a5c94fd5c35a28dfa7c))
  - docs: updated logout ([257be](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/257be8aa91f12fdd95ea62d3d874d72d637bbc4a))
  - docs: made setIdentity() seem less mandatory when userCompletedAction() ([4b8fa](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/4b8fa9a1d2e22093629920d0297b07e23f91a8bf))
  - docs: removed additional ([f68f0](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/f68f0db33c505cf8676aaf053b6e8f014c2b98e7))
  - Merge pull request #309 from BranchMetrics/fix-android-onlyFix android only ([717c8](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/717c87fc5bd739ab99fb9b2223536da037ce2598))

- **Closed Issues**
  - Documentation about incompatibility ([#311](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/311))
  - Why is it mandatory to use setIndentity to track user events? ([#310](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/310))
  - Invalid "ios-team-release" error in config.xml ([#308](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/308))
  - No link in message when sharing with Facebook on Android 4.4 ([#307](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/307))

## [v2.5.12](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/releases/tag/v2.5.12) (2017-03-28)

- **Completed Changes**
  - chore: prepush was not working ([a4a56](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/a4a5682020eeaa5bc9e321e12d3194c90c71667f))
  - chore: updated npm version to 2.5.13 ([92f97](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/92f976b1c13aa0a31aa97f36ac6a46978394b5f7))
  - fix: android only now supported ([59aba](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/59aba7a41df878bb4bcfa5dc3f9cc70b3e3f3bb3))
  - chore: updated error consistency ([f3dbf](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/f3dbfc88e68f893a0b186b5b4fa0a2dfb684ac7e))
  - fix: testbed styling for older android devices ([04299](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/04299971e6ca93a0c9f40b24ec97aaeb4411f1e1))
  - docs: added replace for config.xml ([5ad80](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/5ad804af0d3e38fdb5c887887d05bc8cec731402))
  - docs: removed trailing spaces ([57137](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/57137acb17ed84180dec68ee6a7d61b1d4ac102a))
  - docs: removed unneeded periods ([437c3](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/437c35762af4230d1083d26407bf94e67dbaf5a4))
  - docs: cleaned up branch analytics ([af81e](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/af81e00b92d5925a11a1a60a08b15d2e6b470082))
  - docs: cleaned up simulate install ([7ff5c](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/7ff5c60d02171aceefbd46d5a944a6e51fcd81b8))
  - docs: updated supported platforms and branch analytics ([ede52](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/ede5235cfb788ad73f006d4546c9f5ca6a97671d))
  - docs: updated how to simulate an installs ([6d311](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/6d31161bbd0ce031fe8882b3ea53c17ec9a371fa))
  - Merge pull request #306 from BranchMetrics/fix-ios-development-teamFix ios development team ([69822](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/69822ee47940b55882aec1dfd65d586e0914c4b7))

- **Closed Issues**
  - Twitter Share does not show preview ([#305](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/305))
  - Deep link is received twice in iOS in Ionic 2 ([#304](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/304))

## [v2.5.11](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/releases/tag/v2.5.11) (2017-03-21)

- **Completed Changes**
  - docs: fixed grammar on why ([2ec1e](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/2ec1e80265fb45cf1fedbb95fed86814ec5c65cc))
  - chore: updated npm version to 2.5.12 ([57af6](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/57af67703d3d46a42cce3aed229bc2233113d48b))
  - chore: fixed trailing newline issue with npm dep rebuild and npm version update ([2c201](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/2c2019603af625d151e8f8530a5b5a29ff1967ec))
  - fix: corrected developer team error on first load ([c5cb8](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/c5cb80a4b5b06b8a93b169d6bc1ea4349771a758))
  - chore: added changelog script to contributing ([81af1](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/81af1e316a9a6644d9be72863d8d8f19ec351cd7))
  - Update README.md ([6a556](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/6a55696a572b591756ec6c536aeae548637cdce7))
  - Merge pull request #303 from BranchMetrics/feat-multiple-link-domainsFeat multiple link domains ([5f0d0](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/5f0d00feef4541b7208e5620ec51bc96e306bc2b))

- **Closed Issues**
  - config.xml changes ([#302](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/302))

## [v2.5.10](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/releases/tag/v2.5.10) (2017-03-21)

- **Completed Changes**
  - chore: updated npm version to 2.5.11 ([25b5d](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/25b5d7236cc6e68e3d5d1b249189b656a58b19b8))
  - fix: added multiple link domain support ([0f90b](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/0f90b3eeabfe3daf40a8430fb25f5b0e5f735aa1))
  - fix: added yarn instead of npm ([7759f](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/7759f6e3e048d4daf4f9bc909398853812f83f70))
  - Merge pull request #301 from BranchMetrics/added-changelogfeat: added changelog script ([99fc7](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/99fc717dc1f4c6f2fe2f50fcfe158a8447bc13a0))

- **Closed Issues**
  - This plugin invalidates cordova's Entitlements-Debug.plist and Entitlements-Release.plist ([#299](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/299))

## [v2.5.9](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/releases/tag/v2.5.9) (2017-03-09)

- **Completed Changes**
  - fix: regression tested changelog script ([48efe](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/48efe35dedd2c459dc0844278a8267fa3bce1e5e))
  - chore: updated npm version to 2.5.10 ([061f3](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/061f340bd71c8c09f08b6d3d483098d0b466fb12))
  - fix: updated all npm dependencies ([5fb5b](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/5fb5bb40de5f2bd1d3878edcf719d43192eeacd2))
  - chore: added yarn for faster npm install ([636e4](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/636e4ba87c01a706c1db6a2ed7967b487647e462))
  - test: added changelog script ([36ce2](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/36ce2cf77d95664fe451f4081dc5632f888d8b8e))
  - docs: removed outdated changelog ([c3417](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/c34173dcba5ab575a7dd60df77a1a357744ea65b))
  - docs: updated table of contents ([5de1d](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/5de1dff6c0872384f14a945eea02813052e44e7b))
  - docs: fixed styling to mimic readme ([cc460](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/cc460fa1f695acde54ff006472b8fe7f87fc32cf))
  - Merge pull request #300 from BranchMetrics/fix-intent-overrideFix intent override ([4ddf0](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/4ddf036d49a3ab5296aa6efdf3bf5aa54019bdc5))

- **Closed Issues**
  - Provide better API error descriptions ([#295](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/295))

## [v2.5.8](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/releases/tag/v2.5.8) (2017-03-08)

- **Completed Changes**
  - chore: changed postcommit to prepush to speed commits ([7891e](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/7891eb1e361fbfa6d53a7438f19d9d70c0688e3c))
  - chore: updated npm version to 2.5.9 ([4a8a2](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/4a8a220cd37e7bc8ff2496418813a14e72b93621))
  - fix: added unique ids to branch intents to prevent android manifest overwrite ([4b6b3](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/4b6b3baaa407d3937e2cab1369286ef12d2199d1))
  - docs: added generate keystore ([467d8](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/467d8054a75f099ab856f886973ff144b97ef580))
  - docs: added reinstall branch ([440e5](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/440e5c3c0ed84c95977514980a55ea8df175e810))
  - Merge pull request #298 from BranchMetrics/native-sdk-install-scriptNative sdk install script ([be3bc](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/be3bc5fef1403979c478eef63aa3bd48bd6e8fa0))

- **Closed Issues**
  - Update plugin.xml id to be consistent with npm ([#290](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/290))

## [v2.5.7](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/releases/tag/v2.5.7) (2017-03-08)

- **Completed Changes**
  - docs: updated to latest legal ([eaf5b](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/eaf5b5c53cc0c681c878c346a635b3bff73d1361))
  - docs: updated contributing to latest config ([f53f4](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/f53f4b1c40f0ce6a9f7b6c5582ca26314a6d1dd8))
  - fix: unified ios and android sdk update script ([39112](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/39112a69f3e6c1603f7409da76fb501333844637))
  - chore: removed logging from hooks ([cb8f8](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/cb8f82960b624131c15b1e201538acff1155942a))
  - chore: updated npm version to 2.5.8 ([4016a](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/4016a473366289f22cb025a50834feb28a1663ff))
  - fix: reduced sdk file size by 60% ([dae77](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/dae771ae96c338f3d8e20f2f05fd71cc235f71ff))
  - Merge pull request #297 from BranchMetrics/update-ios-and-android-sdksupdate ios and android sdks ([a3b21](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/a3b2143952df42d4b7d2a69e3b7f2710b1a98bf0))

- **Closed Issues**
  - publish to npm?? ([#289](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/289))

## [v2.5.6](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/releases/tag/v2.5.6) (2017-03-07)

- **Completed Changes**
  - chore: updated npm version to 2.5.7 ([e31ea](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/e31eabdcea97b7abacd5ea26bdafb8334c149b47))
  - fix: correct early exit on auto npm version ([77462](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/77462f90af6efc99b4921cf518e3ab3d65820916))
  - chore: cleaned up trailing character ([d6f8b](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/d6f8bcbb60b3417e8b35621b27fa5b54ab50d92d))
  - fix: created android sdk update script ([63331](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/63331d1cfc8efbb3e2269532898d8df7942bca4e))
  - style: relocated ios sdk update script ([316ee](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/316ee2cf88f2b907c08366012344cf7a182cea6c))
  - style: processed with bash linter ([c07e5](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/c07e58acc798036319963ac197cd691c37263d99))
  - style: cleaned up comments ([e15ee](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/e15ee8f5c07fab4da8a558433605d2f036288386))
  - fix: updated ios sdk to 0.13.5 ([e41ac](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/e41ace250c512143c47331170fe52334c055b02a))
  - fix: updated android sdk to 2.5.9 ([37d7e](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/37d7e40d03c832dd732af52fb6c9f17b0387cac3))
  - style: renamed script filenames and added comments ([94280](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/942809e36ab57ba9e66175158106c743ba0f5a49))
  - docs: added spec requirement to plugin install ([16d1f](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/16d1f5a5de0f2400410093263a48da26ec7c889b))
  - Merge pull request #296 from BranchMetrics/fix--continual-improvementsFix: continual improvements ([060e2](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/060e2ab43465ef10a8381a2e71674c5d3aaf1740))

- **Closed Issues**
  - BNCServerInterface.processServerResponse has log but initSession isn't fired on iOS ([#288](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/288))
  - I can't show image when share moments with WeChat ([#287](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/287))

## [v2.5.5](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/releases/tag/v2.5.5) (2017-03-07)

- **Completed Changes**
  - chore: added comments ([682db](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/682dbfe7099da660b338f8a3f9fc1aadb12a3a9d))
  - fix: early exit to npm auto versioning ([5071d](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/5071dcb333ecac305561af54aadfd083bb4afc79))
  - fix: added linting before commit ([408d8](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/408d8ef85636d99f440c72378b6713fe5de34ed2))
  - chore: corrected linting ([f991b](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/f991be388d40f3a1293dd6a6e4e72b9fd8e16ce9))
  - style: renamed var to constant ([2d6b9](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/2d6b992e1b85bb8c078a9cace067a37af3e0b7ac))
  - chore: updated npm version to 2.5.6 ([e7557](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/e75570af6dd147de6e7764b8c5c409cf795c30a3))
  - fix: added git push to auto npm versioning ([3b0c9](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/3b0c9ccccbc652384cb13b4b5e341e41800e8c57))
  - fix: prevent setUserIdentity crash by wrapping id in a string ([f353e](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/f353eca83881efb827b028778325fea5413467bf))
  - style: renamed deferral to async ([45212](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/45212212a29ebdf3097b6e58304391ccc1a16048))
  - Merge pull request #294 from BranchMetrics/added-ios-and-android-bundle-idfeat: added ios and android bundle ([e52f7](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/e52f750b8f1569eb82abcf3d97e163f5b7f61aa1))

- **Closed Issues**
  - bnc.lt format still usable? ([#284](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/284))
  - config format discrepency ([#283](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/283))

## [v2.5.4](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/releases/tag/v2.5.4) (2017-03-06)

- **Completed Changes**
  - fix: iOS spotlight disable on android ([326d1](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/326d1825d5e0d6e593ded026ab707766943bd3d6))
  - test: precommit to postcommit ([cf941](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/cf94144ccff8a670b001112cc002c490d926b61d))
  - chore: updated npm version ([c8e53](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/c8e539194849fbbded592dfd886b7407356260ef))
  - refactor: added validation to config.xml and cleaned up code ([3792c](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/3792c180552f00c76f4e2c2f36987edab15cdc7a))
  - fix: added support for iOS and Android bundle ids ([f05ae](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/f05ae3022866383c701c0c67ccc2aac89eda4b46))
  - style: renamed projectplatform to iosprojectmodule ([ec5f7](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/ec5f7db64cbbb50c6b8cd3336d6df1d0605799fc))
  - style: renamed bundlename to projectname ([4507d](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/4507dd06c4a4bb46bc18c2c8bb73c90b6789dc63))
  - Merge pull request #293 from BranchMetrics/fix-npm-versionFix npm version ([b9c19](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/b9c198a69dab94d84fa440cce179a049a62bddd0))

- **Closed Issues**
  - Error: Cannot read property 'branch-config' of undefined ([#280](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/280))

## [v2.5.3](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/releases/tag/v2.5.3) (2017-03-03)

- **Completed Changes**
  - fix: automated npm version on release ([98139](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/98139def4ac9c2fc946d7161fc58f59036fa8130))
  - style: relocated hooks ([fbce2](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/fbce203495f03dde67fbc45adfaee40debbe3ad6))
  - Merge branch 'master' of github.com:BranchMetrics/cordova-ionic-phonegap-branch-deep-linking into fix-npm-version ([006f3](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/006f33a0a6ee86d7cf0a69029649695dd6fe4585))
  - style: relocated scripts ([4c053](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/4c05358662c22702008c4c0e1885b22cf20eb521))
  - Merge pull request #292 from BranchMetrics/fix-npm-versionfix: changed version to 2.5.3 ([c7395](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/c7395a8c7ffeabe515c89d5cef828a2a3db5afdf))

- **Closed Issues**
  - [Android] DeepLink data not being returned when app is opened ([#279](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/279))

## [v2.5.2](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/releases/tag/v2.5.2) (2017-03-03)

- **Completed Changes**
  - fix: changed version to 2.5.3 ([a5933](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/a5933905089fcbd3c1b065d4f5edee7d94090a43))
  - Merge pull request #291 from BranchMetrics/npm-fixfix: manually changed npm version ([07078](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/07078c1b1a3674dd05241875ca5f671548101de3))

- **Closed Issues**
  - injectPreferences in projectEntitlements.js should merge associated domains with current instead of overwriting ([#278](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/278))

## [v2.5.1](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/releases/tag/v2.5.1) (2017-03-03)

- **Completed Changes**
  - chore: updated version to 3.0.3 ([5a73e](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/5a73e69b16fde2f2e45dbe84c5d22b05aa9eb0da))
  - fix: manually changed npm version ([95d36](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/95d36f10c9f2913d311b063ec4a2a52075fa58a0))
  - docs: update title size ([642ce](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/642ce133aa97872a7e7b0bcd7a5336e7aad1ecd1))
  - docs: update image size ([9a280](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/9a280489f2eb2cb5d8086ba87625675f393eac30))
  - docs: minor wording change ([55b11](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/55b11b33fca33bb3e69f47ee4797944203f52871))
  - Update README.md ([277d9](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/277d9c2175051f561838417862566dd3ac2c565a))
  - Merge pull request #286 from BranchMetrics/minor_cleanupchore: removed more from npm ([b029a](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/b029aaf391b8a853dcfdcdddc8ec2d69cc60608b))
  - chore: removed more from npm ([82176](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/82176b6043d1bd9a2e89173fa04835177929a2e9))
  - Merge pull request #285 from BranchMetrics/minor_cleanupfix: minor cleanup ([5365a](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/5365ad31eace18e388149bec3348032877fd30f2))

- **Closed Issues**
  - config.xml branch-config doesnt support multiple associated-domains ([#277](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/277))

## [v2.5.0](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/releases/tag/v2.5.0) (2017-03-02)

- **Completed Changes**
  - fix: testbed now pulls locally instead of npm ([8c3c5](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/8c3c5cb0ee1d106a88052033b620530f09517a54))
  - style: relocated test harness into tests ([fb610](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/fb6105609ed8f00154582a3d25d13be7bf90634a))
  - style: relocated www into src ([1a791](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/1a791406fbb01f7cd82f88ca1632e919c57a7dbf))
  - chore: npmignore un-needed files ([9ecd4](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/9ecd4a80fe7cfde9a358527aafd72ebeef42ea74))
  - style: relocated hooks into src ([1639b](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/1639b18646cffda879608b136318e08b4e4ce3fe))
  - docs: removed outdated troubleshooting ([f7dbc](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/f7dbc56da24cafec8cac7e26edf82ae0fae07bde))
  - docs: matched bundle id to pics ([3e340](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/3e340021e6bee2a45322e8602f66630c62ece2af))
  - Merge pull request #261 from BranchMetrics/fix_plugin_install_from_config_xmlfix: [v3.0.0] install Branch SDK from config.xml ([41da2](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/41da207a4b34e1193985f55d652d95895dbe1d6c))

- **Closed Issues**
  - Why names different? ([#276](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/276))

## [v2.4.9](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/releases/tag/v2.4.9) (2017-01-09)

- **Completed Changes**
  - style: standardized error logging messages ([da61e](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/da61e06cd07fb6ee07fd6251a05324f73f93ec99))
  - feat: added validation to <branch-config> ([9f440](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/9f440ac0edb9c0776d9f349dcc98854976971a24))
  - style: renamed ios-team params ([55ed1](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/55ed1452c1ee4ccdbeac41d36470694fcf22b80f))
  - feat: able to simulate installs on android ([09258](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/092580aa2795e0615780aa07cc04c38cfaf95074))
  - fix: removal of old uri scheme intends after removal of android:host ([f4ce3](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/f4ce3dea91b20fd1aa0ab8743862fc9e0e389f53))
  - docs: update type=2 does not work ([8fa94](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/8fa94546cf0482f9b435e7f011607330ebd35988))
  - 0.0.0 ([979a3](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/979a31e2d442f21c71bfbd9d9ae3d7b52276843c))
  - perf: deep link handler mimics native initsession now ([aa417](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/aa4173d087487567b6f8a8bb09a487058bac8dcf))
  - style: removed redundant comments found in readme ([03a5f](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/03a5f1a89e8c4151408fdcbf17fd928a702b29e0))
  - fix: prevent crash on list on spotlight on android ([64193](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/6419361e2f9132d38ca02bfbec6fa095fa2212e3))
  - docs: style change for apps ([d980c](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/d980c1bf8590aae172445754f5a378765b234a2b))
  - docs: removed 15 min wait for aasa update ([a72b8](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/a72b8332524b27e6a0f3c53aede2787a95901116))
  - fix: android URI Scheme ([865b6](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/865b68adfa5b087f00a9ab7e73ff4992b0308442))
  - style: added comment and reordered sections ([19c60](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/19c6045a5d3e2bc1e6d81178c8c21a1c1c5ac8c9))
  - style: standardized error messages ([fb9b8](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/fb9b864d53abfcf7c88ec253a0fb68d7bec06a2f))
  - chore: fixed travis ci errors ([f2173](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/f21736b08883d1d603f4c69a36f2822838405de1))
  - docs: fixed trailing spaces ([1a8f9](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/1a8f976f7f36f1de31fc632d3c1400a7f557f05b))
  - docs: added compiling errors and solutions ([c3a5e](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/c3a5e9c64f11bba2ab28e5463f54c036ff535a99))
  - docs: updated aasa wait time since ahmed updated ([f8dcd](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/f8dcd57ad59d9fcce573bcfbb02b8620bf7f5bd7))
  - docs: fixed Branch missing error on Ionic 2 ([ea737](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/ea73739ba406b1ef42d5d56a2600ee39d1b54341))
  - docs: updated images to match testbed ([5a5bd](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/5a5bd2d84de5afc8fb2230bb2ca7f49e52097874))
  - fix: testbed bundle id cannot have _ or - ([0b25d](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/0b25db817aaacf0685d3be237efb6d810a01312d))
  - fix: added iAd framework for Apple Search Ads ([056ad](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/056ad4cca487b01d311edf17f4afc54c5f513a63))
  - chore: added node devDependencies to dependencies ([2d334](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/2d334b593dd3332878edea9099e68bc69d7ea206))
  - feat: no longer need to launch through Xcode to set provisioning profiles ([63e3d](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/63e3dd0f3d0b9ff0b4e8664dbe88113f5662b2f8))
  - fix: updated android sdk from 2.4.0 to 2.5.8 ([6bbdb](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/6bbdb37edcca9e49a072d17ec95ff0bd16198b18))
  - docs: update examples in testbed and readme ([29ba5](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/29ba593039352e864baf3f67ff61b18813fcebea))
  - chore: merged into master ([49d45](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/49d4599d36de905a8b6b9ff7f8d2b61f71226dfc))
  - docs: fixed ionic 2 syntax ([7f01f](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/7f01f618f15a8f07b87b016011a7b2826ab015d5))
  - docs: updated Ionic 1 and Ionic 2 code snippets ([417a9](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/417a9b6cc860e7153993da7a18caef0ac480d598))
  - docs: better english ([69051](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/6905169430f0ad5f2b4f738cb23fc7ed813c8a48))
  - docs: added $marketing_title ([1f3a8](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/1f3a85238a127955ca6400f960e494df2c172713))
  - refactor: style change to script ([b8499](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/b84993650e81980fe9ba879e6c4e24eaead06bcc))
  - refactor: organized script into functions ([b0640](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/b0640ead441b1522e7e07cbdc87061c0462f00e0))
  - refactor: validated bash code ([9ede6](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/9ede660774a54b60ebc96c86cca753eee0b19b4d))
  - chore: renamed testbed script ([ed57d](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/ed57d8f98697ef0b7320ee6de21edd5eee8a64ba))
  - style: renamed testbed script ([ee9a4](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/ee9a40048b7b8a8e06640a842a447fe0c4b57821))
  - chore: renamed test harnesses id ([c57e4](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/c57e4764568a89938d2cae38b408316216f1fd0f))
  - chore: updated testbed account ([75772](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/75772531598a5c5485ab5d2b58f89db4f453f90f))
  - chore: updated to iOS 0.12.27 dependencies ([d9708](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/d9708a584139db4864a68f5042f71b50e3ebea80))
  - feat: added arguments to testbed init ([1cb5f](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/1cb5f632fe73f707a13fc0a78450955e02da6715))
  - style: 4 spaces to 2 ([0ffeb](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/0ffeb99db34c32867978ef496e6c6628984663eb))
  - chore: updated to iOS 0.12.27 ([e71c2](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/e71c2a425587c227a4708e13a41bf95030c3a3c1))
  - fix: updated docs and testbed to new specs ([4a725](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/4a725c611ea02a456a3c4bb0d25434a66530ad55))
  - Merge branch 'master' of github.com:BranchMetrics/cordova-ionic-phonegap-branch-deep-linking into fix_plugin_install_from_config_xml ([35e59](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/35e59c65c2f119889cc970fb49f4e2d570c5b6d8))
  - test: updated rebuild.sh for iOS testing ([11548](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/115484bbd1212570bcf628d2b40ee671ee3c8f0d))
  - feat: added build.json for iOS development team ([6b438](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/6b43823b1361bb68c57b39f68b2b815f018a62e1))
  - chore: changed logging messages ([c9a04](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/c9a04d94e2c292277bb33868d289d6f1dccee4f9))
  - fix: error on blank state of associated domains ([ecc03](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/ecc03e850eaf2a15bdd72e3f3277e3aa0ac690f3))
  - docs: chrome address bar does work ([6af70](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/6af7023acf07e204504b686e9e7f39dd0d9697f7))
  - Merge branch 'master' of github.com:BranchMetrics/cordova-ionic-phonegap-branch-deep-linking into fix_plugin_install_from_config_xml ([fcf43](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/fcf43b7d7963782b75f5c987feb912d018d86323))
  - refactor: removed class level variables ([e0841](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/e0841a89e1db6be9a438200b972314cd342bc9c6))
  - fix: android manifest now uses main activity ([1fc2e](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/1fc2ec668256e26dbd116b3536dacc3b9822bbed))
  - docs: added guidance on updating hooks ([ad58a](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/ad58a7adf4a16a6b7412d4bef1e974dd9f6dc463))
  - docs: added comments ([9d4a9](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/9d4a9e86ac37f7aa8fdc4027ecf48b841777ff25))
  - chore: removed ci errors ([b41bd](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/b41bd623e92a0b0a9c5f3400bbb2703fcfefc2a6))
  - feat: associated domains appends instead of replace ([7d3f2](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/7d3f2fa3a900999809ab25ac7fad43ab032e0262))
  - chore: temp remove ci error ([eadf9](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/eadf9284054117530c548afbc7c7ab3ce80d466b))
  - fix: reverted from after_compile to after_prepare to catch cordova run edge case ([798f9](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/798f9c062b66a6be50e119066d75d1ae56c05f3a))
  - style: updated when console log updates user ([7ab4c](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/7ab4c69df981e1df9607f201b0597bb5779c6017))
  - chore: updated comments ([447fa](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/447fa780659e099b4b137a93d107569e71ea0745))
  - docs: more branch why ([ba4d4](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/ba4d4e86174fdf182e3696704ac5912b25aa762a))
  - fix: onDeviceReady to onDeviceResume in testbed ([d9193](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/d91939bbe7c702c3d04d79d96f9ea93b2bd0992a))
  - docs: fixed onDeviceReady to onDeviceResume ([60fb6](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/60fb668c3e97a58898e419d6f4e0182c6f9f63ce))
  - feat: corrected Android Manifest hook ([70232](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/70232f155d615f06511a619f5d3de1bb9c4ae2db))
  - chore: added hook logging ([92ad6](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/92ad6faf34f203f060753f53e0dc453704fbce12))
  - refactor: renamed afterprepare hook ([67774](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/67774e04c2bacd09fbcfb58f84d0b69b64e6cead))
  - chore: added console logging for hooks ([79b06](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/79b064222adbe298e07a24f4b0ffcaecaf49769a))
  - fix: changed hook to after_prepare ([7fe27](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/7fe27fc8624fec900831390ca90ad797e9c5977a))
  - test: updated docs for android testing ([6a73e](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/6a73e96cda0efab46b53328db62c430054afe3fb))
  - fix: updated android hook to update androidmanifest.xml ([fac6d](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/fac6d78ccd74fbf5ed3549ad6f2a7ab4498fa6c6))
  - chore: removed test link domain from associated domains ([7e943](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/7e943590dac1c65c146ff3abd4f35816e33de40a))
  - docs: removed developing for contributing ([0df2d](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/0df2da955e535e7b787d226f7e3711817e592674))
  - style: updated branch.js to standard javasc ([b082d](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/b082dba7a09a0ca7b3e93d50ca3f5d6fc43e268a))
  - docs: update singleInstance to singleTask ([b1d8a](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/b1d8a0eb425ebc60d7ed09a623a6b81781020bb6))
  - Merge pull request #273 from renesansz/fix/doc-typofix: documentation fix ([4c7f6](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/4c7f6c655409a5d9d015d7903bcf436661542516))
  - [FIX] Fixed typo on the doc ([0c93c](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/0c93c9755fea63b9cc6d2ce2f4e563191d3e1cd7))
  - docs: fixed font height ([d2e54](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/d2e548f7524ea191c9b83424c823eb4608a96031))
  - docs: more clear why ([bf1de](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/bf1deadd91bb55244c1d2bfc17a7b913642e8650))
  - docs: fixed grammar ([6f6c8](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/6f6c86c6ac5da3158d7c84ce3a0032be1204cb70))
  - style: updated icon and splash for testbed ([5374a](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/5374aad631e48bfb24162f3cee6103af0372fcad))
  - chore: remove android config from plugin.xml ([80173](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/80173ceebb972b1f21f2b6f04b8e70150ad5fdec))
  - chore: updated comments ([1618d](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/1618d331342138b371dc76277e38fb21fe819995))
  - fix: updated testbed for correct share sheet navigation ([96f74](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/96f74250df9e6bd5bfe7ebbe758fb623fe077b5e))
  - docs: updated examples to testbed ([122a3](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/122a3e126daca5165cc43629f31ac71c35c98420))
  - chore: enabled xcode preferences ([25053](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/25053e6c99b903d94b80c1cf4a43871d3afc92aa))
  - fix: removed /etc artifact ([fe004](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/fe00482232819e472032c77c47c5db06c35c655a))
  - chore: added comments and reordered functions ([2983b](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/2983bf2a1bf6314aaa084496d2bcbd808e086430))
  - chore: added android to hook ([099d7](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/099d70b439d19e47061fb52e4e7c0b51fa14fb7b))
  - docs: added semantic release prefix ([71844](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/71844ce9a9f6f5f51d36ba80ad811bfc13635c36))
  - style: renamed parameters ([aa297](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/aa297bb52cc0f7f20d1702c6ac0b94a9faea0f16))
  - chore: relocated actions outside of main hooks ([f540a](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/f540a1e982e2353c2a4ebf9c2d4b3a6bf0c44f94))
  - chore: removed un-used configXmlHelper ([2600c](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/2600c2a4efb5f678f50939f8586bc0ea85b113ec))
  - chore: changed to console.error for more visibility ([96cf2](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/96cf239ff5cf4494196c364ab7d57ed669650bf6))
  - style: changed from underscore to camelcase ([d8fb3](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/d8fb3a0baf992e5926a68e460c2c886768b4ee53))
  - fix: added a rebuild script for the testbed ([bcf1d](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/bcf1d537219c027e29640ea8a3d4b4322737d4c7))
  - fix: added branch logo and splash to testbed ([01481](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/01481a2d75f2395ebf91ca1764322dbb5011105c))
  - style: updated indention ([9656b](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/9656bad472758acc70d5f2d5af6e8904aa31b6fb))
  - docs: fixed build dependency error ([0854b](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/0854b786c653754650a4a3768722d99d2b1f7e96))
  - chore: merged with master ([f5a9c](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/f5a9c35f6bd199d0d772c2a4204ba47bfd70b501))
  - Merge pull request #270 from BranchMetrics/update-ios-0.12.23fix: iOS version update and fix custom event with no metadata ([c9c60](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/c9c601d2a3fa54d318fe936e64d70420590d4a2b))

- **Closed Issues**
  - Update the guide ([#275](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/275))
  - initSession not returning ([#274](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/274))
  - Incorrect doc property ([#272](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/272))
  - Clarification regarding "You must launch the app through Xcode for iOS" ([#271](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/271))
  - Is onNonBranchLink() usable? ([#269](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/269))
  - On ionic 2, does initSession() need to be called onResume? ([#268](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/268))

## [v2.4.8](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/releases/tag/v2.4.8) (2016-12-27)

- **Completed Changes**
  - fix: handled crash for empty userCompletedAction ([40e83](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/40e83e25dbccf02f8de605d849892de589e46423))
  - style: custom event now outputs blanks ([bb60a](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/bb60a24a359d7f64770fad2e55da0c95af76427c))
  - docs: added new way to build testbed ([c0757](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/c07578c03aa0ec49be58b3ec33f675d19819fce4))
  - fix: userCompletedAction works with no metadata ([459b7](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/459b7f8aef58b89d5c612303f2471dde2e56703f))
  - style: spacing fix ([80e1e](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/80e1e122055c669e81225d63a769747ca4c4d9f3))
  - chore: updated iOS 0.12.23 ([d5ce0](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/d5ce036ad4a671b00a4d93f30eca4a5ee4217d62))
  - docs: refactor properties, event string restriction ([9d60e](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/9d60e4f9b80acf50dd8cd7beb4fd898e3805e758))
  - docs: better wording for restricted branch event names ([84ea1](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/84ea15fda96d58d30ae60550dcceeda69b54a57e))
  - docs: updated restricted Branch events ([cc5cd](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/cc5cda0f65ac6cbf0c433564d3018d86de87eaed))
  - chore: added note about broken plugin xml version ([892bd](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/892bd368e87c990560603c336fd67e0ef5953d3f))
  - docs: updated Branch why ([9e20a](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/9e20ad8bc41d7429be35006f8aa39f8ccbe5e67c))
  - docs: updated Branch why ([4739b](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/4739b4561267abe80714c2f4aab200eaf354745b))
  - chore: merged with master ([4b74b](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/4b74b34f8927fa64051f41d0f36ec9addfcae12f))
  - docs: updated on deviceready and resume ([da722](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/da7228d57a5dbcff588ca8539eb1f7b233883704))
  - docs: added plugins that do not work with branch ([dfc55](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/dfc557f7836e68faa34c38b765c1ee0088664e56))
  - docs: updated simulating an install ([50584](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/50584ae4ca715a258f0d34ef81a137a103eb5ff1))
  - Edited phonegap build instructions ([77f94](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/77f9498dd329078647b8fdaa28cd541e85714cb0))
  - Merge pull request #267 from BranchMetrics/fix-visual-studiofix: relocated initial comment for VS TACO ([42faf](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/42fafb8d9c34149c220a25f0060aa5a58786bde3))

- **Closed Issues**
  - Chrome Intent error ([#265](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/265))
  - Problem into showShareSheet() share with facebook ([#263](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/263))

## [v2.4.7](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/releases/tag/v2.4.7) (2016-12-15)

- **Completed Changes**
  - fix: relocated initial comment for VS TACO ([d5bb5](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/d5bb5ba013e1e9bffddb3a05d3993b2528895f79))
  - docs: updated $exp_date to epoch timestamp ([bc311](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/bc311440792d0e1acb8a81b3e422337e5bd71390))
  - docs: applied javascript standards for quotations ([531ce](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/531cefe4bad687552fb8c032c8770e536a9042f2))
  - style: fix spelling ([8cab5](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/8cab579eec802e251bc6477c980f4e713e9f1b49))
  - feat: hook to update development team for ios ([a5bd0](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/a5bd04b227fc30b79953a9828481b976072f72c2))
  - refactor: only pass preference for after prepare ([534d6](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/534d64c2d1d2f9e39756844db1ccf097ca798270))
  - fix: move node dependency install for async ([7d467](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/7d467416248d2a274ce8f3e3fb3de19a6ca7a262))
  - fix: remove unused npm dependency ([00ae0](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/00ae0b14a14961b60aa7493f99bdcebaf3a9f90b))
  - style: change indention to 2 spaces and rename ([82239](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/822394a87041563d0297ca74fa3b71a21b085b70))
  - docs: updated rebuild for new testing ([81329](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/81329e2aa577db9531c38689c895969106fb9a95))
  - chore: remove all npm-debug from repo ([92b0f](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/92b0f0fad0510afc48c9b0b7ecad36462ddfa5c8))
  - fix: remove es6 ([a97f3](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/a97f338cc2026fca821d19308d3c044fb020a933))
  - docs: add development team to silence error ([937ac](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/937ac032f60ad5d2abb504ac2d58bd8ac1fd8b10))
  - style: force conventional commit types ([7bf6e](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/7bf6eec6483b9546ab0da6eeb50510a15a0abb9b))
  - chore: removed unused files ([5043b](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/5043b84e5670de90f2670690205501a184da184c))
  - chore: merge remote-tracking branch 'origin/fix_plugin_install_from_config_xml' into fix_plugin_install_from_config_xml ([57755](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/5775581ccdeee450561041f623917c2bceff22ae))
  - style: changed from enlist to standard ([71497](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/71497fea1ea56261d7eb9e7f0378535b0e66b60f))
  - chore: removed unused android gradle dependency ([ae73a](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/ae73a97d5e94b455cb45e9bcd122a0f3bb2f23e5))
  - fix: removed unused npm dependencies ([df049](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/df04956dc8c7c4cefa1783e2bb4aa7a502deec2a))
  - fix: updated testbed to rely on config.xml instead of plugin.xml ([76a0b](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/76a0b97c205398b9a2be0043dbf5eecd40f4176a))
  - fix: iOS hooks depend on config.xml instead of plugin.xml ([6c774](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/6c774387e4f7b8cbddb8bf3599854b3f6b1c3873))
  - style: replaced spaces to tabs ([d7bbc](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/d7bbc3444e761628ee30d7958acdca76f0a6ba1b))
  - style: renamed the entry hooks ([8e8c8](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/8e8c88dbbe3750addb400421b3430d37c3fcdacc))
  - style: indention on plugin.xml ([1a10e](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/1a10eac50aab642de783e5a267433a0147393b50))
  - fix: removed version from plugin.xml since not updated ([681c0](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/681c034102064f8d73534a95ca06b584ba0e8dc6))
  - chore: moved config xml hook ([a2737](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/a27377a2ca6952f8f2b7e23fd6ed419ea708c895))
  - chore: moved android manifest hook ([1b2a3](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/1b2a375a45489afc608313f7ea5da408e74f2a25))
  - chore: moved node dependencies hook ([b1bcd](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/b1bcdd83f190255880e95609805af05b08a7db18))
  - fix: added hooks for after_prepare and before_plugin_install ([1e6cb](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/1e6cb103939c42e978b2850458b6ada1e62e47cc))
  - fix: added hooks for plist and associated domains ([8d804](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/8d804315cd498a3783cae12421a610d800df23c9))
  - chore: remove old hooks ([dec6d](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/dec6dbe7633021d4820b5610acca79b36a7fc3e7))
  - Merge pull request #262 from BranchMetrics/fix_deeplink_pathfix: added $deeplink_path for android ([c5b6c](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/c5b6c299343ced712517ee339b1dbdd37805fd7d))

- **Closed Issues**
  - Configuration Done but DeepLink does not work ([#259](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/259))
  - $deeplink_path problem ([#258](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/258))
  - [Help] Need Clarification in Documentation ([#257](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/257))

## [v2.4.6](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/releases/tag/v2.4.6) (2016-12-09)

- **Completed Changes**
  - docs: added $deeplink_path to docs ([15a7c](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/15a7c8affe57a661703b94aefc92c4e753e95103))
  - chore: corrected deep link path in testbed ([91827](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/918276b5aea61ba4280139fbe8f1e9f9bdff9fc2))
  - docs: removed building iOS cordova through console ([6623c](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/6623c2f23d12560de26d0e6ea14e5d979dc4e981))
  - fix: updated to iOS 0.12.20 ([d1e87](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/d1e87d33408d957785343ec0fdbc8f15da111587))
  - docs: need to open Xcode for iOS ([7c9f1](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/7c9f1c1202f0f45af10749bdafbd0a9b2ebb5c6d))
  - fix: added $deeplink_path to android ([6dcb4](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/6dcb441eca4131e0491ff070a872c6e298ecdbcc))
  - style: changed from enlist to standard ([ba544](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/ba5447fb3a3710434b150f65e90da0ebedf1de7d))
  - chore: removed unused android gradle dependency ([d5f10](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/d5f1006ca1f661fc8baf62f8b808ce72a2a5a41f))
  - fix: removed unused npm dependencies ([94384](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/943847f4c9416aab3263f08ca575944642c9c805))
  - fix: updated testbed to rely on config.xml instead of plugin.xml ([a7c98](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/a7c98472f1e43f99b5397a27d4a0242a41f61eb9))
  - fix: iOS hooks depend on config.xml instead of plugin.xml ([4a641](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/4a641ac67cbf6f88cde378fc3fcc5ee72b2c5253))
  - style: replaced spaces to tabs ([70c3d](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/70c3d10b88f8e7874be853cd2dd94eb155e2c779))
  - style: renamed the entry hooks ([d299c](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/d299cd726264199293315ef7999464e0b61283e6))
  - style: indention on plugin.xml ([7a8b4](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/7a8b464ac6dc72985fb7f70f3e3cec954b45eaa3))
  - fix: removed version from plugin.xml since not updated ([b1bf7](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/b1bf75d50e878295d09132032701ad159fe8cb00))
  - chore: moved config xml hook ([ed4b7](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/ed4b7a787057f9da561d6a0d2857e84724622623))
  - chore: moved android manifest hook ([b0ef3](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/b0ef3f77b016ea6b381941b18eaf0d81bcbe1706))
  - chore: moved node dependencies hook ([a6fb4](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/a6fb43e4bcb84d525508f01cc6befb3431551281))
  - fix: added hooks for after_prepare and before_plugin_install ([3e973](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/3e973e215afd54aef27f8e82e1d9bad89358272e))
  - fix: added hooks for plist and associated domains ([c5189](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/c518965c81913ae96cc85bc6ddcf7c2ec55fe450))
  - chore: remove old hooks ([a35e2](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/a35e29473055cae0ea686469b8b4ef51e8b13739))
  - docs: added singleInstance for android ([2e781](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/2e781f4540677cf995e4304e8b511d8f5becf4cc))
  - Update README.md ([df759](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/df7595a2f8aff6774c7234ed977dd18eec1b3c0b))
  - Merge pull request #256 from BranchMetrics/fix_before_hookFix before hook ([1d5b3](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/1d5b336e941b6e3a5e1183fddf9667f5deafd1bc))

- **Closed Issues**
  - iOS .entitlements file location could be wrong ([#252](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/252))
  - Unable to install the plugin in Platforms directory using config.xml ([#251](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/251))

## [v2.4.5](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/releases/tag/v2.4.5) (2016-12-08)

- **Completed Changes**
  - chore: added comments to beforepluginhook ([9a990](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/9a99014b8e482c7e516711e544610b40d70afb9d))
  - chore: removed end line tabs ([f6c5e](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/f6c5ecaab61ad12ec84ee6255a8b28a92dfc3638))
  - fix: added async to before hook ([0ade2](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/0ade207bba88e691395094ce0695e926f9d763fc))
  - docs: updated the way to launch app from iOS with development team ([0e2f6](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/0e2f6f5781dff84eb573d54a8e6ac9988486cbdf))
  - style: newline at end of file ([f9b13](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/f9b132cbb2adeeb51ffadcf580e04845ad02f884))
  - chore: updated spacing ([d041f](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/d041f6dabdeba110fc330c16c2b86f1f653d1e39))
  - Merge pull request #245 from MarceloAplanalp/hooksfix problem with hooks ([78103](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/781039bd081adf77884cd29362bc1e3f2d24eb60))
  - Merge pull request #255 from BranchMetrics/249249 ([e564f](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/e564f1c5d20352d9775eb79be7e652665e010373))

- **Closed Issues**
  - Branch.initSession not working  ([#248](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/248))

## [v2.4.4](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/releases/tag/v2.4.4) (2016-12-08)

- **Completed Changes**
  - chore: added campaign docs to both branch.js ([3002e](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/3002ea3a63003bc836ae140f5cdaba074a63c70a))
  - fix: updated the way the testbed changes deep links ([88b27](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/88b27cba0f38da386ab60d7f5053028ea8c22bfc))
  - docs: fixed way to launch on device ([58756](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/5875649ad2f334d60e8a6a6f030112e9cb30a5e5))
  - [CHORE] Updated API code documentation ([8dd52](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/8dd52d3cdb031e8a6ac079dc7d8d0f96b73590ed))
  - [CHORE] Added campaign field on generating link ([ba23f](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/ba23fc380c0733a76fbf55cf863ab73a80b60db2))
  - Merge pull request #254 from BranchMetrics/fix_ios_frameworksFix ios frameworks and core spotlight ([3bb07](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/3bb0704d2d5c7ed051330b937abcf32bfcae89d1))

- **Closed Issues**
  - Campaign field in analytics cannot be set ([#247](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/247))
  - Error: Cannot find module 'xml2js' ([#246](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/246))
  - ionic build ios not working ([#244](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/244))

## [v2.4.3](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/releases/tag/v2.4.3) (2016-12-08)

- **Completed Changes**
  - docs: updated key points for new deeplinkhandler ([2c95f](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/2c95f60f2750bb65af129f363a99f6d14338ea83))
  - fix: list on spotlight now works ([441f8](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/441f8a2d89e81dd92b722629a34e23ed6a3ba777))
  - fix: added iOS framework dependencies ([9a8a0](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/9a8a03407f01e856eae3ff3b3efd758726e6d124))
  - docs: replaced semicolon with && for fail check ([5c168](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/5c16874fab11deafbe1beb1097ae058bd010c792))
  - docs: removed redundant wording ([9bf91](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/9bf91644b2ce89b7cd07454c1b1138495bb55dde))
  - Merge pull request #253 from BranchMetrics/fix_update_ios_sdkfix: updated iOS sdk to 0.12.19 ([abe06](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/abe066291aeaaa36a51b51de309224cd43c85128))

- **Closed Issues**
  - App fails on logout ([#243](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/243))

## [v2.4.2](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/releases/tag/v2.4.2) (2016-11-19)

- **Completed Changes**
  - fix: updated iOS sdk to 0.12.19 ([52aed](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/52aeda6b995f4f4ce16fe005ee9e3cd7d478a369))
  - docs: added purpose and video ([95def](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/95defffee21991da39302008bf371f8580dc3983))
  - docs: removed readme collapse sections as not supported by firefox ([63312](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/6331297b51451f249004fcef3151e695a11899fe))
  - docs: fixed order of reinstall which can break npm dependencies ([8f6ca](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/8f6ca5e13e110745af4744149a56370669ffccee))
  - fix problem with hooks ([2f77d](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/2f77d1e8b546e2d3b1b1719af44e70bb5d0347ff))
  - docs: added additional to table of contents ([54ff8](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/54ff8c7ff1d6da5d90c4a50b741aec329a970e15))
  - docs: added additional premium, bulk creation, support, and data export ([9b7d1](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/9b7d157893f13d226516ee42d0db29ac5d9a7373))
  - docs: fixed broken link in table of contents ([c3650](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/c3650b45367754a3e3b862a023d95a82c067bd19))
  - docs: made it more clear to set the team provisioning profile on iOS ([bdc2d](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/bdc2d4f82d73526f8e2efb201c8b1ac6423d06f1))
  - Merge pull request #242 from BranchMetrics/fix-docs-for-new-deeplinkhandlerfix: added onDeviceResume and new DeepLinkHandler logic ([da7a1](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/da7a1bcae341405bb249aa9c08bba8a1bc14f07e))

- **Closed Issues**
  - Missing branch.js.map file ([#236](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/236))

## [v2.4.1](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/releases/tag/v2.4.1) (2016-11-17)

- **Completed Changes**
  - fix: updated onDeviceResume method calls in testbedtested √ ([b3593](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/b3593e2a5852262ce3c695a69ca3ea1972af2a0b))
  - docs: added onDeviceResume and new DeepLinkHandler logiconDeviceResume is required for Android background (cordova only).renamed DeepLinkHandler section to deprecated ([c69ef](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/c69ef5693f2ade2d01c3061fae1f70515063717c))
  - docs: 7c's for disable listener warning ([b5654](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/b5654cb87d94f90bf8b7287ea3616971af116370))
  - docs: style updates ([8f71e](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/8f71e9cd6d22efd94ddd496a3339ac39626dfb1a))
  - docs: changes 30mins to 15mins for AASA updatedon’t want to discourage users of our slow dashboard system ([cd31e](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/cd31ebc0f7006f5930bf89599eb6eeddefaafad5))
  - docs: style updates ([3ea7d](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/3ea7d650af4e0afc7d32a65f421bb74b04e3b8fb))
  - docs: updated 30mins to 15mins for AASA updateto not scare off users of our potentially slow system ([9cadd](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/9cadd5d02deb2fd412ddad56d5aa61738231072e))
  - fix: added onDeviceResume to testbedneeded because on-background data-received did not work for AndroidCordova (works for Ionic1, Ionic2, and PhoneGap) ([5ed7e](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/5ed7e91adfd7d9ea10fe136a8e6f5f6f3739d8f1))
  - Merge branch 'master' of github.com:BranchMetrics/cordova-ionic-phonegap-branch-deep-linking ([d3247](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/d3247172a31602205a9c2407a0b3e97fdebdb6ea))
  - docs: corrected the order of developing platforms ([3863e](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/3863e5f4904024562dde770dffdc311d0edef51c))
  - docs: added branch dashboard ([380fe](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/380febc75a55aeb00fe3368adb02f939a3cdfeed))
  - docs: added changelog and sdk contribution ([829b3](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/829b374a188d5ebae24df7cb9b37bb5787c2c285))
  - docs: updated downloads and license ([b3d4f](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/b3d4fbf411765b02f27bf7c2ad1468d89a69247f))
  - docs: added logo to readme ([ccaa9](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/ccaa9d03b541ca552a3e20664406991a1c3afe19))
  - Merge pull request #239 from BranchMetrics/eneff_update_readmedocs: overhauled readme for better integration and guides ([0e2e5](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/0e2e53ef9dcf9e13c104685eac99e1e64e4d70ef))
  - docs: added how to pull the npm version for developing the sdk ([8c572](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/8c5725bbf0e2cb7684540b0f83df582afc77a05e))
  - docs: overhauled readme for better integration and guides ([5894d](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/5894d33bf004bc690d04b5c49e9da8c97c5d3660))
  - Merge pull request #241 from BranchMetrics/eneff-fix-testingfix: minor style changes and es6 fixes ([1e38f](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/1e38f77ff791b4b79b2b5a1e967596e5b3f5a99e))

- **Closed Issues**
  - iOS shareText/shareTitle and other "localization" properties ([#235](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/235))

## [v2.4.0](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/releases/tag/v2.4.0) (2016-11-16)

- **Completed Changes**
  - chore: jscs gulpfile ([58c4e](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/58c4ee8e9b786d25c666af5b66de9434feb90730))
  - Merge pull request #240 from BranchMetrics/chore/calculate-plugin.xml-version-numberchore: calculate version number from packge.json and stick it into plugin.xml on semantic release ([be4df](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/be4df833751f40fc29ec68e1479328c18b8cfbbc))
  - docs: removed gulp predev ([5a4db](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/5a4db120e1b717afa9a93d2e06f01c0634b7ae3b))
  - style: linted gulpfile ([a4ee0](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/a4ee008e578566b010f22d271b1f78d4565ccaf0))
  - style: merged js into js.es6 ([926eb](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/926eb7ef90fd33157440a43f6375b03314b98af5))
  - style: added spaces to testbed functions ([8bf4b](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/8bf4b09fbe08f8707be9ee926b379dda281fda05))
  - fix: removed initial alert within testbed ([7229a](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/7229ab0692cf8457334578e4dbee0ecea457c3cc))
  - fix: removed onDeviceResume in the testbed for BranchInit ([a63e7](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/a63e7e8201fe520a1aaf91116bf6096773cd9305))
  - style: make jscs happy ([c4582](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/c45824a86bd4043f4d947f0ffb34c7d5481a97a4))
  - chore: calculate version number from packge.json and stick it into plugin.xml on semantic release ([fc3e1](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/fc3e109c9c28bfb3da18afd0946eaed1e63fbb06))
  - Merge pull request #237 from BranchMetrics/refactor/no-global-hooksRefactor/no global hooks ([8585d](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/8585d6dbeeb98a11cd490f3899d8250583c68865))

- **Closed Issues**
  - iOS 10 didn't work ([#234](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/234))

## [v2.3.3](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/releases/tag/v2.3.3) (2016-11-15)

- **Completed Changes**
  - chore: updated version number for deprecated methods ([abb06](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/abb06dba5724ad63dcce534a769f9d4d01a30695))
  - chore: bumped version to 2.4.0 ([13eeb](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/13eeb39fec2a3be5999b326883aec50d9cfe3b02))
  - chore: removed the t1 testbed from the gitignore ([b625f](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/b625fbda48233716bfac46a59c42720eb89d9810))
  - chore: added an alert to the testbed app for safari debugging ([38fc5](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/38fc57e283cf80ef08c3a512c59c9726e9d61f62))
  - chore: removed the t1 basic testbed app ([00823](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/0082355ae42404cc46412a6065bd7051fa11340d))
  - fix: updated js from js.es6 to js ([d3ba7](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/d3ba77bd0d7f78b86daa64ee436fbb38fc6f737e))
  - fix: added new minimal testbed for non-global deep link hooks ([bb858](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/bb858e4893de5134795b11f9664d19bec569fe76))
  - fix: detect defaultNonBranchLinkHandler ([4032d](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/4032d4682d7932a5b2dc5a69c4fa31d41bd0e39e))
  - fix: correct hook -> hook undefined reference ([5d473](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/5d4732b348d8d009bacc9323ce331a5bef0307a8))
  - whitespace: tabs to spaces ([0b592](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/0b59238b5848e47c12011a98a566efa9498483b1))
  - docs: fix typos in readme ([98d20](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/98d20d7d4345b998c8b1d95106af72142be426c0))
  - fix: correct link to #initSession ([ba6a3](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/ba6a3d9905be2ab372ffa453581a5749f8058559))
  - style: make lint happy with else statement ([11e2f](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/11e2f900f86390eba9d8bfa34da2f8aebc57caad))
  - fix: make linter happy with if statements ([b6baa](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/b6baa376465ba6b14b12a3087a000551458de18a))
  - docs: document non global hooks ([a6e96](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/a6e964f6dccc19b64d77d45ecf525f1d812fd1d2))
  - fix: fixed merge conflict with testbed.js from no global hooks brnach ([89252](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/89252d4c3e0a048326ba3f85913c5c30c608f852))
  - feat: implement onBranchLinkHook parameter to initSession ([3143d](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/3143dbf756d90a4feb233843db97a59326e8e834))
  - feat: implement onNonBranchLink ([5168d](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/5168de015085c1be235145ebff5f8bc0ef52e08b))
  - fix: updated how to contact us ([7dc2e](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/7dc2efffaf429cdc66d2a0054b56d90775728b2b))

- **Closed Issues**
  - createBranchUniversalObject return "pending" Promise ([#233](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/233))

## [v2.3.2](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/releases/tag/v2.3.2) (2016-11-15)

- **Completed Changes**
  - Merge pull request #238 from BranchMetrics/eneff_fixfix: fixed .map error, fixed Android tags, fixed iOS dependencies, updated Testbed style, updated iOS SDK ([fabe4](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/fabe4276c926e5ad31f4c37843658fb4c988c9c8))

- **Closed Issues**
  - fatal error: 'CoreSpotlight/CoreSpotlight.h' file not found #import <CoreSpotlight/CoreSpotlight.h> ([#232](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/232))

## [v2.3.1](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/releases/tag/v2.3.1) (2016-11-09)

- **Completed Changes**
  - chore: updated changelog, updated version, and ran prerelease ([e41e3](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/e41e3da70ff7b9439f3b664c0bdf57f7b8d885aa))
  - Merge branch 'eneff_fix' of github.com:BranchMetrics/cordova-ionic-phonegap-branch-deep-linking into eneff_fix ([1b8d2](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/1b8d26e5f502e9a27dd0f52d618b66f9ad76c5f7))
  - chore: updated developing doc for android build [ Android √ ] ([c1359](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/c1359019c98b6ec9cd0a549a0bc7cfa2c38b9d71))
  - fix: android multiple tag crash ([5ac20](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/5ac207200ba82dba8d0e0b27ed3920fe19043251))
  - fix: updated iOS SDK to 0.12.16 [ √ iOS ] ([ad144](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/ad144f22f4e36cf2b59ca3f2189a97d2b5812c5a))
  - fix: updated iOS SDK to 0.12.16 [ √ iOS ] ([afb44](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/afb44467ecf3a195405123e927092848a47da3f6))
  - fix: removed .map files and ran pre-release script ([1b3d4](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/1b3d48e19fe4883d2b3823d5c75075d469606517))
  - chore: updated testbed style, added docs to update sdk ([5d360](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/5d360a612169cc595097b6536ec49049da9be1f5))
  - fix: hotfix to bypass npm for install ([21620](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/21620c104ae388b13e665d297ce343b93dcb3310))

- **Closed Issues**
  - Conflicting naming ([#228](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/228))

## [v2.3.0](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/releases/tag/v2.3.0) (2016-10-08)

- **Completed Changes**
  - Merge pull request #227 from beast911/iosShareTitleBugiOS fix shareTitle and shareText ([19e4f](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/19e4fc6ff411cf5f4c85d243d97cba17ff0ece77))
  - iOS fix shareTitle and shareText ([de736](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/de736c6bd8aac37ea654b921561c98ae98b921c3))
  - Merge pull request #225 from jakub-g/es6-promise-from-npmfeat: use es6-promise-plugin from npm instead of github ([37abe](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/37abed023818fba6d5d011cb0538dd75ce6a2000))

- **Closed Issues**
  - Build fail on ios 10 ([#226](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/226))

## [v2.2.5](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/releases/tag/v2.2.5) (2016-09-30)

- **Completed Changes**
  - Merge pull request #224 from jakub-g/choresChores: gitignore npm-debug and add .gitattributes ([cd8cf](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/cd8cf71326473f3d24231b7eafbe00addca67dab))
  - feat: use es6-promise-plugin from npm instead of githubFetching from npm assures always using the same version(more stable and reproducing) and is generally much fasterthan cloning from github (particularly in enterprise envwith private npm repo) ([ebc22](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/ebc229fc3734ae69e8fd93a54e5266ee1d2e8e9b))
  - chore: add .gitattributesso that git checkout on Windows uses LF and JSCS does not complain onprerelease ([ee4bd](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/ee4bdafe4f964bf5ce0f17ebea2901fab95fecfb))
  - chore: gitignore npm-debug.log ([cd6db](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/cd6db289e4c447483c710a8703febcdd57076ade))
  - Note about DeepLinkHandler undefined ([561f4](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/561f4ea9706ce2f2d8db07ca5ab07b03080f7219))
  - chore: readme update - only ads package ([6b62e](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/6b62e72cdeae6b96a4acdb72d8c131316a444a65))
  - Merge pull request #222 from BranchMetrics/move_node_modulesfix: moved node_modules from root directory to io.branch.sdk directory ([e9825](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/e9825994485081677803e8fd2f9a40b274324249))

- **Closed Issues**
  - Cannot read property 'forEach' of undefined ([#223](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/223))

## [v2.2.4](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/releases/tag/v2.2.4) (2016-09-29)

- **Completed Changes**
  - fix: spelling correction ([3fc3b](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/3fc3bf9533056b00410181fc43dacaf5df8d6159))

- **Closed Issues**
  - Changelog needs an update ([#215](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/215))

## [v2.2.3](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/releases/tag/v2.2.3) (2016-09-21)

- **Completed Changes**
  - fix: move node_modules from root directory to io.branch.sdk directory ([99778](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/99778da7cb83a65b237fb4f19b90923361496950))
  - chore: update GPS in readme ([5af6d](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/5af6dc198243b1099ef23af408b8a08e5a7db780))
  - fix: linting ([d840a](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/d840ad4ee9c64381259baf211236088aaf99fccd))

- **Closed Issues**
  - Build Fail on iOs ([#214](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/214))

## [v2.2.2](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/releases/tag/v2.2.2) (2016-09-21)

- **Completed Changes**
  - fix: version number ([ea447](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/ea447c1cfbaf43906633b133a8fdf51a5dbc2485))
  - Merge pull request #221 from BranchMetrics/fix-actual-branchjsfix: update actual branch.js ([68917](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/6891744ea13eb9ad5cbfb3fb36175db33ecd3c69))
  - fix: update actual branch.js ([89dc1](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/89dc1dc2342e9e221f695cd74f0f5a7e37bc0dce))
  - Merge pull request #220 from BranchMetrics/try-to-update-jsfix: add setdebug please ([7d54a](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/7d54a7024d7e7f5004a1686216d94fa36ab28447))

- **Closed Issues**
  - Incompatible with Crashlytics SDK on Android ([#208](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/208))

## [v2.2.1](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/releases/tag/v2.2.1) (2016-09-21)

- **Completed Changes**
  - fix: add setdebug please ([c533d](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/c533d368449722ca778f212bee9a711a1b5c0446))
  - Merge pull request #219 from BranchMetrics/fix-changlogfix: change log out of date ([2d861](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/2d8613bd7d73c35541a134b470524a8fe325876e))

- **Closed Issues**
  - Issue submitting to store with entitlements file from hooks ([#207](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/207))

## [v2.2.0](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/releases/tag/v2.2.0) (2016-09-15)

- **Completed Changes**
  - fix: change log out of date ([9d8ca](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/9d8ca7c5f08a47af0c22f2d1c781ea553bfdb02d))
  - Merge pull request #218 from BranchMetrics/update-version-2-2-2fix: update version number to 2.2.2 ([8c056](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/8c05650a5d9a6ba1681160d82061df60968a9773))
  - update version number ([e6b16](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/e6b1688d06a6d18cf1a6cf3e54634b1dcb413093))
  - Merge pull request #217 from BranchMetrics/add-back-setdebugfeat: Add setDebug back ([0081f](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/0081fcdbc6e72c636533f74f9e54962f2262b08d))
  - update iOS ([37bb1](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/37bb1a2e4ff4d5a873309d1b594a1a00d707a860))
  - Add setDebug back to Cordova ([59358](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/593582fd23fb7e3202c3580d782e10816310897e))
  - Merge pull request #216 from BranchMetrics/update-ios-lib-12-10chore: Update iOS library and changlog ([e7482](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/e7482f5d2058709b2441750c2a50e3b0daf6f3e7))
  - Update iOS library and changlog ([3ea93](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/3ea935320b84a18e186ff1834048b38a144abb18))
  - feat: add back semantic release packages ([10f13](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/10f13bd9f3ed98320fdb7b504641a058d35c13c0))

- **Closed Issues**
  - Branch's node dependencies are not contained within the plugin ([#205](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/205))
  - Android - Link opened while app is running doesn't trigger the DeepLinkHandler callback ([#204](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/204))

## [v2.1.17](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/releases/tag/v2.1.17) (2016-09-15)

- **Completed Changes**
  - feat: no change, just getting version bumped to 2.2.0 ([6908b](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/6908b102330723527dc02912ca9e02615592dea5))
  - Merge pull request #213 from BranchMetrics/update-versionfix: update version to 2.2.0 ([125a0](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/125a002fa72b6082f449bafa32371714155d21a4))
  - Update version ([2425c](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/2425c5c6797004bc8c4ba0ff1182929744b78214))
  - Merge pull request #212 from BranchMetrics/fix-travis-npmfix: travis and NPM ([51623](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/516238a7e6d5fda9ef5fab0d1ac2323032654659))
  - fix: travis and NPM ([f0149](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/f0149e18346314649abea898531a24b01fad025a))
  - Merge pull request #211 from BranchMetrics/fix-update-iosfix: update iOS version ([2b35f](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/2b35f1ecb967f3ba10baff9055454738944f1399))
  - fix: update iOS version ([c96dd](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/c96dd32d6a6542ad347d45fe63035a96263de21f))
  - chore: level version with npm ([939f3](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/939f34e5828bf09f62af2d8d5a715414c327cd43))
  - chore: update version to 2.2.0 ([5e644](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/5e64416bea5f0b027a3628ad4ce0d40786289d6c))
  - tweaks to new iOS ([5085e](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/5085e3c0a28d5089832d87f5513ce36ea34bf355))
  - Merge pull request #206 from krysalead/masterfix: Remove hard coded strings when showing the showShareSheet ([8e9c5](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/8e9c58a8976cb355a7686ef02bd503ee90a0e402))
  - Merge pull request #209 from BranchMetrics/crashlytics-conflictfix: Create path for Crashlytics harmony ([ea6df](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/ea6df31183e41dca9da0c3b6a6ea3c4833a6c402))

- **Closed Issues**
  - iOS App crashes after Resume from ScreenLock ([#202](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/202))

## [v2.1.16](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/releases/tag/v2.1.16) (2016-08-12)

- **Completed Changes**
  - Merge pull request #210 from BranchMetrics/update-ios-libchore: update iOS library ([77533](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/775333e543c7b54324c7af8d1a3a57185bb13568))
  - fix(BranchSDK): Make it backward compatibleTake the third parameter and put it into the strings object so that even passing a single string itwill be used in the displaynone ([f25a9](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/f25a972b97a4673ba1d53a0c5a40d776a021141a))
  - add min SDK to testbed ([7fae0](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/7fae0959f62806321959022b0a4304e707158b3a))
  - chore: update iOS library ([7eea6](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/7eea6c241facba4aa068026d5194cf74b2ed51ac))
  - feat(BranchSDK): update the code to handle when user passes a string and not an object with all theDetect that the user is giving a string or a json of strings to be used, the code is limited tostring or object there is no merge of the strings so the user needs to give all the translation ([30d3e](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/30d3e842b0ad4a496a830ced8fe2df09f30274c2))
  - remove exclusion ([50bc7](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/50bc721b5c677c62e6e87607767c71b8ba8f0ca6))
  - fix: Create path for Crashlytics harmony ([1265e](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/1265eb127ca61c4e60a8b445ad242f64c678a51d))
  - Update README.md ([63e5a](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/63e5ac6b664071da7d54d070141e59b854285017))
  - fix(package.json): put back what I removed during developmentI have deleted one script and added a private repository ([02654](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/02654c4f72a51130a3079f1d58604e98fd1ab946))
  - docs(version): update the plugin.xml version to be inline with the package.jsonThe version was 2.1.17-cmt in the package.json and 2.1.16-cmt in plugin.xml now it is 2.1.17-cmt ([5698d](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/5698dd3433ee6188c34e7259a31139199b6a98b0))
  - chore(package.json): bump the versionMove from 2.1.16-cmt to 2.1.17-cmt ([cec2d](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/cec2d11b4d5b04517ae1cd4f4c776d5ef7863e15))
  - fix(BranchSDK.java): Remove the hard coded stringsChange the hard coded strings to an object of stringsshowShareSheet is no more accepting a string as third argument it requires now a JSON object ([aa2df](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/aa2dfcc18d5c6d9e0c8105abf07aa5a535910ef5))
  - Merge pull request #201 from BranchMetrics/docsDocs ([b97cf](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/b97cf1f565139f546b7c5fb2cc72c118063aa4dd))
  - docs: fixed up readme ([830a2](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/830a2570c7c844bb93f5e52f07f24e6dd59ce1af))
  - docs(readme): rewrote first sentance ([eb5a5](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/eb5a536c8742e67356a35e2f5a4bc9feae7e632d))
  - couple testbed tweaks ([4eb90](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/4eb9041f2d51c886d4799984c30115a018032198))
  - bump version ([83a0d](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/83a0d215bc1e493a828fd305ba6df6eed8d8e9e5))
  - Update README.md ([53d94](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/53d9420f6ee9e40c65ecd5e21e8dcb8e61e0b9ca))
  - fix: correct syntax in gulpfile ([a5136](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/a51365980d6f577a6b2d788605a4b8eaf8e7e8e5))

- **Closed Issues**
  - Link always redirects to app store ([#200](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/200))
  - Align npm package name with plugin ID in plugin.xml ([#199](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/199))
  - runtime error `Uncaught module babel-runtime/core-js/promise not found` ([#198](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/198))

## [v2.1.15](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/releases/tag/v2.1.15) (2016-08-11)

- **Completed Changes**
  - fix: strip out babel runtime ([c6835](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/c6835762b950f96f31db7e54eb528ffa7b1e2ba4))
  - fix: second attempt at incuding babel runtime ([bf433](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/bf433b72715b501beb70a00684f5be192aedbf46))

- **Closed Issues**
  - showShareSheet or generateShortUrl not working ([#190](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/190))

## [v2.1.14](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/releases/tag/v2.1.14) (2016-08-11)

- **Completed Changes**
  - Merge branch 'master' of https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking ([80495](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/804953c66455832efb972b93100eb30ee86e6ed3))

- **Closed Issues**
  - chore: delete unused branches ([#188](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/188))

## [v2.1.13](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/releases/tag/v2.1.13) (2016-08-10)

- **Completed Changes**
  - fix: always include babel-runtime ([c22bb](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/c22bba852e0c7ae5b1b6dd58c63cc186ffeb677e))
  - Update CONTRIBUTING.md ([f7cde](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/f7cde3e2d0e5c4cbe305fae174523a0da6af1291))
  - chore: use plugin.xml for git instead of npm version ([b5f8b](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/b5f8b0d9734f271985aea77c0006220107611fa7))
  - chore: update ios dependency, reinstall framework ([7dd6f](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/7dd6fc942fab2b926beec699b7c32c5fd1a76d15))
  - chore: remove iOS .framework ([52eec](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/52eec488b44d1513530eab292685bb568e346397))
  - Merge pull request #197 from BranchMetrics/fix/install-from-masterfix: master now can be installed ([87498](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/87498a291a353e6e96043c7828167f5e81153d9d))

- **Closed Issues**
  - Update BranchSDK version ([#186](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/186))
  - Android compile error transformClassesWithJarMergingForDebug ([#185](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/185))

## [v2.1.12](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/releases/tag/v2.1.12) (2016-08-10)

- **Completed Changes**
  - fix: master now can be installed ([83865](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/83865031f8a76509b25c1a1e4a7aaa8ac4a261d8))
  - docs: reference npm version of sdk instead of whats on git ([658d3](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/658d3ed2dbd029cab12b5bc46e4b207c41abaec5))
  - Merge pull request #196 from BranchMetrics/fix/spurious-changefix(plugin.template.xml): made a spurious change to trigger a new push ([711f7](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/711f7b93ee8d2e3446ab8268cbc240bfd517068c))

- **Closed Issues**
  - Android builds failing ([#182](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/182))

## [v2.1.11](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/releases/tag/v2.1.11) (2016-08-10)

- **Completed Changes**
  - fix(plugin.template.xml): made a spurious change to trigger a new push ([51f69](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/51f6964499eb7b4aa9bd403c9deb386880f073fb))
  - Merge pull request #195 from BranchMetrics/chore/travis-fixChore/travis fix ([4f6fe](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/4f6fec300a0759b558b71f324adbce0daf1ee5d7))
  - chore: npm publish should now include build output ([3faaa](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/3faaa4536a16cf9698eafad3898ba243985bda6f))
  - chore: testing whats wrong with travis ([e9f18](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/e9f181709e3810080cdf125367d8dfbb85165f9d))
  - Merge pull request #194 from BranchMetrics/chore/travis-deploy-masterchore: fix publishing releases on master builds ([4900f](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/4900ff6f87e5527a61a9a6b668298e0762a7a557))

- **Closed Issues**
  - Sharesheet - share to Facebook blank share ([#181](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/181))

## [v2.0.3](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/releases/tag/v2.0.3) (2016-03-11)

- **Completed Changes**
  - chore: fix publishing releases on master builds ([64641](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/646414ceef712e73ef2e62ae0155fc698957494e))
  - Merge pull request #193 from BranchMetrics/chore/travis-1-node-versionchore(travis): only build on node 6 ([a7db9](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/a7db984fc5d12b39d29ac1e3f8098b664cd6e1de))
  - chore(travis): only build on node 6this will keep us from producing separate builds for each node version ([b078e](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/b078e84007643d648b179199d4f869a2eaccff14))
  - Merge pull request #192 from BranchMetrics/style/fix-syntaxStyle/fix syntax ([d6ca3](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/d6ca3758b325d10b63f100f49ba58cee69e1bb68))
  - chore(babel): move js sources into es6 folders ([f0d3b](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/f0d3bfee2b9bfd4f6fb57d0cba894300a5f96795))
  - style(manifestWriter): fixed yoda conditions ([1b3d2](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/1b3d28c5f711c19034519ddbe29b29871f5d45f2))
  - chore(jscs): don't lint plugins ([a9bd9](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/a9bd93877a454dfee85bf0a29af8d10bbd2e9b38))
  - style: run `gulp jscs-fix` against entire codebase ([04b9d](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/04b9df523a753d58d377ffb6a0f490152e377f49))
  - Merge pull request #191 from renesansz/chore/update-unit-test[CHORE] Updated unit test ([aab30](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/aab303fccb6920863924898da606408531842e78))
  - Merge pull request #189 from renesansz/chore/update-plugin-sdksUpdated native library dependencies ([76523](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/76523bbe53104cdd4f5b8a70554cbeea0059cf3e))
  - [CHORE] Fixed async method tests & updated unit-test methods. ([37a6e](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/37a6e75a9d6a6bf0faa463c9079c0de78d49e09f))
  - [CHORE] Removed deprecated dependencies. ([5ace8](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/5ace8f956eafc9c47645c057ca84464a3f60ea69))
  - Merge remote-tracking branch 'upstream/master' ([14715](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/1471574482f676300ee875c38546c630501588c2))
  - [CHORE] Updated native SDKs. ([dd4fc](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/dd4fc65c05c4b85eefa6d858ce302ac7f9753d3f))
  - [CHORE] Updated native sdk dependencies ([bacb2](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/bacb28ae090ea23c7bbfcb6a58853d1107cbef10))
  - Merge pull request #178 from renesansz/fix/plugin-init-handling[FIX] Fixed Initialization Handling ([60c0b](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/60c0b60affbbc166f6cffa649b9fda5219bbaf4f))
  - [CHORE] Updated Android SDK ([132bb](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/132bb7b60a8126d478cd042114771a55f739442a))
  - [FIX] Fixed merge conflicts ([f617b](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/f617b2b25b5dc9c30d35b0bf1eb9efc207a52c83))
  - Merge remote-tracking branch 'upstream/master' ([2292a](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/2292ad29f6cdfa52e1d83a440f05f7282b89afed))
  - Merge pull request #187 from BranchMetrics/feature/gulpFeature/gulp ([76cd5](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/76cd52b1081457dc89d0947c3f898016bece8c8f))
  - docs(testing): refer users to android command installed by brew ([a78ca](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/a78ca647d0ad5a554db1cf763aa2d336c1d48d78))
  - Merge pull request #184 from BranchMetrics/clear-deep-linkShould clear deep link even if Branch ([7e721](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/7e7217b9e990268b373c8a0cc3bc37d50db7564b))
  - fix(tests): harness now setup to take updates to tests and sdk ([cfd19](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/cfd1950c4758572c163f76bf07cf4f2d78badef4))
  - chore(jscs): lint entire project, not just gulpefile ([638eb](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/638eb273f9e60f4db75e362a1bdec506689f66df))
  - fix(gulpfile): add trailing new line to make jscs happy ([30a1f](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/30a1f7a19acd1ab79566934d4e446446df96089b))
  - Merge remote-tracking branch 'origin/feature/gulp' into feature/gulp ([36081](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/36081c9d15cb05f3757e90b4eae6cd38bf2f185b))
  - feature(tests-harness): create harness for running tests and document it ([9919f](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/9919fb01b575cfb22483d9e27c2599d0ac6fbffd))
  - fix(package.json): add babel polyfill ([b4dfd](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/b4dfdaae1aa095fc5c396bf52ca66b57f40554c4))
  - docs(contributing): switch policy from git flow to a simple branch off master scheme ([39df9](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/39df9141587b48959d1cb44197f3526c07103059))
  - chore(gulpfile): whitespace ([d0cdf](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/d0cdf96f61488ceec9ff6ee6ff6feb8d99cee1ad))
  - chore(gulpfile): fix linting errors ([194dc](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/194dc1ea43c0a6350eb73f0fe2d1460cb6182e7b))
  - fix(testbed/init.sh): make script executable ([246bc](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/246bcd609bfecd6e06155661ae9c632fc479d947))
  - chore(dev docs): wip, document relasing ([b1891](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/b1891f6cb0fc5c16ce6564b98c580402a5c1fa16))
  - chore(package.json): remove redundant dependencies ([9ff67](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/9ff67701fa5e905cdd694a3f834a841476c60a24))
  - chore(travis): don't release pull requests ([97db7](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/97db7b0db8026ec262f427c1bdd3d4b9e712d05d))
  - chore: add developer docs ([eba94](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/eba94bc0f362e7e3ac58ef0a1e47fda1cd4840b5))
  - chore(travis): only build against recent node versions ([006c0](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/006c0a9ac51714ca955ed79b2aebfc96de321fff))
  - chore(travis): only integrate master ([38fc9](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/38fc9b289b9873141f33a3d95e5be7fe485e20fc))
  - chore(travis): run prerelease before deploy ([7952c](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/7952c98a6192e7983e4eaf1c10e5b726616352fd))
  - chore(gulpfile): rename build-npm -> prerelease ([b689b](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/b689bceb51d42ef6fa683b9bd3db22c5c6f114c1))
  - chore(package.json): add dummy version to prevent warnings ([0c685](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/0c685c22194771219f741b155bf44a2abe4b168e))
  - chore(travis): setup travis CI ([5fc57](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/5fc57ef9d9f68c72199221c31987d2486a420c61))
  - chore(gulpfile): whitespace ([3762f](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/3762faffd5c7559d26f80bec73592cbb8a01949f))
  - chore(gulpfile): fix linting errors ([96902](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/96902d5e251df7b97bf546777cbf3ccf6df5d9a3))
  - fix(testbed/init.sh): make script executable ([0419a](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/0419a23e6e65353ecba9f760629460edf5119225))
  - chore(gulpfile): whitespace ([72edc](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/72edc717daa0f3fe25d0a0d20d262067a0034509))
  - chore(gulpfile): fix linting errors ([73aba](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/73aba7954d89576b69fb55e8334624857eb67a16))
  - chore(lint): implement linting in gulpfile ([0cbe7](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/0cbe741a4d668a0d7ca7cd99b4132d9d97f5fb5d))
  - chore(gulp): add dividers to gulpfile ([8ccc5](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/8ccc56392cf947b7b36f66850360ede3187b16ae))
  - chore(lint): remove File and mixpanel from eslintrc globals ([8687b](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/8687b86d2d9c63fa2d515eb4758b7d695fbf9708))
  - chore(lint): add branch's code style prefs ([9fd78](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/9fd78e90e0174b61fb4d137f9023044ca94c78a1))
  - chore(babel): add task to run all babel subtasks in parallel ([aac1a](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/aac1ae1a921a4a534d9389a0e66545ab2492d039))
  - chore: use arrow functions instead of 'function' ([cec9d](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/cec9d08fcca8775c7b2005436dd6d46e2a538bfd))
  - chore(babel): add es6 transpiler to gulpfile ([2eee5](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/2eee5195d4c8ac3f35a15153fb236102fedfbcc2))
  - fix(testbed/init.sh): make script executable ([59103](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/59103ad35f159faa1e6713c4d2e52ecf522189b0))
  - chore(commitizen): use modern commitizen config style ([bfd26](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/bfd2678934990aba4db4429eb83baa3d42c7dae0))
  - chore(gulp): add `npm run commit` command ([b504c](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/b504caaa5afea1d6a2411f6a468750d855cff861))
  - chore(deployment): remove npmDeployment.txtit is now automated ([df38d](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/df38da93692d6b4fb9f8b06f8bfbcfeb2fa87df4))
  - chore(ios): add script to update ios dependencies ([44ba3](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/44ba3e8de6b77d2cc049be3f1c0866498307be4e))
  - refactor(gulp:setupDev): setup dev by defaultInclude files for setup dev by default since npm lacks a good hookscript to do this automatically. Better to simplify development at thecost of a messier history. ([aa700](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/aa7003afe8d794409a1d59f695c7b0c9ba25595d))
  - fix(testbed/init.sh): make script executable ([0dde1](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/0dde1753f93cc636d2c438578bb6854c97acd2be))
  - fix(gulp): make plugin template comments valid xml ([c4373](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/c43735b7f798f62de0062a01b32323326d6b891c))
  - refactor(ios): automatically set correct header paths based on deployment ([f9dab](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/f9dab4cec02b4d7ff115dd64a068721e758717df))
  - refactor(plugin.xml): generate ios references based on build target ([6b913](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/6b9136d8a81eea6eb5a2e4cda3f9f6f938a9aeb6))
  - chore(dependencies): add gulp ([4756e](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/4756e4e64d6389f3c526732a36129878f55f0851))
  - feature(tests-harness): create harness for running tests and document it ([45b81](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/45b81c8c2b0f782383ac87fbc4b7f877c484cfa7))
  - fix(package.json): add babel polyfill ([859fe](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/859fea02c1ad16675c41e981cce14b1996b69ccd))
  - [CHORE] Updated to use `Branch.getAutoInstance`. ([2900f](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/2900fd1b63e2f80af5506dd7cbc13bc098df398f))
  - Merge remote-tracking branch 'upstream/master' ([ef4cd](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/ef4cdbf51561b27083e703e29c6461ef616e15eb))
  - Merge pull request #169 from renesansz/feat/mixpanel-integrationMixpanel integration ([836dd](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/836ddaffb09f44c3c721fd84599db0d11c193bd0))
  - Should clear deep link even if Branch ([2cac2](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/2cac2b742a40c81b9747b030e143695ed6cad2dd))
  - [FIX] Fixed merge conflicts ([17d87](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/17d872576a6e9459480a77fa8a3e1c8eeaa910dd))
  - docs(contributing): switch policy from git flow to a simple branch off master scheme ([a5aa7](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/a5aa787d225900b90b16551a829fa0c0e5d9d570))
  - Merge branch 'feature/gulp' of https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking into feature/gulp ([fbc1a](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/fbc1a1fac337df6e439a7d5f28ad29b6447830ca))
  - chore(dev docs): wip, document relasing ([32540](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/32540dbd69d0be0662dbf3a856e2c33f75b9b99b))
  - chore(package.json): remove redundant dependencies ([5e74b](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/5e74b60cda785d8a3ca73c2e3206bb74e1777ac1))
  - chore(travis): don't release pull requests ([a838f](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/a838fef1349ddc8d65dba6a02361db52f842676c))
  - chore: add developer docs ([0da30](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/0da3024b3b179ce0d1e135686724b78d49239fd5))
  - chore(travis): only build against recent node versions ([113cc](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/113cc5afe87e7c733ec433d3ffb50337f9405a05))
  - chore(travis): only integrate master ([ab60b](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/ab60be519ffd11a03a4ee03ab9274ee65fd97bff))
  - chore(travis): run prerelease before deploy ([2d6b8](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/2d6b8048ef47ab59e9d6c8395aa673f15a0b7f9f))
  - chore(gulpfile): rename build-npm -> prerelease ([e0b2c](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/e0b2cddfebc7554335ddc29e918d6393449dcf8a))
  - chore(package.json): add dummy version to prevent warnings ([c7ec7](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/c7ec7219ac2eb82749f5803c6c4701a199d28a03))
  - chore(travis): setup travis CI ([601ca](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/601ca99b8268f54ce8e63f776fa3f08a36dd7af6))
  - chore(gulpfile): whitespace ([7178b](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/7178bd5d1ccd0bb962ae050740be037d1e92ac59))
  - chore(gulpfile): fix linting errors ([73446](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/734467e27501e6c324165a3af90187578011df0a))
  - fix(testbed/init.sh): make script executable ([f70ce](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/f70ce5ab1bed17b96c4576e46b3a0c2cd7fcd213))
  - chore(gulpfile): whitespace ([899d3](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/899d3e73a433d62f7b3e33d6e4a0fcc618bd5f76))
  - chore(gulpfile): fix linting errors ([fc2cc](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/fc2ccbe676968a7caf5b0e526e7e7e6685ce695a))
  - chore(lint): implement linting in gulpfile ([ecd8b](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/ecd8b224129482951f4a5d565b9cc213d3b36de5))
  - chore(gulp): add dividers to gulpfile ([49b99](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/49b99beb00a9b5b071bcc1b5a936a872ce5d87b7))
  - chore(lint): remove File and mixpanel from eslintrc globals ([ab6a0](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/ab6a072fa7d6e71ae20c87535a0701b752913310))
  - chore(lint): add branch's code style prefs ([679b4](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/679b4cfccbb22192591837d1a940f847e024a0c7))
  - chore(babel): add task to run all babel subtasks in parallel ([0eee4](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/0eee41993af640b951d8c3397d284bc36919a14d))
  - chore: use arrow functions instead of 'function' ([07d5e](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/07d5ecf42a47aa6ae488ebf7e75378d9ed350e67))
  - chore(babel): add es6 transpiler to gulpfile ([87bca](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/87bcadfa2cd7b6e4fd15a7b11531266c4efd432b))
  - fix(testbed/init.sh): make script executable ([adda3](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/adda365fb220c8321ac50cdeddeb37299c1c91ae))
  - chore(commitizen): use modern commitizen config style ([d5d96](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/d5d9699091a0c4c023c83878774945a96a262091))
  - chore(gulp): add `npm run commit` command ([9a559](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/9a559fd58f1b5dcd300e552057c7e10947f04e8e))
  - chore(deployment): remove npmDeployment.txtit is now automated ([6a1f7](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/6a1f734fa0ca85b5544affe90e9e8df4b3ee3fd0))
  - chore(ios): add script to update ios dependencies ([4383c](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/4383c58b3b091940509495a5af43bdcce8ec2184))
  - refactor(gulp:setupDev): setup dev by defaultInclude files for setup dev by default since npm lacks a good hookscript to do this automatically. Better to simplify development at thecost of a messier history. ([a7972](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/a7972f8992d90b8331f8b4b4879933ddedb01446))
  - fix(testbed/init.sh): make script executable ([ea925](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/ea9258d573c9f0ed07b092924f808c72d13911fe))
  - fix(gulp): make plugin template comments valid xml ([fdc2b](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/fdc2b80613c91785981f793e193b71875610680b))
  - refactor(ios): automatically set correct header paths based on deployment ([74c37](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/74c373ef866983728368cce747455b74454c37b3))
  - refactor(plugin.xml): generate ios references based on build target ([67d70](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/67d70cf050ba10ebe30631101fa18ff2df8fe737))
  - chore(dependencies): add gulp ([cac6a](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/cac6a12a50d4639a2b835108d4095cad87b99d52))
  - chore(dev docs): wip, document relasing ([21742](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/21742d06374acb74c6a2d1c39249dffe92eee823))
  - chore(package.json): remove redundant dependencies ([8de02](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/8de025e247383c484a0d38b96f97e1bfa4871d0d))
  - chore(travis): don't release pull requests ([f5a55](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/f5a55e5c86a5830a375c7df64f243ec2c5f87df8))
  - chore: add developer docs ([01f27](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/01f2717c093ef25eef0ff720f0ac38af8d904527))
  - chore(travis): only build against recent node versions ([251e7](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/251e7a97faf562959fac2ee16cef6a77bbd73c62))
  - chore(travis): only integrate master ([49444](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/49444c2a1b4ed966d6540a624e26534c17cb4d65))
  - chore(travis): run prerelease before deploy ([a7e3f](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/a7e3ffae6548925bb3c98a251c02dfe4cd30d692))
  - chore(gulpfile): rename build-npm -> prerelease ([9cc25](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/9cc259f609032d80a72e6812c25b8762df576177))
  - chore(package.json): merge ([e2202](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/e22023a7dd214ddd2a0539a6e8ee29abb04cc72d))
  - chore(package.json): add dummy version to prevent warnings ([b2040](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/b2040c434be998351709f1dba08a30e5a30817f9))
  - chore(travis): merge ([538c6](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/538c64c63a82feb5b27b9c7259445ba197b68cb7))
  - chore(travis): setup travis CI ([a2eb2](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/a2eb241e001c0187abd1a71e3da908959cacc749))
  - chore(gulpfile): whitespace ([a1f97](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/a1f9786bb284d3c21243289d34a509b4d4f307b4))
  - chore(gulpfile): fix linting errors ([9ef4d](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/9ef4d53620dbfa79267c785541bc93f173d6757e))
  - chore(lint): implement linting in gulpfile ([18c86](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/18c8664f30eba402114ab79062fef8d07a615923))
  - chore(gulp): add dividers to gulpfile ([dcfbb](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/dcfbb5b53092774c35744c260e5333e21115b9a0))
  - chore(lint): remove File and mixpanel from eslintrc globals ([0038d](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/0038dd52d4ea660b88c0748579d0b74508842fe5))
  - chore(lint): add branch's code style prefs ([ad71c](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/ad71c87fd8c86b0f43e3b202a0c914439eab61ea))
  - chore(babel): add task to run all babel subtasks in parallel ([5a21a](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/5a21afaae8495fac7b8f7a59fe2afc5c0e3b04ed))
  - chore: use arrow functions instead of 'function' ([305a9](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/305a9d035a04b5082381f206dbc1df6f7b597435))
  - chore(babel): add es6 transpiler to gulpfile ([1135a](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/1135a60d7a05e07e935bc9f8cb92208de06bf2db))
  - fix(testbed/init.sh): make script executable ([40315](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/4031552677a86e98f4befe48cdd07e982411edc8))
  - chore(commitizen): use modern commitizen config style ([6124f](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/6124fa026e5c4b5754f87fac9906b546579a307d))
  - chore(gulp): add `npm run commit` command ([c09ab](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/c09ab22d0758af75beadd358aa28ed29de0e8b82))
  - chore(deployment): remove npmDeployment.txtit is now automated ([521b6](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/521b6e5ccf8911206d84940ab4042448b28d0913))
  - chore(ios): add script to update ios dependencies ([893d5](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/893d5fa88721b781151bb23b08f36c7207495e82))
  - refactor(gulp:setupDev): setup dev by defaultInclude files for setup dev by default since npm lacks a good hookscript to do this automatically. Better to simplify development at thecost of a messier history. ([abffb](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/abffb2cdc06e507141e371d391db9e9846974a31))
  - fix(testbed/init.sh): make script executable ([b1c51](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/b1c51849babb0c6f2ee25f703c4b2d7976ed4a6e))
  - fix(gulp): make plugin template comments valid xml ([12064](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/120644257393c1d1b7d9375bb97f6e0fde48f816))
  - refactor(ios): automatically set correct header paths based on deployment ([57ba0](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/57ba0c1ed6427021f0df49be54f046d195052074))
  - refactor(plugin.xml): generate ios references based on build target ([077ce](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/077ce5fc8bf77bcbe6809df5739c5b25f516188f))
  - chore(dependencies): add gulp ([f4b2e](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/f4b2eee49f1d89be453bd9e3194b06bfccb9e830))
  - chore(gulpfile): whitespace ([07df4](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/07df48dea8334878de3e16bc4416a65490c7a7c5))
  - chore(gulpfile): fix linting errors ([b292a](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/b292a53375251a874c8b2d8b705a132d2c79c9d3))
  - chore(lint): implement linting in gulpfile ([ec921](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/ec921f7c19214956af197789e8c649626d1a12ec))
  - chore(gulp): add dividers to gulpfile ([6b681](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/6b6819c02a0c629c78289fa5290771f38fd07dc1))
  - chore(lint): remove File and mixpanel from eslintrc globals ([78cd3](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/78cd30dcc943cf94680ad6e97855d02ca7fa1001))
  - chore(lint): add branch's code style prefs ([699ea](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/699ea466dfcc331d01424cd868788a20809846a4))
  - chore(babel): add task to run all babel subtasks in parallel ([94175](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/9417503efbf2c9b270d51ef5aaff7c3f9c5efb13))
  - chore: use arrow functions instead of 'function' ([48273](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/482737c8d50af7e11767ae51c8fb7cf01619be56))
  - chore(babel): add es6 transpiler to gulpfile ([81b67](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/81b672516b50978b19463411efa660f8a9b92d47))
  - Merge remote-tracking branch 'origin/feature/gulp' into feature/gulp ([a7c48](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/a7c482a1fca9645d618df30a05632a112d7ff2ca))
  - chore(commitizen): use modern commitizen config style ([9ea98](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/9ea986f7123896241d396d37a94d5320536f54aa))
  - chore(gulp): add `npm run commit` command ([6f054](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/6f054a156658c29cd3cee73f24930ff2e2792fc6))
  - chore(deployment): remove npmDeployment.txtit is now automated ([604c8](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/604c85f5b2384f8afc390379bdf49a86189140fb))
  - chore(ios): add script to update ios dependencies ([13b88](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/13b8846497275b452191bb5e008f116f5d69f221))
  - refactor(gulp:setupDev): setup dev by defaultInclude files for setup dev by default since npm lacks a good hookscript to do this automatically. Better to simplify development at thecost of a messier history. ([dd513](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/dd513708c8a3fef6f986edead91537508e6f3963))
  - fix(testbed/init.sh): make script executable ([0a738](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/0a7381c1203eb470843157ae0b254d4f38fb951e))
  - fix(gulp): make plugin template comments valid xml ([f7f53](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/f7f537682416be6b9c3a862cb541d56c919154c7))
  - refactor(ios): automatically set correct header paths based on deployment ([1684e](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/1684e50c6039b361509cefd8c52f35b1b9a86e87))
  - refactor(plugin.xml): generate ios references based on build target ([c5711](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/c5711be53f04e4c0d39e6f6d4d49e1218398fb6c))
  - chore(dependencies): add gulp ([20c41](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/20c41679c0d2b598c3aba584d795b1dddb1da50a))
  - chore(commitizen): use modern commitizen config style ([04ed4](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/04ed411e3f1e9037bd7e2e10473f9cdab08d534b))
  - chore(gulp): add `npm run commit` command ([fcebb](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/fcebba4938ca71a7d958b0aee4b70e7a23c88be8))
  - chore(deployment): remove npmDeployment.txtit is now automated ([9aed4](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/9aed4f2736aa3d6432d74171c646570dfc27d8b6))
  - chore(ios): add script to update ios dependencies ([6acf9](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/6acf939c9e01be059336dcf31ce4ca48b7b8f1b5))
  - Merge pull request #183 from renesansz/feat/load-rewards-bucket[FIX] Android build error ([56d9e](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/56d9e9c13461565555ce7bd3195c1130cc5bee65))
  - Merge remote-tracking branch 'upstream/master' into feat/load-rewards-bucket ([de398](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/de3989018a04eec2021a33696122a9a041d004d4))
  - [FIX] Android build error. ([23f55](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/23f55ebd630e491160b902bb5c8130774713c1f8))
  - Merge pull request #180 from renesansz/feat/load-rewards-bucketImproved `loadRewards` to be able to specify a specific bucket to load. ([facac](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/facacd2baafcd866a9c80829c1d745aeaa81d774))
  - [FIX] Fix loadRewardsListener for catching null strings ([f4644](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/f464428bd72e19df33ea3a519ee279d9bf0efc7f))
  - Improved `loadRewards` to be able to specify a specific bucket to load.Signed-off-by: Renemari Padillo <rene@ingenuity.ph> ([c0357](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/c0357687ed0b1ec73bbb021914a80af375439cc8))
  - [FEAT] Improved `loadRewards` to be able to specify a specific bucket to load. ([9ea95](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/9ea957fae6401b158cc0c9a21a295e22e8173914))
  - [FIX] plugin init session handling. ([ad46e](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/ad46e14699096b840244a6ab91b1b25a47474cb1))
  - [CHORE] Removed deprecated method `setDebug()` ([5b734](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/5b73415eadd95ef49dbf49eeef56c9f4a2cc22de))
  - Merge remote-tracking branch 'upstream/master' ([1069f](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/1069f6e62baed45e5751afd4c39cda7c3f85c0f6))
  - refactor(gulp:setupDev): setup dev by defaultInclude files for setup dev by default since npm lacks a good hookscript to do this automatically. Better to simplify development at thecost of a messier history. ([216cd](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/216cd5565a88c2151a44959690c7adb6ef3f3097))
  - fix(testbed/init.sh): make script executable ([edbb8](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/edbb85c30a247d8e180cd28b858155830322831f))
  - fix(gulp): make plugin template comments valid xml ([33538](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/3353831c4d131f6f3890bbf60b2e33f033648dbd))
  - refactor(ios): automatically set correct header paths based on deployment ([aa962](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/aa96258f23a472d218fa0d28af79c9b9d1c83094))
  - chore: delete local log file that ended up in repo ([dbed3](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/dbed3cc963f194030c02602f7032652373e80301))
  - refactor(plugin.xml): generate ios references based on build target ([3ac1e](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/3ac1e2e2b33ee028ac51eea64392a8d3585593b5))
  - chore(dependencies): add gulp ([f7d2a](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/f7d2a077236eefb9c2c7669ad084798ceaaf4dd2))
  - Merge pull request #174 from tushar-bidchat/masterFixed Build Error - Incorrect Header ([895ff](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/895ff9e083ae7da768fe9a4fb6fe32ef92a3340a))
  - Fixed Build Error - Incorrect Header ([f77c1](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/f77c158e291cba701853fa40c21c30d57c1ece54))
  - Merge pull request #173 from BranchMetrics/fix-build-errors-update-iosupdate iOS and fix build errors ([0e895](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/0e895a8f272c0eafbfaccd0e1b860431f978d7b2))
  - update iOS and fix build errors ([8c41d](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/8c41d998cfe25c3d645c9e4edb737ff29e5de48a))
  - [CHORE] Updated mixpanel api reference ([93d20](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/93d200446dc47e18dbf99460b6e2ad8504560210))
  - Merge pull request #172 from tushar-bidchat/masterFixed Warning Selector is missing ([1a7ee](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/1a7eee02de25a02c532ae8dc8fdd4c0c34f90ac0))
  - Fixed Warning Selector is missing ([855e3](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/855e3aaf3ca44ff56b566512c9610b4f2db6400c))
  - [FIX] Removed Mixpanel SDK. ([c1e8c](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/c1e8c2c9535b6ec969b65cebc751571db66d761f))
  - [FIX] Missing headers from last commit ([93085](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/9308592ecdc8c36c8c70a4177e95e833a13a70f9))
  - Merge remote-tracking branch 'upstream/master' ([62625](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/6262501555fc2c864617b13b119f88e80a069e12))
  - [FEAT] Added Mixpanel integration for iOS. ([b7e70](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/b7e70c75ebb168181a65279a1bc5ebcae04d2beb))
  - Update README.md ([48958](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/48958fe54057e9901127250e1e9e4df6f1f96fb6))
  - [FEAT] Added Mixpanel integration for Android. ([f2e5f](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/f2e5f4ae22b49753a82f9e846cea074393f35a71))
  - Merge pull request #165 from BranchMetrics/fix-android-non-branch-handlerRemove stringify stuff ([08f3f](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/08f3fe1cf9577401074c055a54545667ffa2fb0c))
  - Remove stringify stuff ([6bc7d](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/6bc7d529bcddb36cdb9fcfa57b6ffc71957936fb))
  - Update README.md ([297c8](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/297c8b779b85ed89b37f19b5f13a858eec3f62b1))
  - Update README.md ([1159f](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/1159f378c78b22bea25ba0a431fe24ef135a3deb))
  - Merge pull request #164 from BranchMetrics/fix/issue-163-branchobj-setcontenttype-breaks-build[FIX] Invalid data type being retrieved for setContentType. ([ca3a4](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/ca3a41594e96bfaec0f6d652a3b6f629e22c771e))
  - [FIX] Invalid data type being retrieved for setContentType. ([60a45](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/60a4590d7fb0d934cff3428b9f74d25d33e6e628))
  - Merge pull request #162 from BranchMetrics/fix/missing-properties-universal-link[FIX] Missing properties when generating branch universal link ([dd327](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/dd327847e056dc4c04bf8d3b6e6bca21cc5f4a82))
  - [CHORE] Added contentType field for branch universal link. ([da697](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/da697373b6d6855517fd83eb0c3cd0ce0ab321f8))
  - [FIX] alias, channel, feature, and stage aren't set when creating branch universal link. ([97758](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/9775881a3bac3580520183dabe7987182e637408))
  - bump version ([d79f6](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/d79f667ea7007b3b28d84b0bde91a0f8e869dc2d))
  - Merge pull request #161 from BranchMetrics/fix-android-nondeeplinkhandlerFix Android NonBranchLinkHandler ([a6bc7](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/a6bc7e98049c1f283676fd36d8fcdfa4e0dfed68))
  - Fix Android NonBranchLinkHandler ([548cc](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/548cc651dd02c4497144a753159c8501dbdb822e))
  - bump version ([aca74](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/aca745df41253b8baa1bf018f8c7655f8912a0a7))
  - Merge pull request #155 from BranchMetrics/fix-nondeeplinkhandlerFix non Branch link handler ([0a088](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/0a08888a9b32107c307d72beac59e05fabf37873))
  - ugh ([3c305](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/3c305ad0b89f3e25472feb31ff39b8b1b3d509c4))
  - wrong parent ([845b1](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/845b1a9580e79f834b8ddfd3a75f64a5487146fb))
  - bad syntax ([030aa](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/030aa58cc9d8721fbdbe08f674a15ad6c80ae7fd))
  - update android reference ([dbcc0](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/dbcc07bc0d71ab67a57ef72ba5547fdbb89601d8))
  - Merge branch 'master' into fix-nondeeplinkhandler ([06b8b](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/06b8b258b94801b91c8bdc672f2cbfa8c4ceb529))
  - Merge pull request #153 from nickgal/nickgal-patch-1typo ([d2b03](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/d2b031cf72d5808db551b998cec17a6c300ec7d5))
  - fix plugin.xml ([0a8cc](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/0a8ccb0ea93c25960633e360a0ccb4e4aef4d114))
  - update with latest ([745cf](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/745cf45a7108e08869ae566ed1fae309c38cf061))
  - updated 2.1.4 with Fabric Answers integration code for iOS ([cd925](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/cd925e3358715f937da39b44b1e9382ef51feb95))
  - Merge pull request #158 from BranchMetrics/chore/updated-readme[CHORE] Updated README. ([d36ff](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/d36ff82268a50861d4557ac063ae528be5f08870))
  - [CHORE] Updated README. ([87156](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/87156c0236ba9f59e5df4ba349af4e6589a1c870))
  - Roll back Android SDK version ([9f654](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/9f654d125dc361164a58aebe3e7a0aae5b22079a))
  - make Android work the same ([fba5b](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/fba5bc2c0597493f8ac5278325f39422bf2acae8))
  - Fix iOS non deep link handler ([770a7](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/770a74d09d6e34ba37c7be0d5b5794494c0bc778))
  - typounverisal -> universal ([1c638](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/1c638ed9b6b4995874e38c5a82c6d45977059aba))
  - Merge pull request #151 from BranchMetrics/fix/missing-headers-for-ios[FIX] Missing headers for iOS library. ([91751](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/9175193e2057b9da74ce000bbf536371e9f7aa44))
  - [FIX] Missing headers for iOS library. ([48cf4](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/48cf4498996479df68e19dffe4ace8ed2ff1b553))
  - bump version and add dependencies ([e6e94](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/e6e94dd359664972950874914e5d7abf83166d7e))
  - version bump ([9cc4a](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/9cc4ae4760fcebec0358c4c12c9d7df851cca9ca))
  - Merge pull request #149 from BranchMetrics/chore/updated-ios-library[CHORE] Updated iOS library to 0.12.2. ([78177](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/781775ebb45f796f95b38c61ef490d96009649d1))
  - update jar ([4a379](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/4a379787a8f240c130da1d91552a23fa77f8ad3d))
  - [CHORE] Updated iOS library to 0.12.2. ([ac552](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/ac552e71048ff5ce9ee3b3b6f2d7b1636a3c415c))
  - Merge pull request #148 from BranchMetrics/fix/init-session-while-offline[FIX] Fixed NonBranchLinkHandler when app is offline. ([c7b0d](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/c7b0d8e05a3176d86b93d1bc0e145800cff21ab1))
  - [FIX] Fixed NonBranchLinkHandler should not be mandatory to be defined. Fixed callback string format error in Java. ([f7436](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/f7436623d189d8f3fd925b0f3af90b8c3497df3b))
  - update version ([6ce24](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/6ce246fe880ddc4ec2417768fc8a2d3ec1941f09))
  - Merge pull request #145 from BranchMetrics/feat/ios-callback[FEAT] Implemented share sheet dismiss callback for iOS. ([f0ad0](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/f0ad02f3fd598b2fd3f6e495e03b2a4d406257ac))
  - [FIX] Updated callback response for onLinkShareResponse. ([f64ed](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/f64ed68f8078727229802e44556983e9082893b0))
  - [FEAT] Code refactore for storing list of universal object callbacks & implemented onLinkShareResponse callback ([b6bcd](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/b6bcd14568dc304e44f342915b5b36563a9536dc))
  - [FEAT] Implemented share sheet dismiss callback for iOS. ([5618a](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/5618ae04c8f358159a2206ac8c16c99df9dd2d52))
  - Merge pull request #143 from BranchMetrics/corrupted-readmeRe-add some missing content ([97afc](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/97afc4884128d8eac5e820c3db19d1dca41e18fd))
  - Re-add some missing content ([7f4b5](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/7f4b541f75242c59924a5478a0662adab025a0d1))
  - Merge pull request #141 from BranchMetrics/fix/hook-build-error[FIX] Fixed hook script where node-version-compare() ([c1881](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/c188119c158912ed8ba7a34d34e75590c6186dc8))
  - [FIX] Fixed hook script where node-version-compare() is getting `NoIndex()` error due to wrong variable type. ([cec48](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/cec48d8b429d8f3edcef369e8f842743c42a1062))
  - Merge pull request #135 from BranchMetrics/fix-auto-verify-errorFix auto verify error ([c9dfc](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/c9dfc815b99716913aa1559f5d16682b0d827419))
  - this should fix it ([5a8ed](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/5a8ed9ef6ab3b3dd6daf3ea222c3914bed433431))
  - Merge branch 'master' into fix-auto-verify-error ([90c3e](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/90c3ef92171bec5f16f0d4b16ab17f3489ea0aba))
  - Merge pull request #137 from BranchMetrics/chore/updated-readme[CHORE] Updated parameter descriptions for control params ([98455](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/98455291343071c6128484f04572a6b189b27d9c))
  - [CHORE] Updated parameter descriptions for control params & content metadata params ([bb31a](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/bb31aef2fbd24241f8d8a74200088e23487b037a))
  - update cordova readme ([1204d](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/1204db77c26c759d3afd6680d43a7e1f1f532719))
  - more sustainable version ([0b688](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/0b68869f7fa41b50228df1cb565236bb2f2bfe39))
  - Fix auto verify build error ([961b7](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/961b73a24a2c9542698db3a2f6cd798dc077203e))
  - Merge pull request #134 from RathanKumar/patch-1Update Read Me for Share sheet ([0c9ce](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/0c9ce612c4ee8bf87af9c6e285c822f957913f7b))
  - Update Read Me for Share sheetCorrects the syntax error in showShareSheet() ([3acf9](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/3acf9f74355d7fe0eb982b0c42c43844e3780c99))
  - bump version to 2.0.12 ([bd0b6](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/bd0b669cbab610b22237588121eefd59cf8d3d7d))
  - Merge pull request #120 from BranchMetrics/hurdlr-fixesFiltered fixes from Hurdlr ([54fb3](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/54fb30480a1ce3c0ed43d67f89ddf8b3c6e31d62))
  - ack - more typos ([94989](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/94989d992345c74a9354df52257674e384822a43))
  - whoops - missing bracket ([8cd61](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/8cd61beea2dd5a70f53fb1432082e24148e94ab1))
  - better handling of showShareSheet ([6eacb](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/6eacba442e9d4adf38d9b826f48b1d887cd895bf))
  - fix list on spotlight ([45509](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/45509cbfac249e20d1040d761a152ee6b3b8d68e))
  - handling of link params on iOS ([c22fb](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/c22fbb9e66e2632665a8e6bf7a1151ec5a6942ce))
  - Merge branch 'master' into hurdlr-fixes ([93e9d](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/93e9dfed45faa95c553e3fbaefe0378473116866))
  - fix unhandler crash ([c75d2](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/c75d2e045a1466d2888cf2f8b620efaf8ebcaf37))
  - Merge pull request #126 from BranchMetrics/fix/issue-50-no-resource-identifier-found[CHORE] Updated README. ([b4a83](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/b4a83e4666fd6d2165a6a833a03210a4716118e6))
  - [CHORE] Updated README. ([ecd35](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/ecd35173683ede75c589995555754670727b2d4f))
  - Update README.md ([2672f](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/2672f2d2107a32115eb09b5ed27ba176740af754))
  - Will leave this in ([f7ac0](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/f7ac0171cd2ca7ce53613038f94e854db44922f9))
  - Filtered fixes from Hurdlr ([5da24](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/5da241d028879b38200e0b442e77e0fd1d7a3edb))
  - Merge pull request #117 from BranchMetrics/fix/ios-crash-url-string-issue[FIX] Issue with iOS crash which string value was not handled properly. ([b9d0b](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/b9d0b639489d397613603a78b86254249590d50e))
  - [FIX] Issue with iOS crash which string value was not handled properly. ([4d24f](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/4d24ffd0eff317821df6c710154fce0226e1e0c2))
  - Merge pull request #115 from BranchMetrics/chore/removed-npm-installation-method[CHORE] Removed NPM installation method. ([936e3](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/936e391e0b71f6923d84496d5febf99d863b9a3d))
  - [CHORE] Removed NPM installation method. ([bb39e](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/bb39ec7a65c7adbfb31769066583024c52901376))
  - Merge pull request #114 from BranchMetrics/fix/upgrade-cordova-version-support[FIX] Increased minimum Cordova build version. ([6eec1](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/6eec11b68219e4b6a917001cd80b8cc70feaddf6))
  - Merge pull request #113 from BranchMetrics/support-for-legacy-sharesheetsSupport for legacy share sheets ([2ca9e](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/2ca9ec3a4bc1e8f896796a83d78b2e13d8fb8ae3))
  - [FIX] Increased minimum Cordova build version. Enabling support for iOS 64-bit. ([67069](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/67069a591159d2ac35df1d36f5c680f9e19eca47))
  - Merge branch 'master' into support-for-legacy-sharesheets ([f4ceb](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/f4cebdda0e78cc988cbe1bc858139356348ecc18))
  - Merge pull request #111 from BranchMetrics/feat/deeplink-error-handler[FEAT] On error handler for handling deep link urls. ([9e709](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/9e709ca755171ab893de69ee5362a6068ee3cdd8))
  - [CHORE] Removed unnecessary log. ([5b0b3](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/5b0b368951765dc87516e8e360b73a23481a7b06))
  - Support for legacy share sheets@renesansz This will take care of the issue reported inhttps://github.com/BranchMetrics/Cordova-Ionic-PhoneGap-Deferred-Deep-Linking-SDK/issues/112 ([3c860](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/3c86015af0e0ab9c99825ca36410bb1e28e7d0fb))
  - [FEAT] On error handler for handling deep link urls. ([8b9e8](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/8b9e83fd1e2a222923055e802342dbd97bab6420))
  - Merge pull request #110 from BranchMetrics/fix/android-build-error[FIX] Android build error for shareSheet method ([79e25](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/79e25165f93d99b54f867edb611341460f9af9bd))
  - [FIX] Android build error for shareSheet method ([c934d](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/c934d27672ea9d287c31e87b1ebd75f3afbee39e))
  - version bump for fix ([ce304](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/ce3042e2e299c9693c3fba0bc526484f3a542bed))
  - bump to 2.0.10 and published NPM ([e6d78](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/e6d7874b516d7c08b94c03996ba11480a60b5de6))
  - Merge pull request #98 from BranchMetrics/fix/issue-89-non-branch-links-handlerFix/issue 89 non branch links handler ([5a5e3](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/5a5e3ab166f49a9c97ba69b5d61cfe233d7fc4d3))
  - support for universal link catch ([d2bf2](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/d2bf25afd39f97a9531940f4af01cfe142232233))
  - Merge branch 'master' into fix/issue-89-non-branch-links-handler ([4e0ed](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/4e0edf49c734482472baa7066450bbeb26e5c9ae))
  - Merge pull request #99 from BranchMetrics/feat/added-custom-share-text-option[FEAT] Added custom share text option. ([6702d](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/6702d55838a8ab0589a40bcaa86aecfcdf67e42d))
  - [FEAT] Added custom share text option. ([ad5c2](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/ad5c2a571cddaa1586c78765ade69a69b6c0f5bc))
  - Merge pull request #105 from BranchMetrics/perf/implemented-threading-on-methods[PERF] Implemented threading on methods ([a64a0](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/a64a090c1a9963f1a89ef9045d6865286c97317b))
  - [PERF] Implemented threading on methods to avoid bottleneck on main thread. ([db1ce](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/db1ce669ac2ca47a018d908d7ff5fb2a746ffd97))
  - Merge pull request #104 from BranchMetrics/fix/branch-not-initializing-on-android[FIX] Branch plugin not initializing on Android 4.2.2 ([8283e](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/8283e4e836718768e9ca97e7bf8a5af4fb800834))
  - [FIX] Added ES6-Promises polyfill for Cordova web view. ([4a741](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/4a7418dc9a2db6196846c1576452a59ace4d86ec))
  - [CHORE] Code refactor for checking callback context param value. ([b5805](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/b58055de3eeec7b55ca1928e53e5ced916fb255b))
  - [FIX] Null callbackcontext for initSesison ([f46a0](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/f46a075129ab7f4c8aa0530507da1fa2c6e6dbd6))
  - updated README ([ead6a](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/ead6abfcc00d053229fae492729ec2edb971261c))
  - removed CDVPlugin import ([f1db7](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/f1db7d0c6d35610137083497cae5121dd1d093de))
  - fix for non-branch link handling ([82d97](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/82d97464cdae0c30a8e43a14c40ab3080461c156))
  - Merge pull request #96 from BranchMetrics/chore/update-plugin-readme-for-multidex-support[CHORE] Updated README for fixing issues on duplicate `android-suppor… ([3a1f2](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/3a1f20e9e935d416c626fa27a13e0748daea2d40))
  - [CHORE] Updated README for fixing issues on duplicate `android-support-lib-v4`. ([a9b41](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/a9b41b470c81e7f8cc69d907c014cc13a17dda34))
  - update version to 2.0.9 ([eb38b](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/eb38b43138d1382c8cdfce1abd184d4e89d3dbce))
  - Merge pull request #92 from BranchMetrics/fix/issue-80-fix-ios-plugin-issuesFix/issue 80 fix ios plugin issues ([12c44](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/12c447f3341649c5a5aa7953744501d939159228))
  - [FIX] initSession unhandled error promise response. ([bc304](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/bc304b152465c4acbd9dbf50bb59d5a8de99221f))
  - updated deep link handler function in testbed. updated README. ([80b66](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/80b6638929d55b308019fe9983fc9bda500a25b8))
  - updated deep link handler. fixed return types. ([9fdf7](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/9fdf7669a38708dfe78183bfcc0193ea88770c9d))
  - removed reference of deleted BranchUniversalObjectWrapper ([797fa](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/797fa34d04a8e62f78c2b52a1e5ae8d5e43fd39e))
  - iOS plugin promise updates. ([afe0d](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/afe0de7ee99be1296d52ca3368c8b660fe9193b5))
  - Merge pull request #91 from BranchMetrics/fix/issue-90-show-share-sheet-not-workingFix/issue 90 show share sheet not working ([9e430](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/9e43086aaa89f500ecb3836df1c06cf4c50b57bc))
  - [FIX] Share share callbacks should be disregarded in iOS. ([c1121](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/c1121d9cf72c14220ceae987583387e9d0aaf14c))
  - [FIX] Document typo. ([d1a31](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/d1a31200780e9cd80d30e4d54a68eea69fbc86c7))
  - update versions for npm release ([ff645](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/ff645365bb697d2c49cccc309c5ac9e6d4278f0d))
  - clean up note ([83c87](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/83c87dcdf1e50a725cb31f33dff27c41ab58a7d6))
  - Merge pull request #86 from pragunvohra/setDebugPromisesresolve setDebug promise on Android & ios with passed-in value ([47024](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/47024d4089fb0ebfb769e3de9de51827842b2220))
  - Merge pull request #76 from BranchMetrics/fix/pr-74-outstanding-issuesFix/pr 74 outstanding issues ([6fe17](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/6fe171a1f0f98479df556e6405b4515e6db282c0))
  - update per Sahil's requests ([7e8e3](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/7e8e35203aadb9ee69d5632190eed189a133ebd4))
  - fix merge conflicts ([ecff5](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/ecff54d9ff3bea052175b565de619302a7ae7354))
  - resolve setDebug promise on Android & ios with passed-in valueWorth noting that it looks like doing the following:initSession()setDebug(true)setDebug(false)will currently leave the debug state as true since false is pretty mucha no-op. This commit at least fixes (on iOS) so that if you doinitSession() then setDebug(false), it doesn’t set debug mode to on.Both platforms now return a proper bool value of true/false. ([c6290](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/c6290ae27d444ea5b5f23ac191d7f18abaef09ce))
  - Merge pull request #85 from BranchMetrics/proper-referenceCreate proper activity reference ([7ea01](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/7ea01ee3e31ed8b40630dc24fc2d7a1e6d7e3241))
  - Create proper activity reference ([74d9f](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/74d9ff9ec24a637c55ab491573910c0a878eafa1))
  - Merge pull request #82 from BranchMetrics/fix-onresume-intentFix sloppy onNewIntent handling ([cf69f](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/cf69f1cb66f710f0e60ace3c6c06a6081fa50c29))
  - wow this is bad ([fcc20](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/fcc2076dfcb975360532fa2a90e16ffaada8dc7e))
  - Merge pull request #79 from pragunvohra/iosPromisesFixes for iOS plugin (& ensure consistency w/Android implementation) ([836cd](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/836cd61c2c882b47bfdb90aa755c48d0db8332d9))
  - Merge pull request #81 from BranchMetrics/fix-readme-typoreadme typo ([c2f89](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/c2f8964e5b211efe1c3621def48ffea90e522302))
  - readme typo ([2d768](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/2d768669c1cc6f4491792ba805a19ebbcecf1bde))
  - [FIX] Added Android missing dependency. ([df1f0](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/df1f0a13341a0fcd009ec0612d5ef5b64fa255c0))
  - [FIX] Reverted share sheet callback instructions and testbed implementation. ([85046](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/85046b57e9b7f273c67be8506ea84d41be2d277f))
  - [FIX] reverted share sheet callback calls and variable renaming. ([33d47](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/33d4741eb5c6dd4a2bbbb8c4862ec3b6efbcfc1d))
  - Merge branch 'master' of github.com:BranchMetrics/Cordova-Ionic-PhoneGap-Deferred-Deep-Linking-SDK into fix/pr-74-outstanding-issues ([f5776](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/f577606a0e2b82dc68b32deb52a6aa65e6923770))
  - iOS fixes and make Android consistentIssues addressed in this PR:Android:1. getFirstReferringParams() and getLatestReferringParams() will nowreturn boolean false when no params are available (trying to serializea null will throw an exception) or when the received object is null.The behavior now matches iOS.iOS:1. initSession will now resolve a promise with the latest param data2. logout now resolves a promise3. userCompletedAction now resolves a promise, but like the Androidequivalent, it is too early (e.g. before we receive confirmation fromthe server) but I didn’t see a method s.t. I could use a listener towait for the response4. loadRewards() will now return just an int value instead of a JSONstring; it is now consistent with Java5. getCreditsHistory() will now return a straight array of entriesinstead of a JSON string; it is now consistent with Java6. generateShortUrl() now returns an object with property “url” insteadof a JSON string; it is now consistent with Java7. getFirstReferringParams() and getLatestReferringParams() return anobject instead of a string, and returns false if no params wereavailable (matches Android) ([ad8a6](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/ad8a615b478816a8f3028eaad8830fbbc067e609))
  - Merge remote-tracking branch 'BranchMetrics/master' into iosPromises ([b0277](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/b027729744c2c600d50f2e6061f55a99cfba1dcb))
  - [CHORE] Updated whitespace ([4c3dc](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/4c3dc67d67faceb955c2114444169dff326cadbe))
  - Merge pull request #77 from BranchMetrics/update-readmeRemove old BRANCH_TEST_KEY variable and simplify App/Universal links ([3f63a](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/3f63a559293856a8f3db54d62725a267685c1dd4))
  - [CHORE] Updated shareSheet usage instructions. ([a21c4](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/a21c4a4394854a3d38c61f0eb8b7ceb3b3296b4e))
  - [FIX] Multiple instance support for share sheet callbacks & updated api format for share sheet. ([18cd1](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/18cd145ba79bfc70ea4f9208878d4567330d2743))
  - Fix another typo ([8baa9](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/8baa99e0103e147f50fc41877329a45a4bacb39a))
  - Remove the old BRANCH_TEST_KEY variable and simplify App/Universal links instructions ([046a7](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/046a75e791fbd39d7e803112cb70737203de7448))
  - [FIX] Merge conflicts with PR #74 ([a8044](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/a8044fdb616e0f46307e6fae6bce7e4fdaf24290))
  - [FIX] Missing callback listener for registerView from PR #74. ([c8f9a](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/c8f9a69cfa95c8a86d9b8372402b87360ae7733a))
  - [CHORE] Added error callback for mismatched method parameters & variable renaming. ([486bb](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/486bb275e05134c004edcd102ae8bbc3e9bb8c88))
  - Merge pull request #74 from pragunvohra/masterFix callback concurrency issues; ensure more methods will resolve callbacks; do a best-case handling for userCompletedAction; update readme ([3e1fd](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/3e1fdc28c2d227bc797902038bd8daeb386934cd))
  - [FEAT] Added multiple instance support for creating Branch Universal Objects. ([b4145](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/b4145360333297013430d9b7ab072bf3cefe47e2))
  - [FIX] Added Android build instructions and fixed plugin.xml to add Gradle dependency automatically. ([c312b](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/c312b4f21d3814c461ece2a7406a29a14a9d0831))
  - [FIX] Added callbackContext.error if the user executes API methods without having initializing the session first. ([85cc5](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/85cc5b36216bee9b2fc0204da2b98eef69ffc2c1))
  - Merge pull request #75 from BranchMetrics/fix/issue-72-facebook-plugin-conflictfix for openUrl() method conflict when using facebook plugins ([1e9a2](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/1e9a23cd3c9be7f2edd44367cd47c55ebd88f06b))
  - fix for openUrl() method conflict when using facebook plugins ([8a73c](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/8a73c2a69d9f3129d0cb2eaaaad9de5a0a662a0e))
  - Fix callback concurrency issues; ensure more methods will resolve callbacks; do a best-case handling for userCompletedAction; update readme1. No more class-level callbackContext; individual callbackContexts arepassed between methods to ensure we don’t clobber the callbackContextwith two concurrent calls to execute()2. logout, registerView, and userCompletedAction were missing callbackresolutions, so I added those. userCompletedAction’s logic is notcompletely correct as it will always (early) resolve to “success” butBranch.java in the Branch SDK does not expose a method that takes in alistener for userCompletedAction that I saw.3. Fixed CreditHistoryListener to reject a promise if there was a JSONexception4. Added properly evaluated callback to setIdentity5. Updated Readme.md to match code for installation ([fee13](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/fee133cc78cb79e5d2e055e40fd4d184535ad969))
  - bump to 6 ([e815d](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/e815d87401b8a87c7ec11e1e7091c0af91ddcb99))
  - update npm version ([a7a64](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/a7a64785323234c023af4fc21eae7962d08cbe9f))
  - add in source for NPM ([0ac1d](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/0ac1d3755b712d1a5ef79741f1eb5293cb7cb8e5))
  - Merge pull request #70 from harshabonthu/masterRefactor prefix based hooks and branch test env support ([4868c](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/4868ccf1e32f4f48e591bbb7c2b2d8e97fbcc5f7))
  - Fix merge conflict from Unit tests PR. ([b339b](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/b339b384de154c8724c257f0c5f68e8e9971357a))
  - Refactor hooks to handle prefix tag from android-prefix preference in config.xml ([1171a](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/1171a4c80688b5de36b5c09589e8a396f96ce126))
  - Refactor BRANCH_LIVE_KEY to BRANCH_KEY ([9d240](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/9d2405d7a44b82f4544a209b4d00b8e11ed23c9d))
  - Merge pull request #59 from BranchMetrics/feat/added-unit-testing[FEAT] Added unit-testing ([6169c](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/6169c2ba7b9986e564779e8908b350a1866e1a20))
  - Merge branch 'master' into feat/added-unit-testing# Conflicts:#	testbed/config.xml#	testbed/init.sh ([27cb5](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/27cb5612c049068adfc63449264e98b81a69c16c))
  - Merge pull request #69 from BranchMetrics/README-fixesNPM package is now on v2, and removing an extra '/' ([f6c44](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/f6c44af0d782817b96a576cd247d03410c606315))
  - Reverse path prefix change ([511f2](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/511f237f47791751d1a688d41e08771aa7cfb76d))
  - NPM package is now on v2, and removing an extra '/' ([7526b](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/7526b4c48784ea8f687fdc74a4f47e3ba67ed9c1))
  - increment version ([a68aa](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/a68aa3b49eff78da1913ef357721bb442b6159de))

- **Closed Issues**
  - Branch.loadRewards() on cordova no results for custom bucket ([#179](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/179))
  - Branch/Branch.h file not found ([#176](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/176))
  - iOS build error ([#175](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/175))
  - Header files missing from plugin.xml ([#170](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/170))
  - Android build error ([#168](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/168))
  - Builds still failing - '../Fabric/Fabric+FABKits.h' file not found ([#167](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/167))
  - No way to identify mixpanel id ([#166](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/166))
  - branchObj.setContentType(int) breaks build ([#163](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/163))
  - Non-Branch Links are not detected by the plugin ([#160](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/160))
  - Can't build Android again ([#159](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/159))
  - README ([#157](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/157))
  - Cannot build - Crashalytics dependency is missing ([#156](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/156))
  - Sharing a url not redirecting to app in IOS ([#154](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/154))
  - DeepLinkHandler with ionic route ([#152](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/152))
  -    Error: Cannot find module 'xml2js' ([#150](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/150))
  - initSession while offline causes js exception on android ([#147](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/147))
  - Facebook og data does not work when $fallback_url is used ([#146](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/146))
  - iOS Share sheet callback ([#144](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/144))
  - DeepLinkHandler seriously? ([#142](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/142))
  - incompatibility with phonegap-facebook-plugin.git ([#140](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/140))
  - iOS build failed with error v1.indexof() is not found ([#139](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/139))
  - setIdentity(object) returns weird data, undocumented ([#138](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/138))
  - minor inconsistencies between ios & android ([#136](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/136))
  - Multiple serious errors in JSON Data causing exception and ambiguity in processing ([#133](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/133))
  - Documentation clarification for universal link settings ([#132](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/132))
  - iOS Crash: Documentation or Code clarification required ([#131](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/131))
  - Documentation clarification  ([#130](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/130))
  - Troubleshooting when not opening yourapp:// in app ([#129](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/129))
  - DeepLinkHandler is global, how can i call my service? ([#128](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/128))
  - Crash on iOS (when handling a deep link) ([#125](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/125))
  - Different data when deepLinkHandler called ([#124](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/124))
  - Crash on iOS ([#123](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/123))
  - Stage parameter not passed when doing  showShareSheet ([#122](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/122))
  - Promise is not defined ([#121](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/121))
  - Android support-v4 crashes build ([#119](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/119))
  - Crash on iOS when opening link when the app is in the background ([#116](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/116))
  - Android builds broken... again ([#112](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/112))
  - SessionParams only read from defaults when already set ([#107](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/107))
  - shareSheet Facebook option appears to be broken ([#106](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/106))
  - showShareSheet causes app crash ([#102](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/102))
  - Error onNewIntent on Android while application is running ([#101](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/101))
  - Cordova integration getting build error for iOS with phonegap ([#100](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/100))
  - Default text of showShareSheet ([#97](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/97))
  - logout method causing app crash ([#95](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/95))
  - Fails to build on android (w/ pushbots plugin) ([#94](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/94))
  - showShareSheet not working iOS ([#90](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/90))
  - Need to be able to pass nonbranch links ([#89](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/89))
  - iOS plugin not necessarily returning the latest params ([#88](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/88))
  - Should we call setDebug before or after initSession? Clarify in docs ([#87](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/87))
  - Android build fails: Cannot find symbol this.setIntent(intent); ([#84](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/84))
  - ios build fails with error Linker command failed with exit code 1 (use -v to see invocation) ([#83](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/83))
  - Bunch of iOS (+1 java) plugin issues that still need to be addressed ([#80](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/80))
  - iOS - Universal links not configuring correctly ([#78](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/78))
  - iOS - Builds still failing (2.0.5) ([#73](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/73))
  - Facebook plugin + branch on ios does not work ([#72](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/72))
  - iOS - builds failing because of missing file dependency again ([#71](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/71))
  - Android Build issue with latest SDK 2.0.3 - Multiple dex files define Landroid/support/annotation/AnimRes ([#68](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/68))

## [v2.0.1](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/releases/tag/v2.0.1) (2016-03-04)

- **Completed Changes**
  - Merge pull request #67 from BranchMetrics/fix/issue-62-ios-missing-metadataupdated README. replace branch keys. updated init.sh. ([8a4d8](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/8a4d83970e27f4c47cb57f838f463bda4ad72b39))
  - updated README. replace branch keys. updated init.sh. ([66493](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/66493bc9f40f265f2d96da4681fb3d101343b3cd))
  - Merge pull request #66 from harshabonthu/masterBugfix for iOS missing params in deeplinks and Android applinks ([cdb89](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/cdb891fb7780b032b6981afb4e9c12b22ec862be))
  - Added missing BranchSDK Header file ([0e824](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/0e824d0470db190d6d2167f95936eb21fa81dd83))
  - - Updated instructions ([3fdac](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/3fdacb353a61b2366051515a433e33df5250e5c7))
  - - Added hooks to update android manifest and generate app associate file for iOS- Bugfix get params from deep links on iOS- Added Branch framework instead of lib/ lib folders ([61a46](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/61a46052db5ac9369bc9c3ac5944d658c4ca4c6f))
  - Merge pull request #65 from BranchMetrics/fix/ios-unexpected-identifier-error[FIX] initSession response where the app starts offline ([51b77](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/51b77d29c6872edf5220f21a9c8b722c1e820636))
  - [FIX] initSession response where the app starts offline ([f0eac](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/f0eac10bb562710985a659eaf7e6f6014a7c3aea))
  - [FIX] README Typo. ([3e83a](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/3e83aaa144a98ccf9c6b428c43614b556c6c5c8a))
  - [FEAT] Added unit-testing ([9d0a1](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/9d0a17b23f7b2928be0597a309b7cb9035519076))
  - version bump ([a3066](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/a30665d8b12896d1aad9ee0beb42c516e5fc1f6c))
  - Merge pull request #58 from BranchMetrics/fix/replace-branch-framework-with-source-filesreplaced BranchSDK framework with source files. Updated to latest iOS… ([28032](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/28032328bb2330c65b6e24266c0c0eddf5718193))
  - replaced BranchSDK framework with source files. Updated to latest iOS source files. ([f7541](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/f7541c95617133e08b4e97686f514ff1b4636aa8))
  - Merge pull request #57 from ZackMattor/masterMake our object passed by DeepLinkHandler (iOS) actually an object ([f4346](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/f4346ae440929bee24756a55931160a9c0f2cd1a))
  - Make our object passed by DeepLinkHandler actually an object ([34419](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/344192e813cec47228be06b652e5b73495600b2a))
  - increment version for NPM ([e7d72](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/e7d722c3edd3b2c2da91824fd351089b29e2d3f7))

- **Closed Issues**
  - iOS9 - Tries to hit fallback link every time from Safari (Chrome works fine) ([#64](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/64))
  - Latest version does not compile on IOS ([#63](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/63))
  - On ios, when someone clicks a link that was generated using an SDK that has contentMetadata, the click does not contain the custom data ([#62](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/62))
  - Phonegap incorrectly throwing error if encoded id not added ([#61](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/61))
  - iOS - "SyntaxError: Unexpected identifier 'Error'. Expected ')' to end a argument list." ([#60](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/60))

## [v2.0.0](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/releases/tag/v2.0.0) (2016-03-01)

- **Completed Changes**
  - Merge pull request #56 from BranchMetrics/fix/issue-50-no-resource-identifier-found-for-attribute-autoverifyFix/issue 50 no resource identifier found for attribute autoverify ([707df](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/707df4658c10c3819fa73653e381e1577d74112d))
  - updated init.sh; small fix for contentMetadata ([09b1f](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/09b1f2db57466733e03d622c3f4890a7f0b26fba))
  - [FIX] Missing library and typo ([2faab](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/2faabbbe927681fbba90ac5eed292c340339bfe2))
  - Fix content metadata ([e5d70](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/e5d7036b12c8f75da28aa9c087380df53d49a3e3))
  - Merge pull request #55 from BranchMetrics/fix/issue-52-deep-link-handler-differencesDeepLinkHandler now returns string instead of dictionary ([1985d](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/1985db25ad6e35a875bfae069f3887ddbdc2371a))
  - DeepLinkHandler now returns string instead of dictionary ([13220](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/13220cb39737229c249c8ee5073b4dc31f3a322c))
  - Merge pull request #53 from BranchMetrics/fix/issue-49-plugin-does-not-work-by-defaultremoved setDebug requirement for initSession in plugin ([bffb1](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/bffb150d771166e8626711de1b9f44c3d64fb9dd))
  - removed setDebug requirement for initSession in plugin ([9c476](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/9c476fcfd4b85c68809c3123b49fc38ae57135d5))
  - Merge pull request #47 from ZackMattor/masterUpdate README.md ([a1927](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/a1927ffdcf8d61eb197ed3d9f60a552ece9702f0))
  - Update README.mdThe command to install a plugin via the cordova CLI is `cordova plugin add` not `cordova plugin install` ([8bb31](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/8bb312af704238e7498151b3ae1f70bfe0a2d5a4))
  - Merge pull request #46 from BranchMetrics/project-restructureProject restructure ([f00fb](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/f00fba5f9ae434adc6bcff8c2a491115fdf7b05d))

- **Closed Issues**
  - contentMetaData doesn't seem to be appearing in the data when the user clicks the link ([#54](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/54))
  - iOS vs Android - DeepLinkHandler differences ([#52](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/52))
  - Can't get the plugin to build in Phonegap Build - Missing iOS header file ([#51](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/51))
  - No resource identifier found for attribute 'autoVerify' in package 'android' ([#50](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/50))
  - Plugin does not work by default. ([#49](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/49))
  - iOS cordova build fails with error: Branch/Branch.h not found ([#48](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/48))
  - Push Version 2.0 to npm ([#45](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/45))

## [v1.8.0](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/releases/tag/v1.8.0) (2015-12-21)

- **Completed Changes**
  - updated README. ([b89bb](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/b89bb4a9bf2e0eca7c9f9a51dae7c61a61c15e0f))
  - Merge branch 'project-restructure' of github.com:BranchMetrics/Cordova-Ionic-PhoneGap-Deferred-Deep-Linking-SDK into project-restructure ([c8803](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/c8803c226716b23c7756385a5368539c2a33d9d1))
  - [CHORE] Implemented share sheet listener callbacks for testbed. ([6377f](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/6377f1fa2795b079ddf3d6453058fb76dbbf3107))
  - [FEAT] Added set listener callback for share sheet method. (Android/plugin) ([bff6c](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/bff6c97b5b44f5b9f7eb2dbd8bb3175626f91e39))
  - updated redeemRewards method for iOS. Updated README. ([9cfe0](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/9cfe0397bae222d89bab56ea924beb2559f7a8f0))
  - [CHORE] Added optional string parameter 'bucket' for redeemRewards method. [Android] ([2aa8e](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/2aa8e2845c44a7205dc824a99425615d10dec891))
  - Merge pull request #44 from BranchMetrics/project-restructureUpgrade to 2.0 - breaking change ([91cff](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/91cff914740bc737c59de87eafbdd7b5e4b5389e))
  - cleanup readme and link to old repo ([02c92](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/02c92566bb348f3a3f40dd8bc77d6a98dc53f2d2))
  - Create ISSUE_TEMPLATE ([acc9e](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/acc9e25f5ffb60635a10dd449a51c1a014c9ba10))
  - params label ([1280a](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/1280ad92fdf179c781da88803e5272e56c4d546f))
  - ready cleanup ([22726](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/2272630c74f8448ff47167a9757d91f820d2e2b3))
  - delete hidden, incorrect guides ([73851](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/738517a15f75a5d1ee670d300fffe2d61677d389))
  - update changelog ([16d98](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/16d98f033971d724a38d0b080edf5afa1546e9e6))
  - remove legacy crap ([61028](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/61028d5c592e6c4a1b42a22489cf990eafef33e9))
  - deleting old stuff ([72fd5](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/72fd512fc9e3c4d7e08e14c3aad781f307e726d6))
  - Merge branch 'master' into project-restructure# Conflicts:#	.gitignore#	README.md#	package.json#	plugin.xml ([4a0f6](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/4a0f65e236e6e18de0689bd4693cf53eb79bfe0e))
  - add comments to code ([66947](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/6694758c11b742e4874de1f86b9a6c8cdda3e20d))
  - [FIX] Make ENCODED_ID optional. ([77776](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/77776e3006fa3983d8785886ac3f3a1b0e0cf49e))
  - Code Review. Updated README. ([25296](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/25296c3b8e89f1f64122d642e5b888e229678fc3))
  - [CHORE] Updated initSession callback to match with iOS. ([81d4a](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/81d4aed7f0d0a5f32226cfc0b0fc20b4a0c500da))
  - [CHORE] Updated initialize callback to execute `webview.sendJavascript` to client. ([e075a](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/e075a13701815d42ef7f310e1bed3c9741b1f9df))
  - [CHORE] Updated plugin readme. ([0452e](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/0452e9a45f86dd935c5bea25ce83e9b2927839f6))
  - [CHORE] Updated README ([afd16](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/afd167f990cfc67f6928e1ce312e3c52900e9188))
  - [FIX] Android SKD Initialize method. ([3df1c](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/3df1c8ef502457714c8c3926bbe9a7d9d2d230cb))
  - [CHORE] Updated testbed app to use branch universal object. ([3009c](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/3009c4526d177ee5c87604e4e36c1929b708877a))
  - [FIX] `createBranchUniversalObject` method should return a new branch universal object. ([5ea1e](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/5ea1e994bca4255576849d4c7e712d8a23df0872))
  - [FIX] Variable naming typo ([f2e30](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/f2e30e2dbd74ad9ed56afffdd8f5d123114b0daa))
  - Merge pull request #42 from boxfish/masterreset universal_link_url/link_click_identifier after consumed ([1c6fa](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/1c6fa92b453b4b8ee57226de3dc51961c50a331f))
  - reset universal_link_url/link_click_identifier after consumed ([b36ea](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/b36ea25bc5d3a86e7be50ef29d2950910524a057))
  - added missing ios guide ([d6d58](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/d6d58807ca5a261f131665bfd297b66a0a49d481))
  - [CHORE] Updated README ([3204f](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/3204ff06623c86b08cecfb1c879d6c931a85f712))
  - [FIX] Encoded URL update ([5e74b](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/5e74bdfc5097d44a0f028335eb733f144ade2a17))
  - [FIX] Missing plugin variable. ([dec24](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/dec249078876036243e55eee7b6141bb4c79f7eb))
  - [CHORE] Updated plugin manifest and testbed ([0ff9e](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/0ff9e8fbdd6b11a6b97f4726477d9fd34e820e4b))
  - updated README. added IOS_BRANCHSDK_GUIDE ([ba5ca](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/ba5ca90763512195ef38066ad5a50756e6de7f61))
  - added deep linking for iOS. Updated README ([c5864](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/c586464bc1cd8f159042f13d7bd64b2538dcf98a))
  - [FIX] Callback context not sending response ([f15cc](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/f15cc33806fa101f94cc58594bd305da0cdad9d1))
  - [FIX] Intent session ([201dc](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/201dcfefea307826b7a7d21175e421017a584163))
  - [CHORE] Updated plugin manifest config. ([a792c](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/a792c26aa8a03d2e40b21125ae4e07abbba9d9fe))
  - [FIX] Alert display for init session ([f6fe4](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/f6fe4c5d86b06c5b29b700b443514351442f1ba7))
  - [FIX] initSession() return and updated autoInstance call ([182a7](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/182a7fcd1df8e3bd1dbf3399ce4ff0fd2019e5d4))
  - [FIX] iOS layout ([b375c](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/b375c62b58c328686111dbecc52c398c13424606))
  - [CHORE] Updated plugin.xml auto config. ([a5d17](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/a5d1787e5a43a4e94fa80ee788e25a73186ab0fd))
  - [CHORE] Added on click event to open the generated URL. ([94b20](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/94b20691f41d160f57e35ade926957b1591baa5f))
  - Added Android Guide README ([f8f48](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/f8f48bf324addd2a2a83c289c269d9331c71b2a1))
  - [FIX] Fix url generated field ([91b72](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/91b7270fc5155b0c8dc2d147bb91a3fc9f0be080))
  - [FIX] SDK Methods and API request. ([3acdb](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/3acdbc6cb0fd970bb7b2969c04dc2332e70751ba))
  - updated API References in README ([9f2df](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/9f2df41c1d0af257a67180f9e5f737863015a380))
  - Merge branch 'project-restructure' of github.com:BranchMetrics/Cordova-Ionic-PhoneGap-Deferred-Deep-Linking-SDK into project-restructure ([e225a](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/e225a09ab274d053e83fcaf358e7ac9f9b09046f))
  - [CHORE] Replaced plugin.xml config manifest to use the user input app name. ([84587](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/84587272dd838195c1dde68021b89e5faa2604f9))
  - [CHORE] Replaced plugin.xml config manifest to use the user input app name. ([da562](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/da5626d1a6fb54f4f03ed7841d4d4450d9bd6e1c))
  - [CHORE] Updated app name for testbed init.sh ([260f9](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/260f9f98e1612143b53c0512678f276a65f4dd87))
  - [FIX] getCreditHistory callback not returning response to Cordova & some return format fixing for other methods. ([bb42b](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/bb42beab554c534c8a47a42089a96b57d6c27eac))
  - [FIX] Redeem rewards not returning response from callback. ([40abe](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/40abe90785c505474202eb23d4f3f073810f1018))
  - [FIX] Re-added initSession() callback. ([77a63](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/77a63d850c6b5c6e28b0ce0002ac772a67b5d5a4))
  - Merge branch 'project-restructure' of github.com:BranchMetrics/Cordova-Ionic-PhoneGap-Deferred-Deep-Linking-SDK into project-restructure ([95adb](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/95adb4791bb9cb86492dc7123717fc4d0e40c7a7))
  - [CHORE] Some minor updates. ([6b5dc](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/6b5dc906b927730278000c56a0a806af5a2fbd90))
  - added missing listOnSpotlight method on testbed for iOS ([9e536](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/9e536f1e0d23272cfaa2ea5a244e6eaab663d199))
  - [CHORE] Push plugin update ([cdacc](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/cdaccef2fc419d19ceaed041423ce37a2403dc62))
  - [FIX] Removed some callbacks for methods that doesn't need one. Updated testbed app. ([00569](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/0056944e04c878743c7849d0bf3fdc6a70ff3537))
  - [CHORE] Removed promise callbacks for logout(), registerView(), setDebug(), and Branch Universal Objects. ([78242](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/78242c4a9f355b30f61ea1092380ced910131b51))
  - [CHORE] Pushed some updates ([f29fd](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/f29fdef777dfcead2592abe08e3da444577b994e))
  - fixed Branch Universal Object methods ([df475](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/df475fab627f685a236e5b6c0b82b90e9bf3f1ab))
  - [CHORE] Updated README.md ([703ea](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/703ea74aca61a1fbd7a5acf2c3914d9825db02d8))
  - [FIX] Fixed <config-file> entry for inserting additional permission. ([8abde](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/8abdea7f33f9653299074875312eb074805bb06f))
  - [STYLE] Updated iOS styles ([3c537](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/3c5372eff845c1b88000d88408423f1367ab8cf3))
  - [CHORE] Updated plugin README ([f0637](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/f0637bb7eb29ff44120c823019055fb800a8a942))
  - [CHORE] Updated testbed README ([cf110](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/cf1100407ca2f8d6de69b343157be94068496fb5))
  - [CHORE] Updated README.md ([1eb00](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/1eb0049b20175316a60f6f982dcdaef3ad276634))
  - [FIX] removed parma count checking. ([b8a7b](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/b8a7b63541a56bb3cb5be6f58a9275f5993108bc))
  - [CHORE] initSession and setDebug should be initialize on app start by default ([dba37](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/dba37a72007af8933139bb3170ace98caa5ac7ce))
  - [FIX] Updated Cordova interface to follow the plugin convention for initializing the SDK ([dbf8a](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/dbf8a5612a56a458c86611ae4fde274294cc6576))
  - [CHORE] Updated testbed app ([b38be](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/b38be1e52bcbdea501367e9010fab8436d028924))
  - [FIX] Updated SDK to follow the plugin convention wherein "Debug mode" must be set first before you can initialize the session. ([3c878](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/3c878ab45a7e9db89da3cc102b7400a57c6994c0))
  - [FIX] Typo. ([ce143](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/ce14304f29f156163dcbe3a3922e03cd87091352))
  - [CHORE] Conerted init.sh to be executable ([a020b](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/a020bca3e87d05a2f2db12b200f3e18ff0ee27ba))
  - [CHORE] Updated plugin package info ([7f3a3](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/7f3a3b6a172ae881e2d27c53e8ed4097a0c08f7c))
  - [FEAT] Added plugin key for registering Branch key and app name. So users could add the plugin's branch key and name dynamically ([529f0](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/529f05380d5dfa18d34c887e881a95b0fc06fc0a))
  - [FIX] Branch key cannot be added thru config.xml. ([b454c](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/b454c7cce6b72eafc6824cd154d9ef61a5830882))
  - [CHORE] Moved depency folder ([ca1d1](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/ca1d191f9c0364dedf660327b28b85ff4195a550))
  - Merge branch 'project-restructure' of github.com:BranchMetrics/Cordova-Ionic-PhoneGap-Deferred-Deep-Linking-SDK into project-restructure ([a6daa](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/a6daa97027d8526fef806a38b16db36d2fe48182))
  - [CHORE] Re-structure Android structure ([58d74](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/58d749763f1726fb25fbb7d1c1bba278db15196e))
  - [CHORE] Removed Branch.IO key entry in plugin.xml, since it should be declared in the app config.xml file. ([95021](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/9502100ccf1171d20d01a23845740f828a870b9a))
  - [CHORE] Minor code refactoring. ([06bff](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/06bff234c65c74e1b243d3bf784131d794e3d698))
  - added basic iOS methods ([fb43c](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/fb43ceec8fc7e6210a4b72cef3c5f1659784a4f6))
  - [CHORE] Removed undefined plugin method. ([3560a](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/3560a170dfd23bced4ff07571b9cc2b781942b62))
  - [FEAT] Added onResume, onPause, and onStop state cycles for the plugin. ([051ed](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/051ed87299624c39aa0d7c40f9a47ef56f843f8f))
  - [CHORE] Code refactor. ([8b47c](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/8b47c69430b8d3a17f93edc984940e84e181cd88))
  - Merge branch 'project-restructure' of github.com:BranchMetrics/Cordova-Ionic-PhoneGap-Deferred-Deep-Linking-SDK into project-restructure ([d87a6](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/d87a6d3616528c0518ce761cb077dada9cbdbc69))
  - [CHORE] Updated README.md ([185ef](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/185ef1f092c9bf5d177cf56d0080726ce29f4f13))
  - Updated ios source. Added basic implementation of plugin and initSession method ([5ecc2](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/5ecc2fc57aba0fc1243e3a078afd11fa1eb9966f))
  - [CHORE] Added error condition for SDK ([6b6e2](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/6b6e246b580b815f276f6c1204ed8f75796c0a23))
  - [FIX] getFirstReferringParams not returning JSON object. ([aebda](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/aebda33642614b5e3387556a1cb48058fd377de7))
  - [CHORE] Updated testbed app ([a34fc](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/a34fc95890652a2b3910c9545aeea3a72114a535))
  - [FEAT] Added testbed app ([22bff](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/22bff450ec9762ffd638d610105a6c93bfef375b))
  - [CHORE] Minor whitespace fix ([5caac](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/5caacf502feae3625a1afbc7eba98882a95608eb))
  - [FIX] listOnSpotlight not calling the right SDK method. ([71e3b](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/71e3b9503536ec78181e6b1354dde097ac144ef0))
  - [FEAT] Added Branch Universal Object class & methods ([3e46b](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/3e46be1072036bde5bf7808803df2b284701fa27))
  - [CHORE] Refactor Branch universal object wherein some methods should only be accessible to its instance. ([8d717](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/8d717d7e747744c0e2e15033805d3fbf885250d1))
  - Update README.md ([9e7d9](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/9e7d97e9fa9e20256472c5398cd1319452f3fbd5))
  - Merge branch 'project-restructure' of github.com:BranchMetrics/Cordova-Ionic-PhoneGap-Deferred-Deep-Linking-SDK into project-restructure ([85558](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/855589cb72a1e3848dc24490ec0047b8090c78eb))
  - added ios plugin source ([9104d](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/9104db65d980ca07014c8b2ff26805666aae2133))
  - [FEAT] Added getLatestReferringParams() method. ([941f6](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/941f6328dbc56e42ec4f88421afd2d4371f9e3b5))
  - [FIX] Type checking for setDebug() ([89440](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/894405a6b22ee040d04c08319515d11dfd9cdacf))
  - [FEAT] Added loadRewards() and redeemRewards() methods. Bunch of code cleanups. ([d45ef](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/d45ef1a5f07ad962967429ec878815f21f97f970))
  - [FIX] Added metaData parameter for userCompletedAction(). ([0df88](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/0df8866f5f3181b39a220e4605387e03c93c6779))
  - [FEAT] Added createSessionDict() and removed unused codes ([9c6a8](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/9c6a883cde4a55c9c7a29814128ce52755eac529))
  - [FEAT] Implemented loadRewards() method. ([faf80](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/faf80dfca0d2dc239d2eeec13226ff7f7c7aaa17))
  - [FEAT] Implemented userCompletedAction() method and some minor code refactoring. ([9c202](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/9c2021f07830a5e68dc2ba33b3e314c16a2532b3))
  - [FEAT] Implemented setIdentity() method ([cb295](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/cb295a9d49f6b0e13c26d3219e8f87739f2272da))
  - [FEAT] Added setDebug() method ([1a4de](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/1a4de03c37ad1264107bdefeac87c8eaadd205bf))
  - [CHORE] Added items in .gitignore ([f12af](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/f12af09ecd520e052a0b4457892751ed28a60055))
  - [CHORE] Minor code change ([294b5](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/294b5eeddbf17fd11ec090c24cb4d2b219e7a846))
  - Initial commit ([558bf](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/558bf7299d96d45ebd6e97f684146182a3c05054))
  - demo app ([b7e6b](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/b7e6b1b1b1f6fe48a2bd6f81390ee61c400e44e0))
  - fix docs in meantime ([306e4](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/306e447f2584d4e57862f6b38f991f2f8fde5516))
  - Merge pull request #35 from csolallo/masterAccount for the fact that the app delegate may have an implementation… ([3918f](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/3918f42851c84b889fa033b268aabebe4100be46))
  - Account for the fact that the app delegate may have an implementation of application:continueUserActivity: ([3e506](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/3e5061707ae57f6e144d8d58a4550a23c2627aaa))
  - Update README.md ([f3587](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/f3587f4b9a1f9642954d4f3a827f76303921bf33))
  - Resetting to HEAD ([2ae5e](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/2ae5e2aeb56d11d4ece97e4a87e55e4743245028))
  - Merge pull request #33 from BranchMetrics/build-with-readmeBuild with readme ([f8293](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/f8293952956351d187195a35011fa7694fee7504))
  - Merge branch 'master' into build-with-readme ([7bb6d](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/7bb6d2c8b891c1963896ab1f687babde41c9e6f8))
  - Tagging release v1.8.0 ([f4d56](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/f4d56ea65a791f5af94ac1ed5c7aec90835906eb))

- **Closed Issues**
  - iOS universal_link_url is not reset to nil after consumed ([#41](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/41))
  - Ionic: Uncaught Error: API request /v1/profile missing parameter identity_id ([#40](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/40))
  - ios trying to load branch.js instead of build.min.js ([#38](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/38))
  - Universal links and resume event issue ([#37](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/37))
  - iOS SSL Error ([#36](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/36))
  - Wrong repo in instructions? ([#34](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/34))
  - Compilation error on Android after "Add support for App Links" commit  ([#32](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/32))

## [v1.7.1](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/releases/tag/v1.7.1) (2015-10-29)

- **Completed Changes**
  - Updated CHANGELOG.md ([ba577](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/ba57704e359691126f39728523d955ab0a57914e))
  - Web-SDK version bump ([265ff](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/265ff6e14ce9432900106583c34a75c8411c53a8))
  - why were resources ignored?!?!?! ([309db](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/309db76dcedd7e2d5c5144f3a8f7846bcefe17aa))
  - build with readme ([d66d6](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/d66d61e394627f20c30b256eada3eb0777ee131b))
  - fix build errors ([84b37](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/84b3790a38decb7c47d51be790334610adeccd9e))
  - compilation issues ([db7ab](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/db7ab5844ea73af958f423a55c1a330777aeb4dd))
  - update changeling ([5c133](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/5c133f6b4337456dec8d4b0b5762de45c4191050))
  - Merge pull request #31 from BranchMetrics/add-android-app-linksAdd support for App Links ([23888](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/2388869af20f19e3f6ab9e0f1aafb7389896da0c))
  - Merge pull request #17 from BranchMetrics/new-licenseAdded new license ([714ff](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/714ffe66a25403e341afca06e0565bf540da451d))
  - Merge branch 'master' into new-license# Conflicts:#	Web-SDK ([27be8](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/27be878a82ff7a5f0306900d44c4c1d1db54562d))
  - Merge pull request #28 from BranchMetrics/remove-sendsms-cordovaRemove sendSMS from Cordova docs ([5d188](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/5d188811c007d61d6a792d711477140464e7ca4d))
  - update ([52dba](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/52dba4fbef2018638b8f4db6756c5fb3071c3859))
  - Merge branch 'master' into new-license ([baea1](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/baea1a9466718bdfdec0b07896830064ae1c4e8e))
  - remove deepview ([3f5f6](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/3f5f6623e84fad236d6a9ead46f67e8e72f83140))
  - Merge branch 'master' into remove-sendsms-cordova ([e613e](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/e613e38d43b45c822c592e0c040d7a351bb90a7c))
  - tabs tabs tabs ([4ac47](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/4ac4771f0363d537a009f2ec345fbe8fbbb809d6))
  - Add support for App Links ([81a20](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/81a201a4946982693a224afe1117acfb17408cea))
  - Update README.md ([b5c33](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/b5c3303160f32de15f6747ec1b90aabc4fc30731))
  - Remove sendSMS from ToC ([5ce42](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/5ce42096703442628fed57826ea4e6ae43fcfccf))
  - Match the latest WebSDK ([cc949](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/cc949442317b22b39bf4ac7174225e8509a4696f))
  - Removing sendSMS from Cordova documentation ([d7c53](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/d7c536486b26039ac0e743248e9baa0e7c727f89))
  - Merge pull request #26 from BranchMetrics/universal-linksImplement iOS9 Universal Links ([132b2](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/132b24232d5f30c051960c3ae93f6f2ed6d2fb04))
  - Now uses iOS9 Universal Links ([45ffa](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/45ffaf8b13d8b0dc2cbb2b8cd3758ec7b3edf98c))
  - new AppDelegate file ([9dc34](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/9dc3473bd521e21a2e4805486900e176d26175da))
  - sending universal link to WebSDK ([a1d5c](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/a1d5c0a2cc39e4e41f8ae9ffe4a64e33c064ddbb))
  - Update README.mdfixing readme ([83e33](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/83e3306277bff165219248f9b3ab12d63b578b1f))
  - readme ([b8eb9](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/b8eb9c86e9f93fcf7d81b6acdfce1cad68b9ceaf))
  - Merge pull request #24 from BranchMetrics/setdebug-updateSetdebug update ([31009](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/3100954536a42b1948eac4382511913c87a05b9d))

- **Closed Issues**
  - build.min.js uses `eval` ([#30](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/30))
  - Integrate with Eddy Verbruggen's plugin ([#27](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/27))

## [v1.7.0](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/releases/tag/v1.7.0) (2015-09-25)

- **Completed Changes**
  - build files ([44f7a](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/44f7a87d752fab9bb52ee9b66ee43128d85cd89f))
  - Added a plugin to allow ajax requests in android for newer Cordova ([2c04a](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/2c04a080323b87fc4e8f4ad159979ea5a7b4607b))
  - Random hardware ID for iOS when debug flag is set for #14Added debug_set value to return value during a fresh install ([acb84](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/acb8473f265f54ee85b823b28439379594e3a3fe))
  - Updated the current Web-SDK version ([bfeb8](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/bfeb8f41a5f0d5698dabc2a663dc8feede401b85))
  - Allow the debug flag to be passed through for #14 ([62724](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/627243642fc18ee6c3218ba094dec63bd6f0a106))
  - Updated Web SDK repo name ([f5bc4](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/f5bc4213da405b5524e348073fa43353642baeff))
  - test ([1a54b](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/1a54b43b813d4740e3244e81b2b9ebb971a647f4))
  - Merge pull request #23 from BranchMetrics/plugin-crash-issuePossible fix for #19 ([f46b6](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/f46b64ee2da1c775d2d6bb5f57b51ea16ff61784))
  - Possible fix for #19, the unminified version of the build script was being referenced ([94d0a](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/94d0aa0c68c391af5d3d848dac6dbba034279e9b))
  - Merge branch 're-org' ([b05b6](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/b05b685bcbd0f5995f979191bcf24b3c72111fcf))
  - formatting ([df66a](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/df66ae819f1ee45491e64ff83c6f9f6e501a9938))
  - Merge branch 'master' into re-org ([75631](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/75631597f0305c7fe4a1949728835690f9a59168))
  - Merge pull request #21 from BranchMetrics/kirk-docreorg docs to spawn Reference.md from README.md ([3f7c6](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/3f7c6086139d3c80dfa0fb54031ae696f44105c9))
  - remove 1_intro ([9e7b4](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/9e7b45b6fa45cd63231d9edbfec28634930216d5))
  - Merge branch 'master' into re-org ([20b5a](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/20b5a057cf0ef8be835ba225455b38e0ab84c6bf))
  - split README and Reference ([43315](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/4331588b1d9c4f6125bdc6c25da5df6d0dcd14cc))
  - remove 0_notice ([e86cd](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/e86cd75f1fe4789af8d6edf02a789afce97204b7))
  - remake ([331a0](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/331a0f3836cc41c6637b5ab6429d8165e149f9ad))
  - Merge branch 're-org' ([02dfb](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/02dfbf3837bdaa4d5f1b94a00f9b1dc0dd364b86))
  - trimmingmoved integration instructions from ready into docs site, movereference materials to reference.md ([9fc8c](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/9fc8cf68a7ff51cacb2d124d3af8cb329a4d3bdf))
  - Merge pull request #18 from dangreenisrael/patch-2Minor formatting fix ([6f9b5](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/6f9b5be70c5e7904631d451982956a98b63dc66a))
  - Minor formatting fixI had missed putting the init function the `resume` function and only put it in the `ready` function.  I think that marking it as code will make it easier to see for other users.Cheers ([9d899](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/9d899902ad6a5485ef477448422b93b020b840a3))
  - Added new license ([598e5](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/598e584740dc048921262d90e09851b2e1567d75))
  - synced to HEAD ([c7fb6](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/c7fb68156832f00e81803cc985aa70612a9d9e7f))
  - Resetting to HEAD ([cf33d](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/cf33d52477d969536aaaafcb403577e832166c49))
  - Tagging release v1.7.0 ([e75bb](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/commit/e75bbe5632cf705d5ac57b26d19ff505496a58ae))

- **Closed Issues**
  - Cordova crashing on android as soon as plugin is installed ([#19](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/19))
  - Branch not ready on deviceready event ([#16](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/16))
  - setIdentity doesn't work in current version ([#15](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/15))
  - setDebug has no effect ([#14](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/issues/14))
