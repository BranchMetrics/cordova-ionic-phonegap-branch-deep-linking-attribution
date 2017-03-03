#!/bin/bash

rm -rf platforms ios
cordova prepare ios
cordova run ios --emulator