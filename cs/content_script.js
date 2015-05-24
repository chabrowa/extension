(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var config = require('../config');

var setChromeStorage = function(obj) {
  chrome.storage.sync.set({'game_user': obj}, function () {
    console.log("Just logged, put on the storage", obj);
  });
};

var storageHandler = function(event) {
  event = event || window.event;
  var user = JSON.parse(event.newValue);
  console.log(user)
  //setChromeStorage(user);
};

if (window.location.hostname === config.url) {
  //get the user from the local storage
  var user = window.localStorage.getItem('game_user') && JSON.parse(window.localStorage.getItem('game_user'));

  if (user) {
    //set the user in the chrome storage to be accessed by the background script
    setChromeStorage(user);
  }

  //listened to change in the localStorage
  if (window.addEventListener) {
    window.addEventListener("storage", storageHandler, false);
  } else {
    window.attachEvent("onstorage", storageHandler);
  }
}

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
  if (msg.show_opponents) {
    chrome.runtime.sendMessage({get: "opponents"}, function(response) {
      console.log(response);
    });
  }

});

  /*
  html2canvas(document.body).then(function(canvas) {
    document.body.appendChild(canvas);
});*/

},{"../config":2}],2:[function(require,module,exports){
module.exports = {
  url: "zombie-game.meteor.com"
};

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvY3MvY29udGVudF9zY3JpcHQuanMiLCJzcmMvY29uZmlnLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0NBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBjb25maWcgPSByZXF1aXJlKCcuLi9jb25maWcnKTtcblxudmFyIHNldENocm9tZVN0b3JhZ2UgPSBmdW5jdGlvbihvYmopIHtcbiAgY2hyb21lLnN0b3JhZ2Uuc3luYy5zZXQoeydnYW1lX3VzZXInOiBvYmp9LCBmdW5jdGlvbiAoKSB7XG4gICAgY29uc29sZS5sb2coXCJKdXN0IGxvZ2dlZCwgcHV0IG9uIHRoZSBzdG9yYWdlXCIsIG9iaik7XG4gIH0pO1xufTtcblxudmFyIHN0b3JhZ2VIYW5kbGVyID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgZXZlbnQgPSBldmVudCB8fCB3aW5kb3cuZXZlbnQ7XG4gIHZhciB1c2VyID0gSlNPTi5wYXJzZShldmVudC5uZXdWYWx1ZSk7XG4gIGNvbnNvbGUubG9nKHVzZXIpXG4gIC8vc2V0Q2hyb21lU3RvcmFnZSh1c2VyKTtcbn07XG5cbmlmICh3aW5kb3cubG9jYXRpb24uaG9zdG5hbWUgPT09IGNvbmZpZy51cmwpIHtcbiAgLy9nZXQgdGhlIHVzZXIgZnJvbSB0aGUgbG9jYWwgc3RvcmFnZVxuICB2YXIgdXNlciA9IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZ2FtZV91c2VyJykgJiYgSlNPTi5wYXJzZSh3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2dhbWVfdXNlcicpKTtcblxuICBpZiAodXNlcikge1xuICAgIC8vc2V0IHRoZSB1c2VyIGluIHRoZSBjaHJvbWUgc3RvcmFnZSB0byBiZSBhY2Nlc3NlZCBieSB0aGUgYmFja2dyb3VuZCBzY3JpcHRcbiAgICBzZXRDaHJvbWVTdG9yYWdlKHVzZXIpO1xuICB9XG5cbiAgLy9saXN0ZW5lZCB0byBjaGFuZ2UgaW4gdGhlIGxvY2FsU3RvcmFnZVxuICBpZiAod2luZG93LmFkZEV2ZW50TGlzdGVuZXIpIHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInN0b3JhZ2VcIiwgc3RvcmFnZUhhbmRsZXIsIGZhbHNlKTtcbiAgfSBlbHNlIHtcbiAgICB3aW5kb3cuYXR0YWNoRXZlbnQoXCJvbnN0b3JhZ2VcIiwgc3RvcmFnZUhhbmRsZXIpO1xuICB9XG59XG5cbmNocm9tZS5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcihmdW5jdGlvbihtc2csIHNlbmRlciwgc2VuZFJlc3BvbnNlKSB7XG4gIGlmIChtc2cuc2hvd19vcHBvbmVudHMpIHtcbiAgICBjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZSh7Z2V0OiBcIm9wcG9uZW50c1wifSwgZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcbiAgICB9KTtcbiAgfVxuXG59KTtcblxuICAvKlxuICBodG1sMmNhbnZhcyhkb2N1bWVudC5ib2R5KS50aGVuKGZ1bmN0aW9uKGNhbnZhcykge1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY2FudmFzKTtcbn0pOyovXG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgdXJsOiBcInpvbWJpZS1nYW1lLm1ldGVvci5jb21cIlxufTtcbiJdfQ==
