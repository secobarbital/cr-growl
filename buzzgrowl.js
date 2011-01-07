var script_url = 'http://thingbuzz.com/embed/buzz.js';

function newGrowl() {
  var growl = document.createElement('script');
  growl.innerHTML = 'new TBZZ.Growl({delay: 0, animation: "none"})';
  document.head.appendChild(growl);
}

function initGrowl(response) {
  var script_tags = document.getElementsByTagName('script');
  for (var i=0; i<script_tags.length; i++) {
    if (script_tags[i].src == script_url) {
      break;
    }
  }
  if (i == script_tags.length) {
    var buzz = document.createElement('script');
    buzz.src = script_url;
    buzz.onload = newGrowl;
    document.head.appendChild(buzz);
    updateGrowl(response);
  }
}

function updateGrowl(request) {
  if (request.state) {
    if (!document.getElementsByClassName('buzz_growl').length) {
      newGrowl();
    }
  } else {
    var growl_divs = document.getElementsByClassName('buzz_growl');
    for (var i=0; i<growl_divs.length; i++) {
      growl_divs[i].parentNode.removeChild(growl_divs[i]);
    }
  }
}

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
  updateGrowl(request);
  sendResponse({});
});

if (!document.location.hostname.match(/(?:^|\.)(?:facebook|google|twitter)\.com$/)) {
  chrome.extension.sendRequest({state: 'current'}, initGrowl);
}
