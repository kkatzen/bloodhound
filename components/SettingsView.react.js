const React = require("react");
const PropTypes = require("prop-types");
const TakePhoto = require("../components/TakePhoto.react.js");
const CirclePuppy = require("../components/CirclePuppy.react.js");
const ScaleButtons = require("../components/ScaleButtons.react.js");
import Grid from "@material-ui/core/Grid";

class SettingsView extends React.Component {
  constructor(props) {
    super(props);
  }

  /*


{index: {EventComonent}}

  EventComponent {
eventConfiguration: <EventConfiguration>
componentConfiguration: <ComponentConfiguration>
}

EventConfiguration {
name: <string>,
description: <string>,
dataURL: <string>,
duration: <float>,
numericalData: {customName: <float>},
booleanData: {customName: <bool>}
}

ComponentConfiguration {
componentType: <enum>,
min: <int>,
max: <int>,
icon: <enum>,
gridWidth: <>
}

*/

  createComponent(config) {
    if (config.componentType == "CirclePuppy") {
      return (
        <CirclePuppy
          imagePath={config.imagePath}
          onClick={() => console.log(config.text)}
          xsGridWidth={config.xsGridWidth}
        />
      );
    } else {
      return (
        <ScaleButtons
          onClick={i => console.log(config.text + i)}
          min={parseInt(config.min)}
          max={parseInt(config.max)}
          xsGridWidth={4}
          xsGridWidth={config.xsGridWidth}
        />
      );
    }
  }

  /*
    const tableRows = [];

    Object.keys(events)
      .sort()
      .reverse()
      .forEach((timestamp, i) => {
        tableRows.push(this.createEvent(timestamp, events[timestamp]));
      });

*/
  render() {
    /*  
     Object.keys(events)
      .sort()
      .reverse()
      .forEach((timestamp, i) => {
        tableRows.push(this.createEvent(timestamp, events[timestamp]));
      });

*/

    const components = [];
    components.push(
      this.createComponent({
        componentType: "CirclePuppy",
        text: "one",
        imagePath: "img/hunger.png",
        xsGridWidth: 3
      })
    );
    components.push(
      this.createComponent({
        componentType: "CirclePuppy",
        text: "two",
        imagePath: "img/water.png",
        xsGridWidth: 6
      })
    );
    components.push(
      this.createComponent({
        componentType: "CirclePuppy",
        text: "two",
        imagePath: "img/water.png",
        xsGridWidth: 12
      })
    );    components.push(
      this.createComponent({
        componentType: "CirclePuppy",
        text: "two",
        imagePath: "img/water.png",
        xsGridWidth: 6
      })
    );    components.push(
      this.createComponent({
        componentType: "CirclePuppy",
        text: "two",
        imagePath: "img/water.png",
        xsGridWidth: 6
      })
    );
        components.push(
      this.createComponent({
        componentType: "ScaleButtons",
        text: "hunger",
        min: "4",
        max: "5",
        xsGridWidth: 3
      })
    );
    components.push(
      this.createComponent({
        componentType: "ScaleButtons",
        text: "hunger",
        min: "1",
        max: "10",
        xsGridWidth: 12
      })
    );    components.push(
      this.createComponent({
        componentType: "CirclePuppy",
        text: "three",
        imagePath: "img/sleep.png",
        xsGridWidth: 3
      })
    );
    console.log("components", components);

    return (
      <Grid
        container
        spacing={8}
        justify="space-around"
        className="actionsGridContainer"
      >
        <Grid item xs={12} sm={12}>
          <h1>Dev Area- be warned!!!!</h1>
        </Grid>

        {components.map(component => {
          return component;
        })}
      </Grid>
    );
  }
}

SettingsView.propTypes = {
  ioMgr: PropTypes.object.isRequired
};

module.exports = SettingsView;
