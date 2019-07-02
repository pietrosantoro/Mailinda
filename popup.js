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

new Vue({
  el: '#app',
  data: {
    collapsedCases,
    newEmailCounter
  },
  methods:{
    clickCase(caseUrl){
      var completeUrl = baseURL + caseUrl;
      window.open(completeUrl, '_blank');
    }
  }
})

function test(){
  console.log(baseURL)
  console.log(collapsedCases)
  console.log(collapsedCases.length)
  // every time click in popup remove badge icon
  chrome.browserAction.setBadgeText({text: ""});
}


test();

/*
function emailRequest(){
  $.get("https://smbsalesimplementation--uat.cs10.my.salesforce.com/500J000000KP2i2", function(response) { 
      //changing the variable
      var caseHtml = response;
      //trasforming the response in html
      var caseDom = new DOMParser().parseFromString(caseHtml, "text/html");
      //selecting all emails elements from the dom
      var mailElements =  caseDom.querySelectorAll('.caseEventBody .feeditemtext');
      var mailObjects = [];
      var singleMailObject = {};
      mailElements.forEach(function(element){
          singleMailObject = {date: "standard", body: element.innerText };
          mailObjects.push(singleMailObject);
      });
      console.log(mailObjects);
      });
}
*/