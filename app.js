const dateToStringWithoutSeconds = require('./utils/dateToStringWithoutSeconds.js');
const blobToDataURL = require('./utils/blobToDataURL.js')

var provider = new firebase.auth.GoogleAuthProvider();

var user = {};

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
   console.log("ALREADY LOGGED IN AS " + user.email);
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
  user = newUser;
  document.getElementById("username").innerHTML = user.email;
  var myEventsRef = firebase.database().ref('events/' + user.uid + "");
  myEventsRef.on('value', (snapshot) => writeSnapshotToTable(snapshot));
  var myPeriodsRef = firebase.database().ref('periods/' + user.uid + "");
  myPeriodsRef.on('value', (snapshot) => writePeriodsToTable(snapshot));
}


function writeEvent(event) {
  // These should be written in batches
  var timestamp = new Date().getTime();
  console.log("WRITING EVENT FOR: "  + user.email);
  firebase.database().ref('events/' + user.uid + '/' + timestamp).set(event);
  console.log("EVENTS UPDATED.");
}
function writeHunger(level) {
  console.log("WRITING HUNGER");
  writeEvent({'hunger': level});
}

function feelingBad(level) {
  console.log("WRITING FEELING BAD LEVEL");
  var feelingEvent = {'level': level};
  var description = prompt("how do you feel");
  if (description != undefined) {feelingEvent['description']  = description}
  writeEvent({'feeling': feelingEvent});
}

function writeMedicine(name) {
  console.log("WRITING MEDICINE");
  writeEvent({'medicine': name});
}

function writeWater(level) {
  console.log("WRITING WATER");
  writeEvent({'water': "sips sip"});
}

function writeSleep(level) {
  console.log("WRITING SLEEP");
  writeEvent({'sleep': "zzz"});
}

function writeFood() {
  var foodEvent = {}
  var description = prompt("Description");
  if (description != undefined) {foodEvent['description']  = description}
  var photo = prompt("Photos link");
  if (photo != undefined) {foodEvent['photo']  = photo}
  writeEvent({'food': foodEvent});
}

function writeSnapshotToTable(snapshot) {
  console.log("attempting read");

  var tableEl = document.createElement("table");  //Creating the <table> element

  snapshot.forEach(function(childSnapshot) {

    var childData = childSnapshot.val();

    console.log(childData);
    const date = dateToStringWithoutSeconds(childSnapshot.key * 1);

    rowEl = tableEl.insertRow(0);
    rowEl.insertCell().textContent = date;
    var eventType = Object.keys(childData)[0];
    if (eventType == 'hunger') {
      rowEl.insertCell().textContent = "Hunger level " + childData['hunger'];
    } else if (eventType == 'water') {
      rowEl.insertCell().textContent = "Drank a cup of water";
    } else if (eventType == 'medicine') {
      rowEl.insertCell().textContent = "Took " + childData['medicine'];
    } else if (eventType == 'sleep') {
      rowEl.insertCell().textContent = "Went to bed / Woke up";
    } else if (eventType == 'food') {
      var text = "Ate " + childData['food']['description'];
      if (childData['food']['photo']) {
        text += " " + childData['food']['photo'];
      }
      rowEl.insertCell().textContent = text;
    } else if (eventType == 'feeling') {
      var text = "Feeling bad " + childData['feeling']['level'];
      if (childData['feeling']['description']) {
        text += " \"" + childData['feeling']['description'] + "\"";
      }
      rowEl.insertCell().textContent =  text;
    } else if (childData.type =="image"){
      const img = document.createElement('img');
      img.src = childData['dataURL'];
      img.className = 'photoEvent';
      rowEl.insertCell().appendChild(img);
    }

    var btn = document.createElement('input');
    btn.type = "button";
    btn.value = 'x';
    btn.onclick = (function(event) {
      firebase.database().ref('events/' + user.uid + "/" + childSnapshot.key).remove();
      // UI doesn't update when you update the last element
    });
    rowEl.appendChild(btn);


    var myNode = document.getElementById("hungerTable");
     while (myNode.firstChild) {
      myNode.removeChild(myNode.firstChild);
    }
    var header = document.createTextNode("Events for " + user.email);
    myNode.appendChild(header);
    myNode.appendChild(tableEl);
    });
}

function writePeriodsToTable(snapshot) {
  console.log(snapshot);

  var tableEl = document.createElement("table");  //Creating the <table> element

  snapshot.forEach(function(yearSnapshot) { // year
    yearSnapshot.forEach(function(monthSnapshot) { // month
      monthSnapshot.forEach(function(daySnapshot) { // day

        var childData = daySnapshot.val();

        console.log(childData);
        var date = new Date(daySnapshot.key * 1);

        rowEl = tableEl.insertRow(0);
        rowEl.insertCell().textContent =
          yearSnapshot.key + "/" + monthSnapshot.key + "/" + daySnapshot.key;
        var eventType = Object.keys(childData)[0];
        if (childData['level'] == '1') {
          rowEl.insertCell().textContent = "Spotting";
        } else if (childData['level'] == '2') {
        rowEl.insertCell().textContent = "Moderate";
        } else if (childData['level'] == '3') {
        rowEl.insertCell().textContent = "Heavy";
        }

        var myNode = document.getElementById("periodTable");
         while (myNode.firstChild) {
          myNode.removeChild(myNode.firstChild);
        }
        var header = document.createTextNode("Periods for " + user.email);
        myNode.appendChild(header);
        myNode.appendChild(tableEl);
      });
    });
  });
}

function gotMedia(mediaStream) {
  const mediaStreamTrack = mediaStream.getVideoTracks()[0];
  const imageCapture = new ImageCapture(mediaStreamTrack);
  console.log(imageCapture);

  imageCapture.takePhoto().then(blob => {
    blobToDataURL(blob, dataURL => {
      writeEvent({
        type: 'image',
        dataURL,
      });
    });
  })
  .catch(error => console.error('takePhoto() error:', error));
}

function takePhoto() {
  navigator.mediaDevices.getUserMedia({video: true})
    .then(gotMedia)
    .catch(error => console.error('getUserMedia() error:', error));
}

function periodLevel(level) {
  console.log('WRITING PERIOD');
  var timestamp = new Date();
  var month = timestamp.getMonth() + 1;
  var day = timestamp.getDate() + 1;
  var datestring =timestamp.getFullYear() + '/' + month + '/' + day;
  console.log(datestring);
  var obj = {'level': level}
  firebase.database().ref('periods/' + user.uid + '/' + datestring).set(obj);
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
  takePhoto,
  writeFood,
  writeHunger,
  writeMedicine,
  writeSleep,
  writeWater,
});
