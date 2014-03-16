/**
 * Created by David on 16.03.14.
 */
var express = require('express'),
	path = require('path');


module.exports = function (app) {
	app.set('port', process.env.PORT || 3000);
	// Disable the x-powered-by header in http request to prevent that an attacker knows your backend-framework easily.
	app.disable('x-powered-by');
	app.use(express.logger('dev'));
	app.use(express.json());
	app.use(express.urlencoded());
	app.use(express.methodOverride());
	app.use(express.cookieParser('s3cr3t')); // not really secure yet
	app.use(express.session({
		secret: 's3cr3t',
		key   : 'sessionId' // use generic session-cookie name, else it would be "connectSid", telling an attacker again the used framework
	})); // Also needs to be more configured

	// CSRF-Measures
	app.use(express.csrf());
	app.use(function (req, res, next) {
		res.locals.csrfToken = req.csrfToken();
		next();
	});


	app.use(app.router);
	app.use(express.static(path.join(__dirname, 'public'))); // deliver all js, imgs and css
	app.use(express.static(path.join(__dirname, 'views'))); // just deliver the views
};