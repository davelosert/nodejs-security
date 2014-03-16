// Basic packages
var express = require('express'),
	http = require('http'),
	path = require('path');

// Create the app
var app = express();

// configure all environments
require('./config/express')(app);

// Controllers
var routes = require('./controllers');
var user = require('./controllers/user');

// Routes and Controllers
app.get('/', routes.index);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function () {
	console.log('Express server listening on port ' + app.get('port'));
});
