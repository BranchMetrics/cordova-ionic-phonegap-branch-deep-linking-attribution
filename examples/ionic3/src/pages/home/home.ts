import { Component } from "@angular/core";
import { NavController } from "ionic-angular";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  constructor(public navCtrl: NavController) { }

  BranchShare() {
    const Branch = window["Branch"];
    // only canonicalIdentifier is required
    var buo = {
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

    Branch.createBranchUniversalObject(buo).then(function (res) {
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

      // share sheet
      res.showShareSheet(analytics, properties, message);
    });
  }

  BranchStandardEvent() {

    const Branch = window["Branch"];
    Branch.getStandardEvents().then(function success(res) {
      var event = res.STANDARD_EVENT_ADD_TO_CART;

      var metadata = {
        transactionID: '12344555',
        currency: 'USD',
        revenue: 1.5,
        shipping: 10.2,
        tax: 12.3,
        coupon: 'test_coupon',
        affiliation: 'test_affiliation',
        description: 'Test add to cart event',
        searchQuery: 'test keyword',
        customData: {
          "Custom_Event_Property_Key1": "Custom_Event_Property_val1",
          "Custom_Event_Property_Key2": "Custom_Event_Property_val2"
        }
      };
      Branch.sendBranchEvent(event, metadata).then(function success(res) {
        alert("Branch Event success " + res);
      }).catch(function error(err) {
        alert("Branch Event " + err);
      });
    }).catch(function error(err) {
      alert("Get Standard Event " + err);
    });
  }

  BranchCustomEvent() {
    const Branch = window["Branch"];
    var event = "Test Custom Event";

    var customData = {
      customData: {
        "Custom_Event_Property_Key1": "Custom_Event_Property_val1",
        "Custom_Event_Property_Key2": "Custom_Event_Property_val2"
      }
    };

    Branch.sendBranchEvent(event, customData).then(function success(res) {
      alert("Branch Event success " + res);
    }).catch(function error(err) {
      alert("Branch Event " + err);
    });
  }
}
