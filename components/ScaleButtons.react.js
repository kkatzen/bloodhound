const React = require("react");
const PropTypes = require("prop-types");
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

class ScaleButtons extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { onClick, min, max } = this.props;
    if (min >= max) {
      throw new Error("You are dumb, learn to count!!");
    }
    const buttons = [];
    for (let i = min; i <= max; i++) {
      buttons.push(
        <Button variant="outlined" size="small" color="primary"  key={i} onClick={() => onClick(i)}>
          {i}
        </Button>
      );
    }

    return (<Grid item xs={this.props.xsGridWidth} sm={this.props.xsGridWidth} className="scaleButtonGridItem">
      {buttons}
    </Grid>)
    ;
  }
}

ScaleButtons.propTypes = {
  onClick: PropTypes.func.isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
  xsGridWidth: PropTypes.number
};

module.exports = ScaleButtons;
