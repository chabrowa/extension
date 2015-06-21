var config = require('../config');
var Handlebars = require('handlebars');
var html2canvas = require('html2canvas');

var body = document.body;
var opponentsListSource =
  "<div class='list-opponents' style='position: fixed; top:0; width: 400px; background: #000; color: #FFF;'>" +
  " {{#each opponents}}" +
  "   <div class='opponent' id='{{@key}}' style='height: 65px; '>" +
  "     <div>{{username}}</div>" +
  "     <div>{{className}} [{{level}}]</div>" +
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
  window.addEventListener("storage", storageHandler, false);
}

var user = null;
var opponents = null;
chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
  if (msg.show_opponents) {
    chrome.runtime.sendMessage({get: "opponents"}, function(response) {
      opponents = response.opponents;
      user = response.me;
      var result = opponentsListTemplate(response.opponents);
      var old = document.getElementsByClassName('list-opponents')[0];
      if (old) body.removeChild(old);
      body.innerHTML += result;
      initEventListeners();
    });
  }

});

function initEventListeners() {
  var list = document.getElementsByClassName('list-opponents')[0];
  var opponentsList = list.querySelectorAll('.opponent');
  for (var i = 0; i < opponentsList.length; i++) {
    var opponent = opponentsList[i];
    var id = opponent.id;
    opponent.addEventListener('click', function() {
      console.log('fight with : ' + opponents[id]);
      html2canvas(body).then(function(background) {
        var fight = initFight(background, user, opponents[id]);
        var resultFight = fight(user, opponents[id]);
        body.appendChild(fight);
        setTimeout(function() {
          background.style.transform = 'rotateX(85deg)';
        }, 1000);
        chrome.runtime.sendMessage({fight: resultFight}, function(response) {});
      });
    });
  }
}

function initFight(background) {
  var fight = document.createElement('div');
  fight.style.width = window.innerWidth + 'px';
  fight.style.height = window.innerHeight + 'px';
  fight.style.background = '#000';
  fight.id = "fight-canvas";
  fight.style.zIndex   = 10000;
  fight.style.position = "fixed";
  fight.style.overflow = 'hidden';
  fight.style.top = 0;
  background.style.transform = 'rotateX(0deg)';
  background.style.transformOrigin = 'bottom';
  background.style.transition = 'transform 0.5s ease-out';
  background.style.position = "absolute";
  background.style.bottom = 0;
  fight.appendChild(background);
  return fight
}

function nextStrike(user) {
  return 10 + 100 / (user.speed || 10);
}

function fight(user1, user2) {
  var hp_user1 = user1.hp || 50;
  var hp_user2 = user2.hp || 50;
  var nextStrike_user1 = nextStrike(user1);
  var nextStrike_user2 = nextStrike(user2);
  var fight = [];

  function strike(hp, attacker, defender, nextStrike_attacker, nextStrike_defender) {
    nextStrike_defender -= nextStrike_attacker;
    nextStrike_attacker = nextStrike(attacker);
    var didHit = (Math.random() * 10) > (3 + ((defender.dexterity || 10) - (attacker.dexterity || 10) ) / (attacker.dexterity || 10));
    if (didHit) {
      var damage = Math.min(attacker.strength - defender.defence, 1)
      hp -= damage;
      fight.push({
        user: attacker,
        action: 'hit',
        damage: damage
      });
    } else {
      fight.push({
        user: attacker,
        action: 'miss',
        damage: 0
      });
    }
  }

  while (hp_user1 > 0 || hp_user2 > 0) {
    if (nextStrike_user1 > nextStrike_user2) {
      strike(hp_user2, user1, user2, nextStrike_user1, nextStrike_user2);
    } else if (nextStrike_user1 < nextStrike_user2) {
      strike(hp_user1, user2, user1, nextStrike_user2, nextStrike_user1);
    } else {
      if (Math.random() > 0.5) {
        strike(hp_user2, user1, user2, nextStrike_user1, nextStrike_user2);
      } else {
        strike(hp_user1, user2, user1, nextStrike_user2, nextStrike_user1);
      }
    }
  }
  if (hp_user1 > 0) {
    fight.push({
      user: user1,
      action: 'win',
      damage: 0,
      opponent: user2
    });
  } else {
    fight.push({
      user: user1,
      action: 'loose',
      damage: 0,
      opponent: user2
    });
  }
  return fight;
}
