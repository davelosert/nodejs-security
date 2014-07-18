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

require('./config/secure_express')(appSecure);
require('./routes')(appSecure);


// Create the secure server
module.exports = appSecure.listen(appSecure.get('port'), function () {
    console.log('Secure Express server listening on port ' + appSecure.get('port'));
});
