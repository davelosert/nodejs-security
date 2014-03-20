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

// Routes and Controllers
app.get('/users', user.list);

app.get('/wrong/csrf', doNot.mutateStateOnGetRequests);

http.createServer(app).listen(app.get('port'), function () {
	console.log('Express server listening on port ' + app.get('port'));
});
