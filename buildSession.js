
const StoreAccessor = require('./io/StoreAccessor.js');

/**
 * Builds an object containing the objects specific to a single user session.
 */
function buildSession(user) {
	return {
		user,
		storeAccessor: new StoreAccessor(user),
	}
}

module.exports = buildSession;
