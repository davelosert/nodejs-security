
var _ = require('lodash'),
    aop = require("node-aop"),
	path = require('path');

// TODO this should be extracted to a config file. For the sake of simplicity it's inline for now.
var mflacConfig = {
	extractPrincipal: function(context) {
		return context.session.user_id;
	},
	functionAccessWhiteList : {
		getData: [undefined, 'TEST_USER_ID'],
		getRestrictedData: ['TEST_USER_ID' ]
	}
};

module.exports = function (modulePath) {

	// resolve absolute path to module.
	var parentDir = path.dirname(module.parent.filename);
	var normalizedModulePath = path.normalize(modulePath);
	var absoluteModulePath = path.join(parentDir, normalizedModulePath);

	var obj = require(absoluteModulePath)();
	_.forEach(obj, function(func, funcName) {
		aop.before(obj, funcName, function(req, res, next) {
			var principal = mflacConfig.extractPrincipal(req);
			var whiteList = mflacConfig.functionAccessWhiteList[funcName];
			console.log("Authorisation access controll for function " + funcName + " and principal " + principal +". AccessList is " + whiteList);
			var accessGranted = _.contains(whiteList, principal);
			if(!accessGranted) {
				// next(new Error('ACCESS denied'));
				throw new Error("ACCESS denied"); // TODO this causes a HTTP 500. Find a way to
				// res.send(401);
			}
		});
	});
	return obj;
};

