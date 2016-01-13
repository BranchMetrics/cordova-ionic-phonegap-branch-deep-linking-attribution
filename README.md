
# Branch Cordova/Phonegap/Ionic SDK - Project Restructure [IN PROGRESS]

## Prerequisites:

* Must have [NPM](https://nodejs.org/en/) installed.
* Must have [Cordova](cordova.apache.org) installed.
* XCode for (iOS)
* Android SDK (Android)
* Emulators (Genymotion/XCode iPhone Simulator) or actual device

## How to test:

1. Initialize a test Cordova app using `cordova create <app-name>`
2. Clone the plugin repo
3. Initialize Cordova app by executing the following command `cd <app-name> && cordova platform add ios android`
4. Add plugin to the test app. `cordova plugin add <path-to-plugin-folder>` eg: `cordova plugin add /Users/Renesansz/BranchMetricsCordova`
5. Add test script to `www/js/index.js`. https://gist.github.com/renesansz/698dc4bd95a8ab61ba2c
6. Run the app to the Android emulator. `cordova run android`
7. The app should display "Initialize Success"
