const React = require("react");
const PropTypes = require("prop-types");
const ActionView = require('./ActionView.react.js');
const LogView = require('./LogView.react.js');
const connectToStores = require('alt-utils/lib/connectToStores');
const AppViewStore = require('../alt/stores/AppViewStore.js');
const {AppView} = require('../alt/actions/AppViewActions.js');
const DataView = require('./DataView.react.js');
const PeriodView = require('./PeriodView.react.js');
const Settings = require('./SettingsView.react.js');
const BloodhoundNavDrawer = require('./BloodhoundNavDrawer.react.js');
const SessionStore = require("../alt/stores/SessionStore.js");
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

class AppBody extends React.Component {
  constructor(props) {
    super(props);
  }

  static getStores() {
    return [AppViewStore, SessionStore];
  }

  static getPropsFromStores() {
    return AppViewStore.getState();
  }

  static getPropsFromSessionStore() {
    return SessionStore.getState();
  }

  render() {
    let content;
    console.log(this.props);
    switch (this.props.currentView) {
      case AppView.ACTIONS:
        content = (<ActionView ioMgr={this.props.ioMgr} />);
        break;
      case AppView.LOG:
        content = (<LogView ioMgr={this.props.ioMgr} />);
        break;
      case AppView.PERIOD:
        content = (<PeriodView ioMgr={this.props.ioMgr} />);
        break;
      case AppView.SETTINGS:
        content = (<Settings ioMgr={this.props.ioMgr} />);
        break;
      case AppView.DATA:
        content = (<DataView ioMgr={this.props.ioMgr} />);
        break;
    }
    const login = (<div id="signout">
        {SessionStore.state.user ? 
          <div>{SessionStore.state.user.email}
          <Button onClick={()=> api.actions.signOut()}>Sign out</Button></div> : 
          <Button onClick={()=> api.actions.logIn()}>Login</Button>}
        </div>);
    const appbar = (
      <AppBar position="static" id="appbar">
          <Toolbar>
            <BloodhoundNavDrawer />
              {login}
          </Toolbar>
          </AppBar>);
    return (<div>{appbar}{content}</div>);
  }
}

/* Object.values is not a function in some browsers so mapping the dictionary to a list */
var appViewsList = Object.keys(AppView).map(function(key) {
    return AppView[key];
});

AppBody.propTypes = {
  currentView: PropTypes.oneOf(appViewsList).isRequired,
  ioMgr: PropTypes.object.isRequired,
};

module.exports = connectToStores(AppBody);
