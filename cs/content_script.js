(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var config = require('../config');

var setChromeStorage = function(obj) {
  chrome.storage.sync.set({'game_user': obj}, function () {
    console.log("Just logged, put on the storage");
  });
};

var storageHandler = function(event) {
  event = event || window.event;
  var user = JSON.parse(event.newValue);

  setChromeStorage(user);
};

if (window.location.hostname === config.url) {
  var user = window.localStorage.game_user && JSON.parse(window.localStorage.game_user);

  if (user) {
    setChromeStorage(user);
  }

  // Associate the event to an event handler.
  if (window.addEventListener) {
    window.addEventListener("storage", storageHandler, false);
  } else {
    window.attachEvent("onstorage", storageHandler);
  }
}


},{"../config":2}],2:[function(require,module,exports){
module.exports = {
  url: "localhost"
};
},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvY3MvY29udGVudF9zY3JpcHQuanMiLCJzcmMvY29uZmlnLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUJBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgY29uZmlnID0gcmVxdWlyZSgnLi4vY29uZmlnJyk7XG5cbnZhciBzZXRDaHJvbWVTdG9yYWdlID0gZnVuY3Rpb24ob2JqKSB7XG4gIGNocm9tZS5zdG9yYWdlLnN5bmMuc2V0KHsnZ2FtZV91c2VyJzogb2JqfSwgZnVuY3Rpb24gKCkge1xuICAgIGNvbnNvbGUubG9nKFwiSnVzdCBsb2dnZWQsIHB1dCBvbiB0aGUgc3RvcmFnZVwiKTtcbiAgfSk7XG59O1xuXG52YXIgc3RvcmFnZUhhbmRsZXIgPSBmdW5jdGlvbihldmVudCkge1xuICBldmVudCA9IGV2ZW50IHx8IHdpbmRvdy5ldmVudDtcbiAgdmFyIHVzZXIgPSBKU09OLnBhcnNlKGV2ZW50Lm5ld1ZhbHVlKTtcblxuICBzZXRDaHJvbWVTdG9yYWdlKHVzZXIpO1xufTtcblxuaWYgKHdpbmRvdy5sb2NhdGlvbi5ob3N0bmFtZSA9PT0gY29uZmlnLnVybCkge1xuICB2YXIgdXNlciA9IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2FtZV91c2VyICYmIEpTT04ucGFyc2Uod2luZG93LmxvY2FsU3RvcmFnZS5nYW1lX3VzZXIpO1xuICBcbiAgaWYgKHVzZXIpIHtcbiAgICBzZXRDaHJvbWVTdG9yYWdlKHVzZXIpO1xuICB9XG4gIFxuICAvLyBBc3NvY2lhdGUgdGhlIGV2ZW50IHRvIGFuIGV2ZW50IGhhbmRsZXIuXG4gIGlmICh3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcikge1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwic3RvcmFnZVwiLCBzdG9yYWdlSGFuZGxlciwgZmFsc2UpO1xuICB9IGVsc2Uge1xuICAgIHdpbmRvdy5hdHRhY2hFdmVudChcIm9uc3RvcmFnZVwiLCBzdG9yYWdlSGFuZGxlcik7XG4gIH1cbn1cblxuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIHVybDogXCJsb2NhbGhvc3RcIlxufTsiXX0=
