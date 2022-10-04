# Running Plugin Tests

1. Use your existing cordova app, or create a new one.
2. Add this plugins:
```
cordova plugin add cordova-plugin-test-framework
cordova plugin add plugins/branch-cordova-sdk/src/__tests__
``` 
3. Change the start page in `config.xml` with `<content src="cdvtests/index.html" />` or navigate to `cdvtests/index.html` from within your app.
4. That's it.