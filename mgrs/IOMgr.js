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
    const uid = this._getUser().uid;
    const limit = prompt("How many to load?");
    const lastItem = SessionStore.state.lastItemLoaded;
    console.log("attempting read from " + lastItem);
    const myEventsRef = firebase
      .database()
      .ref("events/" + uid + "")
      .orderByKey()
      .limitToLast(parseInt(limit)+1)
      .endAt(lastItem)
      .once('value')
      .then(snapshot => this._processSnapshot(snapshot));
  }

  writeEvent(event) {
    const timestamp = new Date().getTime();

    // TODO: Maybe don't dispatch this locally.
    // Listen to DB changes and update UI when change is commited.
    EventActions.addEvent(timestamp, event);

    // These should be written in batches
    const user = this._getUser();
    console.log("WRITING EVENT FOR: " + user.email);
    firebase
      .database()
      .ref("events/" + user.uid + "/" + timestamp)
      .set(event);
    console.log("EVENTS UPDATED.");
  }

  deleteEvent(timestamp) {
    console.log('xxdelete');
    // TODO: Maybe don't dispatch this locally.
    // Listen to DB changes and update UI when change is commited.
    EventActions.deleteEvent(timestamp);

    firebase
      .database()
      .ref("events/" + this.user.uid + "/" + timestamp)
      .remove();
  }

  _onChange(state) {
    if (this.user != SessionStore.state.user) {
      this._onUserChange();
    }
  }

  _onUserChange(state) {
      this.user = SessionStore.state.user;
      if (this.user != null) {
        this._getInitialData();
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
      .limitToLast(5)
      .once("value")
      .then(snapshot => this._processSnapshot(snapshot));
  }
}

module.exports = IOMgr;
