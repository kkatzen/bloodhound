const React = require("react");
const takePhoto = require("../actions/takePhoto.js");

class TakePhoto extends React.Component {

  render() {
    return (
	   <div>
	    <button class="takePhotoButton" onClick={takePhoto}>
	      <img src="../img/camera.jpg" class="fullRowHeight" />
	      <div id="lastPhotoPreviewContainer"></div>
	    </button>
	  </div>
    );
  }
}

module.exports = TakePhoto;
