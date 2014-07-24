/**
 * Main-File of the secureApp. Instantiats Express-App and DB-Connections and bootstraps the whole app.
 * User: david.losert
 * Date: 18.07.2014
 * Time: 14:43
 */


// Basic packages
var express = require('express'),
	http = require('http'),
	url = require('url'),
	mongoose = require('mongoose');

var config = require('./config/config');

var mongoURL = url.format({
	protocol: 'mongodb',
	slashes : true,
	hostname: config.mongoDB.host,
	port    : config.mongoDB.port,
	pathname: config.mongoDB.dbName
});

mongoose.connect(mongoURL, function (err) {
	if (err) {
		console.error('Mongo-Connection Failed with error:', err);
	}
	else {
		console.log('Connected MongoDB on: "', mongoURL, '"');
	}
});

var appSecure = express();
appSecure.set('port', process.env.port || 3334);

require('./config/secure_express')(appSecure);
require('./routes')(appSecure);

// Create the secure server
module.exports = appSecure;
appSecure.listen(appSecure.get('port'), function () {
	console.log('Secure Server listening on port ' + appSecure.get('port'));
});