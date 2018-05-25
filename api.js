
/**
 * This script is separate from the bundle generated from app.js.
 *
 * Bundling is awesome because it allows us to break up our code into separate
 * files without the overhead of adding zillions of script tags. The down side
 * is that code in the bundle is not easily referenced from outside the bundle.
 *
 * This is usually not a problem as the HTML would also be built inside the
 * bundle, but it's hard to do this without a framework. So, for now, we load
 * this script before the bundle so that
 *   1) the bundle can put the code needed by the HTML into api, and
 *   2) the HTML can access the needed bits through api.
 */

const api = {
  actions: {},
};