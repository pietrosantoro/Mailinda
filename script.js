//content script runs after page load


function test(){
  console.log("sono script.js");

  timeOut = setInterval(function(){
  $.get("https://smbsalesimplementation--uat.cs10.my.salesforce.com/00OJ0000000uj6B", function(response) { 
     // console.log(response);

      


      iframeHTML = response;
      chrome.runtime.sendMessage(iframeHTML)
    });
  },5000)


  if(iframe.length){
    setInterval(function(){
      //var iframeHTML = iframe.contents().find("body").html();
      console.log("mando il messaggio")
      chrome.runtime.sendMessage(iframeHTML)
      iframe.src = iframe.src;
    },4000)
  }

}
  test()