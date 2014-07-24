/**
 * Created by David on 19.07.14.
 */

var express = require('express'),
	path = require('path'),
	bodyParser = require('body-parser'),
	cookieParser = require('cookie-parser'),
	session = require('express-session'),
	methodOverride = require('method-override');

module.exports = function (app) {
	app.disable('x-powered-by'); // Disable the x-powered-by header in http request to prevent that an attacker knows your backend-framework easily.
// parse application/x-www-form-urlencoded
	app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
	app.use(bodyParser.json())
	app.use(methodOverride());

	// Use the cookieParser BEFORE Session, since Session is using the cookie-parser.
	// @todo give a better key here than s3cr3t ;)
	app.use(cookieParser('s3cr3t'));
	app.use(session({
		secret: 's3cr3t',
		key   : 'sessionId', // use generic session-cookie name, else it would be "connectSid", revealing your used framework
		cookie: {
			secure: true, // Only allow cookies on https
			maxAge: null // maxAge: null is the default value and should be, since it removes the session on browser-closer.
		}
	}));
};