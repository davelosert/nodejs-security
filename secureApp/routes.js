/**
 * OWASP TOP 10
 * User: david.losert
 * Date: 18.07.2014
 * Time: 14:44
 */


module.exports = function (app) {
    var csrf = require('./controller/csrfProtect')(app);


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