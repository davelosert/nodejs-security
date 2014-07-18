/**
 * OWASP TOP 10
 * User: david.losert
 * Date: 18.07.2014
 * Time: 14:44
 */


module.exports = function (app) {
    var csrf = require('./controller/csrfProtect')(app);


    app.get('/', function (req, res) {
       res.send(200, 'Server is running and listening on Port ' + app.get('port'));
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

}