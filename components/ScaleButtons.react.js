const React = require("react");
const PropTypes = require("prop-types");

class ScaleButtons extends React.Component {
	constructor(props) {
		super(props);
	}

  render() {
  	const {onClick, min, max} = this.props;
  	if (min >= max) {
  		throw new Error('You are dumb, learn to count!!');
  	}
  	const buttons = [];
  	for (let i = min; i <= max; i++) {
  		buttons.push(
  			<button key={i} onClick={onClick.bind(null, i)}>{i}</button>,
  		);
  	}

    return (
    	<div className="scaleButtons">
    		{buttons}
    	</div>
    );
  }
}

ScaleButtons.propTypes = {
	onClick: PropTypes.func.isRequired,
	min: PropTypes.number,
	max: PropTypes.number,
}

module.exports = ScaleButtons;
