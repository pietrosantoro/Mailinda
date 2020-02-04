// //marketParameter is setted in Mailinda on every access to the ticket based on the market 
function setMarketParameter() {
  let market = document.getElementById("00N3600000QISBE_ileinner")
  console.log(market)
  if (market) {
    //console.log(market.innerText)
    /* send a message to background script to set marketParameter */
    chrome.runtime.sendMessage(
      {
        type: "set_market_variable",
        data: market.innerText
      },
      function (response) {
        //console.log(response.message);
      });
  }
  else {
    console.log("no market detected")

  }
}





//function to change the sender on the email setting the market one as a default

const changingSender = () => {
  let fromEmail = document.querySelector("#p26")
  if (fromEmail) {
    let marketParameter;
    /* send a message to background script to get marketParameter */
    chrome.runtime.sendMessage(
      {
        type: "get_market_variable",
      },
      function (response) {
        marketParameter = response.data
        //console.log(response.message);
        fromEmail.autofocus = true;
        let marketLabel = marketParameter;
        let marketSelector = "web-implementation-support-emea-cts-" + marketLabel;
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