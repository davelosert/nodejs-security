/**
 * User: armin.weisser
 * Date: 24.07.2014
 */

/**
 * The requireSecure(<modulePath>, <confObject>) can replace a similar call to require(<modulePath>).
 * Together with a proper configuration object a module that is loaded by a requireSecure()
 * will be extended by additional runtime authorisation-checks at function level.
 *
 * The confObject consists of two properties:
 * 1. A function that can extract the current principal from the current context.
 * 2. A white list that maps function names to a list of principals, that should have access to this function.
 *
 * The extracted principals should have the same format as used in the white list.
 * The functions are accessable in the current context, if the extracted principal is in the list of authorised principals.
 * The requireSecure(<modulePath>) module enriches every function of the module loaded from the <modulePath> by this
 * security checks.
 *
 * Example:
 * var authConf = {
 * 		extractPrincipal: function(context) {
 * 			// Find and return the current logged in principal in the current <context>.
 * 			// Perhaps <context> is the current request and the principal is a user in the current session:
 	* 		return context.session.user;
 * 		},
 * 		functionAccessWhiteList: {
 * 			function1: [undefined, 'Admin'],
 *			function2: ['Admin']
 * 		}
 * }
 * As you can see function1 can be accessed by an undefined user (perhaps not logged in) and an "Admin" principal
 * whereas function2 is restricted to "Admin" only.
 *
 *
 */

var _ = require('lodash'),
    aop = require("node-aop"),
	path = require('path');


/**
 * The requireSecure function should load the module from the modulePath.
 * Usually this is not a valid path relativ to the requireSecure module.
 * So we need to resolve a proper, absolute path to the destination module.
 *
 * @param modulePath the original modulePath
 * @returns {absolute path to the destination module, so that it can be required properly|string}
 */
function resolveAbsolutePath(modulePath) {
	var parentDir = path.dirname(module.parent.filename);
	var normalizedModulePath = path.normalize(modulePath);
	var absoluteModulePath = path.join(parentDir, normalizedModulePath);
	return absoluteModulePath;
}

module.exports = function (modulePath, mflacConfig) {

	var obj = require(resolveAbsolutePath(modulePath))();
	_.forEach(obj, function(func, funcName) {
		aop.before(obj, funcName, function() {
			var principal = mflacConfig.extractPrincipal(mflacConfig.context); // TODO this is ugly somehow. Find a better way to inject individual principal extraction.
			var whiteList = mflacConfig.functionAccessWhiteList[funcName];
			console.log("Authorisation access controll for function " + funcName + " and principal " + principal +". AccessList is " + whiteList);
			var accessGranted = _.contains(whiteList, principal);
			if(!accessGranted) {
				throw new Error("ACCESS denied"); // TODO this causes a HTTP 500. Find a way to handle it and turn it to a HTTP 401
			}
		});
	});
	return obj;
};

