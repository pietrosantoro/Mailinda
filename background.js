// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

/* global variable */
var newEmailCounter = 0;      //new email after request
var oldEmailCounter = 0;      //new email before request
var request_html = "";
var getNotification = false;
var allEmail;
var newEmail = {};
var myNewEmail = [];
var newEmailObj = [];
var baseURL = "https://smbsalesimplementation--uat.cs10.my.salesforce.com/"


var collapsedCases = [];

chrome.browserAction.setBadgeText({text: ""});  //delete badge icon  when chrome is started

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

setInterval(function(){
  $.get("https://smbsalesimplementation--uat.cs10.my.salesforce.com/00OJ0000000sw5U", function(response) { 
    oldEmailCounter = newEmailCounter
    newEmailCounter = 0;
    var domHTML = new DOMParser().parseFromString(response, "text/html");    //parse string response into HTML
  
    allEmail = getJSON(domHTML);
    allEmail.splice(allEmail.length-2, 2) //clean allEmail object, delete last 2 elements
  
    var currentCase;
    var casesNumbers = [];
    collapsedCases = [];
    console.log(currentCase)
    allEmail.forEach((e, i) => {
      if (!(casesNumbers.includes(e["Case Number"]))) {
        casesNumbers.push(e["Case Number"])
        e["Emails Indexes"] = []
        e["Total Emails"] = 0
        e["New Emails"] = 0
        e["Read Emails"] = 0
        e["Sent Emails"] = 0
        e["Replied Emails"] = 0
        collapsedCases.push(e)
      } 
      if (casesNumbers.includes(e["Case Number"])) {
        currentCase = collapsedCases[casesNumbers.indexOf(e["Case Number"])]
        currentCase["Total Emails"] ++;
        currentCase["Emails Indexes"].push(i)
        switch(e["Email Status"]) {
          case "New": currentCase["New Emails"] ++; newEmailCounter++; break;
          case "Read": currentCase["Read Emails"] ++; break;
          case "Sent": currentCase["Sent Emails"] ++; break;
          case "Replied": currentCase["Replied Emails"] ++; break;
        }
      }
    })
    console.log(collapsedCases)
  
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
    console.log("newEmail: ", newEmailCounter)
  
    request_html = response;
  
    if(newEmailCounter==0){
      chrome.browserAction.setBadgeText({text: ""});
    }
    else{
      chrome.browserAction.setBadgeBackgroundColor({ color: [255, 0, 0, 255] }); //red color badge
      chrome.browserAction.setBadgeText({text: String(newEmailCounter)});
    }

    });
  },3000)

