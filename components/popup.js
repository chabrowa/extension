class Popup {
  
  constructor() {
    this.player = new Player("Chabrowa", "../images/chabIcon.jpg", "dwarf", "wizzard"); 
    this.background = new Background();
  }
  
  getCurrentTabUrl(callback) {

    var queryInfo = {
      active: true,
      currentWindow: true
    };

    chrome.tabs.query(queryInfo, function(tabs) {
      var tab = tabs[0];
      var url = tab.url;
      //var title = tab.title;

      console.assert(typeof url == 'string', 'tab.url should be a string');
      callback(url);

    });
  }

  renderContent(statusText, id) {
    document.getElementById(id).textContent = statusText;
  }

  renderPicture(pictureURL, id) {
    document.getElementById(id).src = pictureURL;
  }
  
  renderEnemies(enemieArray, id) {
   /* var htmlElement = '<ul>';
    for (var index = 0; index < enemieArray.length; index++) {
      var htmlEnemie = '<li>' + enemieArray[index].name + '</li>';
      htmlElement += htmlEnemie;
    }
    htmlElement += '</ul>';
    console.log(htmlElement);
    document.getElementById(id) = htmlElement;*/
  }

  initialfunction() {
    //getCurrentTabUrl(renderStatus);

    this.renderContent("Welcome " + this.player.name, 'player-welcome');
    this.renderPicture(this.player.icon, 'player-picture' );
    
    var enemieSize = this.player.enemiesList.length;
    if( enemieSize > 0 ) {
      this.renderContent("Face one of " + enemieSize + " enemies", 'found-enemies');
      this.background.attentionIcon();
    } else {
      this.renderContent("No enemies on this website" , 'found-enemies');
    }
    
    var tresureSize = this.player.treasuresList.length;
    if( tresureSize > 0 ) {
      this.renderContent("Hunt for one of " + tresureSize + " theasures", 'found-treasures');
      chrome.browserAction.setBadgeText({text: ''+tresureSize }); 
    } 
    else {
      this.renderContent("No theasures on this website" , 'found-treasures');
    }
    
    chrome.browserAction.setBadgeBackgroundColor({ color: '#7094FF' });
    //chrome.browserAction.setBadgeText({text: ''}); 
  }

}

  document.addEventListener('DOMContentLoaded', function() {
    var pop = new Popup();
    pop.initialfunction();
  });
