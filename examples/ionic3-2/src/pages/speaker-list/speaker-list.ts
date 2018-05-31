import { Component } from '@angular/core';

import {
  ActionSheet,
  ActionSheetController,
  ActionSheetOptions,
  Config,
  NavController
} from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { ConferenceData } from '../../providers/conference-data';

import { SessionDetailPage } from '../session-detail/session-detail';
import { SpeakerDetailPage } from '../speaker-detail/speaker-detail';

// TODO remove
export interface ActionSheetButton {
text?: string;
role?: string;
icon?: string;
cssClass?: string;
handler?: () => boolean|void;
};

@Component({
  selector: 'page-speaker-list',
  templateUrl: 'speaker-list.html'
})
export class SpeakerListPage {
  actionSheet: ActionSheet;
  speakers: any[] = [];

  constructor(
    public actionSheetCtrl: ActionSheetController,
    public navCtrl: NavController,
    public confData: ConferenceData,
    public config: Config,
    public inAppBrowser: InAppBrowser
  ) {}

  ionViewDidLoad() {
    this.confData.getSpeakers().subscribe((speakers: any[]) => {
      this.speakers = speakers;
    });
  }

  goToSessionDetail(session: any) {
    this.navCtrl.push(SessionDetailPage, { sessionId: session.id });
  }

  goToSpeakerDetail(speaker: any) {
    this.navCtrl.push(SpeakerDetailPage, { speakerId: speaker.id });
  }

  goToSpeakerTwitter(speaker: any) {
    this.inAppBrowser.create(
      `https://twitter.com/${speaker.twitter}`,
      '_blank'
    );
  }

  openSpeakerShare(speaker: any) {
    const Branch = window['Branch'];

    // only canonicalIdentifier is required
    var buo = {
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

  var analytics = {
    channel: 'facebook',
    feature: 'onboarding',
    campaign: 'content 123 launch',
    stage: 'new user',
    tags: ['one', 'two', 'three']
  }

  // create a branchUniversalObj variable to reference with other Branch methods
  var branchUniversalObj = null
  Branch.createBranchUniversalObject(buo).then(function (res) {
    branchUniversalObj = res
  })

  let actionSheet = this.actionSheetCtrl.create({
    title: 'Share ' + speaker.name,
    buttons: [
      {
        text: 'Share via ...',
        handler: () => {
          var message = 'Check out this link'
          var email_properties = {
            $desktop_url: 'http://www.example.com/desktop',
            custom_string: 'data',
            custom_integer: Date.now(),
            custom_boolean: true,
            $email_subject: 'Hello'
          }
          branchUniversalObj.showShareSheet(analytics, email_properties, message)
        }
      } as ActionSheetButton,
      {
        text: 'Cancel',
        role: 'cancel'
      } as ActionSheetButton
    ]
  } as ActionSheetOptions);
  actionSheet.present();
}

openContact(speaker: any) {
  let mode = this.config.get('mode');

  let actionSheet = this.actionSheetCtrl.create({
    title: 'Contact ' + speaker.name,
    buttons: [
      {
        text: `Email ( ${speaker.email} )`,
        icon: mode !== 'ios' ? 'mail' : null,
        handler: () => {
          window.open('mailto:' + speaker.email);
        }
      } as ActionSheetButton,
      {
        text: `Call ( ${speaker.phone} )`,
        icon: mode !== 'ios' ? 'call' : null,
        handler: () => {
          window.open('tel:' + speaker.phone);
        }
      } as ActionSheetButton
    ]
  } as ActionSheetOptions);

  actionSheet.present();
}
}
