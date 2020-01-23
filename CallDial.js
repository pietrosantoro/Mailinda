console.log("callDial.js")

chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if(request.txt === "call_number"){
        console.log("call number")
        var iframe = document.getElementById("scc_widget_SoftphoneIframe")
        console.log(iframe)
        //iframe.contentWindow.performOutboundCall(getCleanNumber(request.number));
        //$("#ext-comp-1018").contents().find("body").append(decodeURI("**%3Cscript%3E** alert(2)  **%3C/script%3E**"));
        //performOutboundCall(getCleanNumber(request.number));
        var script   = document.createElement("script");
        script.type  = "text/javascript";
        script.text  = "alert('voila!');"               // use this for inline script
        iframe.body.appendChild(script);
        
        }
    }
)



// var scriptTag = "<script>alert('ok');<";
// scriptTag +=  "/script>";
// setTimeout(function(){
//     var iframe = $("#scc_widget_SoftphoneIframe")
//     console.log(iframe)
//     console.log(iframe.contents().find("body"))
//     $("#scc_widget_SoftphoneIframe").contents().find("body").append(decodeURI("**%3Cscript%3E** alert(2)  **%3C/script%3E**"));
//     console.log("after timeout")
// },8000)
 
