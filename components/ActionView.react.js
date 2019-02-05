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
import CircularProgress from '@material-ui/core/CircularProgress';

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
            <CircularProgress thickness={3} size={40} />
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
};

module.exports = connectToStores(ActionView);
