// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

/* global variable */
var newEmailCounter = 0;      //new email after request
var oldEmailCounter = 0;      //new email before request
var logInSalesforce = false
var request_html = "";
var getNotification = false;
var allEmail;
var newEmail = {};
var myNewEmail = [];
var newEmailObj = [];
var baseURL = "https://smbsalesimplementation.my.salesforce.com/";
var reportURL = "00O1Q000007WM2m";



let marketMapping = {
  'Polish':'pl',
  'Dutch':'nl',
  'Russian':'ru',
  'Turkish':'tr',
  'Italian':'it',
  'French':'fr',
  'Spanish':'es',
  'German':'de'
}

var marketParameter;


chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if (request.type == "set_market_variable"){
      marketParameter = marketMapping[request.data];
      console.log(marketParameter)
      sendResponse({message: "market variable set"});
    }
    if(request.type == "get_market_variable"){
      console.log(marketParameter)
      sendResponse({
        message: "market variable sent",
        data : marketParameter
      });
    }
      
  });

var collapsedCases = [];

chrome.browserAction.setBadgeText({text: ""});  //delete badge icon  when chrome is started

/* get HTML table and return a JSON */

function getJSON(domHTML){
  var table = domHTML.querySelector(".reportTable");
  console.log(table)
  if(table){
    table = table.outerHTML;
    console.log($(table).tableToJSON({ignoreHiddenRows: false}))
    return $(table).tableToJSON({ignoreHiddenRows: false}); // Convert the table into a javascript object
  }
  else
    return 0;
}

/* check if an object is empty */

function isEmpty(obj) {
  for(var key in obj) {
      if(obj.hasOwnProperty(key))
          return false;
  }
  return true;
}


function request(){
  $.get(baseURL+reportURL, function(response) { 
    oldEmailCounter = newEmailCounter
    var domHTML = new DOMParser().parseFromString(response, "text/html");    //parse string response into HTML
    allEmail = getJSON(domHTML);
    console.log(allEmail)
    logInSalesforce = false;

    /* request ok and table found */
    if(allEmail){
      logInSalesforce = true;
      newEmailCounter=0;
      allEmail.splice(allEmail.length-2, 2) //clean allEmail object, delete last 2 elements
    
      var currentCase;
      var casesNumbers = [];
      collapsedCases = [];
      allEmail.forEach((e, i) => {
        if(e["Email Status"] != "-"){   //exclude email without status
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
            switch(e["Email Status"]) {                 //mailinda shows New-Unread-Read emails so newEmailCounter is incremented in those cases
              case "New": currentCase["New Emails"] ++; newEmailCounter++; break;
              case "Unread": currentCase["Unread Emails"] ++; newEmailCounter++; break;
              case "Read": currentCase["Read Emails"] ++; newEmailCounter++; break;
              case "Sent": currentCase["Sent Emails"] ++; break;
              case "Replied": currentCase["Replied Emails"] ++; break;
            }
          }
        }
      })
      console.log(collapsedCases)
    /* notification if you have new email */
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
    }
    /* request ok but table not found */
    else{
      console.log("table not found")
    }
    }).fail(function() {
      console.log("request error");
    });
}

/* exec request first time when chrome is started or extension is reloaded */
request();
/* request every 60 sec */
setInterval(request,60000)

function GetReportList(){}

function GetReport(){}

function GetFullEmailList(){}

function GetUnreadEmail(){}

function GetInboxEmail(){}