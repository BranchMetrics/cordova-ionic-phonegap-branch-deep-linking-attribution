# Contributing

_Questions? [Contact us](https://support.branch.io/support/tickets/new)_

1.  [Todo](#todo)
1.  [Data Flow](#data-flow)
1.  [Dependencies](#dependencies)
1.  [Setup](#setup)
1.  [Develop](#develop)
1.  [Test](#test)
1.  [Submit](#submit)
1.  [Publish](#publish)

## Data Flow

* [Users sets values](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/blob/master/testbed/config.template.xml#L6-L13)
* [Hooks run on build](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/blob/master/plugin.xml#L45-L47)
* [Hooks call scripts](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/tree/master/src/scripts/hooks)
* [Scripts for iOS](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/tree/master/src/scripts/ios)
* [Scripts for Android](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/tree/master/src/scripts/android)

## Dependencies

* Homebrew

  ```sh
  ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)";
  brew update;
  brew doctor;
  export PATH="/usr/local/bin:$PATH";
  ```

* Node

  ```sh
  brew install node;
  ```

* Yarn

  ```sh
  npm install -g yarn # faster npm
  ```

## Setup

* Local

  ```sh
  git clone git@github.com:BranchMetrics/cordova-ionic-phonegap-branch-deep-linking.git;
  cd cordova-ionic-phonegap-branch-deep-linking;
  yarn install
  ```

## Develop

* Changes to `/src` don't need a `yarn examples` rebuild, just a `cordova run`
* Changes to `/src/index.js` need changes to `testbed/platforms/ios/platform_www/plugins/branch-cordova-sdk` and a `cordova run ios`

* **[optional]** Update [Android](https://github.com/BranchMetrics/android-branch-deep-linking/releases) and [iOS](https://github.com/BranchMetrics/ios-branch-deep-linking/releases) SDKs

  ```sh
  ./src/scripts/npm/updateNativeSdk.sh -a 2.5.9
  ./src/scripts/npm/updateNativeSdk.sh -i 0.13.5
  ```

## Test

* Validate all features on both `iOS` and `Android` on `device` only (no `simulator` or `TestFlight`)

  * build

    ```sh
    cd ./
    yarn examples
    ```

    ```sh
    cd examples/cordova1
    # (plug in devices)
    # (ionic build if ionic 3)
    cordova run ios
    cordova run android
    ```

  * files

    * test `index.js` with console logs to Safari and Chrome inspectors
    * test `hooks` by changing to `before_prepare` and console logs with `cordova build`
    * test `BranchSDK.m` with `NSLog()` with Xcode
    * test `BranchSDK.java` with `system.out.println()` with Android Studio

## Submit

* **[required]** Git [comment prefix](https://github.com/semantic-release/semantic-release): `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`, `revert`

* Versioning and tags are handled automatically based on commit messages

* Submit code with a [pull request](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking)

## Publish

* Pull request code review from a Branch team member

* Merges will automatically add SDK to NPM
