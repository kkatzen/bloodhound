const alt = require('../alt.js');

const AppViewState = {
  ACTIONS: 'ACTIONS',
  LOG: 'LOG',
};

const Actions = {
  setAppView: function(viewState) {
    return {viewState};
  },
};

module.exports = {
  AppViewState,
  Actions: alt.createActions(Actions),
};