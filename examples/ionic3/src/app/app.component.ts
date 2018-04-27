import { Component } from "@angular/core";
import { Platform } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";

import { TabsPage } from "../pages/tabs/tabs";

@Component({
  templateUrl: "app.html"
})
export class MyApp {
  rootPage: any = TabsPage;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      BranchInit();
    });
    platform.resume.subscribe(() => {
      BranchInit();
    });
    // Branch
    const BranchInit = () => {
      // only on devices
      if (!platform.is("cordova")) {
        return;
      }
      const Branch = window["Branch"];
      Branch.initSession().then(data => {
        // read deep link data on click
        alert("Deep Link Data: " + JSON.stringify(data));
      });
    };
  }
}
