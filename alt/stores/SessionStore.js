const alt = require('../alt');
const SessionActions = require('../actions/SessionActions.js');

class SessionStore {
  constructor() {
    this.bindListeners({
      _setUser: SessionActions.setUser,
      _unsetUser: SessionActions.unsetUser,
      _setLastItemLoaded: SessionActions.setLastItemLoaded,
      _setComponentConfig: SessionActions.setComponentConfig,
    });

    this.state = {
      user: null,
      lastItemLoaded: 0,
      componentConfig: null,
    };
  }

  _setUser(action) {
    this.setState({user: action.user, lastItemLoaded: 0, componentConfig: null});
  }

  _unsetUser(action) {
    this.setState({user: null, lastItemLoaded: 0, componentConfig: null});
  }

  _setLastItemLoaded(action) {
    this.setState({
      ...this.state,
      ...action,
    });
  }

  _setComponentConfig(newComponentConfig) {
    console.log("_setComponentConfig in SessionStore", newComponentConfig);
    console.log(this.state.user);
    this.setState({user: this.state.user, lastItemLoaded: this.state.lastItemLoaded, componentConfig: newComponentConfig});
    console.log(this.state.user);
  }
}

module.exports = alt.createStore(SessionStore, 'SessionStore');