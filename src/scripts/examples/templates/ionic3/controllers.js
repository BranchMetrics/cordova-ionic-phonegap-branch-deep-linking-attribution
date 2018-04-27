import { Component } from "@angular/core";
import { NavController } from "ionic-angular";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  constructor(public navCtrl: NavController) {}

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

    Branch.createBranchUniversalObject(buo).then(function(res) {
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
}
