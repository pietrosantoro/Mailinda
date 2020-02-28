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

var check_first_component = true
var ghostforce_active = false;

var all_salesforce_fields
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
    tabs: ['New Email', 'Ghost Force', 'GTM Injector','Email Template'],    //tab present in menu
    ghostforce_active,
    all_salesforce_fields

  },
  asyncComputed: {
    currentTabComponent: function () {
      document.documentElement.style.setProperty('--tabNumber', this.tabs.length);      //set CSS variable in popup.css placed in :root
      //every time the popup is clicked, we checked the first component to load. If we are inside a salesforce ticket page, first component will be ghostforce
      if (check_first_component) {
        function check() {
          console.log("dentro check")
          return new Promise(resolve => {
            chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
              var activeTab = tabs[0];
              chrome.tabs.sendMessage(activeTab.id, {
                txt: "start"
              },
                function (response) {
                  //Message sent to script. If script response is an error is because we are not inside a salesforce ticket so we load new email as first component
                  if (chrome.runtime.lastError) {
                    var new_tab = "New Email"
                    ghostforce_active = false;
                    resolve(new_tab)
                    console.log(new_tab)
                  }
                  else if (response.message == "inside case") {
                    //click on extension from salesforce ticket, so we load ghostforce as first component and we ask to gitlab for mandatory fields
                    fetch('http://35.228.175.186/process_data/general-data/raw/master/process.json')
                      .then(response => response.json())
                      .then(data => {
                        //call the function that sets the background color
                        let msg = {
                          data: data,
                          txt: "checkTicket"
                        }
                        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                          chrome.tabs.sendMessage(tabs[0].id, msg,
                            function (response) {
                              all_salesforce_fields = response.data
                              var new_tab = "Ghost Force"
                              ghostforce_active = true
                              resolve(new_tab)
                              console.log(new_tab)
                            });
                        });
                      })
                      .catch(err => {
                        //handle the error
                        console.log(' Cant fetch the JSON file, Im inside popup.js')
                      })

                  }
                  else {
                    var new_tab = "New Email"
                    ghostforce_active = false;
                    resolve(new_tab)
                    console.log(new_tab)
                  }
                });
            });
          });
        }
        var result = check();
        this.currentTab = result.then(async function (data) {
          console.log(data)
          return data.replace(" ", "").toLowerCase();
        })
        check_first_component = false;
        return this.currentTab
      }
      else {
        return this.currentTab.replace(" ", "").toLowerCase();
      }


    },
    emailfetch: function(){
      console.log("email fetched")
    }
  }
});

function test() {
  console.log(collapsedCases);
  console.log(collapsedCases.length);
  console.log(newEmailCounter);
}

//test();