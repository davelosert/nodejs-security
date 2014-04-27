// Basic packages
var express = require('express'),
    http = require('http'); // no https yet since i first need to generate a certificate & key

// Create the appSecure
var appSecure = express();
var appInsecure = express();

// configure all environments
require('./config/express_secure')(appSecure);
require('./config/express_insecure')(appInsecure);

// Controllers
var user = require('./controllers/user');
var doNot = require('./controllers/doNot');
var better = require('./controllers/better');

// Routes and Controllers
appSecure.get('/users', user.list);

// CSRF
appInsecure.get('/wrong/csrf', doNot.mutateStateOnGetRequests);
appSecure.post('/right/csrf', better.useOnlyHTTPVerbsForStateChanges);
appSecure.put('/right/csrf/', better.useOnlyHTTPVerbsForStateChanges);
appSecure.del('/right/csrf/', better.useOnlyHTTPVerbsForStateChanges);

// HPP
appInsecure.get('wrong/hpp/type', doNot.trustParameterTypes);
appSecure.get('/right/inputCheck', better.checkTypeOfInputParameters);

appInsecure.get('wrong/hpp/array', doNot.passParametersAsArray);
appSecure.get('/right/hpp/object', better.passParametersAsObject);


// Create the secure server
http.createServer(appSecure).listen(appSecure.get('port'), function () {
    console.log('Secure Express server listening on port ' + appSecure.get('port'));
});

// Create an insecure server
http.createServer(appInsecure).listen(appInsecure.get('port'), function () {
    console.log('Insecure Express server listening on port ' + appInsecure.get('port'));
});

