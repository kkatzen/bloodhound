const React = require("react");
const PropTypes = require("prop-types");
const TakePhoto = require("../components/TakePhoto.react.js");
const CirclePuppy = require("../components/CirclePuppy.react.js");
const EditableCirclePuppy = require("../components/EditableCirclePuppy.react.js");
const TextButton = require("../components/TextButton.react.js");
const ScaleButtons = require("../components/ScaleButtons.react.js");
const ImageComponent = require("../components/ImageComponent.react.js");
import Grid from "@material-ui/core/Grid";
const SessionStore = require("../alt/stores/SessionStore.js");
import CircularProgress from "@material-ui/core/CircularProgress";
const connectToStores = require("alt-utils/lib/connectToStores");

class SettingsView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };
    setTimeout(() => {
      var configRef = firebase
        .database()
        .ref("configs/" + SessionStore.state.user.uid + "");
      configRef.on("value", snapshot => this.getCurrentConfig(snapshot));
    }, 1000);
  }

  static getStores() {
    return [SessionStore];
  }

  static getPropsFromStores() {
    return {
      user: SessionStore.getState().user,
      configStore: SessionStore.getState().componentConfig
    };
  }

  getCurrentConfig(snapshot) {
    this.setState({ value: snapshot.val() });
  }

  handleChange(event) {
    console.log("handleChange", event);
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.ioMgr.setComponentConfig(this.state.value);
  }

  createComponent(config, index) {
    if (!config) {
      return "";
    }
    config["index"] = index;
    if (config.componentType == "CirclePuppy") {
      return <EditableCirclePuppy config={config} ioMgr={this.props.ioMgr} />;
    } else if (config.componentType == "ScaleButtons") {
      return <ScaleButtons config={config} ioMgr={this.props.ioMgr} />;
    } else if (config.componentType == "TakePhoto") {
      return <TakePhoto config={config} ioMgr={this.props.ioMgr} />;
    } else if (config.componentType == "ImageComponent") {
      return <ImageComponent config={config} />;
    } else {
      return <TextButton config={config} ioMgr={this.props.ioMgr} />;
    }
  }

  render() {
    console.log("SettingsView render time!", this.props.configStore);
      if (
        !this.props.configStore ||
        !this.props.configStore.componentConfig ||
        !this.props.configStore.componentConfig.components
      ) {
        return (
          <div>
            <h1>loooaddddingg....</h1>
            <CircularProgress thickness={3} size={40} />
          </div>
        );
      } else {
        return (
           <div>
          <Grid
            container
            spacing={8}
            justify="space-around"
            className="actionsGridContainer">
            {this.props.configStore.componentConfig.components.map(
              (component, index) => {
                return this.createComponent(component, index);
              }
            )}
          </Grid>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <label>
              <textarea
                name="textarea"
                value={this.state.value}
                onChange={this.handleChange.bind(this)}
              />
            </label>
            <input type="submit" value="Submit" />
          </form>
        </div>
        );
      }
  }
}

SettingsView.propTypes = {
  ioMgr: PropTypes.object.isRequired
};

module.exports = connectToStores(SettingsView);

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
