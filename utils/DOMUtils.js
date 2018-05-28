
const nullthrows = require('./nullthrows.js');

function setContentsByID(
	id /* string */,
	contents /* Array<string | HTMLElement> */,
) /* void */ {
	const parent = nullthrows(document.getElementById(id));
	_clearContents(parent);
	for (const content of contents) {
		parent.appendChild(content);
	}
}

function appendContentsByID(
  id /* string */,
  contents /* Array<string | HTMLElement> */,
) /* void */ {
  const parent = nullthrows(document.getElementById(id));
  for (const content of contents) {
    parent.appendChild(content);
  }
}

function _clearContents(parent /* string | HTMLElement */) /* void */ {
	while (parent.firstChild != null) {
	    parent.removeChild(parent.firstChild);
	}
}

module.exports = {
  appendContentsByID,
	setContentsByID,
};