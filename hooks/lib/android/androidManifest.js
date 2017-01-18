// injects config.xml preferences into AndroidManifest.xml file.
(function () {
  // properties
  'use strict'
  var path = require('path')
  var xmlHelper = require('../sdk/xmlHelper.js')

  // entry
  module.exports = {
    writePreferences: writePreferences
  }

  // methods
  function writePreferences (context, preferences) {
    var pathToManifest = path.join(context.opts.projectRoot, 'platforms', 'android', 'AndroidManifest.xml')
    var manifest = xmlHelper.readXmlAsJson(pathToManifest)

    // update manifest
    manifest = removePreviousOptions(manifest)
    manifest = updateBranchKeyMetaData(manifest, preferences)
    manifest = updateBranchReferrerTracking(manifest)
    manifest = updateLaunchOptionToSingleTask(manifest, preferences)
    manifest = updateBranchURIScheme(manifest, preferences)
    manifest = updateBranchAppLinks(manifest, preferences)

    // save new version of the AndroidManifest
    xmlHelper.writeJsonAsXml(manifest, pathToManifest)
  }

  function updateBranchURIScheme (manifest, preferences) {
    var intentFilter = manifest['manifest']['application'][0]['activity'][0]['intent-filter'] || []
    // TODO: need to validate main activity (second [0])

    manifest['manifest']['application'][0]['activity'][0]['intent-filter'] = intentFilter.concat([{
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
          'android:scheme': preferences.uriScheme,
          'android:host': 'open'
        }
      }]
    }])

    return manifest
  }

  function updateLaunchOptionToSingleTask (manifest, preferences) {
    manifest['manifest']['application'][0]['activity'][0]['$']['android:launchMode'] = 'singleTask'
    return manifest
  }

  function updateBranchReferrerTracking (manifest) {
    var receiver = manifest['manifest']['application'][0]['receiver'] || []

    manifest['manifest']['application'][0]['receiver'] = receiver.concat([{
      '$': {
        'android:name': 'io.branch.referral.InstallListener',
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

  function updateBranchKeyMetaData (manifest, preferences) {
    var metadata = manifest['manifest']['application'][0]['meta-data'] || []

    // loop through
    // if exists, update
    // if not, append
    manifest['manifest']['application'][0]['meta-data'] = metadata.concat([{
      '$': {
        'android:name': 'io.branch.sdk.BranchKey',
        'android:value': preferences.branchKey
      }
    }])

    return manifest
  }

  function removePreviousOptions (manifest) {
    var activities = manifest['manifest']['application'][0]['activity']

    activities.forEach(removeIntentFiltersFromActivity)
    manifest['manifest']['application'][0]['activity'] = activities

    return manifest
  }

  function removeIntentFiltersFromActivity (activity) {
    var oldIntentFilters = activity['intent-filter']
    var newIntentFilters = []

    if (oldIntentFilters == null || oldIntentFilters.length === 0) {
      return
    }

    oldIntentFilters.forEach(function (intentFilter) {
      if (!isIntentFilterForUniversalLinks(intentFilter)) {
        newIntentFilters.push(intentFilter)
      }
    })

    activity['intent-filter'] = newIntentFilters
  }

  function isIntentFilterForUniversalLinks (intentFilter) {
    var actions = intentFilter['action']
    var categories = intentFilter['category']
    var data = intentFilter['data']

    return isActionForUniversalLinks(actions) && isCategoriesForUniversalLinks(categories) && isDataTagForUniversalLinks(data)
  }

  function isActionForUniversalLinks (actions) {
    // there can be only 1 action
    if (actions == null || actions.length !== 1) {
      return false
    }

    var action = actions[0]['$']['android:name']

    return action === 'android.intent.action.VIEW'
  }

  function isCategoriesForUniversalLinks (categories) {
    // there can be only 2 categories
    if (categories == null || categories.length !== 2) {
      return false
    }

    var isBrowsable = false
    var isDefault = false

    // check intent categories
    categories.forEach(function (category) {
      var categoryName = category['$']['android:name']
      if (!isBrowsable) {
        isBrowsable = categoryName === 'android.intent.category.BROWSABLE'
      }

      if (!isDefault) {
        isDefault = categoryName === 'android.intent.category.DEFAULT'
      }
    })

    return isDefault && isBrowsable
  }

  function isDataTagForUniversalLinks (data) {
    // can have only 1 data tag in the intent-filter
    if (data == null || data.length !== 1) {
      return false
    }

    var dataHost = data[0]['$']['android:host']
    var dataScheme = data[0]['$']['android:scheme']
    var hostIsSet = dataHost != null && dataHost.length > 0
    var schemeIsSet = dataScheme != null && dataScheme.length > 0

    return hostIsSet && schemeIsSet
  }

  function updateBranchAppLinks (manifest, preferences) {
    var activitiesList = manifest['manifest']['application'][0]['activity']
    var launchActivityIndex = getMainLaunchActivityIndex(activitiesList)
    var intentFilters = createAppLinkIntentFilter(preferences)
    var launchActivity

    if (launchActivityIndex < 0) {
      throw new Error('BRANCH SDK - Could not find launch activity in the AndroidManifest file. Can\'t inject Universal Links preferences.')
    }

    // get launch activity
    launchActivity = activitiesList[launchActivityIndex]

    // add Universal Links intent-filters to the launch activity
    launchActivity['intent-filter'] = launchActivity['intent-filter'].concat(intentFilters)

    return manifest
  }

  function getMainLaunchActivityIndex (activities) {
    var launchActivityIndex = -1

    activities.some(function (activity, index) {
      if (isLaunchActivity(activity)) {
        launchActivityIndex = index
        return true
      }

      return false
    })

    return launchActivityIndex
  }

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

  function createAppLinkIntentFilter (preferences) {
    var data = getAppLinkIntentFilterData(preferences)
    var intentFilter = [{
      '$': {
        'android:autoVerify': 'true'
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
      'data': data
    }]

    return intentFilter
  }

  function getAppLinkIntentFilterData (preferences) {
    var intentFilterData = []

    if (preferences.linkDomain.indexOf('app.link') !== -1) {
      // app.link
      var first = preferences.linkDomain.split('.')[0]
      var rest = preferences.linkDomain.split('.').slice(2).join('.')
      var alternate = first + '-alternate' + '.' + rest

      intentFilterData.push(getAppLinkIntentFilterDictionary(preferences.linkDomain))
      intentFilterData.push(getAppLinkIntentFilterDictionary(alternate))
    } else if (preferences.linkDomain.indexOf('bnc.lt') !== -1) {
      // bnc.lt
      if (preferences.androidPrefix == null) {
        throw new Error('Branch SDK plugin is missing "android-prefix" in <branch-config> in your config.xml')
      }

      intentFilterData.push(getAppLinkIntentFilterDictionary(preferences.linkDomain, preferences.androidPrefix))
    } else {
      // custom
      intentFilterData.push(getAppLinkIntentFilterDictionary(preferences.linkDomain))
    }

    return intentFilterData
  }

  function getAppLinkIntentFilterDictionary (linkDomain, androidPrefix) {
    var scheme = 'https'
    var output

    if (androidPrefix) {
      output = {
        '$': {
          'android:host': linkDomain,
          'android:scheme': scheme,
          'android:pathPrefix': androidPrefix
        }
      }
    } else {
      output = {
        '$': {
          'android:host': linkDomain,
          'android:scheme': scheme
        }
      }
    }

    return output
  }
})()
