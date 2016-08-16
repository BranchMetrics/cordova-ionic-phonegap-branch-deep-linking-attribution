'use strict';

/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var app = {
    // Application Constructor
    initialize: function initialize() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function bindEvents() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function onDeviceReady() {
        app.receivedEvent('app');
    },
    // Update DOM on a Received Event
    receivedEvent: function receivedEvent(id) {

        if (navigator.userAgent.indexOf('iPhone') >= 0) {
            document.getElementsByTagName("html")[0].className = 'ios';
        } else if (navigator.userAgent.indexOf('Android') >= 0) {
            document.getElementsByTagName("html")[0].className = 'android';
        }

        InitSession();
    }
};

app.initialize();

function DeepLinkHandler(data) {
    if (data) {
        alert('Initialize: ' + JSON.stringify(data));
    } else {
        alert('No data found');
    }
}

function NonBranchLinkHandler(data) {
    if (data) {
        alert('Non-branch link found: ' + JSON.stringify(data));
    }
}

function InitSession() {
    console.log('Trigger InitSession()');

    Branch.setMixpanelToken('<your-mixpanel-token-here>');
    Branch.initSession().then(function (res) {
        console.log(res);
        alert('Response: ' + JSON.stringify(res));
    }).catch(function (err) {
        console.error(err);
        alert('Error: ' + JSON.stringify(err));
    });
}

function CustomAction() {
    console.log('Trigger CustomAction()');

    var action = document.getElementById('custom-action').value;

    Branch.userCompletedAction(action).then(function (res) {
        console.log(res);
        alert('Response: ' + JSON.stringify(res));
    }).catch(function (err) {
        console.error(err);
        alert('Error: ' + JSON.stringify(err));
    });
}

function GetLatestReferringParams() {
    console.log('Trigger GetLatestReferringParams()');

    Branch.getLatestReferringParams().then(function (res) {
        console.log(res);
        alert('Response: ' + JSON.stringify(res));
    }).catch(function (err) {
        console.error(err);
        alert('Error: ' + JSON.stringify(err));
    });
}

function GetFirstReferringParams() {
    console.log('Trigger GetFirstReferringParams()');

    Branch.getFirstReferringParams().then(function (res) {
        alert('Response: ' + JSON.stringify(res));
        console.log(res);
    }).catch(function (err) {
        alert('Error: ' + JSON.stringify(err));
        console.error(err);
    });
}

function SetIdentity() {
    console.log('Trigger SetIdentity()');

    var newIdentity = document.getElementById('identity').value;

    Branch.setIdentity(newIdentity).then(function (res) {
        console.log(res);
        alert('Response: ' + JSON.stringify(res));
    }).catch(function (err) {
        console.error(err);
        alert('Error: ' + JSON.stringify(err));
    });
}

function Logout() {
    console.log('Trigger Logout()');

    Branch.logout().then(function (res) {
        console.log(res);
        alert('Response: ' + JSON.stringify(res));
    }).catch(function (err) {
        console.error(err);
        alert('Error: ' + JSON.stringify(err));
    });
}

var branchUniversalObj = null;

function CreateBranchUniversalObject() {

    console.log('Trigger CreateBranchUniversalObject()');

    var properties = {
        canonicalIdentifier: 'testbed',
        title: 'Here is some content',
        contentDescription: 'Here is a content description',
        contentImageUrl: 'https://imgflip.com/s/meme/Derp.jpg',
        contentIndexingMode: 'public',
        contentMetadata: {}
    };

    Branch.createBranchUniversalObject(properties).then(function (res) {
        console.log(res);
        alert('Response: ' + JSON.stringify(res));
        branchUniversalObj = res;
    }).catch(function (err) {
        console.error(err);
        alert('Error: ' + JSON.stringify(err));
    });
}

function RegisterView() {
    console.log('Trigger RegisterView()');

    branchUniversalObj.registerView().then(function (res) {
        console.log(res);
        alert('Response: ' + JSON.stringify(res));
    }).catch(function (err) {
        console.error(err);
        alert('Error: ' + JSON.stringify(err));
    });;
}

function GenerateShortUrl() {
    console.log('Trigger GenerateShortUrl()');

    var properties = {
        feature: 'test',
        channel: 'test',
        stage: 'test',
        duration: 10000
    };
    var controlParams = { };

    branchUniversalObj.generateShortUrl(properties, controlParams).then(function (res) {
        console.log(res);
        document.getElementById('generated-url').value = res.url;
    }).catch(function (err) {
        console.error(err);
        alert('Error: ' + JSON.stringify(err));
    });
}

function ShowShareSheet() {
    console.log('Trigger ShowShareSheet()');

    var properties = {
        feature: 'test',
        channel: 'test',
        stage: 'test'
    };
    var controlParams = { };

    console.log(branchUniversalObj);

    // Set listeners
    branchUniversalObj.onShareSheetLaunched(function () {
        console.log('Share sheet launched');
    });
    branchUniversalObj.onShareSheetDismissed(function () {
        console.log('Share sheet dismissed');
    });
    branchUniversalObj.onLinkShareResponse(function (res) {
        console.log('Share link response: ' + JSON.stringify(res));
    });
    branchUniversalObj.onChannelSelected(function (res) {
        console.log('Channel selected: ' + JSON.stringify(res));
    });

    branchUniversalObj.showShareSheet(properties, controlParams, 'Custom Text');
}

function ListOnSpotlight() {
    console.log('Trigger ListOnSpotlight()');
    branchUniversalObj.listOnSpotlight().then(function (res) {
        console.log(res);
        alert('Response: ' + JSON.stringify(res));
    }).catch(function (err) {
        console.error(err);
        alert('Error: ' + JSON.stringify(err));
    });
}

function LoadRewards() {
    console.log('Trigger LoadRewards()');
    Branch.loadRewards().then(function (res) {
        console.log(res);
        alert('Response: ' + JSON.stringify(res));
    }).catch(function (err) {
        console.error(err);
        alert('Error: ' + JSON.stringify(err));
    });
}

function RedeemRewards() {
    console.log('Trigger RedeemRewards()');
    var reward = 1000;

    Branch.redeemRewards(reward).then(function (res) {
        console.log(res);
        alert('Response: ' + JSON.stringify(res));
    }).catch(function (err) {
        console.error(err);
        alert('Error: ' + JSON.stringify(err));
    });
}

function CreditHistory() {
    console.log('Trigger CreditHistory()');
    Branch.creditHistory().then(function (res) {
        console.log(res);
        alert('Response: ' + JSON.stringify(res));
    }).catch(function (err) {
        console.error(err);
        alert('Error: ' + JSON.stringify(err));
    });
}
//# sourceMappingURL=index.js.map
