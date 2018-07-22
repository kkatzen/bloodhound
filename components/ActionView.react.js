const React = require("react");
const PropTypes = require("prop-types");
const TakePhoto = require("../components/TakePhoto.react.js");
const CirclePuppy = require("../components/CirclePuppy.react.js");
const ImageComponent = require("../components/ImageComponent.react.js");
const ScaleButtons = require("../components/ScaleButtons.react.js");
const PeriodView = require("../components/PeriodView.react.js");
const TextButton = require("../components/TextButton.react.js");
import Grid from "@material-ui/core/Grid";
const SessionStore = require("../alt/stores/SessionStore.js");
const connectToStores = require("alt-utils/lib/connectToStores");

class ActionView extends React.Component {
  constructor(props) {
    super(props);
    setTimeout(() => {
      console.log("PROPS!!! this.props", this.props);
    }, 1000);
    this.state = {
      currentConfig: this.props.componentConfig
    };
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

  /*    console.log("SessionStore.state.componentConfig", SessionStore.state.componentConfig);
    const config = SessionStore.state.componentConfig
      ? SessionStore.state.componentConfig
      : JSON.parse(
          '{"components": [{  "componentType": "ImageComponent", "xsGridWidth": "12", "imagePath": "img/sick.png"}]}'
        );
    this.state = {
      currentConfig: config
    };
    //    setTimeout(() => {

    console.log(
      "SessionStore.state.componentConfig",
      SessionStore.state.componentConfig
    );
    /*
      if (SessionStore.state.user) {
        var configRef = firebase
          .database()
          .ref("configs/" + SessionStore.state.user.uid + "");
        configRef.on("value", snapshot => this.getCurrentConfig(snapshot));
      }
      */
  // }, 1300);
  //  }

  getCurrentConfig(snapshot) {
    if (snapshot.val()) {
      // User has never set config
      this.setState({ currentConfig: JSON.parse(snapshot.val()) });
      console.log("SET this.state.currentConfig", this.state.currentConfig);
    }
  }

  createComponent(config) {
    if (config.componentType == "CirclePuppy") {
      return <CirclePuppy config={config} ioMgr={this.props.ioMgr} />;
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
    console.log("render time!", this.props.configStore);

    if (!this.props.user) {
      return (
        <div>
          <h1>User not found</h1>
        </div>
      );
    } else {
      if (
        !this.props.configStore ||
        !this.props.configStore.componentConfig ||
        !this.props.configStore.componentConfig.components
      ) {
        return (
          <div>
            <h1>Actions not found</h1>
          </div>
        );
      } else {
        return (
          <div>
            <h1>Actions</h1>
            <Grid
              container
              spacing={8}
              justify="space-around"
              className="actionsGridContainer"
            >
              {this.props.configStore.componentConfig.components.map(
                component => {
                  return this.createComponent(component);
                }
              )}
            </Grid>
          </div>
        );
      }
    }
  }
}

ActionView.propTypes = {
  ioMgr: PropTypes.object.isRequired
  //  componentConfig: PropTypes.object.isRequired,
};

module.exports = connectToStores(ActionView);

/*

    const components = [
      {
        componentType: "ScaleButtons",
        type: "hunger",
        min: "1",
        max: "5",
        xsGridWidth: 12
      },
      {
        componentType: "CirclePuppy",
        descriptionPrompt: true,
        type: "food",
        imagePath: "img/hunger.png",
        xsGridWidth: 4
      },
      {
        componentType: "CirclePuppy",
        imagePath: "img/water.png",
        xsGridWidth: 4,
        type: "water"
      },
      {
        componentType: "CirclePuppy",
        imagePath: "img/sleep.png",
        xsGridWidth: 4,
        type: "sleep"
      },
      {
        componentType: "TakePhoto",
        xsGridWidth: 12
      },
      {
        componentType: "TextButton",
        xsGridWidth: 3,
        text: "Earl Tea",
        description: "Earl Grey Tea Soy creamer",
        type: "food"
      },
      {
        componentType: "ImageComponent",
        xsGridWidth: 12,
        imagePath: "img/sick.png"
      },
      {
        componentType: "TextButton",
        xsGridWidth: 4,
        text: "Sumatriptan",
        description: "Sumatriptan",
        type: "medicine"
      },
      {
        componentType: "TextButton",
        xsGridWidth: 4,
        text: "Ibuprofen",
        description: "Ibuprofen",
        type: "medicine"
      },
      {
        componentType: "TextButton",
        xsGridWidth: 4,
        text: "Acetamenophin",
        description: "Acetamenophin",
        type: "medicine"
      },
      {
        componentType: "ScaleButtons",
        type: "feeling",
        min: "1",
        max: "5",
        xsGridWidth: 12,
        descriptionPrompt: true
      }
    ];

*/
