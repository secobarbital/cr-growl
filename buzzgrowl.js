var script_url = 'http://thingbuzz.com/embed/buzz.js';
var load = true;

chrome.extension.sendRequest({state: "current"}, function(response) {
  var scripts = document.getElementsByTagName("script");
  for(i in scripts) {
    if (scripts[i].src == script_url) {
      load = false;
      break;
    }
  }
  
  if (response.state && load) {
    var head = document.getElementsByTagName('head')[0];
    function growl() {
      var growl = document.createElement('script');
      growl.innerHTML = 'new TBZZ.Growl()';
      head.appendChild(growl);
    }
    
    
    var buzz = document.createElement('script');
    buzz.src = script_url;
    buzz.onload = growl;
    head.appendChild(buzz);    
  }
});



