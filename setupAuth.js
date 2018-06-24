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
    if (loggedInUser) {
      SessionActions.setUser(loggedInUser);
      console.log("ALREADY LOGGED IN");
    }
  });
  return provider;
}


function setUser(newUser) {
  SessionActions.setUser(newUser);
}