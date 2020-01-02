// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

"use strict";

/*let changeColor = document.getElementById('changeColor');
chrome.storage.sync.get('color', function(data) {
  changeColor.style.backgroundColor = data.color;
  changeColor.setAttribute('value', data.color);
});
*/
var bgpage = chrome.extension.getBackgroundPage(); //background page
var allEmail = bgpage.allEmail;
var collapsedCases = bgpage.collapsedCases;
var baseURL = bgpage.baseURL;
var newEmailCounter = bgpage.newEmailCounter;
var logInSalesforce = bgpage.logInSalesforce;

new Vue({
  el: "#app",
  component: {
    newemail,
    ghostforce,
    emailtemplate,
    juniorsme,
    knowledgebase,
    gtminjector

  },
  data: {
    bgpage,
    currentTab: 'New Email',
    tabs: ['New Email', 'GTM injector', 'Junior SME']
  },
  computed: {
    currentTabComponent: function () {
      return this.currentTab.replace(" ", "").toLowerCase()
    }
  }
});

function test() {
  console.log(collapsedCases);
  console.log(collapsedCases.length);
  console.log(newEmailCounter);
}

//test();

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













