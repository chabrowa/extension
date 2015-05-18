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

