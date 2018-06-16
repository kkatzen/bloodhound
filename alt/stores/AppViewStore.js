const alt = require('../alt');
const {Actions, AppViewState} = require('../actions/AppViewStateActions.js');

class AppViewStore {
  constructor() {
    this.bindListeners({
      updateAppView: Actions.setAppView
    });

    this.state = {
      currentView: AppViewState.ACTIONS,
    };
  }

  updateAppView(action) {
    this.setState({ currentView: action.viewState});
  }
}

module.exports = alt.createStore(AppViewStore, 'AppViewStore');