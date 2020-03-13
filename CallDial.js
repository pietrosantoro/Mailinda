console.log("callDial.js")


var number;
chrome.storage.sync.get(['number'], function(result) {
    number = result.number
          console.log('Value currently is ' + result.number);
        });

setTimeout(function(){
    //alert("ok")
    var script   = document.createElement("script");
        script.type  = "text/javascript";
        script.text  = "performOutboundCall(getCleanNumber('" + number + "')); setTimeout(function(){ window.close()},4000)"             
        document.body.appendChild(script);
},2000)


