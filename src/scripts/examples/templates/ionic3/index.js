import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private alertCtrl: AlertController, private storage: Storage) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
      handleBranch();
    });
    platform.resume.subscribe(() => {
      handleBranch();
    });
    // Branch initialization
    const handleBranch = () => {
      // only on devices
      if (!platform.is('cordova')) { return }
      const Branch = window['Branch'];
      Branch.initSession(data => {
        // read deep link data on click
        if (data['+clicked_branch_link']) {
          // save to device
          storage.set('branch', data).then(() => {
            // do something with it
            showAlert();
          });
        }
      });
    }
    // ionic 2/3 component
    const showAlert = () => {
      // read from device
      storage.get('branch').then((val) => {
        // show alert
        let alert = this.alertCtrl.create({
          title: 'Branch Data',
          subTitle: JSON.stringify(val),
          buttons: ['OK']
        });
        alert.present();
      });
    }
  }
}
