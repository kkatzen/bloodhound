const alt = require('../alt.js');

const Actions = {
  setUser: function(user) {
    return {user};
  },
  unsetUser: function() {
    return {};
  },
  setLastItemLoaded: function(lastItemLoaded) {
    return {lastItemLoaded};
  },
};

module.exports = alt.createActions(Actions);