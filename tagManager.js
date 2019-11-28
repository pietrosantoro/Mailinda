
//CREATING A SCRIPT ELEMENT AND EXECUTING THE CODE INSIDE IT
//THIS IS TO AVOID MISSING PAGEVIEWS OR EVENTS


const gtmInjection = (gtmId) => {
    //selection the dom element to appen the gtm script
    var head = document.querySelector('head');
    //creating a script element to inject the gtm function
    var gtmScript = document.createElement("script");
    //content of the gtm script with id
    var code = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
   new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
   j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
   'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
   })(window,document,'script','dataLayer','${gtmId}');`
    //giving type to the gtm script
    gtmScript.type = 'text/javascript';
    //giving id to gtm script
    gtmScript.id = 'gtmInjector';
    //appending the script to the head tag valorized with the instolled variable
    gtmScript.appendChild(document.createTextNode(code));
    //appending the script valorized
    head.appendChild(gtmScript);
}

//ghetting controller value from the localstorage
chrome.storage.sync.get(['injectionController'], function (result) {
    //if the controller value is true i am injecting the tag manager
    if (result.injectionController) {

        chrome.storage.sync.get(['gtm'], function (result) {

            gtmInjection(result.gtm);


        });
    } else {
        console.log('Injector inactive');
    }
});










