var config = require('../config');
var Handlebars = require('handlebars');
var html2canvas = require('html2canvas');
window.html2canvas = html2canvas;

var body = document.body;
var opponentsListSource =
  "<div class='list-opponents'>" +
  " {{#each opponents}}" +
  "   <div class='opponent' id='{{@key}}'>" +
  "     <div>{{username}}</div>" +
  "     <div>{{profile.className}}</div>" +
  "   </div>" +
  " {{else}}" +
  "   <div class='no-opponent'>No opponent here</div>" +
  " {{/each}}" +
  "</div>";
var opponentsListTemplate = Handlebars.compile(opponentsListSource);


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
      var opponents = {opponents: {
        id1: {
          username: "Player1",
          profile: {
            className: "troll"
          }
        },
        id2: {
          username: "Player2",
          profile: {
            className: "troll"
          }
        },
        id3: {
          username: "Player3",
          profile: {
            className: "troll"
          }
        }
      }};
      var result = opponentsListTemplate(opponents);
      var old = document.getElementsByClassName('list-opponents')[0];
      if (old) body.removeChild(old);
      body.innerHTML += result;

      initEventListeners();
    });
  }

});

function initEventListeners() {
  var list = document.getElementsByClassName('list-opponents')[0];
  var opponents = list.querySelectorAll('.opponent');
  for (var i = 0; i < opponents.length; i++) {
    var opponent = opponents[i];
    var id = opponent.id;
    opponent.addEventListener('click', function() {
      console.log('fight with : ' + id);
      html2canvas(body).then(function(canvas) {
        canvas.id = "background-canvas";
        body.appendChild(canvas);
      });
    });
  };
}

  /*
  */
