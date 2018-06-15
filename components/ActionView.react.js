const React = require("react");
const TakePhoto = require('../components/TakePhoto.react.js');
const CirclePuppy = require('../components/CirclePuppy.react.js');
const ScaleButtons = require('../components/ScaleButtons.react.js');

class ActionView extends React.Component {

  render() {
    return (
      <div>
		  <div id="hunger" className="wide-div">
		    <button id="food" onClick={writeFood}><img src="img/hunger.png" className="fullRowHeight"></img></button>
		    <ScaleButtons onClick={writeHunger} min={0} max={5} />
		  </div>
		  <div className="wide-div">
		  	<TakePhoto />
		  </div>
		  <div id="feeling" className="wide-div">
		    <img src="img/sick.png" className="fullRowHeight"></img>
		    <ScaleButtons onClick={feelingBad} min={1} max={5} />
		  </div>
		  <div id="water" className="wide-div circlePuppies">
		  	<div className="waterCirclePuppy">
		    	<CirclePuppy imagePath="img/water.png" onClick={writeWater}/>
		    </div>
		    <div className="sleepyCirclePuppy">
		    <CirclePuppy imagePath="img/sleep.png" onClick={writeSleep}/>
		    </div>
		  </div>
		  <div id="medicine" className="wide-div">
		    <img src="img/medicine.png" className="fullRowHeight"></img>
		    <button onClick={writeMedicine.bind(null, 'sumatriptan')}>Sumatriptan</button>
		    <button onClick={writeMedicine.bind(null, 'ibuprofen')}>Ibuprofen</button>
		    <button onClick={writeMedicine.bind(null, 'acetamenophin')}>Acetamenophin</button>
		  </div>
		</div>
    );
  }
}

function writeHunger(level) {
  api.session.storeAccessor.writeEvent({ hunger: level });
}

function feelingBad(level) {
  var feelingEvent = { level: level };
  var description = prompt("how do you feel");
  if (description != undefined) {
    feelingEvent["description"] = description;
  }
  api.session.storeAccessor.writeEvent({ feeling: feelingEvent });
}

function writeMedicine(name) {
  api.session.storeAccessor.writeEvent({ medicine: name });
}

function writeWater(level) {
  api.session.storeAccessor.writeEvent({ water: "sips sip" });
}

function writeSleep(level) {
  api.session.storeAccessor.writeEvent({ sleep: "zzz" });
}

function writeFood() {
  var foodEvent = {};
  var description = prompt("Description");
  if (description != undefined) {
    foodEvent["description"] = description;
  }
  api.session.storeAccessor.writeEvent({ food: foodEvent });
}

module.exports = ActionView;
