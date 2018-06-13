
const StoreAccessor = require('./io/StoreAccessor.js');

/**
 * Builds an object containing the objects specific to a single user session.
 */
function buildSession(user, lastItem) {
	return {
		user,
		lastItem,
		storeAccessor: new StoreAccessor(user, lastItem),
	}
}

module.exports = buildSession;
