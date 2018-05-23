
function dateToStringWithoutSeconds(/* int */ timestamp) /* string */ {
	const date = new Date(timestamp);
	const string = date.toLocaleString();
	const indexOfFirstColon = string.indexOf(':');
	const indexOfSecondColon = string.indexOf(':', indexOfFirstColon);
	return string.substring(0, indexOfSecondColon) +
		string.substring(indexOfSecondColon + 3);
}