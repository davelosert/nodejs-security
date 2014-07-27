/**
 * Main-File of the secureApp. Instantiats Express-App and DB-Connections and bootstraps the whole app.
 * User: david.losert
 * Date: 18.07.2014
 * Time: 14:43
 */

// *************************
// Load Basic Packages & Config
// *************************
var express = require('express')
	,http = require('http')
	,url = require('url')
	,fs = require('fs')
	,path = require('path')
	,_ = require('lodash')
	,mongoose = require('mongoose')
	;

var config = require('./config/config');


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
/*
User = require('./model/user');

var testUser = new User({
    username: 'jmar777',
    pwHash: 'Password123'
});

// save user to database
testUser.save(function(err) {});
*/

// *************************
// APPLICATION SETUP
// *************************
var appSecure = express();
appSecure.set('port', process.env.port || 3334);

require('./config/secure_express')(appSecure);
require('./routes')(appSecure);

// *************************
// APP SERVER INSTANCE
// *************************
module.exports = appSecure;
appSecure.listen(appSecure.get('port'), function () {
	console.log('Secure Server listening on port ' + appSecure.get('port'));
});