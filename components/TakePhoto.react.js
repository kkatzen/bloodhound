const React = require("react");
const takePhoto = require("../actions/takePhoto.js");

class TakePhoto extends React.Component {

  render() {
    return (
	   <div>
	    <button className="takePhotoButton" onClick={takePhoto}>
	      <img src="../img/camera.jpg" className="fullRowHeight" />
	      <div id="lastPhotoPreviewContainer"></div>
	    </button>
	  </div>
    );
  }
}

module.exports = TakePhoto;
