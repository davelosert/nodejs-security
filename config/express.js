/**
 * Created by David on 16.03.14.
 */
var express = require('express');


module.exports = function (app) {
	app.use(express.logger('dev'));
	app.use(express.json());
	app.use(express.urlencoded());
	app.use(express.methodOverride());
	app.use(express.cookieParser('s3cr3t')); // not really secure
	app.use(express.session());
	app.use(app.router);
	app.use(express.static(path.join(__dirname, 'public')));
};