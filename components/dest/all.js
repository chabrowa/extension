"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Background = (function () {
  function Background() {
    _classCallCheck(this, Background);

    this.state = 1;
  }

  _createClass(Background, [{
    key: "attentionIcon",
    value: function attentionIcon() {
      chrome.browserAction.setIcon({
        path: "../images/crown-attention.png"
      });
    }
  }, {
    key: "normalIcon",
    value: function normalIcon() {
      chrome.browserAction.setIcon({
        path: "../images/crown.png"
      });
    }
  }]);

  return Background;
})();

var Player = function Player(name, icon, race, characterClass) {
  _classCallCheck(this, Player);

  this.name = name;
  this.icon = icon;
  this.race = race;
  this.characterClass = characterClass;
  this.enemiesList = [{ enemyId: 4, name: "king of the internet" }, { enemyId: 2, name: "barun" }, { enemyId: 8, name: "dangerous name" }];
  this.treasuresList = [{ id: 4, name: "kaybord" }, { id: 2, name: "sweets" }, { id: 8, name: "piece of code" }];
};

var Popup = (function () {
  function Popup() {
    _classCallCheck(this, Popup);

    this.player = new Player("Chabrowa", "../images/chabIcon.jpg", "dwarf", "wizzard");
    this.background = new Background();
  }

  _createClass(Popup, [{
    key: "getCurrentTabUrl",
    value: function getCurrentTabUrl(callback) {

      var queryInfo = {
        active: true,
        currentWindow: true
      };

      chrome.tabs.query(queryInfo, function (tabs) {
        var tab = tabs[0];
        var url = tab.url;
        //var title = tab.title;

        console.assert(typeof url == "string", "tab.url should be a string");
        callback(url);
      });
    }
  }, {
    key: "renderContent",
    value: function renderContent(statusText, id) {
      document.getElementById(id).textContent = statusText;
    }
  }, {
    key: "renderPicture",
    value: function renderPicture(pictureURL, id) {
      document.getElementById(id).src = pictureURL;
    }
  }, {
    key: "renderEnemies",
    value: function renderEnemies(enemieArray, id) {}
  }, {
    key: "initialfunction",
    value: function initialfunction() {
      //getCurrentTabUrl(renderStatus);

      this.renderContent("Welcome " + this.player.name, "player-welcome");
      this.renderPicture(this.player.icon, "player-picture");

      var enemieSize = this.player.enemiesList.length;
      if (enemieSize > 0) {
        this.renderContent("Face one of " + enemieSize + " enemies", "found-enemies");
        this.background.attentionIcon();
      } else {
        this.renderContent("No enemies on this website", "found-enemies");
      }

      var tresureSize = this.player.treasuresList.length;
      if (tresureSize > 0) {
        this.renderContent("Hunt for one of " + tresureSize + " theasures", "found-treasures");
        chrome.browserAction.setBadgeText({ text: "" + tresureSize });
      } else {
        this.renderContent("No theasures on this website", "found-treasures");
      }

      chrome.browserAction.setBadgeBackgroundColor({ color: "#7094FF" });
      //chrome.browserAction.setBadgeText({text: ''});
    }
  }]);

  return Popup;
})();

document.addEventListener("DOMContentLoaded", function () {
  var pop = new Popup();
  pop.initialfunction();
});

/* var htmlElement = '<ul>';
 for (var index = 0; index < enemieArray.length; index++) {
   var htmlEnemie = '<li>' + enemieArray[index].name + '</li>';
   htmlElement += htmlEnemie;
 }
 htmlElement += '</ul>';
 console.log(htmlElement);
 document.getElementById(id) = htmlElement;*/