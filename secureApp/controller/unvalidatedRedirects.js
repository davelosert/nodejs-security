/**
 * Unvalidated Redirects
 * ========================
 * created by: Jonas.Begemann
 *
 * What it is
 * ===========
 * A CSRF-Attack describes an attack by which the valid Session of a User is used to let him do an unwanted action by tricking him into
 * sending an unwanted request. For example: You have defined a route in your app like #DEL "http://myApp/deleteProfile"
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

var validUrls = {
    "google": "www.google.de",
    "postillon": "www.der-postillon.com",
    "vi": "www.virtual-identity.com"
};

module.exports = function (app) {

    return {
        // http://localhost:3334/invalidRedirect?url=www.google.de
        checkForUrlValidity: function (req, res) {
            if (!req.query || !req.query.url) {
                res.send(400);
            } else {
                var redirectUrl = req.query.url;
                for(var entry in validUrls) {
                    if (redirectUrl == validUrls[entry]) {
                        res.send(200);
                    } else {
                        res.send(400);
                    }
                }
            }
        }
    }
};