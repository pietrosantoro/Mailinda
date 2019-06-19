//content script runs after page load


function test(){
  console.log("sono script.js");
 // window.alert("page load");
  var calendar = document.querySelector(".dhx_cal_data")
  //calendar.style.color = "red";
  var date = new Date();
  var day = date.getDay();
  //window.alert(day);

  setTimeout(function(){
    var day_column = document.querySelector(".dhx_scale_holder_now");
    if(day_column)
      day_column.style.backgroundImage = "url('https://www.publicdomainpictures.net/pictures/200000/velka/plain-red-background.jpg')";
  },3000)
  
}

chrome.storage.sync.get('color', function(data) {
    console.log(data.color)
  });



  test();