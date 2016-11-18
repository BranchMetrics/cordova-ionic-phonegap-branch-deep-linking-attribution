// app
var app = {
  initialize: function() {
    this.bindEvents();
  },
  bindEvents: function() {
    document.addEventListener('deviceready', this.onDeviceReady, false);
    document.addEventListener('resume', this.onDeviceReady, false);
  },
  onDeviceReady: function() {
    BranchInit(true);
  },
  onDeviceResume: function() {
    BranchInit(true);
  }
};
app.initialize();

// branch
function BranchInit(isDebug) {
  console.log('Trigger BranchInit()');

  // for development and debugging only
  Branch.setDebug(isDebug);

  // sync with Mixpanel if installed
  Branch.setMixpanelToken('your_mixpanel_token');

  // Branch initialization
  Branch.initSession(function(data) {
    // read deep link data on click
    console.log('Trigger DeepLinkHandler()');
    alert('Deep Link Data: ' + JSON.stringify(data));
  }).then(function(res) {
    console.log(res);
  }).catch(function(err) {
    console.error(err);
  });

  // optional
  Branch.onNonBranchLink(function NonBranchLinkHandler(data) {
    console.log('Trigger NonBranchLinkData()');

    if (data) {
      alert(JSON.stringify(data));
    }
  });
}

function BranchEvent() {
  console.log('Trigger BranchEvent()');

  // event name
  var event = document.getElementById('custom-action').value;

  // optional
  var metadata = { "custom_dictionary": 123 };
  Branch.userCompletedAction(event, metadata).then(function(res) {
    console.log(res);
    alert('Response: ' + JSON.stringify(res));
  }).catch(function(err) {
    console.error(err);
    alert('Error: ' + JSON.stringify(err));
  });
}

function BranchFirstData() {
  console.log('Trigger BranchFirstData()');

  Branch.getFirstReferringParams().then(function(res) {
    console.log(res);
    alert('Response: ' + JSON.stringify(res));
  }).catch(function(err) {
    console.error(err);
    alert('Error: ' + JSON.stringify(err));
  });
}

function BranchLatestData() {
  console.log('Trigger BranchLatestData()');

  Branch.getLatestReferringParams().then(function(res) {
    console.log(res);
    alert('Response: ' + JSON.stringify(res));
  }).catch(function(err) {
    console.error(err);
    alert('Error: ' + JSON.stringify(err));
  });
}

function BranchUser() {
  console.log('Trigger BranchUser()');

  var userId = document.getElementById('identity').value;
  Branch.setIdentity(userId).then(function(res) {
    console.log(res);
    alert('Response: ' + JSON.stringify(res));
  }).catch(function(err) {
    console.error(err);
    alert('Error: ' + JSON.stringify(err));
  });
}

function BranchLogout() {
  console.log('Trigger BranchLogout()');

  Branch.logout().then(function(res) {
    console.log(res);
    alert('Response: ' + JSON.stringify(res));
  }).catch(function(err) {
    console.error(err);
    alert('Error: ' + JSON.stringify(err));
  });
}

var branchUniversalObj = null;
function BranchUniversalObject() {
  console.log('Trigger BranchUniversalObject()');

  // only canonicalIdentifier is required
  var properties = {
    canonicalIdentifier: "123",
    canonicalUrl: "http://example.com/123",
    title: "Content 123",
    contentDescription: "Content 123 " + Date.now(),
    contentImageUrl: "http://lorempixel.com/400/400/",
    price: 12.12,
    currency: "GBD",
    contentIndexingMode: "private",
    contentMetadata: {
      "custom": "data",
      "testing": 123,
      "this_is": true
    }
  };

  // create a branchUniversalObj variable to reference with other Branch methods
  Branch.createBranchUniversalObject(properties).then(function(res) {
    console.log(res);
    branchUniversalObj = res;
    alert("Response: " + JSON.stringify(res));
  }).catch(function(err) {
    console.log(err);
    alert("Error: " + JSON.stringify(err));
  });
}

function BranchView() {
  console.log('Trigger BranchView()');

  if (branchUniversalObj === null) {
    return alert('need to Generate Branch Universal Object');
  }
  branchUniversalObj.registerView().then(function(res) {
    console.log(res);
    alert('Response: ' + JSON.stringify(res));
  }).catch(function(err) {
    console.error(err);
    alert('Error: ' + JSON.stringify(err));
  });
}

function BranchDeepLink() {
  console.log('Trigger BranchDeepLink()');

  // optional fields
  var analytics = {
    channel: "channel",
    feature: "feature",
    campaign: "campaign",
    stage: "stage",
    tags: [ "one", "two", "three" ],
    alias: document.getElementById('alias').value
  };

  // optional fields
  var properties = {
    $fallback_url: "www.example.com",
    $desktop_url: "www.desktop.com",
    $android_url: "www.android.com",
    $ios_url: "www.ios.com",
    $ipad_url: "www.ipad.com",
    more_custom: "data",
    even_more_custom: true,
    this_is_custom: 41231
  };

  // needs a universal object
  if (branchUniversalObj === null) {
    return alert('need to Generate Branch Universal Object');
  }

  branchUniversalObj.generateShortUrl(analytics, properties).then(function(res) {
    console.log(res);
    document.getElementById('generated-url').placeholder = '';
    document.getElementById('generated-url').value = res.url;
    alert(JSON.stringify(res.url));
  }).catch(function(err) {
    console.error(err);
    alert(JSON.stringify(err));
  });
}

function BranchShareSheet() {
  console.log('Trigger BranchShareSheet()');

  // optional fields
  var analytics = {
    channel: "channel",
    feature: "feature",
    campaign: "campaign",
    stage: "stage",
    tags: [ "one", "two", "three" ]
  };

  // optional fields
  var properties = {
    $fallback_url: "www.example.com",
    $desktop_url: "www.desktop.com",
    $android_url: "www.android.com",
    $ios_url: "www.ios.com",
    $ipad_url: "www.ipad.com",
    more_custom: "data",
    even_more_custom: true,
    this_is_custom: 41231
  };

  var message = "Check out this link";

  // needs a universal object
  if (branchUniversalObj === null) {
    return alert('need to Generate Branch Universal Object');
  }

  // optional listeners (must be called before showShareSheet)
  branchUniversalObj.onShareSheetLaunched(function(res) {
    // android only
    console.log(res);
    alert(JSON.stringify(res));
  });
  branchUniversalObj.onShareSheetDismissed(function(res) {
    console.log(res);
    alert(JSON.stringify(res));
  });
  branchUniversalObj.onLinkShareResponse(function(res) {
    console.log(res);
    alert(JSON.stringify(res));
  });
  branchUniversalObj.onChannelSelected(function(res) {
    // android only
    console.log(res);
    alert(JSON.stringify(res));
  });

  // share sheet
  branchUniversalObj.showShareSheet(analytics, properties, message);
}

function BranchSpotlight() {
  console.log('Trigger ListOnSpotlight()');

  if (branchUniversalObj === null) {
    return alert('need to Generate Branch Universal Object');
  }
  branchUniversalObj.listOnSpotlight().then(function(res) {
    console.log(res);
    alert('Response: ' + JSON.stringify(res));
  }).catch(function(err) {
    console.error(err);
    alert('Error: ' + JSON.stringify(err));
  });
}

function BranchReferralsLoad() {
  console.log('Trigger BranchReferralsLoad()');

  Branch.loadRewards().then(function(res) {
    console.log(res);
    alert('Response: ' + JSON.stringify(res));
  }).catch(function(err) {
    console.error(err);
    alert('Error: ' + JSON.stringify(err));
  });
}

function BranchReferralsRedeem() {
  console.log('Trigger BranchReferralsRedeem()');

  var reward = 1000;
  Branch.redeemRewards(reward).then(function(res) {
    console.log(res);
    alert('Response: ' + JSON.stringify(res));
  }).catch(function(err) {
    console.error(err);
    alert('Error: ' + JSON.stringify(err));
  });
}

function BranchReferralsHistory() {
  console.log('Trigger BranchReferralsHistory()');

  Branch.creditHistory().then(function(res) {
    console.log(res);
    alert('Response: ' + JSON.stringify(res));
  }).catch(function(err) {
    console.error(err);
    alert('Error: ' + JSON.stringify(err));
  });
}
