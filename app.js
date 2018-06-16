const DOMUtils = require("./utils/DOMUtils.js");
const buildSession = require("./buildSession.js");
const dateToStringWithoutSeconds = require("./utils/dateToStringWithoutSeconds.js");
const React = require('react');
const ReactDOM = require('react-dom');
const AppBody = require('./components/AppBody.react.js');
const BloodhoundNavDrawer = require('./components/BloodhoundNavDrawer.react.js');
import List from "@material-ui/core/List";

var provider = new firebase.auth.GoogleAuthProvider();

provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
firebase.auth().languageCode = "ens";
provider.setCustomParameters({
  login_hint: "user@example.com"
});

window.onload = function() {
  ReactDOM.render(<AppBody />, document.getElementById('actionView'));
  ReactDOM.render(<BloodhoundNavDrawer />, document.getElementById('drawer'));
}

firebase
  .auth()
  .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
  .then(() => {})
  .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
  });

firebase.auth().onAuthStateChanged(function(loggedInUser) {
  if (!loggedInUser) {
    document.getElementById("username").innerHTML = "Please login";
    console.log("NEED TO LOG IN");
  } else {
    setUser(loggedInUser);
    console.log("ALREADY LOGGED IN AS " + api.session.user.email);
  }

  getInitialData();
});


function logIn() {
  firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    setUser(result.user);
    console.log("NEWLY LOGGED IN USER");
    console.log(user);

  //userDisplayName = user.displayName;
    // ...
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    console.log("USER NOT LOGGED IN:" + errorCode);
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
}

function signOut() {
  console.log("SIGNED OUT.");
  firebase.auth().signOut();
}

function setUser(newUser) {
  api.session = buildSession(newUser, 0);
  document.getElementById("username").innerHTML = newUser.email;
  var myEventsRef = firebase.database().ref('events/' + newUser.uid + "").limitToLast(5);
  myEventsRef.on('value', (snapshot) => processSnapshot(snapshot));

//  var myPeriodsRef = firebase.database().ref('periods/' + newUser.uid + "");
 // myPeriodsRef.on('value', (snapshot) => writePeriodsToTable(snapshot));
}

function getInitialData() {
  var myEventsRef = firebase
    .database()
    .ref("events/" + api.session.user.uid + "")
    .limitToLast(5);
  myEventsRef.on("value", snapshot => processSnapshot(snapshot));
//  var myPeriodsRef = firebase.database().ref("periods/" + api.session.user.uid + "");
 // myPeriodsRef.on("value", snapshot => writePeriodsToTable(snapshot));
}


function loadMore() {
  var limit = prompt("How many to load?");
  console.log("attempting read from " + api.session.lastItem);
  var myEventsRef = firebase
    .database()
    .ref("events/" + api.session.user.uid + "")
    .orderByKey()
    .limitToLast(parseInt(limit))
    .endAt(api.session.lastItem);
  myEventsRef.on("value", snapshot => processSnapshot(snapshot));
}

function processSnapshot(snapshot) {
  api.session.storeAccessor.processSnapshot(snapshot);

  document.getElementById("hungerTable").innerHTML = "";
  var tableEl = document.createElement("table"); //Creating the <table> element
  var indexRow = tableEl.rows.length;

  Object.keys(api.session.storeAccessor.events)
    .sort()
    .forEach(function(timestamp, i) {
      const eventData = api.session.storeAccessor.events[timestamp];
      const date = dateToStringWithoutSeconds(timestamp * 1);
      const rowEl = tableEl.insertRow(indexRow);
      rowEl.insertCell().textContent = date;
      var eventType = Object.keys(eventData)[0];
      if (eventType == "hunger") {
        rowEl.insertCell().textContent = "Hunger level " + eventData["hunger"];
      } else if (eventType == "water") {
        rowEl.insertCell().textContent = "Drank a cup of water";
      } else if (eventType == "medicine") {
        rowEl.insertCell().textContent = "Took " + eventData["medicine"];
      } else if (eventType == "sleep") {
        rowEl.insertCell().textContent = "Went to bed / Woke up";
      } else if (eventType == "food") {
        var text = "Ate " + eventData["food"]["description"];
        if (eventData["food"]["photo"]) {
          text += " " + eventData["food"]["photo"];
        }
        rowEl.insertCell().textContent = text;
      } else if (eventType == "feeling") {
        var text = "Feeling bad " + eventData["feeling"]["level"];
        if (eventData["feeling"]["description"]) {
          text += ' "' + eventData["feeling"]["description"] + '"';
        }
        rowEl.insertCell().textContent = text;
      } else if (eventData.type == "image") {
        const img = document.createElement("img");
        img.src = eventData["dataURL"];
        img.id = "photoEvent";
        rowEl.insertCell().appendChild(img);
      }

      var btn = document.createElement("input");
      btn.type = "button";
      btn.value = "x";
      btn.onclick = function(event) {
        delete api.session.storeAccessor.events[timestamp];
        firebase
          .database()
          .ref("events/" + api.session.user.uid + "/" + timestamp)
          .remove();
      };
      rowEl.insertCell().appendChild(btn);

      if (
        eventType == "hunger" ||
        eventType == "medicine" ||
        eventType == "food" ||
        eventType == "feeling"
      ) {
        var btn = document.createElement("input");
        btn.type = "button";
        btn.value = "e";
        btn.onclick = function(event) {
          if (eventType == "hunger") {
            eventData["hunger"] = prompt("what hunger level?");
          } else if (eventType == "medicine") {
            eventData["medicine"] = prompt("what medicine level?");
          } else if (eventType == "food") {
            eventData["food"]["description"] = prompt("what food?");
          } else if (eventType == "feeling") {
            eventData["feeling"]["level"] = prompt("what feeling level?");
            eventData["feeling"]["description"] = prompt("what description?");
          }
          firebase
            .database()
            .ref("events/" + api.session.user.uid + "/" + timestamp)
            .set(eventData);
        };
        rowEl.insertCell().appendChild(btn);
      }
    });
  const header = document.createTextNode(
    "Events for " + api.session.user.email
  );
  DOMUtils.setContentsByID("hungerTable", [header, tableEl]);
}

/**
 * We wouldn't need to do this if we were building all our HTML here. Since
 * we're not using a framework yet, we need to expose the actions that the
 * HTML needs to refer to. See api.js for more details.
 */
Object.assign(api.actions, {
  logIn,
  signOut,
  loadMore
});
