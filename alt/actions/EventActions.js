const alt = require('../alt.js');

const Actions = {
  addEvent: function(timestamp, event) {
    return {timestamp, event};
  },
  deleteEvent: function(timestamp) {
    return {timestamp};
  },
};

module.exports = alt.createActions(Actions);