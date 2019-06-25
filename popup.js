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

new Vue({
  el: '#app',
  data: {
    todos: [
      {
        caseid: 1,
        title: 'Do the dishes',
        status: 'in queue'

      },
      {
        caseid: 2,
        title: 'Take out the trash',
        status: 'in queue'
      },
      {
        caseid: 3,
        title: 'Mow the lawn',
        status: 'in queue'
      }
    ],
  },
})

//var source = $("#renderHtml").html();
//console.log(source)
//$("#myHtml").html(template(my_obj.obj[0]))
//console.log(template({my_obj}))
//var allDiv = string_html.find("div");
//console.log(allDiv)

function test(){
  console.log("sono popup.js");


  console.log(string_html)
  //$(string_html).appendTo('body')
  //console.log(request_html)

  // every time click in popup, new email goes to 0 and remove badge icon
  bgpage.newEmailCounter = 0;
  chrome.browserAction.setBadgeText({text: ""});
}


test();