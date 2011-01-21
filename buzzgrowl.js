var buzz_js = 'http://thingbuzz.com/embed/buzz.js';

function hasScript(script_url) {
  var script_tags = document.getElementsByTagName('script');
  for (var i=0; i<script_tags.length; i++) {
    if (script_tags[i].src == script_url) {
      break;
    }
  }
  return (i < script_tags.length);
}

function injectScript(script_url) {
  var buzz = document.createElement('script');
  buzz.src = script_url;
  buzz.onload = newGrowl;
  document.head.appendChild(buzz);
}

function newGrowl() {
  var growl = document.createElement('script');
  growl.innerHTML = "new TBZZ.Growl({token: '2313d3858ac9077e1429906d12fd57b1'})";
  document.head.appendChild(growl);
}

function initGrowl(response) {
  if (response.state && !hasScript(buzz_js)) {
    updateGrowl(response);
  }
}

function updateGrowl(request) {
  if (request.state) {
    if (hasScript(buzz_js)) {
      if (!document.getElementsByClassName('buzz_growl').length) {
        newGrowl();
      }
    } else {
      injectScript(buzz_js);
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

if (!document.location.hostname.match(/(?:^|\.)(?:facebook|twitter)\.com$/)) {
  chrome.extension.sendRequest({state: 'current'}, initGrowl);
}
