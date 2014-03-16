/**
 * Created by David on 16.03.14.
 */
var express = require('express'),
	path = require('path');


module.exports = function (app) {
	app.set('port', process.env.PORT || 3000);

	app.use(express.logger('dev'));
	app.use(express.json());
	app.use(express.urlencoded());
	app.use(express.methodOverride());
	app.use(express.cookieParser('s3cr3t')); // not really secure yet
	app.use(express.session()); // Also needs to be more configured
	app.use(app.router);
	app.use(express.static(path.join(__dirname, 'public'))); // deliver all js, imgs and css
	app.use(express.static(path.join(__dirname, 'views'))); // just deliver the views
};