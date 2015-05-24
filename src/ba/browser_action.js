document.getElementById('show_opponents').addEventListener('click', function(e) {
  e.preventDefault();
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    chrome.tabs.sendMessage(tabs[0].id, {show_opponents: true});
  });
});
