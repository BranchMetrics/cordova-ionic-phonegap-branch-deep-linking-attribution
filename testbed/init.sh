#!/bin/bash
cordova platform add ios android

cordova plugin add ../ --variable BRANCH_KEY=key_live_fnmRM1FXtu11t6e4LU8WsldpvDcA0bzv --variable URI_SCHEME=testbed

# Include this plugin if you want to run a unit-test for the plugin
# cordova plugin add http://git-wip-us.apache.org/repos/asf/cordova-plugin-test-framework.git
# cordova plugin add ../ --link --variable BRANCH_KEY=key_live_fnmRM1FXtu11t6e4LU8WsldpvDcA0bzv --variable URI_SCHEME=testbed
