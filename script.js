//content script runs after page load

// http request every 30 seconds




  // setInterval(function(){
  // $.get("https://smbsalesimplementation--uat.cs10.my.salesforce.com/00OJ0000000sw5U", function(response) { 
  //     chrome.runtime.sendMessage(response)
  //   });
  // },3000)


  var emailButton = document.querySelector('input[title="Send an Email"]');
  var emailTable = document.querySelector('div[id*="RelatedEmailMessageList"]');
  try {
    if (emailButton && emailTable) {
      var buttonLoop = setInterval(function () {
        var func01 = removeSendEmail(emailButton);
        var func02 = removeEmailDel(emailTable);
        console.log("Function 01:" + func01);
        console.log("Function 02:" + func02);
        if(func01 == "fail" && func02 == "success"){
          clearInterval(buttonLoop);
        }
      }, 2000);
      setTimeout(function(){ clearInterval(buttonLoop);}, 10000);
    }
    else{
      console.log("Code Ended;")
    }
  } catch (e) {
    console.log(e);
  
  }
  
  /* 
   - deleteSendEmail
   This will find the Send an Email button for each case and set its css as Display : none
  */
  function removeSendEmail(foundButton) {
    // Check if the button was found and verify that it is visible
    if (foundButton && foundButton.style.display != "none") {
      // remove it from view
      foundButton.style.display = "none";
      return "success";
    } else return "fail";
  }
  
  function removeEmailDel(foundTable) {
    if (foundTable) {
      var emailList = foundTable.querySelectorAll('a[title*="Delete - "]');
      for (var count=0;count<emailList.length;count++) {
        if(emailList[count] != undefined){
          if(emailList[count].style.display != "none"){
            emailList[count].style.display = "none";
          }
        }
      }
      return "success";
    } else return "fail";
  }



//   function salesforceId(){
//     document.querySelector(".ics-ghosting-ghost").addEventListener("click", _=>{
//       document.querySelector("[ng-model='$ctrl.justificationType']").setAttribute("aria-label","Justification type: Salesforce ID")
//       document.querySelector("[ng-model='$ctrl.justificationType'] > md-select-value > span > div").innerHTML = "Salesforce ID";




     
//       var text = document.execCommand('paste')
//       console.log(text)

//     })
//   }
  
  
// setTimeout(salesforceId,1000)
  
function markReadConfirmed(){
  var targLink  = document.getElementById("00N1Q00000TUWy9_chkbox")
  if(targLink && targLink.alt != "Checked"){
    var clickEvent  = document.createEvent('MouseEvents');
    clickEvent.initEvent('dblclick', true, true);
    targLink.dispatchEvent(clickEvent);

    document.getElementById("00N1Q00000TUWy9").checked = true

    //sfdcPage.save();

    document.querySelector("[value=' Save ']").click()
  }


}

setTimeout(markReadConfirmed,2000)





function setMarketParameter(){
  let market = document.getElementById("00N3600000QISBE_ileinner")
  if(market){
    console.log(market.innerText)
    /* send a message to background script to set marketParameter */
    chrome.runtime.sendMessage(
      {
      type: "set_market_variable",
      data: market.innerText
      },
       function(response) {
      console.log(response.message);
    });
  }
  else{
    console.log("no market detected")
    
  }
}





//function to change the sender on the email setting the market one as a default
// //marketParameter is setted in Mailinda on every access to the ticket based on the market 
const changingSender = () => {
  let fromEmail = document.querySelector("#p26")
  if(fromEmail){
    let marketParameter;
    /* send a message to background script to get marketParameter */
      chrome.runtime.sendMessage(
      {
      type: "get_market_variable",
    },
    function(response) {
      marketParameter=response.data
      console.log(response.message);
      fromEmail.autofocus = true;
      let marketLabel = marketParameter;
      let marketSelector = "web-implementation-support-emea-cts-" +marketLabel;
      let selectedMarket = document.querySelector(`[value^=${marketSelector}]`);
      let defaultMarket = document.querySelector('[selected="selected"]');
      defaultMarket.removeAttribute("selected");
      selectedMarket.setAttribute("selected", "selected");
      console.log("from email changed")
    });
  }
}


setMarketParameter();
changingSender();


  console.log("script.js")