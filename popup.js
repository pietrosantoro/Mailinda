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

var ghostforce_active = true;

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
    tabs: ['New Email', 'Ghost Force', 'GTM injector', 'Junior SME'],    //tab present in menu
    ghostforce_active
  },
  computed: {
    currentTabComponent: function () {
      //if agent is inside a ticket, the first component loaded is gonna be ghostforce
      if (this.ghostforce_active) {
        const new_tab = 'Ghost Force';
        //this.tabs = [new_tab].concat(this.tabs)   //new tab added to the tabs menu
        this.currentTab = new_tab                 //current tab is Ghostforce
        this.ghostforce_active = false;
      }

      document.documentElement.style.setProperty('--tabNumber', this.tabs.length);      //set CSS variable in popup.css placed in :root
      //console.log(this.currentTab)
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













