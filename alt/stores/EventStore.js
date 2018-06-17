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
    console.log('xx_deleteEvent', this.state.events, action, this.state.events[action.timestamp]);
    if (this.state.events[action.timestamp] == null) {
      return this.state;
    }
    console.log('xx_deleteEvent2');
    const state = {...this.state};
    delete state.events[action.timestamp];
    return state;
  }
}

module.exports = alt.createStore(EventStore, 'EventStore');