const React = require("react");
const TakePhoto = require("../components/TakePhoto.react.js");
const CirclePuppy = require("../components/CirclePuppy.react.js");
const ScaleButtons = require("../components/ScaleButtons.react.js");
const Period = require("../components/Period.react.js");
import Grid from "@material-ui/core/Grid";

class ActionView extends React.Component {
  render() {
    return (
      <div>
        <Grid container spacing={8} justify="space-around"className="actionsGridContainer">
          <CirclePuppy imagePath="img/hunger.png" onClick={writeFood} />
          <CirclePuppy imagePath="img/water.png" onClick={writeWater} />
          <CirclePuppy imagePath="img/sleep.png" onClick={writeSleep} />
          <Grid item xs={12} sm={6}>
            Hunger:
            <ScaleButtons onClick={writeHunger} min={0} max={5} />
          </Grid>
          <Grid item xs={12} sm={6}>
              <TakePhoto />
          </Grid>
          <Grid item xs={6} sm={6}>
              <img src="img/sick.png" className="fullRowHeight" />
              <ScaleButtons onClick={feelingBad} min={1} max={5} />
          </Grid>
          <Grid item xs={6} sm={6}>
              <img src="img/medicine.png" className="fullRowHeight" />
              <button onClick={writeMedicine.bind(null, "sumatriptan")}>
                Sumatriptan
              </button>
              <button onClick={writeMedicine.bind(null, "ibuprofen")}>
                Ibuprofen
              </button>
              <button onClick={writeMedicine.bind(null, "acetamenophin")}>
                Acetamenophin
              </button>
          </Grid>
        </Grid>
        <Period />
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
