const React = require("react");

const DOMUtils = require("../utils/DOMUtils.js");
const PropTypes = require("prop-types");
import Grid from "@material-ui/core/Grid";

const blobToDataURL = require("../utils/blobToDataURL.js");

class TakePhoto extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Grid item xs={this.props.config.xsGridWidth} sm={this.props.config.xsGridWidth}>
        <button className="takePhotoButton" onClick={() => this._takePhoto()}>
          <img src="../img/camera.jpg" className="fullRowHeight" />
          <div id="lastPhotoPreviewContainer" />
        </button>
      </Grid>
    );
  }

  _takePhoto() {
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: "environment" } })
      .then((r) => this._gotMedia(r))
      .catch(error => console.error("getUserMedia() error:", error));
  }

  _gotMedia(mediaStream) {
    const mediaStreamTrack = mediaStream.getVideoTracks()[0];
    const imageCapture = new ImageCapture(mediaStreamTrack);
    console.log(imageCapture);

    imageCapture
      .takePhoto()
      .then(blob => {
        blobToDataURL(blob, dataURL => {
          this.props.ioMgr.writeEvent({
            type: "image",
            dataURL
          });
          this._setLastPhoto(dataURL);
        });
        mediaStreamTrack.stop();
      })
      .catch(error => console.error("takePhoto() error:", error));
  }

  _setLastPhoto(dataURL /* string */) /* void */ {
    const img = document.createElement("img");
    img.src = dataURL;
    img.id = "photoPreview";
    DOMUtils.setContentsByID("lastPhotoPreviewContainer", [img]);
  }
}

TakePhoto.propTypes = {
  ioMgr: PropTypes.object.isRequired,
  config: PropTypes.object
};

module.exports = TakePhoto;
