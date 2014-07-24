
var _ = require('lodash'),
    aop = require("node-aop"),
	path = require('path');


function resolveAbsolutePath(modulePath) {
	var parentDir = path.dirname(module.parent.filename);
	var normalizedModulePath = path.normalize(modulePath);
	var absoluteModulePath = path.join(parentDir, normalizedModulePath);
	return absoluteModulePath;
}

module.exports = function (modulePath, mflacConfig) {
	var obj = require(resolveAbsolutePath(modulePath))();
	_.forEach(obj, function(func, funcName) {
		aop.before(obj, funcName, function() { // TODO this is to specific. How can we handle varargs?
			var principal = mflacConfig.extractPrincipal(mflacConfig.context); // TODO how can we make this more loosely coupled?
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

