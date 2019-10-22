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


var fireAlert = (Data, date) => {
  var inprogressChecker = false;
  var currentCase = "";
  var dateChecker = "";
  console.log(dateChecker);
  var myOutput = {
    caseId: "",
    oncall: true

  };
  //loppo nella array d oggetti
  Data.records.forEach(function(element) {
    //depending on wich team is managing the task
    if(element.Resource_location__c == "Dublin Team") {
      dateChecker = (date.getHours()).toString();
      console.log(`dublin time: ${dateChecker}`);
    } else {
      dateChecker = (date.getHours() +1).toString();
      console.log(`krakow time: ${dateChecker}`);
    }
    //if the appoinment has not been rescheduled
      if(element.Rescheduled_Appointment_Date_Time__c != null ) {
        //if the rescheduled date is within the next hour
        
        if(element.Rescheduled_Appointment_Date_Time__c.match(/\T(.*)/)[0].includes(dateChecker)) {
          //if the case status is still not oncall
          
          if (element.Status != "On Call") {
          
            currentCase = element.Id;
           
          }  
         
        }
      //if the appoinment has not been rescheduled
        //if  the appoinment date matches the checker
      } else if (element.Appointment_Date__c.match(/\T(.*)/)[0].includes(dateChecker)) {
        
         //if the case status is still not oncall
         if (element.Status != "On Call") {
          
          currentCase = element.Id;
         
          
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

const returnDate = (ldap) => {
var date = new Date();
if(date.getMinutes()) {
  //requesting day cases via api
  $.getJSON(`https://msito-dot-msite-incubator.appspot.com/api/salesforce?ldap=${ldap}`, function(data) {

   fireAlert(data, date);
  });
}
}
returnDate("llando");












