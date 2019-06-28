// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

/* global variable */

var newEmailCounter = 0;      //new email after request
var oldEmailCounter = 0;      //new email before request
var request_html = "";
var getNotification = true;
var allEmail;
var newEmail;

chrome.browserAction.setBadgeText({text: ""});  //delete badge icone  when chrome is started

/* get HTML table and return a JSON */

function getJSON(domHTML){
  var table = domHTML.querySelector(".reportTable").outerHTML
  return $(table).tableToJSON({ignoreHiddenRows: false}); // Convert the table into a javascript object
}


/* receive the entire html email page from script.js */

function receiver(request, sender, sendResponse){
  oldEmailCounter = newEmailCounter
  newEmailCounter = 0;
  var domHTML = new DOMParser().parseFromString(request, "text/html");    //parse string request into HTML
  // console.log(domHTML)

  allEmail = getJSON(domHTML);
  console.log(allEmail)


  newEmail = allEmail.reduce(function(obj, v) {
   if(v["Email Status"]=="Sent")
      obj[v["Case Number"]] = (obj[v["Case Number"]] || 0) + 1;
    return obj;
  }, {})

  console.log(newEmail)

  newEmailCounter = Object.values(newEmail).reduce((a, b) => a + b);
  
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

  chrome.browserAction.setBadgeBackgroundColor({ color: [255, 0, 0, 255] });
  chrome.browserAction.setBadgeText({text: String(newEmailCounter)});
}


//this is executed when script.js send a message
chrome.runtime.onMessage.addListener(receiver)
