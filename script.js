//content script runs after page load

// http request every 30 seconds
  setInterval(function(){
  $.get("https://smbsalesimplementation--uat.cs10.my.salesforce.com/00OJ0000000uj6B", function(response) { 
      chrome.runtime.sendMessage(response)
    });
  },30000)