const React = require("react");
const PropTypes = require("prop-types");
const TakePhoto = require("../components/TakePhoto.react.js");
const CirclePuppy = require("../components/CirclePuppy.react.js");
const TextButton = require("../components/TextButton.react.js");
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
      return (<TextButton config={config} />);
    }
  }

  render() {

/*
    components.push(
      this.createComponent({
        componentType: "CirclePuppy",
        text: "one",
        imagePath: "img/hunger.png",
        xsGridWidth: 12
      })
    );

*/
    const components = [];
    components.push(
      this.createComponent({
        componentType: "ScaleButtons",
        text: "hunger",
        min: "1",
        max: "5",
        xsGridWidth: 12
      })
    ); 
    components.push(
      this.createComponent({
        componentType: "TextButton",
        type: "photo",
        xsGridWidth: 2,
        iconName: "camera",
        shape: "circle"
      })
    );
    components.push(
      this.createComponent({
        componentType: "TextButton",
        type: "photo",
        xsGridWidth: 1,
        iconName: "camera",
        shape: "circle"
      })
    );
    components.push(
      this.createComponent({
        componentType: "TextButton",
        type: "photo",
        xsGridWidth: 1,
        iconName: "camera",
        shape: "circle"
      })
    );
    components.push(
      this.createComponent({
        componentType: "TextButton",
        text: "pets!!!",
        xsGridWidth: 2,
        iconName: "pets",
        shape: "circle",
        description: true
      })
    );
    components.push(
      this.createComponent({
        componentType: "TextButton",
        text: "android",
        pet: "pet",
        xsGridWidth: 4,
        iconName: "android"
      })
    );
    components.push(
      this.createComponent({
        componentType: "TextButton",
        text: "android",
        pet: "pet",
        xsGridWidth: 3,
        iconName: "android",
        shape: "bigCircle"
      })
    );
    components.push(
      this.createComponent({
        componentType: "TextButton",
        text: "android",
        pet: "pet",
        xsGridWidth: 3,
        iconName: "android",
        shape: "bigCircle"
      })
    ); 
    components.push(
      this.createComponent({
        componentType: "TextButton",
        text: "android",
        pet: "pet",
        xsGridWidth: 3,
        iconName: "android",
        shape: "bigCircle"
      })
    );
    components.push(
      this.createComponent({
        componentType: "TextButton",
        text: "android",
        pet: "pet",
        xsGridWidth: 3,
        iconName: "android",
        shape: "bigCircle"
      })
    );
    components.push(
      this.createComponent({
        componentType: "TextButton",
        type: "photo",
        xsGridWidth: 12,
        iconName: "camera",
        text: "AFSHEEN"
      })
    );
    console.log("components", components);

    return (
      <Grid
        container
        spacing={8}
        justify="space-around"
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
