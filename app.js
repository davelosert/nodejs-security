// Basic packages
var express = require('express'),
	http = require('http'); // no https yet since i first need to generate a certificate & key

// Create the app
var app = express();

// configure all environments
require('./config/express')(app);

// Controllers
var user = require('./controllers/user');
var doNot = require('./controllers/doNot');
var better = require('./controllers/better');

// Routes and Controllers
app.get('/users', user.list);

// CSRF
app.get('/wrong/csrf', doNot.mutateStateOnGetRequests);
app.post('/right/csrf', better.useOnlyHTTPVerbsForStateChanges);
app.put('/right/csrf/', better.useOnlyHTTPVerbsForStateChanges);
app.del('/right/csrf/', better.useOnlyHTTPVerbsForStateChanges);

// HPP
app.get('wrong/hpp/type', doNot.trustParameterTypes);
app.get('/right/inputCheck', better.checkTypeOfInputParameters);

app.get('wrong/hpp/array', doNot.passParametersAsArray);
app.get('/right/hpp/object', better.passParametersAsObject);

http.createServer(app).listen(app.get('port'), function () {
	console.log('Express server listening on port ' + app.get('port'));
});
