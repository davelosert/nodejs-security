// Basic packages
var express = require('express'),
	https = require('https');

// Create the app
var app = express();

// configure all environments
require('./config/express')(app);

// Controllers
var user = require('./controllers/user');

// Routes and Controllers
app.get('/users', user.list);

https.createServer(app).listen(app.get('port'), function () {
	console.log('Express server listening on port ' + app.get('port'));
});
