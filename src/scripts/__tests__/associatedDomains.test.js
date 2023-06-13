const iosEntitlements = require('../ios/updateAssociatedDomains');
const androidManifest = require('../android/updateAndroidManifest');

const preferences = {
  iosLinkDomain: [],
  androidLinkDomain: [],
  linkDomain: ['cordova.app.link', 'cordova-alternate.app.link', 'test.app.link']
}
console.log(iosEntitlements.updateAssociatedDomains(preferences));
console.log(androidManifest.getAppLinkIntentFilterData(preferences));
