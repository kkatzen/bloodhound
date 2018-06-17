const SessionActions = require('../alt/actions/SessionActions');

const setupAuth = require('../setupAuth.js');
const provider = setupAuth();

const SessionAPI = {
  logIn: function() {
    firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
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
  },

  signOut: function() {
    console.log("SIGNED OUT.");
    firebase.auth().signOut();
    SessionActions.unsetUser();
  },
};



module.exports = SessionAPI;


