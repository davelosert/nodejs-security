/**
 * Created by David on 16.03.14.
 */
var express = require('express'),
	path = require('path'),
	bodyParser = require('body-parser'),
	cookieParser = require('cookie-parser'),
	session = require('express-session'),
	methodOverride = require('method-override'),
	csrf = require('csurf');


module.exports = function (app) {
	app.set('port', process.env.PORT || 6666);
	app.use(bodyParser());
	app.use(methodOverride());

	// Use the cookieParser BEFORE Session, since Session is using the cookie-parser.
	app.use(cookieParser('s3cr3t'));


	app.use(express.static(path.join(__dirname, 'public'))); // deliver all js, imgs and css
	app.use(express.static(path.join(__dirname, 'views'))); // just deliver the views
};