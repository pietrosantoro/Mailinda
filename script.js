//content script runs after page load


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
      if (func01 == "fail" && func02 == "success") {
        clearInterval(buttonLoop);
      }
    }, 2000);
    setTimeout(function () { clearInterval(buttonLoop); }, 10000);
  }
  else {
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
    for (var count = 0; count < emailList.length; count++) {
      if (emailList[count] != undefined) {
        if (emailList[count].style.display != "none") {
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

// function markReadConfirmed(){
//   var targLink  = document.getElementById("00N1Q00000TUWy9_chkbox")
//   if(targLink && targLink.alt != "Checked"){
//     var clickEvent  = document.createEvent('MouseEvents');
//     clickEvent.initEvent('dblclick', true, true);
//     targLink.dispatchEvent(clickEvent);

//     document.getElementById("00N1Q00000TUWy9").checked = true

//     //sfdcPage.save();

//     document.querySelector("[value=' Save ']").click()
//   }


// }

// setTimeout(markReadConfirmed,2000)


// From here we are filling the required fields


// returns the part of salesforce page that contains interesting data
function getActiveFrame() {
  let frame = $('iframe.x-border-panel[src^="https://smbsalesimplementation.my.salesforce.com"]').add('iframe.x-border-panel[src^="/"]').not('iframe.x-border-panel[src*="ResourceCalendar"]').filter(":visible").contents().find("html");
  if (frame.length == 0)
    frame = $("html");
  return frame
}

chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (request.txt === "start") {
      console.log("start message from popup");
      let iframe = getActiveFrame();
      if (iframe[0].querySelector(".pageType").innerText == "Case") {
        console.log(iframe[0].querySelector(".pageType").innerText)
        sendResponse({ message: "inside case" });
      }
      else {
        sendResponse({ message: "outside case" });
      }

    }
    else if (request.txt == "checkTicket") {
      var all_salesforce_fields = {}
      // Get the HTML of the active iFrame
      let iframes = getActiveFrame()
      console.log(iframes)
      // We only need the rows
      let trs = iframes.find('tr');
      //get the mondatory fields from the JSON GitLab 
      let result = request.data["mfields"]
      //separate the fields
      let newresult = new RegExp(result.join("|"));
      //get the rows that contains these fields
      let rows = trs.filter(function (index) {
        return newresult.test($(this).text());
      })
      // Getting the value and the associated label
      let fieldTitle = rows.find("td.labelCol");
      let field = rows.find("td.dataCol");

      //get all the fields from the the top of the active tab
      let allTitles = trs.find("td.labelCol");
      let allfiels = trs.find("td.dataCol");

      for (let i = 0; i < allfiels.length && i < allTitles.length; i++) {
        all_salesforce_fields[allTitles[i].textContent] = allfiels[i].textContent.trim()
      }

      //replace any special caracater with underscore _
      function replaceSpecialChars(string) {
        string = string.replace(/[!"#%&'()*+,./;<=>@[\]^`{|}~\\]/g, "");
        return string.replace(/\s/g, "_");
      }
      //find the tables that are at the bottom
      let pageBlocks = iframes.find(".bPageBlock");

      pageBlocks.each(function (index) {
        let block = $(this);

        let blockName = block.find(".pbTitle").text();
        blockName = blockName.replace(/\s/g, "_");


        let columns = block.find(".headerRow").children();
        let dataRows = block.find(".dataRow");

        for (let rowID = 0; rowID < dataRows.length; rowID++) {

          let cells = dataRows[rowID].children;

          for (let colID = 0; colID < columns.length; colID++) {

            let colName = replaceSpecialChars(columns[colID].textContent);

            let cellText = cells[colID].textContent;


            if (!(all_salesforce_fields[blockName] instanceof Array))
              all_salesforce_fields[blockName] = [];
            if (!(all_salesforce_fields[blockName][rowID] instanceof Object))
              all_salesforce_fields[blockName][rowID] = {};

            all_salesforce_fields[blockName][rowID][colName] = cellText.trim();
          }
        }
      });

      //get the url link 

      //check first the implementation type as the url is in different place for shopping cases
      let implementationType = all_salesforce_fields['Subject'];
      let url = "";
      let adv_name;
      if (implementationType == 'Tag Implementation') {

        try {
          url = iframes[0].querySelector(" table > tbody > tr.dataRow.even.last.first > td:nth-child(4) > a").href
          }
        catch{
          try{
          url = iframes[0].querySelector(" table > tbody > tr.dataRow.even.first > td.dataCell.cellCol3 > a").href
          }
          catch(err){
            try{
              url=document.querySelector("table > tbody > tr.dataRow.even.first > td:nth-child(4) > a").href
            }
            catch{
              url=''
            }
          }
        }
        
        all_salesforce_fields.URL = url

      }

      
      else if (implementationType == 'Shopping Campaign') {
        url = iframes[0].querySelector("#\\30 0N3600000QISDx_ileinner > a").href
        adv_name = iframes[0].querySelector("#cas3_ileinner > a").innerText
        console.log(adv_name)
        all_salesforce_fields.URL = url
        all_salesforce_fields["Advertiser Name"] = adv_name
        console.log("url shopping" + all_salesforce_fields.URL)
      }

      //the whole object that gets all the fields of the case 
      console.log(all_salesforce_fields)
      sendResponse({
        message: "salesforce",
        data: all_salesforce_fields
      });
      // To color or not to color
      for (let i = 0; i < field.length; i++) {
        // Check if the label of this data is one of the mandatory fields
        if (newresult.test(fieldTitle[i].textContent)) {
          let value = field[i].textContent;
          // if it is a select item:
          // use selected option as value
          if ($(field[i]).find("option:visible")[0])
            value = $(field[i]).find("option:visible")[0].textContent;
          // Replace space by _ to have an easier regex test
          value = value.replace(/\s/g, "_");
          // If the data value starts with _, then it is empty
          let check_value = new RegExp("^_");
          // If empty, color. If not, uncolor
          if (check_value.test(value)) {
            $(field[i]).css("background", "red");
          } else {
            $(field[i]).css("background", "none");
          }
        }
      }
    }
    else {
      console.log('Something wrong in send message to script.js !!!')
    }
  })

console.log("script.js")





//performOutboundCall(getCleanNumber("(+39)3343422359"), "IT");