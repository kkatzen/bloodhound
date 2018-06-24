const React = require("react");
const PropTypes = require("prop-types");
const TakePhoto = require("../components/TakePhoto.react.js");
const CirclePuppy = require("../components/CirclePuppy.react.js");
const ScaleButtons = require("../components/ScaleButtons.react.js");
const PeriodView = require("../components/PeriodView.react.js");
import Grid from "@material-ui/core/Grid";
const TextButton = require("../components/TextButton.react.js");

class ActionView extends React.Component {
  constructor(props) {
    super(props);
  }

  writeHunger(level) {
    console.log("writeHunger");
    console.log(level);
    this.props.ioMgr.writeEvent({ hunger: level });
  }

  feelingBad(level) {
    var feelingEvent = { level: level };
    var description = prompt("how do you feel");
    if (description != undefined) {
      feelingEvent["description"] = description;
    }
    this.props.ioMgr.writeEvent({ feeling: feelingEvent });
  }

  writeMedicine(name) {
    this.props.ioMgr.writeEvent({ medicine: name });
  }

  writeWater(level) {
    this.props.ioMgr.writeEvent({ water: "sips sip" });
  }

  writeSleep(level) {
    this.props.ioMgr.writeEvent({ sleep: "zzz" });
  }

  writeFood() {
    var foodEvent = {};
    var description = prompt("Description");
    if (description != undefined) {
      foodEvent["description"] = description;
    }
    this.props.ioMgr.writeEvent({ food: foodEvent });
  }

  createComponent(config) {
    if (config.componentType == "CirclePuppy") {
      return (
        <CirclePuppy
          imagePath={config.imagePath}
          onClick={() => console.log(config.text)}
          xsGridWidth={config.xsGridWidth} />
      );
    } else if (config.componentType == "ScaleButtons") {
      return (
        <ScaleButtons
          onClick={i => console.log(config.text + i)}
          min={parseInt(config.min)}
          max={parseInt(config.max)}
          xsGridWidth={4}
          xsGridWidth={config.xsGridWidth} />
      );
    } else {
      return (<TextButton config={config} ioMgr={this.props.ioMgr} />);
    }
  }

  render() {
    const components = [];
    components.push(
      this.createComponent({
        componentType: "TextButton",
        xsGridWidth: 2,
        text: "Earl Grey Tea",
        description: "Earl Grey Tea Soy creamer",
        type: "food"
      })
    );

    return (
      <div>
        <h1>Actions</h1>
        <Grid container spacing={8} justify="space-around"className="actionsGridContainer">
          <CirclePuppy imagePath="img/hunger.png" onClick={() => this.writeFood()} />
          <CirclePuppy imagePath="img/water.png" onClick={() => this.writeWater()} />
          <CirclePuppy imagePath="img/sleep.png" onClick={() => this.writeSleep()} />
          <ScaleButtons onClick={(i) => this.writeHunger(i)} min={0} max={5} xsGridWidth={12}/>
          <Grid item xs={12} sm={6}>
              <TakePhoto ioMgr={this.props.ioMgr} />
          </Grid>
          <Grid item xs={6} sm={6}>
              <img src="img/sick.png" className="fullRowHeight" />
              <ScaleButtons onClick={(i) => this.feelingBad(i)} min={1} max={5} xsGridWidth={12}/>
          </Grid>
          <Grid item xs={6} sm={6}>
              <img src="img/medicine.png" className="fullRowHeight" />
              <button onClick={() => this.writeMedicine("sumatriptan")}>
                Sumatriptan
              </button>
              <button onClick={() => this.writeMedicine("ibuprofen")}>
                Ibuprofen
              </button>
              <button onClick={() => this.writeMedicine("acetamenophin")}>
                Acetamenophin
              </button>
          </Grid>
        </Grid>
        <Grid
          container
          spacing={8}
          justify="space-around"
        >
        {components.map(component => {
          return component;
        })}
      </Grid>
      </div>
    );
  }
}

ActionView.propTypes = {
  ioMgr: PropTypes.object.isRequired,
};

module.exports = ActionView;
