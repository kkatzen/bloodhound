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
  setComponentConfig: function(componentConfig) {
    console.log("setComponentConfig in SessionActions", componentConfig);
    return {componentConfig};
  },
};

module.exports = alt.createActions(Actions);