
const DOMUtils = require('../utils/DOMUtils.js');

const blobToDataURL = require('../utils/blobToDataURL.js');

function takePhoto() {
  navigator.mediaDevices.getUserMedia({video: {facingMode: "environment"}})
    .then(_gotMedia)
    .catch(error => console.error('getUserMedia() error:', error));
}

function _gotMedia(mediaStream) {
  const mediaStreamTrack = mediaStream.getVideoTracks()[0];
  const imageCapture = new ImageCapture(mediaStreamTrack);
  console.log(imageCapture);

  imageCapture.takePhoto().then(blob => {
    blobToDataURL(blob, dataURL => {
      api.session.storeAccessor.writeEvent({
        type: 'image',
        dataURL,
      });
      _setLastPhoto(dataURL);
    });
    mediaStreamTrack.stop()
  })
  .catch(error => console.error('takePhoto() error:', error));
}

function _setLastPhoto(dataURL /* string */) /* void */ {
  const img = document.createElement('img');
  img.src = dataURL;
  img.id = 'photoPreview';
  DOMUtils.setContentsByID('lastPhotoPreviewContainer', [img]);
}

module.exports = takePhoto;