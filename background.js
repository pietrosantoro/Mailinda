// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

/* global variable */

var newEmailCounter = 0;      //new email after request
var oldEmailCounter = 0;      //new email before request
var request_html = "";
var getNotification = true;
var EmailJSON;
var obj;

chrome.browserAction.setBadgeText({text: ""});  //delete badge icone  when chrome is started

/* get HTML table and return a JSON */

function getJSON(domHTML){
  var table = domHTML.querySelector(".reportTable").outerHTML
  var tableJSON = $(table).tableToJSON({ignoreHiddenRows: false}); // Convert the table into a javascript object
  return tableJSON
}


/* open the report when click on icon extension */

chrome.browserAction.onClicked.addListener(function(tab) {
  window.open('https://smbsalesimplementation--uat.cs10.my.salesforce.com/00OJ0000000uj6B', '_blank');
  newEmailCounter = 0;
  chrome.browserAction.setBadgeText({text: ""});
  });

  /* receive the entire html email page from script.js */

function receiver(request, sender, sendResponse){
  oldEmailCounter = newEmailCounter
  newEmailCounter = 0;
  var domHTML = new DOMParser().parseFromString(request, "text/html");    //parse string request into HTML
  // console.log(domHTML)

  obj = getJSON(domHTML);
  console.log(obj)


  // console.log(table)
  var titlesRow = domHTML.querySelectorAll('#headerRow_0 th a')
  //console.log(titlesRow)
  var iframeRowElements = domHTML.querySelectorAll('.odd')
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
  if(newEmailCounter > oldEmailCounter)
    getNotification = true

  if(getNotification){
    getNotification = false
    chrome.notifications.create(
      'name-for-notification',{   
      type: 'basic', 
      iconUrl: 'images/mail_icon.png', 
      title: "You have new Email", 
      message: String(newEmailCounter) + " new Email" 
      },
      function() {
      } 
    );
  }
  console.log(newEmailCounter)

  request_html = request;
  //console.log(request)
  var new_email_string = String(newEmailCounter);
  chrome.browserAction.setBadgeBackgroundColor({ color: [255, 0, 0, 255] });
  chrome.browserAction.setBadgeText({text: new_email_string});
}


//this is executed when script.js send a message
chrome.runtime.onMessage.addListener(receiver)
