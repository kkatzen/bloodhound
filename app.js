const DOMUtils = require("./utils/DOMUtils.js");
const dateToStringWithoutSeconds = require("./utils/dateToStringWithoutSeconds.js");
const React = require('react');
const ReactDOM = require('react-dom');
const AppBody = require('./components/AppBody.react.js');
const BloodhoundNavDrawer = require('./components/BloodhoundNavDrawer.react.js');
import List from "@material-ui/core/List";
const SessionAPI = require('./api/SessionAPI.js');
const IOMgr = require('./mgrs/IOMgr.js');
const ioMgr = new IOMgr;

window.onload = function() {
  ReactDOM.render(<AppBody ioMgr={ioMgr} />, document.getElementById('actionView'));
}

/**
 * We wouldn't need to do this if we were building all our HTML here. Since
 * we're not using a framework yet, we need to expose the actions that the
 * HTML needs to refer to. See api.js for more details.
 */
Object.assign(api.actions, {
  logIn: SessionAPI.logIn,
  signOut: SessionAPI.signOut,
  loadMore: IOMgr.loadMore,
});
