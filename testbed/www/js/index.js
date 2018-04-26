// app
var app = {
  initialize: function initialize() {
    app.bindEvents();
  },
  bindEvents: function bindEvents() {
    document.addEventListener("deviceready", app.onDeviceReady, false);
    document.addEventListener("resume", app.onDeviceResume, false);
  },
  onDeviceReady: function onDeviceReady() {
    BranchInit();
  },
  onDeviceResume: function onDeviceResume() {
    BranchInit();
  }
};

var branchUniversalObj = null;

// cache DOM
var branchUniversalObject = document.getElementById("branchUniversalObject");
var branchDeepLink = document.getElementById("branchDeepLink");
var branchShareSheet = document.getElementById("branchShareSheet");
var branchFirstData = document.getElementById("branchFirstData");
var branchLatestData = document.getElementById("branchLatestData");
var branchView = document.getElementById("branchView");
var branchSpotlight = document.getElementById("branchSpotlight");
var branchUser = document.getElementById("branchUser");
var branchLogout = document.getElementById("branchLogout");
var branchEvent = document.getElementById("branchEvent");
var branchCommerce = document.getElementById("branchCommerce");
var branchReferralsReward = document.getElementById("branchReferralsReward");
var branchReferralsLoad = document.getElementById("branchReferralsLoad");
var branchReferralsRedeem = document.getElementById("branchReferralsRedeem");
var branchReferralsHistory = document.getElementById("branchReferralsHistory");

// handle DOM
branchUniversalObject.addEventListener("click", BranchUniversalObject);
branchDeepLink.addEventListener("click", BranchDeepLink);
branchShareSheet.addEventListener("click", BranchShareSheet);
branchFirstData.addEventListener("click", BranchFirstData);
branchLatestData.addEventListener("click", BranchLatestData);
branchView.addEventListener("click", BranchView);
branchSpotlight.addEventListener("click", BranchSpotlight);
branchUser.addEventListener("click", BranchUser);
branchLogout.addEventListener("click", BranchLogout);
branchEvent.addEventListener("click", BranchEvent);
branchCommerce.addEventListener("click", BranchCommerce);
branchReferralsReward.addEventListener("click", BranchReferralsReward);
branchReferralsLoad.addEventListener("click", BranchReferralsLoad);
branchReferralsRedeem.addEventListener("click", BranchReferralsRedeem);
branchReferralsHistory.addEventListener("click", BranchReferralsHistory);

// run
app.initialize();

// logger
function logger(message, isError) {
  var header = isError ? "Error" : "Response";
  var output = header + ": " + JSON.stringify(message);
  console.log(output);
  alert(output);
}

// branch
function BranchInit() {
  // for development and debugging only
  Branch.setDebug(true);

  // for GDPR compliance (can be called at anytime)
  Branch.disableTracking(false);

  // for better Android matching
  Branch.setCookieBasedMatching("cordova.app.link");

  // sync with Mixpanel if installed
  Branch.setRequestMetadata("$mixpanel_distinct_id", "your_mixpanel_token");

  // Branch initialization
  Branch.initSession(function callback(data) {
    if (data["+clicked_branch_link"]) {
      // read deep link data on click
      logger(data);
    }
  })
    .then(function success(res) {
      logger(res);
    })
    .catch(function error(err) {
      logger(err, true);
    });
}

function BranchEvent() {
  // event name
  var event = document.getElementById("custom-action").value;

  // optional
  var metadata = {
    custom_dictionary: 123,
    anything: "everything"
  };

  Branch.userCompletedAction(event, metadata)
    .then(function success(res) {
      logger(res);
    })
    .catch(function error(err) {
      logger(err, true);
    });
}

function BranchCommerce() {
  // revenue required
  var event = {
    revenue: 50.29,
    currency: 148, // USD
    transactionID: "transaction id",
    coupon: "coupon",
    shipping: 2.22,
    tax: 5.11,
    affiliation: "affiliation",
    products: [
      {
        sku: "u123",
        name: "cactus",
        price: 4.99,
        quantity: 2,
        brand: "brand",
        category: 17, // Software
        variant: "variant"
      },
      {
        sku: "u456",
        name: "grass",
        price: 0.0,
        quantity: 1
      }
    ]
  };

  // optional
  var metadata = {
    custom_dictionary: 123,
    anything: "everything"
  };

  Branch.sendCommerceEvent(event, metadata)
    .then(function success(res) {
      logger(res);
    })
    .catch(function error(err) {
      logger(err, true);
    });
}

function BranchFirstData() {
  Branch.getFirstReferringParams()
    .then(function success(res) {
      logger(res);
    })
    .catch(function error(err) {
      logger(err, true);
    });
}

function BranchLatestData() {
  Branch.getLatestReferringParams()
    .then(function success(res) {
      logger(res);
    })
    .catch(function error(err) {
      logger(err, true);
    });
}

function BranchUser() {
  var userId = document.getElementById("identity").value;
  Branch.setIdentity(userId)
    .then(function success(res) {
      logger(res);
    })
    .catch(function error(err) {
      logger(err, true);
    });
}

function BranchLogout() {
  Branch.logout()
    .then(function success(res) {
      logger(res);
    })
    .catch(function error(err) {
      logger(err, true);
    });
}

function BranchUniversalObject() {
  // only canonicalIdentifier is required
  var properties = {
    canonicalIdentifier: "content/123",
    canonicalUrl: "https://example.com/content/123",
    title: "Content 123 Title",
    contentDescription: "Content 123 Description " + Date.now(),
    contentImageUrl: "http://lorempixel.com/400/400/",
    price: 12.12,
    currency: "GBD",
    contentIndexingMode: "private",
    contentMetadata: {
      custom: "data",
      testing: 123,
      this_is: true
    }
  };

  // create a branchUniversalObj variable to reference with other Branch methods
  Branch.createBranchUniversalObject(properties)
    .then(function success(res) {
      branchUniversalObj = res;
      logger(res);
    })
    .catch(function error(err) {
      logger(err, true);
    });
}

function BranchView() {
  if (branchUniversalObj === null) {
    alert("need to Generate Branch Universal Object");
    return;
  }
  branchUniversalObj
    .registerView()
    .then(function success(res) {
      logger(res);
    })
    .catch(function error(err) {
      logger(err, true);
    });
}

function BranchDeepLink() {
  // optional fields
  var analytics = {
    channel: "facebook",
    feature: "onboarding",
    campaign: "content 123 launch",
    stage: "new user",
    tags: ["one", "two", "three"],
    alias: document.getElementById("alias").value
  };

  // optional fields
  var properties = {
    $desktop_url: "http://www.example.com/desktop",
    $android_url: "http://www.example.com/android",
    $ios_url: "http://www.example.com/ios",
    $ipad_url: "http://www.example.com/ipad",
    $deeplink_path: "content/123",
    $match_duration: 2000,
    custom_string: "data",
    custom_integer: Date.now(),
    custom_boolean: true
  };

  // needs a universal object
  if (branchUniversalObj === null) {
    alert("need to Generate Branch Universal Object");
    return;
  }

  branchUniversalObj
    .generateShortUrl(analytics, properties)
    .then(function success(res) {
      document.getElementById("generated-url").placeholder = "";
      document.getElementById("generated-url").value = res.url;
      logger(res);
    })
    .catch(function error(err) {
      logger(err, true);
    });
}

function BranchShareSheet() {
  // optional fields
  var analytics = {
    channel: "facebook",
    feature: "onboarding",
    campaign: "content 123 launch",
    stage: "new user",
    tags: ["one", "two", "three"]
  };

  // optional fields
  var properties = {
    $desktop_url: "http://www.example.com/desktop",
    custom_string: "data",
    custom_integer: Date.now(),
    custom_boolean: true,
    custom_array: [1, 2, 3, 4, 5],
    custom_object: { random: "dictionary" }
  };

  var message = "Check out this link";

  // needs a universal object
  if (branchUniversalObj === null) {
    alert("need to Generate Branch Universal Object");
    return;
  }

  // optional listeners (must be called before showShareSheet)
  branchUniversalObj.onShareSheetLaunched(function success(res) {
    // android only
    console.log(res);
  });
  branchUniversalObj.onShareSheetDismissed(function success(res) {
    console.log(res);
  });
  branchUniversalObj.onLinkShareResponse(function success(res) {
    console.log(res);
  });
  branchUniversalObj.onChannelSelected(function success(res) {
    // android only
    console.log(res);
  });

  // share sheet
  branchUniversalObj.showShareSheet(analytics, properties, message);
}

function BranchSpotlight() {
  if (branchUniversalObj === null) {
    alert("need to Generate Branch Universal Object");
    return;
  }
  branchUniversalObj
    .listOnSpotlight()
    .then(function success(res) {
      logger(res);
    })
    .catch(function error(err) {
      logger(err, true);
    });
}

function BranchReferralsReward() {
  Branch.userCompletedAction("add5credits")
    .then(function success(res) {
      logger(res);
    })
    .catch(function error(err) {
      logger(err, true);
    });
}

function BranchReferralsLoad() {
  Branch.loadRewards()
    .then(function success(res) {
      logger(res);
    })
    .catch(function error(err) {
      logger(err, true);
    });
}

function BranchReferralsRedeem() {
  var amount = 10;
  Branch.redeemRewards(amount)
    .then(function success(res) {
      logger(res);
    })
    .catch(function error(err) {
      logger(err, true);
    });
}

function BranchReferralsHistory() {
  Branch.creditHistory()
    .then(function success(res) {
      logger(res);
    })
    .catch(function error(err) {
      logger(err, true);
    });
}
