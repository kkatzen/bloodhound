const React = require("react");
const PropTypes = require("prop-types");
const ActionView = require('./ActionView.react.js');
const connectToStores = require('alt-utils/lib/connectToStores');
const AppViewStore = require('../alt/stores/AppViewStore.js');
const {AppViewState} = require('../alt/actions/AppViewStateActions.js');

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
    switch (this.props.currentView) {
      case AppViewState.ACTIONS:
        content = (<ActionView />);
        break;
    }

    return content;
  }
}

AppBody.propTypes = {
  currentView: PropTypes.oneOf(Object.values(AppViewState)).isRequired,
}

module.exports = connectToStores(AppBody);
