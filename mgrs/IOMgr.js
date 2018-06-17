const connectToStores = require('alt-utils/lib/connectToStores');
const SessionStore = require('../alt/stores/SessionStore.js');
const SessionActions = require('../alt/actions/SessionActions.js');
const EventActions = require('../alt/actions/EventActions.js');

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

  _onChange(state) {
    console.log('onUserLoad', {old: this.user, new: SessionStore.state.user})
    if (this.user != SessionStore.state.user) {
      this.user = SessionStore.state.user;
      if (this.user != null) {
        this._getInitialData();
      }
    }
  }

  _processSnapshot(snapshot) {
    const events = this.events;
    let updateLastItemRetrieved = false;
    snapshot.forEach(function(childSnapshot) {
      if (updateLastItemRetrieved == false) {
        updateLastItemRetrieved = true;

        // We need the defer here because we cannot dispatch an new
        // action while the previous one is still being processed.
        SessionActions.setLastItemLoaded.defer(childSnapshot.key);
      }
      EventActions.addEvent(childSnapshot.key, childSnapshot.val());
    });
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
}

module.exports = IOMgr;
