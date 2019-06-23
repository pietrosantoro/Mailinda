//content script runs after page load


function test(){
  console.log("sono script.js");
 // window.alert("page load");
  var calendar = document.querySelector(".dhx_cal_data")
  //calendar.style.color = "red";
  var date = new Date();
  var day = date.getDay();
  //window.alert(day)

  //var iframe = document.querySelector("[src='/00OJ0000000uj6B?isdtp=vw&isWsVw=true&retURL=%2F00OJ0000000uj6B&cancelURL=%2F00OJ0000000uj6B&nonce=494ba041806bc5189ce35c8c2ffc40803fbe9a9eb698003002b215882c5b3f21&sfdcIFrameOrigin=https%3A%2F%2Fsmbsalesimplementation--uat.cs10.my.salesforce.com']")
  var iframeHTML;
  var iframe = $('#iframe1');
  console.log(iframe.length)
  $.get("http://pietrosantoro.altervista.org/test.html", function(response) { 
    console.log(response);
    iframeHTML = response;
  });
  if(iframe.length){
    setInterval(function(){
      //var iframeHTML = iframe.contents().find("body").html();
      console.log("mando il messaggio")
      chrome.runtime.sendMessage(iframeHTML)
      iframe.src = iframe.src;
    },4000)
  }

}

/*chrome.storage.sync.get('color', function(data) {
    console.log(data.color)
  });
*/


  test();