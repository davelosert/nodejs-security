/**
 * In this file two things are happening:
 * First of all, controller are initiated, which themselves get the app-Object for necessary App-Configurations for security measures.
 * Then, the controllers logic is connected with HTTP-Request-Routes to make them available and accessable as soon as the server is running.

 * User: david.losert
 * Date: 18.07.2014
 * Time: 14:44
 */


module.exports = function (app) {
	var csrf = require('./controller/csrfProtect')(app),
		mflac = require('./controller/mflacProtect')(app),
        unvalidatedRedirects = require('./controller/unvalidatedRedirects')(app),
		hpp = require('./controller/hppProtect')(app);
        user = require('./controller/createUserProtected')(app);

	/**
	 * GENERIC ROUTES
	 */
	app.get('/', function (req, res) {
		res.send(200, 'Secure server is running and listening on Port ' + app.get('port'));
	});

	app.get('/login', function (req, res) {
		req.session.user_id = 'TEST_USER_ID';
		res.send('You are now logged in!');
	});

	app.get('/logout', function (req, res) {
		req.session.destroy(function () {
			res.send('You are now logged out!');
		});
	});

	/**
	 * ***********************************
	 * PROTECT-ROUTES
	 * ***********************************
	 */


	/**
	 * Injection
	 */


	/**
	 * Broken Authentication and Session Management
	 */


	/**
	 * XSS
	 */


	/**
	 * Insecure Direct Object References
	 */

    app.post('/dor', dor.getFile);

	/**
	 * Security Misconfiguration
	 */


	/**
	 * Sensitive Data Exposure
	 */


	/**
	 * Missing Function Level Access Controll
	 */
	app.get('/mflac/data', mflac.getData);
	app.get('/mflac/restrictedData', mflac.getRestrictedData);

	/**
	 * CSRF
	 */
	app.get('/csrf', csrf.requestToStoreFirstCSRFToken);
	app.post('/csrf', csrf.useOnlyHTTPVerbsForStateChanges);

	/**
	 * Using Known Vulnerable Components
	 */


	/**
	 * Unvalidated Redirects and Forwars
	 */

	/**
	 * HPP (HTTP Parameter Polution)
	 * You should always check for the expected type of your input-parameters within 'req.query' or 'req.body'
	 */
	app.get('/hpp', hpp.checkTypeOfInputParameters);
	app.post('/hpp', hpp.checkTypeOfInputParameters);
};