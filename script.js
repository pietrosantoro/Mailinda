//content script runs after page load


function test(){

  // http request every 10 seconds
  setInterval(function(){
  $.get("https://smbsalesimplementation--uat.cs10.my.salesforce.com/00OJ0000000uj6B", function(response) { 
     // console.log(response);

      iframeHTML = response;
      chrome.runtime.sendMessage(iframeHTML)
    });
  },10000)

}
  test()