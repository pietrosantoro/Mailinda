// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

var newEmailCounter = 0;      //global variable
var request_html = "";

// 
chrome.browserAction.onClicked.addListener(function(tab) {
  window.open('https://smbsalesimplementation--uat.cs10.my.salesforce.com/00OJ0000000uj6B', '_blank');
  newEmailCounter = 0;
  chrome.browserAction.setBadgeText({text: ""});
  });
/* receive the entire html email page from script.js */

function receiver(request, sender, sendResponse){
  newEmailCounter = 0;
  var domTest = new DOMParser().parseFromString(request, "text/html");
      console.log(domTest)

      var titlesRow = domTest.querySelectorAll('#headerRow_0 th a')
      console.log(titlesRow)
      var iframeRowElements = domTest.querySelectorAll('.even')
      var emailStatusIndex;
      
      titlesRow.forEach((e, i) => {
          if (e.getAttribute("title").includes("Email Status")){
          emailStatusIndex = i    
      }
      })
      
      iframeRowElements.forEach(e => {
      if( e.childNodes[emailStatusIndex].innerText === "Sent") {
          newEmailCounter++;
      }
      })
      console.log(newEmailCounter)

  request_html = request;
  console.log(request)
  var new_email_string = String(newEmailCounter);
  chrome.browserAction.setBadgeBackgroundColor({ color: [255, 0, 0, 255] });
  chrome.browserAction.setBadgeText({text: new_email_string});
}


//this is executed when script.js send a message
chrome.runtime.onMessage.addListener(receiver)
