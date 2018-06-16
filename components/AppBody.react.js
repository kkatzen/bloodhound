const React = require("react");
const PropTypes = require("prop-types");
const ActionView = require('./ActionView.react.js');
const connectToStores = require('alt-utils/lib/connectToStores');
const AppViewStore = require('../alt/stores/AppViewStore.js');
const {AppView} = require('../alt/actions/AppViewActions.js');
const Period = require('./Period.react.js');

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
        content = (<ActionView />);
        break;
      case AppView.LOG:
        // TODO
        content = null;
        break;
      case AppView.PERIOD:
        content = (<Period />);
        break;
    }

    return content;
  }
}

AppBody.propTypes = {
  currentView: PropTypes.oneOf(Object.values(AppView)).isRequired,
}

module.exports = connectToStores(AppBody);
