
function nullthrows(value /* T */, msg /* ?string */) /* T */ {
	if (value == null) {
    if (msg != null) {
      throw new Error('Unexpected null or undefined: ' + msg);
    } else {
      throw new Error('Unexpected null or undefined.');
    }

	}
	return value;
}

module.exports = nullthrows;