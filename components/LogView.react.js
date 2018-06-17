const PropTypes = require("prop-types");
const React = require("react");
const connectToStores = require("alt-utils/lib/connectToStores");
const DOMUtils = require("../utils/DOMUtils.js");
const dateToStringWithoutSeconds = require("../utils/dateToStringWithoutSeconds.js");
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import EventStore from "../alt/stores/EventStore.js";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
const SessionStore = require("../alt/stores/SessionStore.js");
import EventActions from "../alt/actions/EventActions.js";
import Button from "@material-ui/core/Button";

class LogView extends React.Component {
  constructor(props) {
    super(props);
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

  createEvent(timestamp, eventData) {
    console.log(eventData);
    const id = timestamp;
    const time = dateToStringWithoutSeconds(timestamp * 1);
    const description = LogView.getEventText(eventData);
    const deleteButton = this.getEventDeleteButton(timestamp);
    const image = eventData["dataURL"];
    let event = { id, time, description, deleteButton };
    if (eventData.dataURL) {
      event.image = eventData.dataURL;
    }
    return event;
  }

  getEventDeleteButton(timestamp) {
    return (
      <IconButton aria-label="Delete" onClick={() => this.props.ioMgr.deleteEvent(timestamp)}>
        <DeleteIcon />
      </IconButton>
    );
  }

  /*
  getEditEventButton(timestamp) {
        if (
          eventType == "hunger" ||
          eventType == "medicine" ||
          eventType == "food" ||
          eventType == "feeling"
        ) {
          var btn = document.createElement("input");
          btn.type = "button";
          btn.value = "e";
          btn.onclick = function(event) {
            if (eventType == "hunger") {
              eventData["hunger"] = prompt("what hunger level?");
            } else if (eventType == "medicine") {
              eventData["medicine"] = prompt("what medicine level?");
            } else if (eventType == "food") {
              eventData["food"]["description"] = prompt("what food?");
            } else if (eventType == "feeling") {
              eventData["feeling"]["level"] = prompt("what feeling level?");
              eventData["feeling"]["description"] = prompt("what description?");
            }
            firebase
              .database()
              .ref("events/" + this.user.uid + "/" + timestamp)
              .set(eventData);
          };
          rowEl.insertCell().appendChild(btn);
        }
};
*/
  
  static getEventText(eventData) {
    console.log("eventData",eventData);

    switch (Object.keys(eventData)[0]) {
      case "hunger":
        return "Hunger level " + eventData["hunger"];
      case "water":
        return "Drank a cup of water";
      case "medicine":
        return "Took " + eventData["medicine"];
      case "sleep":
        return "Went to bed / Woke up";
      case "food":
        var text = "Ate " + eventData["food"]["description"];
        if (eventData["food"]["photo"]) {
          text += " " + eventData["food"]["photo"];
        }
        return text;
      case "feeling":
        var text = "Feeling bad " + eventData["feeling"]["level"];
        if (eventData["feeling"]["description"]) {
          text += ' "' + eventData["feeling"]["description"] + '"';
        }
        return text;
      default:
        return "";
    }

    // TODO(kristak): add back iamges

    /*
        } else if (eventData.type == "image") {
          const img = document.createElement("img");
          img.src = eventData["dataURL"];
          img.id = "photoEvent";
          rowEl.insertCell().appendChild(img);
        }
*/
  }

  render() {
    const events = this.props.events;

    const tableRows = [];

    Object.keys(events)
      .sort()
      .reverse()
      .forEach((timestamp, i) => {
        tableRows.push(this.createEvent(timestamp, events[timestamp]));
      });

    return (
      <div>
        <h1>Event Log</h1>
        <Table>
          <TableBody>
            {tableRows.map(n => {
              return (
                <TableRow key={n.id}>
                  <TableCell>{n.time}</TableCell>
                  <TableCell>{n.description}{n.image && <img height="150px" src={n.image} />}</TableCell>
                  <TableCell>{n.deleteButton}</TableCell>
                </TableRow>
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
  ioMgr: PropTypes.object.isRequired,
};

module.exports = connectToStores(LogView);
