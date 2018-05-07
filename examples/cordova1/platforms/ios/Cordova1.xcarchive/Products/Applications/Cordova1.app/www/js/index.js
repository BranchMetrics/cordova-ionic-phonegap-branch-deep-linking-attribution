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
  Branch.initSession()
    .then(function success(res) {
      if (res["+clicked_branch_link"]) {
        alert("Open app with a Branch deep link: " + JSON.stringify(res));
        // Branch quick link: https://cordova.app.link/uJcOH1IFpM
        // Branch web link: https://cordova-alternate.app.link/uJcOH1IFpM
        // Branch dynamic link: https://cordova.app.link?tags=one&tags=two&tags=three&channel=Copy&feature=onboarding&stage=new+user&campaign=content+123+launch&type=0&duration=0&source=android&data
        // Branch uri scheme: branchcordova://open?link_click_id=link-500015444967786346
        // Branch android intent: intent://open?link_click_id=518106399270344237#Intent;scheme=looprocks;package=com.eneff.branch.cordovatestbed;S.browser_fallback_url=https%3A%2F%2Fcordova.app.link%2FuJcOH1IFpM%3F__branch_flow_type%3Dchrome_deepview%26__branch_flow_id%3D518106399312287278;S.market_referrer=link_click_id-518106399270344237%26utm_source%3DCopy%26utm_campaign%3Dcontent%20123%20launch%26utm_feature%3Donboarding;S.branch_data=%7B%22~feature%22%3A%22onboarding%22%2C%22this_is%22%3A%22true%22%2C%22custom_string%22%3A%22data%22%2C%22testing%22%3A%22123%22%2C%22%24publicly_indexable%22%3A%22false%22%2C%22%24desktop_url%22%3A%22http%3A%2F%2Fwww.example.com%2Fdesktop%22%2C%22%24one_time_use%22%3Afalse%2C%22custom_object%22%3A%22%7B%5C%5C%5C%22random%5C%5C%5C%22%3A%5C%5C%5C%22dictionary%5C%5C%5C%22%7D%22%2C%22~id%22%3A%22517795540654792902%22%2C%22~campaign%22%3A%22content%20123%20launch%22%2C%22%2Bclick_timestamp%22%3A1524764418%2C%22%2Burl%22%3A%22https%3A%2F%2Fcordova.app.link%2FuJcOH1IFpM%22%2C%22custom_boolean%22%3A%22true%22%2C%22custom%22%3A%22data%22%2C%22source%22%3A%22android%22%2C%22%24og_image_url%22%3A%22http%3A%2F%2Florempixel.com%2F400%2F400%2F%22%2C%22%2Bdomain%22%3A%22cordova.app.link%22%2C%22custom_integer%22%3A%221524690301794%22%2C%22~tags%22%3A%5B%22one%22%2C%22two%22%2C%22three%22%5D%2C%22custom_array%22%3A%22%5B1%2C2%2C3%2C4%2C5%5D%22%2C%22~channel%22%3A%22Copy%22%2C%22~creation_source%22%3A2%2C%22%24canonical_identifier%22%3A%22content%2F123%22%2C%22%24og_title%22%3A%22Content%20123%20Title%22%2C%22%24og_description%22%3A%22Content%20123%20Description%201524690296449%22%2C%22%24identity_id%22%3A%22453670943617990547%22%2C%22~stage%22%3A%22new%20user%22%2C%22%2Bclicked_branch_link%22%3Atrue%2C%22%2Bmatch_guaranteed%22%3Atrue%2C%22%2Bis_first_session%22%3Afalse%7D;B.branch_intent=true;end
        // Branch android app link (device controlled): https://cordova.app.link/uJcOH1IFpM
        // Branch ios universal link (device controlled): https://cordova.app.link/uJcOH1IFpM
      } else if (res["+non_branch_link"]) {
        alert("Open app with a non Branch deep link: " + JSON.stringify(res));
        // Competitor uri scheme: anotherurischeme://hello=world
      } else {
        alert("Open app organically");
        // Clicking on app icon or push notification
      }
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
