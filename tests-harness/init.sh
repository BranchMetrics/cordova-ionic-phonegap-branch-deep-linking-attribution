#!/bin/bash
rm -rf plugins platforms android ios

cordova platform add ios android

cordova plugin add https://github.com/apache/cordova-plugin-test-framework.git
cordova plugin add ../ --variable BRANCH_KEY=key_live_fnmRM1FXtu11t6e4LU8WsldpvDcA0bzv --variable URI_SCHEME=testbed
cordova plugin add ../tests