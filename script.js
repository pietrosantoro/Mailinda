//content script runs after page load

console.log("sono script.js");

chrome.storage.sync.get('color', function(data) {
    console.log(data.color)
  });