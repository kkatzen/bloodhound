const React = require("react");
const PropTypes = require("prop-types");
import Grid from "@material-ui/core/Grid";

class CirclePuppy extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Grid item xs={3} sm={3} className="circlePuppyGridItem">
        <button onClick={this.props.onClick}>
          <img src={this.props.imagePath} />
        </button>
      </Grid>
    );
  }
}

CirclePuppy.propTypes = {
  onClick: PropTypes.func.isRequired,
  imagePath: PropTypes.string,
};

module.exports = CirclePuppy;
