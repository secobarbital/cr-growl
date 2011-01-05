var head = document.getElementsByTagName('head')[0];
var buzz = document.createElement('script');
buzz.src = 'http://thingbuzz.com/embed/buzz.js';
head.appendChild(buzz);
var growl = document.createElement('script');
growl.innerHTML = 'new TBZZ.Growl()';
head.appendChild(growl);
