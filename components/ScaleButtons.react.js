const React = require("react");
const PropTypes = require("prop-types");
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

class ScaleButtons extends React.Component {
  constructor(props) {
    super(props);
  }

  writeEvent(i) {
    console.log(this.props.config);
    console.log(i);
    let writtenEvent = { type: this.props.config.type, level: i};
    if (this.props.config.descriptionPrompt) {
      writtenEvent["description"] = prompt("Description");
    }
    if (this.props.config.dev == true) {
      console.log(writtenEvent);      
    }else {
      this.props.ioMgr.writeEvent(writtenEvent);
    }
  }

  render() {
    console.log("SCALED BUTTONS~!!!!!!!");
    console.log("this.props", this.props);
    const { min, max } = this.props.config;
    if (min >= max) {
      throw new Error("You are dumb, learn to count!!");
    }
    const buttons = [];
    for (let i = min; i <= max; i++) {
      buttons.push(
        <Button variant="outlined" size="small" color="primary" 
                key={i} onClick={() => this.writeEvent(i)}>
          {i}
        </Button>
      );
    }

    return (
      <Grid item xs={this.props.config.xsGridWidth} sm={this.props.config.xsGridWidth}
                 className="scaleButtonGridItem">
      {buttons}
    </Grid>)
    ;
  }
}

ScaleButtons.propTypes = {
  ioMgr: PropTypes.object,
  config: PropTypes.object
};

module.exports = ScaleButtons;
