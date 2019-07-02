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
var newEmail = {};
var myNewEmail = [];
var newEmailObj = [];
var baseURL = "https://smbsalesimplementation--uat.cs10.my.salesforce.com/"


var collapsedCases = [];

chrome.browserAction.setBadgeText({text: ""});  //delete badge icone  when chrome is started

/* get HTML table and return a JSON */

function getJSON(domHTML){
  var table = domHTML.querySelector(".reportTable").outerHTML
  return $(table).tableToJSON({ignoreHiddenRows: false}); // Convert the table into a javascript object
}

/* check if an object is empty */

function isEmpty(obj) {
  for(var key in obj) {
      if(obj.hasOwnProperty(key))
          return false;
  }
  return true;
}


/* receive the entire html email page from script.js */

function receiver(request, sender, sendResponse){
  oldEmailCounter = newEmailCounter
  newEmailCounter = 0;
  var domHTML = new DOMParser().parseFromString(request, "text/html");    //parse string request into HTML
  // console.log(domHTML)

  allEmail = getJSON(domHTML);
  allEmail.splice(allEmail.length-2, 2) //clean allEmail object, delete last 2 elements

  myNewEmail = [];
  if(!isEmpty(allEmail)){
    newEmail = allEmail.reduce(function(obj, email) {
    if(email["Email Status"]=="New"){
        myNewEmail.push(email)
        
        obj[email["Case Number"]] = (obj[email["Case Number"]] || 0) + 1;
    }
      return obj;
    }, {})
}


var currentCase
var casesIndexes = {}
collapsedCases = []
console.log(currentCase)
allEmail.forEach((e, i) => {
  if (!(e["Case Number"] in casesIndexes)) {
    casesIndexes[e["Case Number"]] = i
    currentCase = allEmail[casesIndexes[e["Case Number"]]]
    currentCase["Emails Indexes"] = []
    currentCase["Total Emails"] = 0
    currentCase["New Emails"] = 0
    currentCase["Read Emails"] = 0
    currentCase["Sent Emails"] = 0
    currentCase["Replied Emails"] = 0
    console.log(currentCase)
    } 
  if (e["Case Number"] in casesIndexes) {
    let currentCase = allEmail[casesIndexes[e["Case Number"]]]
    currentCase["Total Emails"] ++;
    currentCase["Emails Indexes"].push(i)
    switch(e["Email Status"]) {
      case "New": currentCase["New Emails"] ++; break;
      case "Read": currentCase["Read Emails"] ++; break;
      case "Sent": currentCase["Sent Emails"] ++; break;
      case "Replied": currentCase["Replied Emails"] ++; break;
    }
  }
})

Object.values(casesIndexes).forEach(e => {
  //console.log(allEmail)
collapsedCases.push(allEmail[e])
})

console.log(collapsedCases)







  // console.log(myNewEmail)
  // console.log(newEmail)
  if(!isEmpty(newEmail)){
    newEmailCounter = Object.values(newEmail).reduce((a, b) => a + b);
  }
  else
    newEmailCounter=0;
  
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

  if(newEmailCounter==0){
    chrome.browserAction.setBadgeText({text: ""});
  }
  else{
    chrome.browserAction.setBadgeBackgroundColor({ color: [255, 0, 0, 255] });
    chrome.browserAction.setBadgeText({text: String(newEmailCounter)});
  }
}


//this is executed when script.js send a message
chrome.runtime.onMessage.addListener(receiver)


