// Basic packages
var cp = require('child_process'),
	path = require('path');


var appSecure = cp.fork(path.join('secureApp', 'server_secure.js'), [], {
	env: {
		port    : 3334,
		NODE_ENV: 'development'
	}
});

var appInsecure = cp.fork(path.join('insecureApp', 'server_insecure.js'), [], {
	env: {
		port    : 3335,
		NODE_ENV: 'development'
	}
});

integrateErrorHandling(appSecure);
integrateErrorHandling(appInsecure);

function integrateErrorHandling(app) {
	app.on('error', function (error) {
		console.error(error);
	});

	app.on('exit', function (code, signal) {
		console.log('App Secure was exited with code ' + code);
	});
}
