// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({color: '#3aa757'}, function() {
    console.log("The color is green!!");
  });
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        //pageUrl: {hostEquals: 'developer.chrome.com'},
      })
      ],
          actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});

var new_email = 0;      //global variable
var request_html = "jj";

/* receive the entire html email page from script.js */

function receiver(request, sender, sendResponse){
  request_html = request;
  console.log(request)
  var new_email_string = String(++new_email);
  chrome.browserAction.setBadgeBackgroundColor({ color: [255, 0, 0, 255] });
  chrome.browserAction.setBadgeText({text: new_email_string});
}

chrome.runtime.onMessage.addListener(receiver)
