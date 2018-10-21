const PropTypes = require("prop-types");
const React = require("react");
const connectToStores = require("alt-utils/lib/connectToStores");
const DOMUtils = require("../utils/DOMUtils.js");
const dateToStringWithoutSeconds = require("../utils/dateToStringWithoutSeconds.js");
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
const SessionStore = require("../alt/stores/SessionStore.js");
import Button from "@material-ui/core/Button";
const LoggedImageView = require('./LoggedImageView.react.js');

class LoggedEventView extends React.Component {
  constructor(props) {
    super(props);
  }

  createEvent(timestamp, eventData) {
    const id = timestamp;
    const time = dateToStringWithoutSeconds(timestamp * 1);
    const description = LoggedEventView.getEventText(eventData);
    const deleteButton = this.getEventDeleteButton(timestamp);
    const editButton = this.getEventEditButton(timestamp, eventData);
    let event = { id, time, description, deleteButton, editButton };
    if (eventData.imageRefId) {
      event.imageRefId = eventData.imageRefId;
    }
    return event;
  }

  getEventDeleteButton(timestamp) {
    return (
      <IconButton
        aria-label="Delete"
        onClick={() => this.props.ioMgr.deleteEvent(timestamp)}
      >
        <DeleteIcon />
      </IconButton>
    );
  }

  getEventEditButton(timestamp, eventData) {
    if (eventData.description || eventData.level) {
      return (
        <IconButton
          aria-label="Edit"
          onClick={() => this.processEdit(timestamp, eventData)}
        >
          <EditIcon />
        </IconButton>
      );
    } else {
      return (
        <IconButton aria-label="Edit" disabled>
          <EditIcon />
        </IconButton>
      );
    }
  }

  processEdit(timestamp, eventData) {
    if (eventData.description) {
      eventData.description = prompt("description", eventData.description);
    }
    if (eventData.level) {
      eventData.level = prompt("level", eventData.level);
    }
    this.props.ioMgr.storeEvent(timestamp, eventData);
  }

  static getEventText(eventData) {

    let newFormat = eventData.type ? true : false;
    let eventType = newFormat ? eventData.type : Object.keys(eventData)[0];
    let eventBody = newFormat ? eventData : eventData[eventType];

    switch (eventType) {
      case "hunger":
        let hungerValue = newFormat ? eventBody.level : eventBody;
        return "Hunger level " + hungerValue;
      case "water":
        return "Drank a cup of water";
      case "medicine":
        let medicineValue = newFormat ? eventBody.description : eventBody;
        return "Took " + medicineValue;
      case "sleep":
        return "Went to bed / Woke up";
      case "food":
        var text = "Ate " + eventBody.description;
        if (eventBody["photo"]) {
          text += " " + eventBody["photo"];
        }
        return text;
      case "feeling":
        var text = "Feeling bad " + eventBody.level;
        if (eventBody["description"]) {
          text += ' "' + eventBody["description"] + '"';
        }
        return text;
      default:
        return "";
    }
  }

  render() {

    event = this.createEvent(this.props.timestamp, this.props.event)

    return (
        <TableRow key={event.id}>
          <TableCell>{event.time}</TableCell>
          <TableCell>
            {event.description}
            {event.imageRefId && 
              <LoggedImageView ioMgr={this.props.ioMgr} imgId={event.imageRefId} />
            }
          </TableCell>
          <TableCell>{event.editButton}</TableCell>
          <TableCell>{event.deleteButton}</TableCell>
        </TableRow>
      );
  }
}

LoggedEventView.propTypes = {
  timestamp: PropTypes.string.isRequired,
  event: PropTypes.object.isRequired,
  user: PropTypes.object,
  ioMgr: PropTypes.object.isRequired
};

module.exports = LoggedEventView;
