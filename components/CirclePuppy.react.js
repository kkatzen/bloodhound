const React = require("react");
const PropTypes = require("prop-types");
import Grid from "@material-ui/core/Grid";

class CirclePuppy extends React.Component {
  constructor(props) {
    super(props);
  }

  writeEvent() {
    console.log(this.props.config);
    let writtenEvent = { type: this.props.config.type };
    if (this.props.config.descriptionPrompt) {
      writtenEvent["description"] = prompt("Description");
    } else if (this.props.config.description) {
      writtenEvent["description"] = this.props.config.description;
    }
    if (this.props.config.dev == true) {
      console.log(writtenEvent);      
    }else {
      this.props.ioMgr.writeEvent(writtenEvent);
    }
  }

  render() {
    return (
      <Grid item xs={this.props.config.xsGridWidth} sm={this.props.config.xsGridWidth}
            className="circlePuppyGridItem">
        <button onClick={() => this.writeEvent()}>
          <img src={this.props.config.imagePath} />
        </button>
      </Grid>
    );
  }
}

CirclePuppy.propTypes = {
  ioMgr: PropTypes.object,
  config: PropTypes.object
};

module.exports = CirclePuppy;
