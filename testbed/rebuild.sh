#!/bin/bash

gulp prod
npm uninstall mkpath node-version-compare plist xml2js
rm -rf ../.installed
rm -rf ./plugins
rm -rf ./platforms
cordova platform add ios
cordova plugin add ../
cordova build ios --developmentTeam="PW4Q8885U7"
open -a Xcode platforms/ios/Branch\ Testing.xcworkspace