# Running Plugin Tests

1. Use your existing cordova app, or create a new one.
2. Add these plugins:
```
cordova plugin add http://git-wip-us.apache.org/repos/asf/cordova-plugin-test-framework.git
cordova plugin add https://github.com/BranchMetrics/Cordova-Ionic-PhoneGap-Deferred-Deep-Linking-SDK.git#:/tests
```	
3. Change the start page in `config.xml` with `<content src="cdvtests/index.html" />` or navigate to `cdvtests/index.html` from within your app.
4. That's it.