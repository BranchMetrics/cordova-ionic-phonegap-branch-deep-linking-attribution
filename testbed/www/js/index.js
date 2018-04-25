/* eslint-disable no-unused-vars, no-undef, no-console, no-alert */

const logger = (message, isError) => {
  console.log(message);
  alert(`${isError ? "Error" : "Response"}: ${JSON.stringify(message)}`);
};

// branch
const BranchInit = isDebug => {
  console.log("Trigger BranchInit()");

  // for GDPR compliance (can be called at anytime )
  Branch.setTrackingDisabled(false);

  // for development and debugging only
  Branch.setDebug(isDebug);

  // for better Android matching
  Branch.setCookieBasedMatching("cordova.app.link");

  // sync with Mixpanel if installed
  Branch.setRequestMetadata("$mixpanel_distinct_id", "your_mixpanel_token");

  // Branch initialization
  Branch.initSession(data => {
    if (data["+clicked_branch_link"]) {
      // read deep link data on click
      console.log("Trigger DeepLinkHandler()");
      alert(`Deep Link Data: ${JSON.stringify(data)}`);
    }
  })
    .then(res => logger(res))
    .catch(err => logger(err, true));
};

const BranchEvent = () => {
  console.log("Trigger BranchEvent()");

  // event name
  const event = document.getElementById("custom-action").value;

  // optional
  const metadata = {
    custom_dictionary: 123,
    anything: "everything"
  };

  Branch.userCompletedAction(event, metadata)
    .then(res => logger(res))
    .catch(err => logger(err, true));
};

const BranchCommerce = () => {
  console.log("Trigger BranchCommerce()");

  // revenue required
  const event = {
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
  const metadata = {
    custom_dictionary: 123,
    anything: "everything"
  };

  Branch.sendCommerceEvent(event, metadata)
    .then(res => logger(res))
    .catch(err => logger(err, true));
};

const BranchFirstData = () => {
  console.log("Trigger BranchFirstData()");

  Branch.getFirstReferringParams()
    .then(res => logger(res))
    .catch(err => logger(err, true));
};

const BranchLatestData = () => {
  console.log("Trigger BranchLatestData()");

  Branch.getLatestReferringParams()
    .then(res => logger(res))
    .catch(err => logger(err, true));
};

const BranchUser = () => {
  console.log("Trigger BranchUser()");

  const userId = document.getElementById("identity").value;
  Branch.setIdentity(userId)
    .then(res => logger(res))
    .catch(err => logger(err, true));
};

const BranchLogout = () => {
  console.log("Trigger BranchLogout()");

  Branch.logout()
    .then(res => logger(res))
    .catch(err => logger(err, true));
};

let branchUniversalObj = null;
const BranchUniversalObject = () => {
  console.log("Trigger BranchUniversalObject()");

  // only canonicalIdentifier is required
  const properties = {
    canonicalIdentifier: "content/123",
    canonicalUrl: "https://example.com/content/123",
    title: "Content 123 Title",
    contentDescription: `Content 123 Description ${Date.now()}`,
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
    .then(res => {
      branchUniversalObj = res;
      logger(res);
    })
    .catch(err => logger(err, true));
};

const BranchView = () => {
  console.log("Trigger BranchView()");

  if (branchUniversalObj === null) {
    alert("need to Generate Branch Universal Object");
    return;
  }
  branchUniversalObj
    .registerView()
    .then(res => logger(res))
    .catch(err => logger(err, true));
};

const BranchDeepLink = () => {
  console.log("Trigger BranchDeepLink()");

  // optional fields
  const analytics = {
    channel: "facebook",
    feature: "onboarding",
    campaign: "content 123 launch",
    stage: "new user",
    tags: ["one", "two", "three"],
    alias: document.getElementById("alias").value
  };

  // optional fields
  const properties = {
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
    .then(res => {
      document.getElementById("generated-url").placeholder = "";
      document.getElementById("generated-url").value = res.url;
      logger(res);
    })
    .catch(err => logger(err, true));
};

const BranchShareSheet = () => {
  console.log("Trigger BranchShareSheet()");

  // optional fields
  const analytics = {
    channel: "facebook",
    feature: "onboarding",
    campaign: "content 123 launch",
    stage: "new user",
    tags: ["one", "two", "three"]
  };

  // optional fields
  const properties = {
    $desktop_url: "http://www.example.com/desktop",
    custom_string: "data",
    custom_integer: Date.now(),
    custom_boolean: true,
    custom_array: [1, 2, 3, 4, 5],
    custom_object: { random: "dictionary" }
  };

  const message = "Check out this link";

  // needs a universal object
  if (branchUniversalObj === null) {
    alert("need to Generate Branch Universal Object");
    return;
  }

  // optional listeners (must be called before showShareSheet)
  branchUniversalObj.onShareSheetLaunched(res => {
    // android only
    console.log(res);
  });
  branchUniversalObj.onShareSheetDismissed(res => {
    console.log(res);
  });
  branchUniversalObj.onLinkShareResponse(res => {
    console.log(res);
  });
  branchUniversalObj.onChannelSelected(res => {
    // android only
    console.log(res);
  });

  // share sheet
  branchUniversalObj.showShareSheet(analytics, properties, message);
};

const BranchSpotlight = () => {
  console.log("Trigger ListOnSpotlight()");

  if (branchUniversalObj === null) {
    alert("need to Generate Branch Universal Object");
    return;
  }
  branchUniversalObj
    .listOnSpotlight()
    .then(res => logger(res))
    .catch(err => logger(err, true));
};

const BranchReferralsReward = () => {
  console.log("Trigger BranchReferralsReward()");

  Branch.userCompletedAction("add5credits")
    .then(res => logger(res))
    .catch(err => logger(err, true));
};

const BranchReferralsLoad = () => {
  console.log("Trigger BranchReferralsLoad()");

  Branch.loadRewards()
    .then(res => logger(res))
    .catch(err => logger(err, true));
};

const BranchReferralsRedeem = () => {
  console.log("Trigger BranchReferralsRedeem()");

  const amount = 10;
  Branch.redeemRewards(amount)
    .then(res => logger(res))
    .catch(err => logger(err, true));
};

const BranchReferralsHistory = () => {
  console.log("Trigger BranchReferralsHistory()");

  Branch.creditHistory()
    .then(res => logger(res))
    .catch(err => logger(err, true));
};

// app
const app = {
  initialize: () => this.bindEvents(),
  bindEvents: () => {
    document.addEventListener("deviceready", this.onDeviceReady, false);
    document.addEventListener("resume", this.onDeviceResume, false);
  },
  onDeviceReady: () => BranchInit(true),
  onDeviceResume: () => BranchInit(true)
};
app.initialize();
