/**
 * Web-Server (express) related Configurations, mainly integration and configuration of middleware
 * User: david.losert
 * Date: 18.07.2014
 * Time: 14:45
 */

var express = require('express'),
	path = require('path'),
	bodyParser = require('body-parser'),
	cookieParser = require('cookie-parser'),
	session = require('express-session'),
	methodOverride = require('method-override'),
	mongoStore = require('connect-mongo')(session),
	mongoose = require('mongoose');

var config = require('./config');
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
		store : new mongoStore({
			mongoose_connection: mongoose.connections[0]
		}),
        key: 'sessionId' // use generic session-cookie name, else it would be "connectSid", revealing your used framework
	}));
};