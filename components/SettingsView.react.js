const React = require("react");
const PropTypes = require("prop-types");
const TakePhoto = require("../components/TakePhoto.react.js");
const CirclePuppy = require("../components/CirclePuppy.react.js");
const ScaleButtons = require("../components/ScaleButtons.react.js");
const Period = require("../components/Period.react.js");
import Grid from "@material-ui/core/Grid";

class SettingsView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
      Hello world ;)
      </div>
    );
  }
}

SettingsView.propTypes = {
  ioMgr: PropTypes.object.isRequired,
};

module.exports = SettingsView;
