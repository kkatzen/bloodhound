const React = require("react");
const PropTypes = require("prop-types");
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Switch from "@material-ui/core/Switch";
const connectToStores = require("alt-utils/lib/connectToStores");
const SessionStore = require("../alt/stores/SessionStore.js");
import FormControlLabel from "@material-ui/core/FormControlLabel";

class EditableCirclePuppy extends React.Component {
  constructor(props) {
    console.log("EditableCirclePuppy");
    super(props);
    this.state = {
      open: false,
      modifingConfig: {}
    };
  }

  static getStores() {
    return [SessionStore];
  }

  static getPropsFromStores() {
    return {
      user: SessionStore.getState().user,
      configStore: SessionStore.getState().componentConfig
    };
  }

  handleClickOpen() {
    console.log("this.props.configStore.componentConfig.components");
    console.log(this.props.configStore.componentConfig.components);
    let currentConfig = this.props.configStore.componentConfig.components[
      this.props.config.index
    ];
    this.setState({ open: true, modifingConfig: currentConfig });
    console.log("this.state");
    console.log(this.state);
  }

  handleClose() {
    this.setState({ open: false });
  }

  handleSubmit(index) {
    this.props.configStore.componentConfig.components[
      index
    ] = this.state.modifingConfig;
    console.log(this.props.configStore.componentConfig);
    this.props.ioMgr.setComponentConfig(
      JSON.stringify(this.props.configStore.componentConfig)
    );
    this.setState({ open: false });
  }

  changeTypeText(event) {
    this.state.modifingConfig.type = event.target.value;
  }

  changeDescriptionPrompt(event) {
    this.state.modifingConfig.descriptionPrompt = event.target.checked;
  }

  handleClickOpen = () => {
    this.setState({open: true});
  };

  deleteComponent() {
    console.log("deleteComponent");
    //    delete this.props.configStore.componentConfig.components[this.props.config.index];
    //this.props.configStore.componentConfig.components
    this.props.configStore.componentConfig.components.splice(
      this.props.config.index,
      1
    );
    console.log(this.props.configStore.componentConfig.components);
    this.props.ioMgr.setComponentConfig(
      JSON.stringify(this.props.configStore.componentConfig)
    );
    this.setState({ open: false });
  }

  render() {
    return (
      <Grid
        item
        xs={this.props.config.xsGridWidth}
        sm={this.props.config.xsGridWidth}
        className="circlePuppyGridItem editableCirclePuppyGridItem"
      >
        <button onClick={() => this.handleClickOpen()}>
          <img src={this.props.config.imagePath} />
        </button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            Edit Component {this.props.config.index}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>Editing component...</DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Type"
              required="true"
              placeholder={this.state.modifingConfig.type}
              onChange={this.changeTypeText.bind(this)}
              fullWidth
            />
            <FormControlLabel
              control={
                <Switch onChange={this.changeDescriptionPrompt.bind(this)} />
              }
              label="Description Prompt"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.handleClose()} color="primary">
              Cancel
            </Button>
            <Button onClick={() => this.deleteComponent()} color="warning">
              Delete
            </Button>
            <Button
              onClick={() => this.handleSubmit(this.props.config.index)}
              color="primary"
            >
              Update
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    );
  }
}

EditableCirclePuppy.propTypes = {
  ioMgr: PropTypes.object,
  config: PropTypes.object
};

module.exports = connectToStores(EditableCirclePuppy);
