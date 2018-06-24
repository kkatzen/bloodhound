const React = require("react");
const PropTypes = require("prop-types");
import Grid from "@material-ui/core/Grid";

class ImageComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Grid item xs={this.props.config.xsGridWidth} sm={this.props.config.xsGridWidth}>
        <img src={this.props.config.imagePath} className="fullRowHeight"/>
      </Grid>
    );
  }
}

ImageComponent.propTypes = {
  config: PropTypes.object
};

module.exports = ImageComponent;
