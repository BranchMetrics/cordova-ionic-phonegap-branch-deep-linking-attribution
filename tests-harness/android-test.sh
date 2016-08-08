#!/bin/bash

rm -rf platforms android
cordova prepare android
cordova run android --emulator