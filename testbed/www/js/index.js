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
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('app');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        
        var parentElement = document.getElementById(id);

        console.log('Received Event: ' + id);
    
        console.log('Getting installation details');

        // Set app initSession success
        var initStatusDOM = document.getElementsByClassName('status--info');
            initStatusDOM[0].childNodes[3].innerHTML = 'Branch SDK Init Success';
            initStatusDOM[0].childNodes[3].className += ' success';

        Branch.getFirstReferringParams().then(function (res) {
            console.log('Get first referring params: ');
            console.log(res);
            initStatusDOM[1].childNodes[3].innerHTML = JSON.stringify(res);
        }, function (err) {
            initStatusDOM[1].childNodes[3].innerHTML = 'Error';
        });

        Branch.getLatestReferringParams().then(function (res) {
            console.log('Get getLatestReferringParams: ');
            console.log(res);
            initStatusDOM[2].childNodes[3].innerHTML = JSON.stringify(res);
        }, function (err) {
            initStatusDOM[2].childNodes[3].innerHTML = 'Error';
        });

    }
};

app.initialize();
