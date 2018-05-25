
function dateToStringWithoutSeconds(/* int */ timestamp) /* string */ {
  const date = new Date(timestamp);
  const string = date.toLocaleString();
  const indexOfFirstColon = string.indexOf(':');
  const indexOfSecondColon = string.indexOf(':', indexOfFirstColon + 1);
  return string.substring(0, indexOfSecondColon) +
    string.substring(indexOfSecondColon + 3);
}

module.exports = dateToStringWithoutSeconds;