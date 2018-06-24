const alt = require('../alt');
const SessionActions = require('../actions/SessionActions.js');

class SessionStore {
  constructor() {
    this.bindListeners({
      _setUser: SessionActions.setUser,
      _unsetUser: SessionActions.unsetUser,
      _setLastItemLoaded: SessionActions.setLastItemLoaded,
    });

    this.state = {
      user: null,
      lastItemLoaded: 0,
      componentConfig: null,
    };
  }

  _setUser(action) {
    this.setState({user: action.user, lastItemLoaded: 0});
  }

  _unsetUser(action) {
    this.setState({user: null, lastItemLoaded: 0});
  }

  _setLastItemLoaded(action) {
    this.setState({
      ...this.state,
      ...action,
    });
  }
}

module.exports = alt.createStore(SessionStore, 'SessionStore');