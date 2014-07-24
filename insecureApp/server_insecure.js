/**
 * Created with IntelliJ IDEA.
 * User: david.losert
 * Date: 18.07.2014
 * Time: 14:43
 */



// *************************
// Load Basic Packages & Config
// *************************
var express = require('express'),
	http = require('http'),
	url = require('url'),
	fs = require('fs'),
	path = require('path'),
	_ = require('lodash'),
	mongoose = require('mongoose');

var config = require('./config/config');

/*
// *************************
// DB CONNECTIONS
// *************************
// Load all Models
var modelPath = path.resolve(__dirname, 'model');
_.each(fs.readdirSync(modelPath), function (fileName) {
	require(path.resolve(path.join(modelPath, fileName)));
});

// Create URL
var mongoURL = url.format({
	protocol: 'mongodb',
	slashes : true,
	hostname: config.mongoDB.host,
	port    : config.mongoDB.port,
	pathname: config.mongoDB.dbName
});

// Connect MongoDB
mongoose.connect(mongoURL, function (err) {
	if (err) {
		console.error('Mongo-Connection Failed with error:', err);
	}
	else {
		console.log('Connected MongoDB on: "', mongoURL, '"');
	}
});
*/

// *************************
// APPLICATION SETUP
// *************************
var appInsecure = express();
appInsecure.set('port', process.env.port || 3334);

require('./config/insecure_express')(appInsecure);
require('./routes')(appInsecure);

// *************************
// APP SERVER INSTANCE
// *************************
module.exports = appInsecure;
appInsecure.listen(appInsecure.get('port'), function () {
	console.log('Secure Server listening on port ' + appInsecure.get('port'));
});