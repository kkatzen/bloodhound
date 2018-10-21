const alt = require('../alt');
const ImageActions = require('../actions/ImageActions.js');

class ImageStore {
  constructor() {
    this.bindListeners({
      _addImage: ImageActions.addImage,
    });

    this.state = {
      images: {},
    };
  }

  _addImage(action) {
    console.log("_addImage", action);
    this.setState({
      images: {
        ...this.state.images,
        [action.id]: action.image,
      },
    });
    console.log(this.state)
  }
}

module.exports = alt.createStore(ImageStore, 'ImageStore');