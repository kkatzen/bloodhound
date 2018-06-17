const alt = require('../alt');
const EventActions = require('../actions/EventActions.js');

class EventStore {
  constructor() {
    this.bindListeners({
      _addEvent: EventActions.addEvent,
      _deleteEvent: EventActions.deleteEvent,
    });

    this.state = {
      events: {},
    };
  }

  _addEvent(action) {
    // check if it has attribute type, if not, it's a dumb format and reformat it
    this.setState({
      events: {
        ...this.state.events,
        [action.timestamp]: action.event,
      },
    });
  }

  _deleteEvent(action) {
    if (this.state[action.timestamp] == null) {
      return this.state;
    }
    const state = {...this.state.events};
    delete state[action.timestamp];
    return state;
  }
}

module.exports = alt.createStore(EventStore, 'EventStore');