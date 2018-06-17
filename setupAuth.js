const SessionActions = require('./alt/actions/SessionActions.js');

module.exports = function() {
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
  firebase.auth().languageCode = "ens";
  provider.setCustomParameters({
    login_hint: "user@example.com"
  });

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
      console.log("ALREADY LOGGED IN");
    }
  });
  return provider;
}


function setUser(newUser) {
  console.log(newUser);
  SessionActions.setUser(newUser);

  document.getElementById("username").innerHTML = newUser.email;
  // var myEventsRef = firebase.database().ref('events/' + newUser.uid + "").limitToLast(5);
  // myEventsRef.on('value', (snapshot) => processSnapshot(snapshot));
}