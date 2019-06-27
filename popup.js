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
let EmailJSON = bgpage.EmailJSON;
let obj = bgpage.obj

new Vue({
  el: '#app',
  data: {
    obj
  }
})

function test(){
  console.log(obj)

  //$(string_html).appendTo('body')
  //console.log(request_html)

  // every time click in popup, new email goes to 0 and remove badge icon
  chrome.browserAction.setBadgeText({text: ""});
}


test();