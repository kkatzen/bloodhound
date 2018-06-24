const React = require("react");
const PropTypes = require("prop-types");
const TakePhoto = require("../components/TakePhoto.react.js");
const CirclePuppy = require("../components/CirclePuppy.react.js");
const ScaleButtons = require("../components/ScaleButtons.react.js");
const PeriodView = require("../components/PeriodView.react.js");
import Grid from "@material-ui/core/Grid";
const TextButton = require("../components/TextButton.react.js");

class ActionView extends React.Component {
  constructor(props) {
    super(props);
  }

  writeMedicine(name) {
    this.props.ioMgr.writeEvent({ medicine: name });
  }

  createComponent(config) {
    if (config.componentType == "CirclePuppy") {
      return (
        <CirclePuppy config={config} ioMgr={this.props.ioMgr}/>
      );
    } else if (config.componentType == "ScaleButtons") {
      return (
        <ScaleButtons config={config} ioMgr={this.props.ioMgr} />
      );
    } else {
      return (<TextButton config={config} ioMgr={this.props.ioMgr} />);
    }
  }

  render() {
    const components = [];
    components.push(
      this.createComponent({
        componentType: "ScaleButtons",
        type: "hunger",
        min: "1",
        max: "5",
        xsGridWidth: 12,
      })
    ); 
    components.push(
      this.createComponent({
        componentType: "CirclePuppy",
        descriptionPrompt: true,
        type: "food",
        imagePath: "img/hunger.png",
        xsGridWidth: 4
      })
    );
    components.push(
      this.createComponent({
        componentType: "CirclePuppy",
        imagePath: "img/water.png",
        xsGridWidth: 4,
        type: "water"
      })
    );
    components.push(
      this.createComponent({
        componentType: "CirclePuppy",
        imagePath: "img/sleep.png",
        xsGridWidth: 4,
        type: "sleep"
      })
    );
    components.push(
      this.createComponent({
        componentType: "ScaleButtons",
        type: "feeling",
        min: "1",
        max: "5",
        xsGridWidth: 12,
        descriptionPrompt: true
      })
    ); 
    components.push(
      this.createComponent({
        componentType: "TextButton",
        xsGridWidth: 2,
        text: "Earl Grey Tea",
        description: "Earl Grey Tea Soy creamer",
        type: "food"
      })
    );

    return (
      <div>
        <h1>Actions</h1>
        <Grid container spacing={8} justify="space-around"className="actionsGridContainer">
          {components.map(component => {
            return component;
          })}
          <Grid item xs={12} sm={6}>
              <TakePhoto ioMgr={this.props.ioMgr} />
          </Grid>
          <Grid item xs={6} sm={6}>
              <img src="img/sick.png" className="fullRowHeight" />
          </Grid>
          <Grid item xs={6} sm={6}>
              <img src="img/medicine.png" className="fullRowHeight" />
              <button onClick={() => this.writeMedicine("sumatriptan")}>
                Sumatriptan
              </button>
              <button onClick={() => this.writeMedicine("ibuprofen")}>
                Ibuprofen
              </button>
              <button onClick={() => this.writeMedicine("acetamenophin")}>
                Acetamenophin
              </button>
          </Grid>
        </Grid>
      </div>
    );
  }
}

ActionView.propTypes = {
  ioMgr: PropTypes.object.isRequired,
};

module.exports = ActionView;
