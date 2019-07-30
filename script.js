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


  console.log("script.js")