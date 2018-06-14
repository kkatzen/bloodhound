/**
 * Class that knows how to interact with the store for the logged-in user.
 */
class StoreAccessor {
  constructor(user, lastItem) {
    this.user = user;
    this.lastItem = lastItem;
    this.events = {};
  }

  writeEvent(event) {
    // These should be written in batches
    var timestamp = new Date().getTime();
    console.log("WRITING EVENT FOR: " + this.user.email);
    firebase
      .database()
      .ref("events/" + this.user.uid + "/" + timestamp)
      .set(event);
    console.log("EVENTS UPDATED.");
  }

  processSnapshot(snapshot) {
    var events = this.events;
    var updateLastItemRetrieved = false;
    snapshot.forEach(function(childSnapshot) {
      if (updateLastItemRetrieved == false) {
        updateLastItemRetrieved = true;
        api.session.lastItem = childSnapshot.key;
      }
      events[childSnapshot.key] = childSnapshot.val();
    });
  }
}

module.exports = StoreAccessor;
