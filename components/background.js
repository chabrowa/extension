class Background {
  
  constructor() {
    this.state = 1;
  }
  
  attentionIcon() {
    chrome.browserAction.setIcon({
      path : "../images/crown-attention.png"
    });
  }

  normalIcon() {
    chrome.browserAction.setIcon({
      path : "../images/crown.png"
    });
  }
}

