#!/bin/bash

# validate
gulp prod

# clean
npm install -g cordova
npm uninstall mkpath node-version-compare plist xml2js
rm -rf ../.installed
rm -rf ./plugins
rm -rf ./platforms

# add platforms before plugin because before_plugin_install does not work on file reference
cordova platform add android
cordova platform add ios

# plugin
cordova plugin add ../

# ios
cordova run ios --developmentTeam="PW4Q8885U7"
open -a Xcode platforms/ios/Branch\ Testing.xcworkspace

# android
cordova run android