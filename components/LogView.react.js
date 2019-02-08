const PropTypes = require("prop-types");
const React = require("react");
const connectToStores = require("alt-utils/lib/connectToStores");
const DOMUtils = require("../utils/DOMUtils.js");
const dateToStringWithoutSeconds = require("../utils/dateToStringWithoutSeconds.js");
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import EventStore from "../alt/stores/EventStore.js";
const SessionStore = require("../alt/stores/SessionStore.js");
import EventActions from "../alt/actions/EventActions.js";
import Button from "@material-ui/core/Button";
const LoggedEventView = require('./LoggedEventView.react.js');

class LogView extends React.Component {
  constructor(props) {
    super(props);
    console.log("PROPS!!! this.props", this.props);
  }

  static getStores() {
    return [EventStore, SessionStore];
  }

  static getPropsFromStores() {
    return {
      ...EventStore.getState(),
      user: SessionStore.getState().user
    };
  }

  render() {
    const events = this.props.events;

    const tableRows = [];

    Object.keys(events)
      .sort()
      .reverse()
      .forEach((timestamp, i) => {
        tableRows.push(timestamp);
      });

    return (
      <div>
        <h1>Event Log!!!!</h1>
        <Table>
          <TableBody>
            {tableRows.map(timestamp => {
              return (<LoggedEventView key={timestamp} ioMgr={this.props.ioMgr} timestamp={timestamp} event={events[timestamp]} />
              );
            })}
          </TableBody>
        </Table>
        <Button onClick={() => this.props.ioMgr.loadMore()}>Load More</Button>
      </div>
    );
  }
}

LogView.propTypes = {
  events: PropTypes.object.isRequired,
  user: PropTypes.object,
  ioMgr: PropTypes.object.isRequired
};

module.exports = connectToStores(LogView);
