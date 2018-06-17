const React = require("react");
const PropTypes = require("prop-types");
const TemporaryDrawer = require("./lib/TemporaryDrawer.react.js");
const { Actions, AppView } = require("../alt/actions/AppViewActions.js");
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import SettingsIcon from '@material-ui/icons/Settings';
import OpacityIcon from '@material-ui/icons/Opacity';
import ReorderIcon from '@material-ui/icons/Reorder';
import HomeIcon from '@material-ui/icons/Home';

class BloodhoundNavDrawer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TemporaryDrawer>
        <List>
          <ListItem button component="button" onClick={() => Actions.setAppView(AppView.ACTIONS)}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Actions" />
          </ListItem>
          <ListItem button component="button" onClick={() => Actions.setAppView(AppView.LOG)}>
            <ListItemIcon>
              <ReorderIcon />
            </ListItemIcon>
            <ListItemText primary="Event Log" />
          </ListItem>
          <ListItem button component="button" onClick={() => Actions.setAppView(AppView.PERIOD)}>
            <ListItemIcon>
              <OpacityIcon />
            </ListItemIcon>
            <ListItemText primary="Period" />
          </ListItem>
          <ListItem button component="button">
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItem>
        </List>
      </TemporaryDrawer>
    );
  }
}

module.exports = BloodhoundNavDrawer;
