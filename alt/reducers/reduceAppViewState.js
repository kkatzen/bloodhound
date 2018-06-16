
const {ActionTypes, AppViewState} = require('../actions/AppViewStateActions.js');

module.exports = function reduceAppViewState(
  state = {currentView: AppViewState.ACTIONS},
  action,
) {
  switch (action.type) {
    case ActionTypes.SET_APP_VIEW:
      return {currentView: action.viewState};
    default:
      return state;
  }
}