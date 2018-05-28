
/**
 * Class that knows how to interact with the store for the logged-in user.
 */
class StoreAccessor {
	constructor(user) {
		this.user = user;
	}

	writeEvent(event) {
	  // These should be written in batches
	  var timestamp = new Date().getTime();
	  console.log("WRITING EVENT FOR: "  + this.user.email);
	  firebase.database().ref('events/' + this.user.uid + '/' + timestamp).set(event);
	  console.log("EVENTS UPDATED.");
	}
}



module.exports = StoreAccessor;