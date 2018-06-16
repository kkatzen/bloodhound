const alt = require('../alt');
const {Actions, AppView} = require('../actions/AppViewActions.js');

class AppViewStore {
  constructor() {
    this.bindListeners({
      updateAppView: Actions.setAppView
    });

    this.state = {
      currentView: AppView.ACTIONS,
    };
  }

  updateAppView(action) {
    this.setState({ currentView: action.viewState});
  }
}

module.exports = alt.createStore(AppViewStore, 'AppViewStore');