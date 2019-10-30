// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

/*let changeColor = document.getElementById('changeColor');
chrome.storage.sync.get('color', function(data) {
  changeColor.style.backgroundColor = data.color;
  changeColor.setAttribute('value', data.color);
});
*/
let bgpage = chrome.extension.getBackgroundPage(); //background page
let request_html = bgpage.request_html;
let string_html = String(request_html)
let allEmail = bgpage.allEmail
let newEmail = bgpage.newEmail
let collapsedCases = bgpage.collapsedCases
let baseURL = bgpage.baseURL
let newEmailCounter = bgpage.newEmailCounter
let logInSalesforce = bgpage.logInSalesforce


new Vue({
  el: '#app',
  data: {
    collapsedCases,
    newEmailCounter,
    logInSalesforce,
    allEmail,
    bgpage
  },
  methods:{
    clickCase(caseUrl,index){
      var completeUrl = baseURL + caseUrl;
      //newEmailCounter -= collapsedCases[index]["New Emails"];
      //bgpage.newEmailCounter -= collapsedCases[index]["New Emails"];
      //collapsedCases.splice(index,1);
      // if(newEmailCounter != 0)
      //   chrome.browserAction.setBadgeText({text: String(newEmailCounter)});
      // else
      //   chrome.browserAction.setBadgeText({text: ""});      //set the badge to an empty string if there is no new email
      window.open(completeUrl, '_blank');
    },
    refresh(){
      bgpage.request();       //call request when click refresh button
      setTimeout(function(){
        location.reload();
      },500);

    },
    collapseEmail(index){     //collapse single email when table row is clicked
      var selector = ".test" + index;
      $(selector).toggleClass('active');
    }
  }
})

function test(){
  console.log(collapsedCases)
  console.log(collapsedCases.length)
  console.log(newEmailCounter);
}

test();

 
// function emailRequest(){
//   $.get("https://smbsalesimplementation--uat.cs10.my.salesforce.com//02sJ0000007CP46", function(response) { 
//       //changing the variable
//       var caseHtml = response;
//       //trasforming the response in html
//       var caseDom = new DOMParser().parseFromString(caseHtml, "text/html");
//     console.log(caseDom)
//       //selecting all emails elements from the dom
//       var mailElements =  caseDom.querySelectorAll('.caseEventBody .feeditemtext');
//       var mailObjects = [];
//       var singleMailObject = {};
//       mailElements.forEach(function(element){
//           singleMailObject = {date: "standard", body: element.innerText };
//           mailObjects.push(singleMailObject);
//       });
//       console.log(mailObjects);
//       });
// }
// emailRequest();







//vedo cosa mi ritorna il report
function getJSON(domHTML){
  var table = domHTML.querySelector(".reportTable");
  //console.log(table)
  if(table){
    table = table.outerHTML;
    //console.log($(table).tableToJSON({ignoreHiddenRows: false}))
    return $(table).tableToJSON({ignoreHiddenRows: false}); // Convert the table into a javascript object
  }
  else
    return 0;
}


//based on naext hour and case report generate an object with the case id and if you are on call
var fireAlert = (Data, date) => {
  var inprogressChecker = false;
  var currentCase = "";
  var dateChecker = date;
var myOutput = {
    caseId: "",
    oncall: true

  };
  
  Data.forEach(function(element) {
    //if the appoinment has not been rescheduled
      if(element["Rescheduled Appointment Date/Time"].length > 2 ) {
        //if the rescheduled date is within the next hour
        if(element["Rescheduled Appointment Date/Time"].includes(dateChecker)) {
          //if the case status is still not oncall
          if (element.Status != "On Call") {
            currentCase = element["Case ID"];
           }  
         
        }
      //if the appoinment has not been rescheduled
        //if  the appoinment date matches the checker
      } else if (element["Appointment Date/Time"].includes(dateChecker)) {
        //if the case status is still not oncall
         if (element.Status != "On Call") {
          currentCase = element["Case ID"];
         }  
      }
    }); 
    //if myCase.lengt > 1 
    if(currentCase.length > 1) {
      //inprogress checker = true
      inprogressChecker = false;
       //else
    } else {
      //inprogress checker = false
      inprogressChecker = true;
    }
    myOutput.caseId = currentCase;
    myOutput.oncall = inprogressChecker;
    console.log(myOutput);
    return myOutput;

}

const returnDate = () => {
  //restriving date object
  var date = new Date();
  //start changing date format into am pm
  var hours = date.getHours();
  var ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  //strTime the next hour in am pm format hour checker
  var strTime = hours+1  + ":00 "+ ampm;

  //if the curent minute is more then 55
  if(date.getMinutes() > 55) {
  //1- requesting all cases via http request to brendan report
    //2- parse string response into HTML
      //3- return a json of the table 
        //4- eliminating last element of the arry(not useful)  
          //5- fire the function passing the arry of the day cases and the hour checker
  $.get('https://smbsalesimplementation.my.salesforce.com/00O1Q000007WYvy', function(response) {  //1
    var alertHTML = new DOMParser().parseFromString(response, "text/html"); //2   
    var mycaseReport = getJSON(alertHTML); //3
    mycaseReport.pop();//4
    mycaseReport.pop();//4
     fireAlert(mycaseReport, strTime); //5
   });
}
}
returnDate();










