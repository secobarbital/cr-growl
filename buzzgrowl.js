var head = document.getElementsByTagName('head')[0];
function growl() {
  var growl = document.createElement('script');
  growl.innerHTML = 'new TBZZ.Growl()';
  head.appendChild(growl);
}
var buzz = document.createElement('script');
buzz.src = 'http://thingbuzz.com/embed/buzz.js';
buzz.onload = growl;
head.appendChild(buzz);
