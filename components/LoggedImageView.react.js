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
const ImageStore = require("../alt/stores/ImageStore.js");
import Button from "@material-ui/core/Button";

class LoggedImageView extends React.Component {
  constructor(props) {
    super(props);
  }

  static getStores() {
    return [ImageStore];
  }

  static getPropsFromStores() {
    return {
      ...ImageStore.getState(),
    };
  }

  render() {
    let imgId =this.props.imgId;
    return (
      <div>
      {(!ImageStore.state.images || !ImageStore.state.images[imgId]) &&
        <Button onClick={() => this.props.ioMgr.getImage(imgId)}>Image</Button>
      }
      {(ImageStore.state.images && ImageStore.state.images[imgId]) &&
      <img class="photoEvent" src={ImageStore.state.images[imgId]} />
      }
      </div>
      );
  }
}

LoggedImageView.propTypes = {
  imgId: PropTypes.string.isRequired,
  ioMgr: PropTypes.object.isRequired
};

module.exports = connectToStores(LoggedImageView);
