// Attach DDP to your local app

// http://stackoverflow.com/questions/8498592/extract-root-domain-name-from-string
var getDomainFromTab = function(tab) {
  var url = (tab || {}).url;
  if (url) {
    var domain;
    //find & remove protocol (http, ftp, etc.) and get domain
    if (url.indexOf("://") > -1) {
        domain = url.split('/')[2];
    }
    else {
        domain = url.split('/')[0];
    }

    //find & remove port number
    domain = domain.split(':')[0];

    return domain;
  } else {
    return null;
  }
};

var userId = null;

var DDPClient = require("ddp");

var ddpclient = new DDPClient({
  // All properties optional, defaults shown
  host : "localhost",
  port : 3000,
  ssl  : false,
  autoReconnect : true,
  autoReconnectTimer : 500,
  maintainCollections : true,
  ddpVersion : "1",  // ["1", "pre2", "pre1"] available,
  // uses the sockJs protocol to create the connection
  // this still uses websockets, but allows to get the benefits
  // from projects like meteorhacks:cluster
  // (load balancing and service discovery)
  // do not use `path` option when you are using useSockJs
  useSockJs: true,
  // Use a full url instead of a set of `host`, `port` and `ssl`
  // do not set `useSockJs` option if `url` is used
  //url: 'wss://example.com/websocket'
});

/*
 * Connect to the Meteor Server
 */
ddpclient.connect(function(error, wasReconnect) {
  // If autoReconnect is true, this callback will be invoked each time
  // a server connection is re-established
  if (error) {
    console.log("DDP connection error!");
    return;
  }

  if (wasReconnect) {
    console.log("Reestablishment of a connection.");
  }

  console.log("connected!");

  /*
   * Subscribe to a Meteor Collection
   */

  var opponentCounts = 0;
  /*
   * Observe a collection.
   */
  var observer = ddpclient.observe("users");
  observer.added = function(id) {
    opponentCounts++;
    chrome.browserAction.setBadgeText({text: opponentCounts.toString()});
    console.log("[ADDED] to " + observer.name + ":  " + id);
  };
  observer.changed = function(id, oldFields, clearedFields) {
    console.log("[CHANGED] in " + observer.name + ":  " + id);
    console.log("[CHANGED] old field values: ", oldFields);
    console.log("[CHANGED] cleared fields: ", clearedFields);
  };
  observer.removed = function(id, oldValue) {
    opponentCounts--;
    chrome.browserAction.setBadgeText({text: opponentCounts.toString()});
    console.log("[REMOVED] in " + observer.name + ":  " + id);
    console.log("[REMOVED] previous value: ", oldValue);
  };

  var updateTab = function(tab) {
    var domain = getDomainFromTab(tab);

    if (domain) {
      if (!userId) {
        ddpclient.call(
          "changeURL",              // name of Meteor Method being called
          [domain, userId],                 // parameters to send to Meteor Method
          function (err, result) {  // callback which returns the method call results
            console.log("called function, result: " + result);
          }
        );
      }
      ddpclient.subscribe(
        "opponents",    // name of Meteor Publish function to subscribe to
        [domain],       // any parameters used by the Publish function
        function () {   // callback when the subscription is complete
          console.log("posts complete:");
          console.log(ddpclient.collections.posts);
        }
      );
    }
  };

  chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
      updateTab(tab);
  });

  chrome.tabs.onCreated.addListener(function(tabId, changeInfo, tab) {
     updateTab(tab);
  });

});

//get the game_user from the chrome storage
chrome.storage.onChanged.addListener(function (changes) {
  userId = changes.game_user.newValue && changes.game_user.newValue._id;
  console.log("New item in storage",changes.game_user.newValue);
})
