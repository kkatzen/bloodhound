
function dateToStringWithoutSeconds(/* int */ timestamp) /* string */ {
	const date = new Date(timestamp);
	const string = date.toLocaleString();
	console.log(string);
	const indexOfFirstColon = string.indexOf(':');
	const indexOfSecondColon = string.indexOf(':', indexOfFirstColon    +  1);
	console.log(indexOfFirstColon);
	console.log(indexOfSecondColon);
	console.log(string.substring(0, indexOfSecondColon));
	console.log(string.substring(indexOfSecondColon + 3));

	return string.substring(0, indexOfSecondColon) +
		string.substring(indexOfSecondColon + 3);
}