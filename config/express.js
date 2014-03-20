/**
 * Created by David on 16.03.14.
 */
var express = require('express'),
	path = require('path');


module.exports = function (app) {
	app.set('port', process.env.PORT || 3000);
	app.disable('x-powered-by'); // Disable the x-powered-by header in http request to prevent that an attacker knows your backend-framework easily.
	app.use(express.logger('dev'));
	app.use(express.json());
	app.use(express.urlencoded());
	app.use(express.methodOverride());
	// Use the cookieParser BEFORE Session, since Session is using the cookie-parser.
	app.use(express.cookieParser('s3cr3t'));
	app.use(express.session({
		secret: 's3cr3t',
		key   : 'sessionId', // use generic session-cookie name, else it would be "connectSid", telling an attacker again the used framework
		cookie: {
			httpOnly: true, // Make Cookies not accessible by frontend-JS
			secure  : true, // Only allow cookies on https
			maxAge  : null // maxAge: null is the default value and should be, since it removes the session on browser-closer.
		}
	}));

	// CSRF-Measures. This does not help against get-methods since they´re not verified. So NEVER
	// let a GET-Method modify the state of your app.
	app.use(express.csrf());
	app.use(function (req, res, next) {
		res.locals.csrfToken = req.csrfToken();
		next();
	});
	// Another, more insecure way of preventing CSRF-Attacks is to check the referrer. However, this is not 100%
	// Secure since the referer can be manipulated / is empty in HTTPS

	/**
	 * Since we are using https, redirect all http-calls to https
	 */
	app.use(function (req, res, next) {
		if (!req.secure) {
			return res.redirect(['https://', req.get('Host'), req.url].join(''));
		}
		else {
			next();
		}
	});


	app.use(app.router);
	app.use(express.static(path.join(__dirname, 'public'))); // deliver all js, imgs and css
	app.use(express.static(path.join(__dirname, 'views'))); // just deliver the views
};