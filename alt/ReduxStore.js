const {combineReducers, createStore} = require('redux');
const reduceAppViewState = require ('./reducers/reduceAppViewState.js');
​
module.exports = createStore(combineReducers({
  reduceAppViewState,
}));