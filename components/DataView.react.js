const React = require("react");
const PropTypes = require("prop-types");
import Grid from "@material-ui/core/Grid";
const SessionStore = require("../alt/stores/SessionStore.js");

class DataView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    this.props.ioMgr.dataViewTest();

    return <h1>Data View {SessionStore.state.user.displayName}</h1>;
  }
}

DataView.propTypes = {
  ioMgr: PropTypes.object.isRequired
};

module.exports = DataView;
