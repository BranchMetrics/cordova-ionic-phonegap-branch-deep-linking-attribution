# Running Plugin Tests

These tests can currently only run on os x since xcode is not available on other plaforms. You may be able to get the android tests working on other machines by following a similar process to the one outlined here.

 1. Install [homebrew](http://brew.sh/). If you already have it run `brew update` to get the latest version.

 1. Run `brew doctor` and fix any problems that it reports.

 1. Install java and the android development kit:

```sh
brew install cask
brew cask install java # this should be java 8
brew install ant maven gradle android-sdk android-ndk
android update sdk --no-ui
```

 1. Install node (`brew install node`) and cordova (`npm install -g cordova`) if you haven't already.

 1. Run `android` check off `android 6.0`, click `Install Packages`, and accept ALL licenses in the next screen before clicking install again to complete installation.

 1. Run `android avd` and create an image with name `nexus-intel` device `Galaxy Nexus (4.65"...` target `android 6.0 - API Level 23` CPU/ABI `Intel Atom (x86_64)` no skin size `200mb` and `Use Host GPU` checked off.

 1. Run `npm install` in the project root.

 1. Run the following commands in the tests-harness directory of this project:

```sh
cordova prepare
cordova plugin add ../ --link --variable BRANCH_KEY=key_live_fnmRM1FXtu11t6e4LU8WsldpvDcA0bzv --variable URI_SCHEME=testbed
cordova plugin add ../tests --link
cordova compile
```

 1. Finally run the tests:

```
./android-test.sh
./ios-test.sh
```