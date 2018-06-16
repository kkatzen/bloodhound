import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";


const styles = {
    drawer: {
      width: 250,
    },
};

class TemporaryDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpen: false
    };
    this.toggleDrawer = open => () => {
      this.setState({
        drawerOpen: open
      });
    };
  }

  render() {
    const { classes } = this.props;

    const contents = (
      <div className={classes.drawer}>
        {this.props.children}
      </div>
    );

    return (
      <div>
        <Button onClick={this.toggleDrawer(true)}>Open Left</Button>
        <Drawer open={this.state.drawerOpen} onClose={this.toggleDrawer(false)}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer(false)}
            onKeyDown={this.toggleDrawer(false)}
          >
            {contents}
          </div>
        </Drawer>
      </div>
    );
  }
}

TemporaryDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
};

// https://material-ui.com/demos/drawers/
module.exports = withStyles(styles)(TemporaryDrawer);
