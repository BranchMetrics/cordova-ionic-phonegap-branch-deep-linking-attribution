#!/bin/bash

cordova plugin add org.apache.cordova.console de.appplant.cordova.plugin.email-composer
# This fixes 404 errors in ajax calls on the android platform with newer versions of Cordova
cordova plugin add cordova-plugin-whitelist
cordova plugin add ../ --link
cordova platform add ios android
