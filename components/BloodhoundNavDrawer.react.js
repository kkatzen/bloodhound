const React = require("react");
const PropTypes = require("prop-types");
const TemporaryDrawer = require('./lib/TemporaryDrawer.react.js');
const {Actions, AppView} = require('../alt/actions/AppViewActions.js');
import Divider from "@material-ui/core/Divider";

class BloodhoundNavDrawer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TemporaryDrawer>
        <div>
          <h1>Go places, do stuff...</h1>
        </div>
        <Divider />
        <div onClick={() => Actions.setAppView(AppView.ACTIONS)}>
          Actions
        </div>
        <div onClick={() => Actions.setAppView(AppView.LOG)}>
          Log
        </div>
        <div onClick={() => Actions.setAppView(AppView.PERIOD)}>
          Period
        </div>
      </TemporaryDrawer>
    );
  }
}

module.exports = BloodhoundNavDrawer;



