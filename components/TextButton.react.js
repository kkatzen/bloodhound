const React = require("react");
const PropTypes = require("prop-types");
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";

class TextButton extends React.Component {
  constructor(props) {
    super(props);
  }

  writeEvent() {
    let writtenEvent = { type: this.props.config.type };
    if (this.props.config.description) {
      writtenEvent["description"] = prompt("Description");
    }
    console.log(writtenEvent);
  }

  renderButton() {
    if (this.props.config.shape == "circle") {
      return (
        <Button
          variant="fab"
          mini
          color="primary"
          onClick={() => this.writeEvent()}
          className="textButtonButton"
        >
          <Icon className="textButtonIcon">{this.props.config.iconName}</Icon>
        </Button>
      );
    } else if (this.props.config.shape == "bigCircle") {
      return (
        <Button
          variant="fab"
          color="primary"
          onClick={() => this.writeEvent()}
          className="textButtonButton"
        >
          <Icon className="textButtonIcon">{this.props.config.iconName}</Icon>
        </Button>
      );
    } else {
      //else if (this.props.config.shape == "rectangle") {
      return (
        <Button
          variant="contained"
          color="primary"
          onClick={() => this.writeEvent()}
          className="textButtonButton"
        >
          <Icon className="textButtonIcon">{this.props.config.iconName}</Icon>
          {this.props.config.text}
        </Button>
      );
    }
  }

  render() {
    return (
      <Grid
        item
        xs={this.props.config.xsGridWidth}
        sm={this.props.config.xsGridWidth}
        className="textButtonGridItem"
      >
        {this.renderButton()}
      </Grid>
    );
  }
}

TextButton.propTypes = {
  config: PropTypes.object
};

module.exports = TextButton;
