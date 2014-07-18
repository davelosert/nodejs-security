/**
 * CSRF
 * ========================
 * created by: David.Losert
 *
 * What it is
 * ===========
 * A CSRF-Attack describes an attack by which the valid Session of a User is used to let him do an unwanted action by tricking him into
 * sending an unwanted request. For example: You have defined a route in your app like http://myApp/deleteProfile.
 *
 * !IMPORTANT!
 * Even with CSRF-Proection, you should never mutate the State of your app in a get-request (e.g. store to DB, authenticate or whatsoever).
 * That is because in a GET-Request, you would need your CSRF-Token to be exposed within the URL, thus it could
 * be easily corrupted by an attacker.
 *
 * See here for more Information:
 * https://www.owasp.org/index.php/Cross-Site_Request_Forgery_(CSRF)_Prevention_Cheat_Sheet
 *
 */

/**
 * DESCRIPTION OF SECURITY MEASURES WITHIN THIS COMPONENT
 * For this reason, the csurf-middleware does NOT validate CSRF for GET-Request.
 */

var csrf = require('csurf');

module.exports = function (app) {
    app.use(csrf());
    app.use(function (req, res, next) {
        res.locals.csrfToken = req.csrfToken();
        next();
    });

    return {
        // We need an initial GET - Request to Store the token
        requestToStoreFirstCSRFToken: function (req, res) {
            res.send(200, 'You own now a CSRF-Token');
        },
        useOnlyHTTPVerbsForStateChanges: function (req, res, next) {
            // At this Point, our CSRF-Middleware will already have verified the request and you can therefore trust it to be
            // coming from your own site
            res.send(200, 'Everything´s safe!');
        }
    }
};