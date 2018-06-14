const React = require("react");
const PropTypes = require("prop-types");

class CirclePuppy extends React.Component {
	constructor(props) {
		super(props);
	}

  render() {
    return (
	    <button onClick={this.props.onClick}>
	   		<img src={this.props.imagePath} />
   		</button>
    );
  }
}

CirclePuppy.propTypes = {
	onClick: PropTypes.func.isRequired,
	imagePath: PropTypes.string
}

module.exports = CirclePuppy;
