const React = require("react");
const PropTypes = require("prop-types");
const TakePhoto = require("../components/TakePhoto.react.js");
const CirclePuppy = require("../components/CirclePuppy.react.js");
const TextButton = require("../components/TextButton.react.js");
const ScaleButtons = require("../components/ScaleButtons.react.js");
import Grid from "@material-ui/core/Grid";
const SessionStore = require("../alt/stores/SessionStore.js");

class SettingsView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
    setTimeout(() => {
      var configRef = firebase
        .database()
        .ref("configs/" + SessionStore.state.user.uid + "");
    configRef.on("value", snapshot => this.getCurrentConfig(snapshot));
    }, 1000);
  }

  getCurrentConfig(snapshot) {
    this.setState({value: snapshot.val()});
  }

  handleChange(event) {
    console.log("handleChange", event);
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.ioMgr.setComponentConfig(this.state.value);
  }

  render() {

    return (
    <form onSubmit={this.handleSubmit.bind(this)}>
        <label>
        <textarea name="textarea" value={this.state.value} onChange={this.handleChange.bind(this)}></textarea>
        </label>
        <input type="submit" value="Submit" />
      </form>

    );
  }
}

SettingsView.propTypes = {
  ioMgr: PropTypes.object.isRequired
};

module.exports = SettingsView;

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


/*
{"components": [ {
    "componentType": "ScaleButtons",
    "type": "hunger",
    "min": "1",
    "max": "5",
    "xsGridWidth": 12
  },
  {
    "componentType": "CirclePuppy",
    "descriptionPrompt": true,
    "type": "food",
    "imagePath": "img/hunger.png",
    "xsGridWidth": 4
  },
  {
    "componentType": "CirclePuppy",
    "imagePath": "img/water.png",
    "xsGridWidth": 4,
    "type": "water"
  },
  {
    "componentType": "CirclePuppy",
    "imagePath": "img/sleep.png",
    "xsGridWidth": 4,
    "type": "sleep"
  },
  {
    "componentType": "TakePhoto",
    "xsGridWidth": 12
  },
  {
    "componentType": "TextButton",
    "xsGridWidth": 3,
    "text": "Earl Tea",
    "description": "Earl Grey Tea Soy creamer",
    "type": "food"
  },
  {
    "componentType": "ImageComponent",
    "xsGridWidth": 12,
    "imagePath": "img/sick.png"
  },
  {
    "componentType": "TextButton",
    "xsGridWidth": 4,
    "text": "Sumatriptan",
    "description": "Sumatriptan",
    "type": "medicine"
  },
  {
    "componentType": "TextButton",
    "xsGridWidth": 4,
    "text": "Ibuprofen",
    "description": "Ibuprofen",
    "type": "medicine"
  },
  {
    "componentType": "TextButton",
    "xsGridWidth": 4,
    "text": "Acetamenophin",
    "description": "Acetamenophin",
    "type": "medicine"
  },
  {
    "componentType": "ScaleButtons",
    "type": "feeling",
    "min": "1",
    "max": "5",
    "xsGridWidth": 12,
    "descriptionPrompt": true
  }
]
}
*/
