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
    console.log('A name was submitted: ' + this.state.value);
    event.preventDefault();
    firebase
      .database()
      .ref("configs/" + SessionStore.state.user.uid)
      .set(this.state.value);
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

