/**
 * OWASP TOP 10
 * User: david.losert
 * Date: 18.07.2014
 * Time: 14:44
 */


module.exports = function (app) {
    var hpp = require('./controller/hppLeak')(app);


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