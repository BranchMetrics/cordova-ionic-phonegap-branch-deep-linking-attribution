#!/bin/bash
cordova platform add ios android
cordova plugin add ../ --link --variable BRANCH_LIVE_KEY=key_live_fnmRM1FXtu11t6e4LU8WsldpvDcA0bzv --variable BRANCH_TEST_KEY=key_test_oicIH5u2yxW9w3i6UZdfCiokyrixWpBJ --variable URI_SCHEME=testbed
