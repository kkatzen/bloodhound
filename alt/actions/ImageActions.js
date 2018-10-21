const alt = require('../alt.js');

const Actions = {
  addImage: function(id, image) {
    return {id, image};
  },
};

module.exports = alt.createActions(Actions);