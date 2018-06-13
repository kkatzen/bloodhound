
const DOMUtils = require('./utils/DOMUtils.js');

const buildSession = require('./buildSession.js');
const dateToStringWithoutSeconds = require('./utils/dateToStringWithoutSeconds.js');

var provider = new firebase.auth.GoogleAuthProvider();

provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
firebase.auth().languageCode = 'ens';
provider.setCustomParameters({
  'login_hint': 'user@example.com'
});


firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
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
    setUser(loggedInUser)
   console.log("ALREADY LOGGED IN AS " + api.session.user.email);
   }
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

  var myPeriodsRef = firebase.database().ref('periods/' + newUser.uid + "");
  myPeriodsRef.on('value', (snapshot) => writePeriodsToTable(snapshot));
}

function writeHunger(level) {
  console.log("WRITING HUNGER");
  api.session.storeAccessor.writeEvent({'hunger': level});
}

function feelingBad(level) {
  console.log("WRITING FEELING BAD LEVEL");
  var feelingEvent = {'level': level};
  var description = prompt("how do you feel");
  if (description != undefined) {feelingEvent['description']  = description}
  api.session.storeAccessor.writeEvent({'feeling': feelingEvent});
}

function writeMedicine(name) {
  console.log("WRITING MEDICINE");
  api.session.storeAccessor.writeEvent({'medicine': name});
}

function writeWater(level) {
  console.log("WRITING WATER");
  api.session.storeAccessor.writeEvent({'water': "sips sip"});
}

function writeSleep(level) {
  console.log("WRITING SLEEP");
  api.session.storeAccessor.writeEvent({'sleep': "zzz"});
}

function writeFood() {
  var foodEvent = {}
  var description = prompt("Description");
  if (description != undefined) {foodEvent['description']  = description}
  api.session.storeAccessor.writeEvent({'food': foodEvent});
}

function writePeriodsToTable(snapshot) {

  var tableEl = document.createElement("table");  //Creating the <table> element

  snapshot.forEach(function(yearSnapshot) { // year
    yearSnapshot.forEach(function(monthSnapshot) { // month
      monthSnapshot.forEach(function(daySnapshot) { // day

        var eventData = daySnapshot.val();

        var date = new Date(daySnapshot.key * 1);

        rowEl = tableEl.insertRow(0);
        rowEl.insertCell().textContent =
          yearSnapshot.key + "/" + monthSnapshot.key + "/" + daySnapshot.key;
        var eventType = Object.keys(eventData)[0];
        if (eventData['level'] == '1') {
          rowEl.insertCell().textContent = "Spotting";
        } else if (eventData['level'] == '2') {
        rowEl.insertCell().textContent = "Moderate";
        } else if (eventData['level'] == '3') {
        rowEl.insertCell().textContent = "Heavy";
        }

        var myNode = document.getElementById("periodTable");
         while (myNode.firstChild) {
          myNode.removeChild(myNode.firstChild);
        }
        var header = document.createTextNode("Periods for " + api.session.user.email);
        myNode.appendChild(header);
        myNode.appendChild(tableEl);
      });
    });
  });
}

function periodLevel(level) {
  console.log('WRITING PERIOD');
  var timestamp = new Date();
  var month = timestamp.getMonth() + 1;
  var day = timestamp.getDate() + 1;
  var datestring =timestamp.getFullYear() + '/' + month + '/' + day;
  var obj = {'level': level}
  firebase.database().ref('periods/' + api.session.user.uid + '/' + datestring).set(obj);
}

function loadMore() {
  var limit = prompt("How many to load?");
  console.log("attempting read from " + api.session.lastItem);
  var myEventsRef = firebase.database().ref('events/' + api.session.user.uid + "").orderByKey().limitToLast(parseInt(limit)).endAt(api.session.lastItem);
  myEventsRef.on('value', (snapshot) => processSnapshot(snapshot));
}

function processSnapshot(snapshot) {
  api.session.storeAccessor.processSnapshot(snapshot);

  document.getElementById("hungerTable").innerHTML = "";
  var tableEl = document.createElement("table");  //Creating the <table> element
  var indexRow = tableEl.rows.length;

  Object.keys(api.session.storeAccessor.events)
  .sort()
  .forEach(function(timestamp, i) {
    const eventData = api.session.storeAccessor.events[timestamp];
    const date = dateToStringWithoutSeconds(timestamp * 1);
    rowEl = tableEl.insertRow(indexRow);
    rowEl.insertCell().textContent = date;
    var eventType = Object.keys(eventData)[0];
    if (eventType == 'hunger') {
      rowEl.insertCell().textContent = "Hunger level " + eventData['hunger'];
    } else if (eventType == 'water') {
      rowEl.insertCell().textContent = "Drank a cup of water";
    } else if (eventType == 'medicine') {
      rowEl.insertCell().textContent = "Took " + eventData['medicine'];
    } else if (eventType == 'sleep') {
      rowEl.insertCell().textContent = "Went to bed / Woke up";
    } else if (eventType == 'food') {
      var text = "Ate " + eventData['food']['description'];
      if (eventData['food']['photo']) {
        text += " " + eventData['food']['photo'];
      }
      rowEl.insertCell().textContent = text;
    } else if (eventType == 'feeling') {
      var text = "Feeling bad " + eventData['feeling']['level'];
      if (eventData['feeling']['description']) {
        text += " \"" + eventData['feeling']['description'] + "\"";
      }
      rowEl.insertCell().textContent =  text;
    } else if (eventData.type =="image"){
      const img = document.createElement('img');
      img.src = eventData['dataURL'];
      img.id = 'photoEvent';
      rowEl.insertCell().appendChild(img);
    }

    var btn = document.createElement('input');
    btn.type = "button";
    btn.value = 'x';
    btn.onclick = (function(event) {
      delete api.session.storeAccessor.events[timestamp];
      firebase.database().ref('events/' + api.session.user.uid + "/" + timestamp).remove();
    });
    rowEl.insertCell().appendChild(btn);
  });
  const header = document.createTextNode("Events for " + api.session.user.email);
  DOMUtils.setContentsByID("hungerTable", [header, tableEl]);
}

/**
 * We wouldn't need to do this if we were building all our HTML here. Since
 * we're not using a framework yet, we need to expose the actions that the
 * HTML needs to refer to. See api.js for more details.
 */
Object.assign(api.actions, {
  feelingBad,
  logIn,
  periodLevel,
  signOut,
  takePhoto: require('./actions/takePhoto.js'),
  writeFood,
  writeHunger,
  writeMedicine,
  writeSleep,
  writeWater,
  loadMore,
});
