const React = require("react");
const PropTypes = require("prop-types");
const ActionView = require('./ActionView.react.js');
const LogView = require('./LogView.react.js');
const connectToStores = require('alt-utils/lib/connectToStores');
const AppViewStore = require('../alt/stores/AppViewStore.js');
const {AppView} = require('../alt/actions/AppViewActions.js');
const PeriodView = require('./PeriodView.react.js');
const Settings = require('./SettingsView.react.js');

class AppBody extends React.Component {
  constructor(props) {
    super(props);
  }

  static getStores() {
    return [AppViewStore];
  }

  static getPropsFromStores() {
    return AppViewStore.getState();
  }

  render() {
    let content = null;
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
    }

    return content;
  }
}

AppBody.propTypes = {
  currentView: PropTypes.oneOf(Object.values(AppView)).isRequired,
  ioMgr: PropTypes.object.isRequired,
};

module.exports = connectToStores(AppBody);
