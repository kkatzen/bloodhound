const React = require("react");
const PropTypes = require("prop-types");

class Period extends React.Component {
	constructor(props) {
		super(props);
		setTimeout(() => {
			var myPeriodsRef = firebase
				.database()
				.ref("periods/" + api.session.user.uid + "");
			myPeriodsRef.on("value", snapshot => writePeriodsToTable(snapshot));
		}, 3000);
	}

	render() {
		return (
			<div id="period" className="wide-div">
			    <input type="radio" name="period" value="3" onClick={() => periodLevel(3)}/>Heavy
			    <input type="radio" name="period" value="2" onClick={() => periodLevel(2)}/>Moderate
			    <input type="radio" name="period" value="1" onClick={() => periodLevel(1)}/>Spotting
			</div>
		);
	}
}

function periodLevel(level) {
  var timestamp = new Date();
  var month = timestamp.getMonth() + 1;
  var day = timestamp.getDate() + 1;
  var datestring = timestamp.getFullYear() + "/" + month + "/" + day;
  var obj = { level: level };
  firebase
    .database()
    .ref("periods/" + api.session.user.uid + "/" + datestring)
    .set(obj);
}

function writePeriodsToTable(snapshot) {

  var tableEl = document.createElement("table"); //Creating the <table> element

  snapshot.forEach(function(yearSnapshot) {
    // year
    yearSnapshot.forEach(function(monthSnapshot) {
      // month
      monthSnapshot.forEach(function(daySnapshot) {
        // day

        var eventData = daySnapshot.val();

        var date = new Date(daySnapshot.key * 1);

        const rowEl = tableEl.insertRow(0);
        rowEl.insertCell().textContent =
          yearSnapshot.key + "/" + monthSnapshot.key + "/" + daySnapshot.key;
        var eventType = Object.keys(eventData)[0];
        if (eventData["level"] == "1") {
          rowEl.insertCell().textContent = "Spotting";
        } else if (eventData["level"] == "2") {
          rowEl.insertCell().textContent = "Moderate";
        } else if (eventData["level"] == "3") {
          rowEl.insertCell().textContent = "Heavy";
        }

        var myNode = document.getElementById("periodTable");
        while (myNode.firstChild) {
          myNode.removeChild(myNode.firstChild);
        }
        var header = document.createTextNode(
          "Periods for " + api.session.user.email
        );
        myNode.appendChild(header);
        myNode.appendChild(tableEl);
      });
    });
  });
}

Period.propTypes = {
};

module.exports = Period;
