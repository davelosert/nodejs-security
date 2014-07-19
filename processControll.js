// Basic packages
var cp = require('child_process');


var appSecure = cp.fork('./secureApp/server_secure.js', [], {
	env: {
		port: 3333
	}
});

appSecure.on('error', function (error) {
	console.error(error);
});

appSecure.on('exit', function (code, signal) {
	console.log('App Secure was exited with code ' + code);
});