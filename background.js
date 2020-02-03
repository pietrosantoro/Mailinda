// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

/* global variables declared as var beacouse used in popup.js */
var newEmailCounter = 0;      //new email after request
var oldEmailCounter = 0;      //new email before request
var logInSalesforce = false   //set false when chrome is started to prevent request if agent is not logged in salesfore 
var getNotification = false;
var ghostforce_active = false;
var allEmail;
var baseURL = "https://smbsalesimplementation.my.salesforce.com/";
var reportURL = "00O1Q000007WM2m";
var dailyCasesURL = "00O1Q000007WYvy";


var currentHourCase;

var collapsedCases = [];      //all cases with new emails

let marketMapping = {
  'Polish': 'pl',
  'Dutch': 'nl',
  'Russian': 'ru',
  'Turkish': 'tr',
  'Italian': 'it',
  'French': 'fr',
  'Spanish': 'es',
  'German': 'de'
}

var marketParameter;      //contains the market parameter recorded last time an agent visited a ticket

chrome.browserAction.setBadgeText({ text: "" });  //delete badge icon  when chrome is started



//listen message
chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (request.type == "set_market_variable") {         //if an agent visited a ticket, script.js send market parameter and backgroung.js set it
      marketParameter = marketMapping[request.data];
      // console.log(marketParameter)
      sendResponse({ message: "market variable set" });
    }
    if (request.type == "get_market_variable") {          //if an agent reply to an email, script.js request market paramter and background.js send it
      //console.log(marketParameter)
      sendResponse({
        message: "market variable sent",
        data: marketParameter
      });
    }

  });

//listen click on notification button
chrome.notifications.onButtonClicked.addListener(function (notificationId, buttonIndex) {
  if (notificationId = "onCall") {    //onCall is the name of the notification
    console.log(currentHourCase)
    window.open(baseURL + currentHourCase.caseId, "_blank");
  }

})

/* get HTML table and return a JSON. tableToJSON is an external library https://github.com/lightswitch05/table-to-json */

function getJSON(domHTML) {
  var table = domHTML.querySelector(".reportTable");
  //console.log(table)
  if (table) {
    table = table.outerHTML;
    return $(table).tableToJSON({ ignoreHiddenRows: false }); // Convert the table into a javascript object
  }
  else
    return 0;
}

/* check if an object is empty */

function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key))
      return false;
  }
  return true;
}

/* get all emails from the report */
function GetFullEmailList(response) {

  var domHTML = new DOMParser().parseFromString(response, "text/html");    //parse string response into HTML
  return getJSON(domHTML);

}

/* filter all emails and get only not confirmed email. Not confirmed emails in the report are those one as Email Status is new, unread or read*/
function GetUnreadEmail(allEmail) {

  var currentCase;
  var casesNumbers = [];
  collapsedCases = [];
  allEmail.forEach((e, i) => {
    if (e["Email Status"] != "-") {   //exclude email without status
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
        currentCase["Total Emails"]++;
        currentCase["Emails Indexes"].push(i)
        switch (e["Email Status"]) {                 //mailinda shows New-Unread-Read emails so newEmailCounter is incremented in those cases
          case "New": currentCase["New Emails"]++; newEmailCounter++; break;
          case "Unread": currentCase["Unread Emails"]++; newEmailCounter++; break;
          case "Read": currentCase["Read Emails"]++; newEmailCounter++; break;
          case "Sent": currentCase["Sent Emails"]++; break;
          case "Replied": currentCase["Replied Emails"]++; break;
        }
      }
    }
  })

}

/* notification if you have new email */
function CheckNotification() {

  if (newEmailCounter > oldEmailCounter)
    getNotification = true

  if (getNotification) {
    getNotification = false
    chrome.notifications.create(
      'name-for-notification', {
        type: 'basic',
        iconUrl: 'images/mail_icon.png',
        title: "You have new Email",
        message: String(newEmailCounter) + " new Email"
      },
      function () { }
    );
  }
}


/* set badge text every time request is called*/
function setBadge() {
  chrome.storage.sync.get(['injectionController'], function (result) {
    console.log(result.injectionController);
    if (result.injectionController) {
      if (newEmailCounter == 0) {
        chrome.browserAction.setBadgeText({ text: " " });
      }
      else {
        chrome.browserAction.setBadgeText({ text: String(newEmailCounter) });
        //ghetting controller value from the localstorage
      }
      chrome.browserAction.setBadgeBackgroundColor({ color: [42, 187, 155, 1] }); //green color badge
    } else {
      if (newEmailCounter == 0) {
        chrome.browserAction.setBadgeText({ text: "" });
      }
      else {
        chrome.browserAction.setBadgeText({ text: String(newEmailCounter) });
        //ghetting controller value from the localstorage
      }
      chrome.browserAction.setBadgeBackgroundColor({ color: [255, 0, 0, 255] }); //red color badge
    }
  });

}



/* request_email is the main function: http request to the report to get all the emails */
function request_email() {
  $.get(baseURL + reportURL, function (response) {
    oldEmailCounter = newEmailCounter
    allEmail = GetFullEmailList(response)
    //console.log(allEmail)
    logInSalesforce = false;

    /* request ok and table found */
    if (allEmail) {
      logInSalesforce = true;
      newEmailCounter = 0;
      allEmail.splice(allEmail.length - 2, 2) //clean allEmail object, delete last 2 elements

      GetUnreadEmail(allEmail)
      //console.log(collapsedCases)
      CheckNotification();
      console.log("newEmail: ", newEmailCounter)
      setBadge();

    }
    /* request ok but table not found */
    else {
      console.log("table not found")
    }
  }).fail(function () {
    console.log("request error");
  });
}

/* exec request_email first time when chrome is started or extension is reloaded */
request_email();
/* request every 60 sec */
setInterval(request_email, 60000)





//based on next hour and case report generate an object with the case id and if you are on call
var fireAlert = (Data, today) => {
  var dateChecker = today;
  var myOutput = {
    caseId: "",
    CaseNumber: "",
    oncall: true
  };

  

  Data.forEach(function (element) {
    console.log(today)
    console.log(element["Appointment Date/Time"])
    //if the appoinment has been rescheduled
    console.log(today.includes(element["Appointment Date/Time"]))
    if (element["Rescheduled Appointment Date/Time"].length > 2) {
      
      console.log("inside reschedule")
      //if the rescheduled date is within the next hour
      if (element["Rescheduled Appointment Date/Time"].includes(dateChecker)) {
        console.log("inside reschedule e data checker")
        //if the case status is still not oncall
        if (element.Status != "On Call") {
          myOutput.caseId = element["Case ID"];
          myOutput.caseNumber = element["Case Number"];
          myOutput.oncall = false;
        }
      }
      //if the appoinment has not been rescheduled
      //if  the appoinment date matches the checker
    } else if (element["Appointment Date/Time"].includes(dateChecker)) {
      console.log("inside non reschedule")
      //if the case status is still not oncall
      if (element.Status != "On Call") {
        myOutput.caseId = element["Case ID"];
        myOutput.caseNumber = element["Case Number"];
        myOutput.oncall = false;
      }
    }
  });
  console.log(myOutput);
  return myOutput;

}

function checkOnCall() {
  //retriving date object
  var date = new Date();
  console.log(date)
  //start changing date format into am pm
  var hours = date.getHours();
  var ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  console.log(hours)
  //strTime the next hour in am pm format hour checker
  if (hours == 12) {
    var strTime = "1:00 " + ampm;
  }
  else {
    var strTime = hours + 1 + ":00 " + ampm;
  }

  console.log(strTime)


  var dd = String(date.getDate()).padStart(2, '0');
  var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = date.getFullYear();

  var today = mm + '/' + dd + '/' + yyyy;
  today = today + ' ' + strTime
  console.log(today);
  //if the curent minute is more then 55
  if (date.getMinutes() >= 55) {
    //1- requesting all cases via http request to brendan report
    //2- parse string response into HTML
    //3- return a json of the table 
    //4- eliminating last element of the arry(not useful)  
    //5- fire the function passing the arry of the day cases and the hour checker
    $.get(baseURL + dailyCasesURL, function (response) {  //1
      var alertHTML = new DOMParser().parseFromString(response, "text/html"); //2   
      console.log(alertHTML)
      var mycaseReport = getJSON(alertHTML); //3
      console.log("prima di pop")
      console.log(mycaseReport)
      mycaseReport.pop();//4
      mycaseReport.pop();//4
      console.log("dopo di pop")
      console.log(mycaseReport)
      currentHourCase = fireAlert(mycaseReport, strTime); //5
      if (!currentHourCase.oncall) {
        chrome.notifications.create(
          'onCall', {
            type: 'basic',
            iconUrl: 'images/mail_icon.png',
            title: "Case " + currentHourCase.caseNumber + " is not On Call",
            message: "Click the button and put On Call your case",
            requireInteraction: true,
            buttons: [{
              title: "On Call"
            }
            ]
          },
          function () {
          }
        );
      }
      else{
        console.log("remove notification")
        chrome.notifications.clear('onCall')
      }
    });
  }
}
checkOnCall();
setInterval(checkOnCall, 30000)