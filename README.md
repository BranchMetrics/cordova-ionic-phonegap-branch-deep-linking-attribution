## Branch SDK Documentation for Cordova PhoneGap Ionic

View [Branch's SDK documentation for Cordova PhoneGap Ionic](https://help.branch.io/developers-hub/docs/cordova-phonegap-ionic)

# Testing Google On Device Measurement and Connecting to Firebase
* Firebase Analytics requires minimum target deployment to be iOS 15. Set this in config.xml - Link: https://firebase.google.com/support/release-notes/ios#version_1200_-_july_15_2025
* Follow this guide to register an app with Firebase and download your GoogleService-Info.plist file: https://firebase.google.com/docs/ios/setup
* The Branch SDK will automatically generate an odmInfo field, but our exposed setODMInfo() function allows you to set it manually.
* The below steps to connect to Firebase were built following this guide and making some modifications: https://github.com/dpa99c/cordova-plugin-firebasex#ios-specific 

# Steps to connect Firebase: 
1. Follow the above guide to download your GoogleService-Info.plist file. Then add it to your Cordova project's root folder.
2. Open terminal and cd into your Cordova project's root folder and enter the command 'cordova platform add ios'
3. AFTER running the above command, enter the command 'cordova plugin add cordova-plugin-firebasex' to utilize the plugin for installing the correct Firebase pods to Cordova.
* Note: This MUST be done AFTER adding the ios build. If done in the opposite order, you may run into a target deployment error despite iOS 15+ being specified in config.xml.
4. Ensure your GoogleService-Info.plist file is added to your root project folder or the app will crash when it attempts to initializes Firebase.
* Note: If you see an error that Xcode can't find the Google App ID in the GoogleService-Info.plist file open Xcode and check the App -> Resources folder. Click on the GoogleService-Info.plist file. If the file is blank, just move the empty file to trash and manually add your complete file to that folder in Xcode.
5. Run your project to confirm Firebase is connected.
* Note: When you need to rebuild the project, we recommended runing the commands in this order. This ensures the firebase plugin does not run into various plugin issues.
1. 'cordova platform rm ios'
2. 'cordova plugin rm cordova-plugin-firebasex'
3. 'cordova platform add ios'
4. 'cordova plugin add cordova-plugin-firebasex'