(function () {
  // properties
  'use strict'
  var path = require('path')
  var xmlHelper = require('../lib/xmlHelper.js')

  // entry
  module.exports = {
    writePreferences: writePreferences
  }

  // injects config.xml preferences into AndroidManifest.xml file.
  function writePreferences (context, preferences) {
    // read manifest
    var manifest = getManifest(context)

    // update manifest
    manifest.file = updateBranchMetaData(manifest.file, preferences)
    manifest.file = updateBranchReferrerTracking(manifest.file)
    manifest.file = updateLaunchOptionToSingleTask(manifest.file, manifest.mainActivityIndex)
    manifest.file = updateBranchURIScheme(manifest.file, manifest.mainActivityIndex, preferences)
    manifest.file = updateBranchAppLinks(manifest.file, manifest.mainActivityIndex, preferences, manifest.targetSdk)

    // save manifest
    xmlHelper.writeJsonAsXml(manifest.path, manifest.file)
  }

  // get AndroidManifest.xml information
  function getManifest (context) {
    var pathToManifest
    var manifest

    try {
      // cordova platform add android@6.0.0
      pathToManifest = path.join(context.opts.projectRoot, 'platforms', 'android', 'AndroidManifest.xml')
      manifest = xmlHelper.readXmlAsJson(pathToManifest)
    } catch (e) {
      try {
        // cordova platform add android@7.0.0
        pathToManifest = path.join(context.opts.projectRoot, 'platforms', 'android', 'app', 'src', 'main', 'AndroidManifest.xml')
        manifest = xmlHelper.readXmlAsJson(pathToManifest)
      } catch (e) {
        throw new Error('BRANCH SDK: Cannot read AndroidManfiest.xml ' + e)
      }
    }
    var mainActivityIndex = getMainLaunchActivityIndex(manifest['manifest']['application'][0]['activity'])
    var targetSdk = manifest['manifest']['uses-sdk'][0]['$']['android:targetSdkVersion']

    return {
      file: manifest,
      path: pathToManifest,
      mainActivityIndex: mainActivityIndex,
      targetSdk: targetSdk
    }
  }

  // adds to <application> for Branch init and testmode:
  //    <meta-data android:name="io.branch.sdk.BranchKey" android:value="key_live_icCccJIpd7GlYY5oOmoEtpafuDiuyXhT" />
  //    <meta-data android:name="io.branch.sdk.TestMode" android:value="false" />
  function updateBranchMetaData (manifest, preferences) {
    var metadatas = manifest['manifest']['application'][0]['meta-data'] || []
    var metadata = []
    var keys = ['io.branch.sdk.BranchKey', 'io.branch.sdk.TestMode']
    var vals = [preferences.branchKey, preferences.androidTestMode || 'false']

    // remove old
    for (var i = 0; i < keys.length; i++) {
      metadatas = removeBasedOnAndroidName(metadatas, keys[i])
    }

    // add new
    for (i = 0; i < keys.length; i++) {
      var key = keys[i]
      var val = vals[i]
      metadata.push({
        '$': {
          'android:name': key,
          'android:value': val
        }
      })
    }
    manifest['manifest']['application'][0]['meta-data'] = metadatas.concat(metadata)

    return manifest
  }

  // adds to <application> for install referrer tracking (optional)
  //    <receiver android:name="io.branch.referral.InstallListener" android:exported="true">
  //       <intent-filter>
  //           <action android:name="com.android.vending.INSTALL_REFERRER" />
  //       </intent-filter>
  //    </receiver>
  function updateBranchReferrerTracking (manifest) {
    var receivers = manifest['manifest']['application'][0]['receiver'] || []
    var androidName = 'io.branch.referral.InstallListener'

    // remove old
    receivers = removeBasedOnAndroidName(receivers, androidName)

    // add new
    manifest['manifest']['application'][0]['receiver'] = receivers.concat([{
      '$': {
        'android:name': androidName,
        'android:exported': true
      },
      'intent-filter': [{
        'action': [{
          '$': {
            'android:name': 'com.android.vending.INSTALL_REFERRER'
          }
        }]
      }]
    }])

    return manifest
  }

  // adds to main <activity>:
  //    android:launchMode="singleTask"
  function updateLaunchOptionToSingleTask (manifest, mainActivityIndex) {
    manifest['manifest']['application'][0]['activity'][mainActivityIndex]['$']['android:launchMode'] = 'singleTask'
    return manifest
  }

  // adds to main <activity> for URI Scheme
  //    <intent-filter android:name="io.branch.sdk.UriScheme">
  //        <data android:scheme="ethantest" />
  //        <action android:name="android.intent.action.VIEW" />
  //        <category android:name="android.intent.category.DEFAULT" />
  //        <category android:name="android.intent.category.BROWSABLE" />
  //    </intent-filter>
  function updateBranchURIScheme (manifest, mainActivityIndex, preferences) {
    var intentFilters = manifest['manifest']['application'][0]['activity'][mainActivityIndex]['intent-filter'] || []
    var androidName = 'io.branch.sdk.UriScheme'

    // remove
    intentFilters = removeBasedOnAndroidName(intentFilters, androidName)

    // add
    manifest['manifest']['application'][0]['activity'][mainActivityIndex]['intent-filter'] = intentFilters.concat([{
      '$': {
        'android:name': androidName
      },
      'action': [{
        '$': {
          'android:name': 'android.intent.action.VIEW'
        }
      }],
      'category': [{
        '$': {
          'android:name': 'android.intent.category.DEFAULT'
        }
      }, {
        '$': {
          'android:name': 'android.intent.category.BROWSABLE'
        }
      }],
      'data': [{
        '$': {
          'android:scheme': preferences.uriScheme
        }
      }]
    }])

    return manifest
  }

  // adds to main <activity> for App Links (optional)
  //    <intent-filter android:name="io.branch.sdk.AppLink" android:autoVerify="true">
  //       <action android:name="android.intent.action.VIEW" />
  //       <category android:name="android.intent.category.DEFAULT" />
  //       <category android:name="android.intent.category.BROWSABLE" />
  //       <data android:scheme="https" android:host="ethan.app.link" />
  //       <data android:scheme="https" android:host="ethan-alternate.app.link" />
  //    </intent-filter>
  function updateBranchAppLinks (manifest, mainActivityIndex, preferences, targetSdk) {
    var intentFilters = manifest['manifest']['application'][0]['activity'][mainActivityIndex]['intent-filter'] || []
    var data = getAppLinkIntentFilterData(preferences)
    var androidName = 'io.branch.sdk.AppLink'
    var header = {
      'android:name': androidName,
      'android:autoVerify': 'true'
    }
    if (targetSdk && parseInt(targetSdk) < 23) {
      delete header['android:autoVerify']
    }

    // remove
    intentFilters = removeBasedOnAndroidName(intentFilters, androidName)

    // add new (remove old already done in updateBranchURIScheme)
    manifest['manifest']['application'][0]['activity'][mainActivityIndex]['intent-filter'] = intentFilters.concat([{
      '$': header,
      'action': [{
        '$': {
          'android:name': 'android.intent.action.VIEW'
        }
      }],
      'category': [{
        '$': {
          'android:name': 'android.intent.category.DEFAULT'
        }
      }, {
        '$': {
          'android:name': 'android.intent.category.BROWSABLE'
        }
      }],
      'data': data
    }])

    return manifest
  }

  // determine the Branch link domain <data> to append to the App Link intent filter
  function getAppLinkIntentFilterData (preferences) {
    var intentFilterData = []
    var linkDomains = preferences.linkDomain

    for (var i = 0; i < linkDomains.length; i++) {
      var linkDomain = linkDomains[i]

      // app.link link domains need -alternate associated domains as well (for Deep Views)
      if (linkDomain.indexOf('app.link') !== -1) {
        var first = linkDomain.split('.')[0]
        var rest = linkDomain.split('.').slice(1).join('.')
        var alternate = first + '-alternate' + '.' + rest

        intentFilterData.push(getAppLinkIntentFilterDictionary(linkDomain))
        intentFilterData.push(getAppLinkIntentFilterDictionary(alternate))
      } else {
        // bnc.lt and custom domains
        if (preferences.androidPrefix === null) {
          throw new Error('BRANCH SDK: Invalid "android-prefix" in <branch-config> in your config.xml. Docs https://goo.gl/GijGKP')
        }
        intentFilterData.push(getAppLinkIntentFilterDictionary(linkDomain, preferences.androidPrefix))
      }
    }

    return intentFilterData
  }

  // generate the array dictionary for <data> component for the App Link intent filter
  function getAppLinkIntentFilterDictionary (linkDomain, androidPrefix) {
    var scheme = 'https'
    var output = {
      '$': {
        'android:host': linkDomain,
        'android:scheme': scheme
      }
    }

    if (androidPrefix) {
      output['$']['android:pathPrefix'] = androidPrefix
    }

    return output
  }

  // remove previous Branch related <meta-data> and <receiver> based on android:name
  function removeBasedOnAndroidName (items, androidName) {
    var without = []
    for (var i = 0; i < items.length; i++) {
      var item = items[i]
      if (item.hasOwnProperty('$') && item['$'].hasOwnProperty('android:name')) {
        var key = item['$']['android:name']
        if (key === androidName) {
          continue
        }
        without.push(item)
      } else {
        without.push(item)
      }
    }
    return without
  }

  // get the main <activity> because Branch Intent Filters must be in the main Launch Activity
  function getMainLaunchActivityIndex (activities) {
    var launchActivityIndex = -1

    for (var i = 0; i < activities.length; i++) {
      var activity = activities[i]
      if (isLaunchActivity(activity)) {
        launchActivityIndex = i
        break
      }
    }

    return launchActivityIndex
  }

  // determine if <activity> is the main activity
  function isLaunchActivity (activity) {
    var intentFilters = activity['intent-filter']
    var isLauncher = false

    if (intentFilters == null || intentFilters.length === 0) {
      return false
    }

    isLauncher = intentFilters.some(function (intentFilter) {
      var action = intentFilter['action']
      var category = intentFilter['category']

      if (action == null || action.length !== 1 || category == null || category.length !== 1) {
        return false
      }

      var isMainAction = action[0]['$']['android:name'] === 'android.intent.action.MAIN'
      var isLauncherCategory = category[0]['$']['android:name'] === 'android.intent.category.LAUNCHER'

      return isMainAction && isLauncherCategory
    })

    return isLauncher
  }
})()
