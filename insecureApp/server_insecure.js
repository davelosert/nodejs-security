/**
 * Created with IntelliJ IDEA.
 * User: david.losert
 * Date: 18.07.2014
 * Time: 14:43
 */


// Basic packages
var express = require('express'),
	http = require('http');

var appInsecure = express();
appInsecure.set('port', process.env.PORT || 3334);

require('./config/insecure_express')(appInsecure);
require('./routes')(appInsecure);

// Create the secure server
module.exports = appInsecure;
appInsecure.listen(appInsecure.get('port'), function () {
	console.log('Insecure-Server listening on port ' + appInsecure.get('port'));
});