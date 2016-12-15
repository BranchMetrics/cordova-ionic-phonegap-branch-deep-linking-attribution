// injects config.xml preferences into AndroidManifest.xml file.
(function () {
  // properties
  'use strict'
  var path = require('path')
  var xmlHelper = require('../xmlHelper.js')

  // entry
  module.exports = {
    writePreferences: writePreferences
  }

  function writePreferences (cordovaContext, pluginPreferences) {
    var pathToManifest = path.join(cordovaContext.opts.projectRoot, 'platforms', 'android', 'AndroidManifest.xml')
    var manifestSource = xmlHelper.readXmlAsJson(pathToManifest)
    var cleanManifest
    var updatedManifest

    // remove old intent-filters
    cleanManifest = removeOldOptions(manifestSource)

    // inject intent-filters based on plugin preferences
    updatedManifest = injectOptions(cleanManifest, pluginPreferences)

    // save new version of the AndroidManifest
    xmlHelper.writeJsonAsXml(updatedManifest, pathToManifest)
  }

  function removeOldOptions (manifestData) {
    var cleanManifest = manifestData
    var activities = manifestData['manifest']['application'][0]['activity']

    activities.forEach(removeIntentFiltersFromActivity)
    cleanManifest['manifest']['application'][0]['activity'] = activities

    return cleanManifest
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

  function injectOptions (manifestData, pluginPreferences) {
    var changedManifest = manifestData
    var targetSdk = changedManifest['manifest']['uses-sdk'][0]['$']['android:targetSdkVersion']
    var activitiesList = changedManifest['manifest']['application'][0]['activity']
    var launchActivityIndex = getMainLaunchActivityIndex(activitiesList)
    var ulIntentFilters = []
    var launchActivity

    if (launchActivityIndex < 0) {
      console.warn('Could not find launch activity in the AndroidManifest file. Can\'t inject Universal Links preferences.')
      return
    }

    // get launch activity
    launchActivity = activitiesList[launchActivityIndex]

    // generate intent-filters
    pluginPreferences.hosts.forEach(function (host) {
      ulIntentFilters.push(createIntentFilter(host.name, host.scheme, pluginPreferences.androidPrefix, parseInt(targetSdk) >= 23))
    })

    // add Universal Links intent-filters to the launch activity
    launchActivity['intent-filter'] = launchActivity['intent-filter'].concat(ulIntentFilters)

    return changedManifest
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

  function createIntentFilter (host, scheme, pathPrefix, androidM) {
    var intentFilter = {
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
      'data': [{
        '$': {
          'android:host': host,
          'android:scheme': scheme,
          'android:pathPrefix': pathPrefix
        }
      }]
    }

    if (!pathPrefix) {
      delete intentFilter['data'][0]['$']['android:pathPrefix']
    }

    if (!androidM) {
      delete intentFilter['$']['android:autoVerify']
    }

    return intentFilter
  }
})()
