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
    initialize: function() {
        alert("hello");
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);

        BranchInit(true);
    }
};

app.initialize();

function DeepLinkHandler(data) {
  console.log('Trigger DeepLinkHandler()');

  if (data) {
    console.log(data);
    alert('Data Link handler response: ' + JSON.stringify(data));
  }
}

function NonBranchLinkHandler(data) {
  console.log('Trigger NonBranchLinkHandler()');

  if (data) {
    console.log(data);
    alert('Non-branch link found: ' + JSON.stringify(data));
  }
}

function BranchInit(isDebug) {
  console.log('Trigger BranchInit()');

  // for development and debugging only
  Branch.setDebug(isDebug);
  // sync with mixpanel if installed
  Branch.setMixpanelToken('your_mixpanel_token');
  // init
  Branch.initSession().then(function(res) {
    console.log(res);
  }).catch(function(err) {
    console.error(err);
  });
}


// function InitSession() {
//     console.log('Trigger InitSession()');

//     function onBranchLinkHook(data) {
//         if (data) {
//             alert('Initialize: ' + JSON.stringify(data));
//         }
//         else {
//             alert('No data found');
//         }
//     }

//     Branch.setMixpanelToken('<your-mixpanel-token-here>');
//     Branch.initSession(onBranchLinkHook).then(function(res) {
//         console.log(res);
//         alert('Response: ' + JSON.stringify(res));
//     }).catch(function(err) {
//         console.error(err);
//         alert('Error: ' + JSON.stringify(err));
//     });
//     Branch.onNonBranchLink(function NonBranchLinkHandler(data) {
//         if (data) {
//             alert('Non-branch link found: ' + JSON.stringify(data));
//         }
//     });
// }