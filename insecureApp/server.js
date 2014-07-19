/**
 * Created with IntelliJ IDEA.
 * User: david.losert
 * Date: 18.07.2014
 * Time: 14:43
 */


// Basic packages
var express = require('express'),
	http = require('http');

var appSecure = express();
appSecure.set('port', process.env.port || 3334);

require('./config/insecure_express')(appSecure);
require('./routes')(appSecure);

console.log('test');

// Create the secure server
module.exports = appSecure;
appSecure.listen(app.get('port'), function () {
	console.log('Server listening on port ' + app.get('port'));
});