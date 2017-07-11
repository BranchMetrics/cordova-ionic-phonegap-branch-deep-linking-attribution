/* eslint-disable no-unused-vars, no-undef */

'use strict'

// app
var app = {
  initialize: function initialize () {
    this.bindEvents()
  },
  bindEvents: function bindEvents () {
    document.addEventListener('deviceready', this.onDeviceReady, false)
    document.addEventListener('resume', this.onDeviceResume, false)
  },
  onDeviceReady: function onDeviceReady () {
    BranchInit(true)
  },
  onDeviceResume: function onDeviceResume () {
    BranchInit(true)
  }
}
app.initialize()

// branch
function BranchInit (isDebug) {
  console.log('Trigger BranchInit()')

  // for development and debugging only
  Branch.setDebug(isDebug)

  // for better Android matching
  Branch.setCookieBasedMatching('cordova.app.link')

  // sync with Mixpanel if installed
  Branch.setMixpanelToken('your_mixpanel_token')

  // Branch initialization
  Branch.initSession(function (data) {
    // read deep link data on click
    console.log('Trigger DeepLinkHandler()')
    alert('Deep Link Data: ' + JSON.stringify(data))
  }).then(function (res) {
    console.log(res)
  }).catch(function (err) {
    console.error(err)
  })
}

function BranchEvent () {
  console.log('Trigger BranchEvent()')

  // event name
  var event = document.getElementById('custom-action').value

  // optional
  var metadata = {
    'custom_dictionary': 123,
    'anything': 'everything'
  }

  Branch.userCompletedAction(event, metadata).then(function (res) {
    console.log(res)
    alert('Response: ' + JSON.stringify(res))
  }).catch(function (err) {
    console.error(err)
    alert('Error: ' + JSON.stringify(err.message))
  })
}

function BranchCommerce () {
  console.log('Trigger BranchCommerce()')

  // revenue required
  var event = {
    'revenue': 50.29,
    'currency': 148, // USD
    'transactionID': 'transaction id',
    'coupon': 'coupon',
    'shipping': 2.22,
    'tax': 5.11,
    'affiliation': 'affiliation',
    'products': [
      {
        'sku': 'u123',
        'name': 'cactus',
        'price': 4.99,
        'quantity': 2,
        'brand': 'brand',
        'category': 17, // Software
        'variant': 'variant'
      },
      {
        'sku': 'u456',
        'name': 'grass',
        'price': 0.00,
        'quantity': 1
      }
    ]
  }

  // optional
  var metadata = {
    'custom_dictionary': 123,
    'anything': 'everything'
  }

  Branch.sendCommerceEvent(event, metadata).then(function (res) {
    console.log(res)
    alert('Response: ' + JSON.stringify(res))
  }).catch(function (err) {
    console.error(err)
    alert('Error: ' + JSON.stringify(err.message))
  })
}

function BranchFirstData () {
  console.log('Trigger BranchFirstData()')

  Branch.getFirstReferringParams().then(function (res) {
    console.log(res)
    alert('Response: ' + JSON.stringify(res))
  }).catch(function (err) {
    console.error(err)
    alert('Error: ' + JSON.stringify(err))
  })
}

function BranchLatestData () {
  console.log('Trigger BranchLatestData()')

  Branch.getLatestReferringParams().then(function (res) {
    console.log(res)
    alert('Response: ' + JSON.stringify(res))
  }).catch(function (err) {
    console.error(err)
    alert('Error: ' + JSON.stringify(err))
  })
}

function BranchUser () {
  console.log('Trigger BranchUser()')

  var userId = document.getElementById('identity').value
  Branch.setIdentity(userId).then(function (res) {
    console.log(res)
    alert('Response: ' + JSON.stringify(res))
  }).catch(function (err) {
    console.error(err)
    alert('Error: ' + JSON.stringify(err.message))
  })
}

function BranchLogout () {
  console.log('Trigger BranchLogout()')

  Branch.logout().then(function (res) {
    console.log(res)
    alert('Response: ' + JSON.stringify(res))
  }).catch(function (err) {
    console.error(err)
    alert('Error: ' + JSON.stringify(err))
  })
}

var branchUniversalObj = null
function BranchUniversalObject () {
  console.log('Trigger BranchUniversalObject()')

  // only canonicalIdentifier is required
  var properties = {
    canonicalIdentifier: 'content/123',
    canonicalUrl: 'https://example.com/content/123',
    title: 'Content 123 Title',
    contentDescription: 'Content 123 Description ' + Date.now(),
    contentImageUrl: 'http://lorempixel.com/400/400/',
    price: 12.12,
    currency: 'GBD',
    contentIndexingMode: 'private',
    contentMetadata: {
      custom: 'data',
      testing: 123,
      this_is: true
    }
  }

  // create a branchUniversalObj variable to reference with other Branch methods
  Branch.createBranchUniversalObject(properties).then(function (res) {
    console.log(res)
    branchUniversalObj = res
    alert('Response: ' + JSON.stringify(res))
  }).catch(function (err) {
    console.log(err)
    alert('Error: ' + JSON.stringify(err))
  })
}

function BranchView () {
  console.log('Trigger BranchView()')

  if (branchUniversalObj === null) {
    return alert('need to Generate Branch Universal Object')
  }
  branchUniversalObj.registerView().then(function (res) {
    console.log(res)
    alert('Response: ' + JSON.stringify(res))
  }).catch(function (err) {
    console.error(err)
    alert('Error: ' + JSON.stringify(err))
  })
}

function BranchDeepLink () {
  console.log('Trigger BranchDeepLink()')

  // optional fields
  var analytics = {
    channel: 'facebook',
    feature: 'onboarding',
    campaign: 'content 123 launch',
    stage: 'new user',
    tags: ['one', 'two', 'three'],
    alias: document.getElementById('alias').value
  }

  // optional fields
  var properties = {
    $desktop_url: 'http://www.example.com/desktop',
    $android_url: 'http://www.example.com/android',
    $ios_url: 'http://www.example.com/ios',
    $ipad_url: 'http://www.example.com/ipad',
    $deeplink_path: 'content/123',
    $match_duration: 2000,
    custom_string: 'data',
    custom_integer: Date.now(),
    custom_boolean: true,
    custom_array: [1, 2, 3, 4, 5],
    custom_object: { 'random': 'dictionary' }
  }

  // needs a universal object
  if (branchUniversalObj === null) {
    return alert('need to Generate Branch Universal Object')
  }

  branchUniversalObj.generateShortUrl(analytics, properties).then(function (res) {
    console.log(res)
    document.getElementById('generated-url').placeholder = ''
    document.getElementById('generated-url').value = res.url
    alert(JSON.stringify('Response: ' + res.url))
  }).catch(function (err) {
    console.error(err)
    alert(JSON.stringify('Error: ' + err))
  })
}

function BranchShareSheet () {
  console.log('Trigger BranchShareSheet()')

  // optional fields
  var analytics = {
    channel: 'facebook',
    feature: 'onboarding',
    campaign: 'content 123 launch',
    stage: 'new user',
    tags: ['one', 'two', 'three']
  }

  // optional fields
  var properties = {
    $desktop_url: 'http://www.example.com/desktop',
    custom_string: 'data',
    custom_integer: Date.now(),
    custom_boolean: true,
    custom_array: [1, 2, 3, 4, 5],
    custom_object: { 'random': 'dictionary' }
  }

  var message = 'Check out this link'

  // needs a universal object
  if (branchUniversalObj === null) {
    return alert('need to Generate Branch Universal Object')
  }

  // optional listeners (must be called before showShareSheet)
  branchUniversalObj.onShareSheetLaunched(function (res) {
    // android only
    console.log(res)
  })
  branchUniversalObj.onShareSheetDismissed(function (res) {
    console.log(res)
  })
  branchUniversalObj.onLinkShareResponse(function (res) {
    console.log(res)
  })
  branchUniversalObj.onChannelSelected(function (res) {
    // android only
    console.log(res)
  })

  // share sheet
  branchUniversalObj.showShareSheet(analytics, properties, message)
}

function BranchSpotlight () {
  console.log('Trigger ListOnSpotlight()')

  if (branchUniversalObj === null) {
    return alert('need to Generate Branch Universal Object')
  }
  branchUniversalObj.listOnSpotlight().then(function (res) {
    console.log(res)
    alert('Response: ' + JSON.stringify(res))
  }).catch(function (err) {
    console.error(err)
    alert('Error: ' + JSON.stringify(err))
  })
}

function BranchReferralsReward () {
  console.log('Trigger BranchReferralsReward()')

  Branch.userCompletedAction('add5credits').then(function (res) {
    console.log(res)
    alert('Response: ' + JSON.stringify(res))
  }).catch(function (err) {
    console.error(err)
    alert('Error: ' + JSON.stringify(err))
  })
}

function BranchReferralsLoad () {
  console.log('Trigger BranchReferralsLoad()')

  Branch.loadRewards().then(function (res) {
    console.log(res)
    alert('Response: ' + JSON.stringify(res))
  }).catch(function (err) {
    console.error(err)
    alert('Error: ' + JSON.stringify(err))
  })
}

function BranchReferralsRedeem () {
  console.log('Trigger BranchReferralsRedeem()')

  var amount = 10
  Branch.redeemRewards(amount).then(function (res) {
    console.log(res)
    alert('Response: ' + JSON.stringify(res))
  }).catch(function (err) {
    console.error(err)
    alert('Error: ' + JSON.stringify(err))
  })
}

function BranchReferralsHistory () {
  console.log('Trigger BranchReferralsHistory()')

  Branch.creditHistory().then(function (res) {
    console.log(res)
    alert('Response: ' + JSON.stringify(res))
  }).catch(function (err) {
    console.error(err)
    alert('Error: ' + JSON.stringify(err))
  })
}
