/**
 * Created by David on 20.03.14.
 */
/**
 * In a get request, you should never mutate the State of your app (e.g. store to DB, authenticate or whatsoever).
 * That is because in a GET-Request, you would need your CSRF-Token to be exposed within the URL, thus it could
 * be easily corrupted by an attacker. For this reason, express-CSRF does NOT validate CSRF for GET-Request.
 *
 * See here for more Information:
 * https://www.owasp.org/index.php/Cross-Site_Request_Forgery_(CSRF)_Prevention_Cheat_Sheet
 */
exports.mutateStateOnGetRequests = function (req, res) {
}