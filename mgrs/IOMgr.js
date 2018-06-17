const connectToStores = require('alt-utils/lib/connectToStores');
const SessionStore = require('../alt/stores/SessionStore.js');
const SessionActions = require('../alt/actions/SessionActions.js');
const DOMUtils = require("../utils/DOMUtils.js");
const dateToStringWithoutSeconds = require("../utils/dateToStringWithoutSeconds.js");


/**
 * Class that knows how to interact with the store for the logged-in user.
 */
class IOMgr {
  constructor() {
    this.events = {};
    this.user = null;
    SessionStore.listen((state) => this._onChange());
  }

  loadMore() {
    const limit = prompt("How many to load?");
    console.log("attempting read from " + api.session.lastItem);
    const myEventsRef = firebase
      .database()
      .ref("events/" + this.user.uid + "")
      .orderByKey()
      .limitToLast(parseInt(limit))
      .endAt(api.session.lastItem);
    myEventsRef.on("value", snapshot => processSnapshot(snapshot));
  }

  writeEvent(event) {
    // These should be written in batches
    const timestamp = new Date().getTime();
    const user = this._getUser();
    console.log("WRITING EVENT FOR: " + user.email);
    firebase
      .database()
      .ref("events/" + user.uid + "/" + timestamp)
      .set(event);
    console.log("EVENTS UPDATED.");
  }

  processSnapshot(snapshot) {
    const events = this.events;
    let updateLastItemRetrieved = false;
    snapshot.forEach(function(childSnapshot) {
      if (updateLastItemRetrieved == false) {
        updateLastItemRetrieved = true;

        // We need the defer here because we cannot dispatch an new
        // action while the previous one is still being processed.
        SessionActions.setLastItemLoaded.defer(childSnapshot.key);
      }
      events[childSnapshot.key] = childSnapshot.val();
    });
  }

  _onChange(state) {
    console.log('onUserLoad', {old: this.user, new: SessionStore.state.user})
    if (this.user != SessionStore.state.user) {
      this.user = SessionStore.state.user;
      if (this.user != null) {
        this._getInitialData();
      }

    }
  }

  _getUser() {
    return this.user;
  }

  _getLastItemLoaded() {
    return SessionStore.state.lastItemLoaded;
  }

  _getInitialData() {
    const myEventsRef = firebase
      .database()
      .ref("events/" + this.user.uid + "")
      .limitToLast(5);
    myEventsRef.on("value", snapshot => this._processSnapshot(snapshot));
  }

  _processSnapshot(snapshot) {
    this.processSnapshot(snapshot);

    document.getElementById("hungerTable").innerHTML = "";
    var tableEl = document.createElement("table"); //Creating the <table> element
    var indexRow = tableEl.rows.length;

    const events = this.events;
    Object.keys(events)
      .sort()
      .forEach(function(timestamp, i) {
        const eventData = events[timestamp];
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
          delete events[timestamp];
          firebase
            .database()
            .ref("events/" + this.user.uid + "/" + timestamp)
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
              .ref("events/" + this.user.uid + "/" + timestamp)
              .set(eventData);
          };
          rowEl.insertCell().appendChild(btn);
        }
      });
    const header = document.createTextNode(
      "Events for " + this.user.email
    );
    DOMUtils.setContentsByID("hungerTable", [header, tableEl]);
  }

}

module.exports = IOMgr;
