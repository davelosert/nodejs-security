/**
 * OWASP TOP 10
 * User: david.losert
 * Date: 18.07.2014
 * Time: 14:44
 */


module.exports = function (app) {
    var hpp = require('./controller/hppLeak')(app),
		mflac = require('./controller/mflacLeak')(app);


	/**
	 * GENERIC ROUTES
	 */
	app.get('/', function (req, res) {
		res.send(200, 'Insecure server is running and listening on Port ' + app.get('port'));
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
    app.get('/hpp', hpp.trustParameterTypes);
}