const alt = require('../alt.js');

const AppView = {
  ACTIONS: 'ACTIONS',
  LOG: 'LOG',
  PERIOD: 'PERIOD',
  SETTINGS: 'SETTINGS',
};

const Actions = {
  setAppView: function(viewState) {
    return {viewState};
  },
};

module.exports = {
  AppView,
  Actions: alt.createActions(Actions),
};