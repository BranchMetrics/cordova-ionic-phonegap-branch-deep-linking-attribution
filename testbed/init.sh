#!/bin/bash
cordova platform add ios android
cordova plugin add ../ --link --variable BRANCH_LIVE_KEY=key_live_feebgAAhbH9Tv85H5wLQhpdaefiZv5Dv --variable BRANCH_TEST_KEY=key_test_hdcBLUy1xZ1JD0tKg7qrLcgirFmPPVJc --variable URI_SCHEME=testbed