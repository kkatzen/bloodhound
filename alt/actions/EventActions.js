const alt = require('../alt.js');

const Actions = {
  addEvent: function(timestamp, event) {
    return {timestamp, event};
  },
  deleteEvent: function(timestamp) {
    return {timestamp};
  },
  // setUser: function(user) {
  //   return {user};
  // },
  // unsetUser: function() {
  //   return {};
  // },
  // setLastItemLoaded: function(lastItemLoaded) {
  //   return {lastItemLoaded};
  // },
};

module.exports = alt.createActions(Actions);