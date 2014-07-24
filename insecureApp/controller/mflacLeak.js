/**
 * User: armin.weisser
 * Date: 24.07.2014
 */

/**
 * TYPE: MFLAC (MISSING FUNCTION LEVEL ACCESS CONTROL)
 *
 * DANGER: Unauthorized access to server side functions by calling unprotected URLs.
 *
 * HOW CAN I TEST IT?
 * 1. Call the route /mflac/readPublicData. You should have unconditional access to public data.
 * 2. Call the route /mflac/readPrivateData. You should NOT have access to the private data.
 * 3. Call the route /login and than again /mflac/readPrivateData. You should now have access to the private data.
 * 3. Call the route /logout and than again /mflac/readPrivateData. You should NOT have access to the private data.
 *
 * EXPLANATION:
 * It's not sufficiant to restrict access to certain functions
 * just by hiding the appropriate functions elements in html.
 * Mapping the function to an obscure URL (security by obscurity) is also not sufficiant.
 * An attacker can possibly brute force unprotected urls or reach them just by luck.
 * This can become more complex if your application dynamically generates resources,
 * either to provide UGC functionality or caching strategy (e.g. generate a dynamic report and provide
 * a link to an static pdf resource).
 * However, a temporarely generated URL with UUIDs (as you may know it from password reset functions)
 * is somehow an adequate form of security by obscurity.
 *
 * Furthermore it's not sufficiant to check authorisation only once in the process (e.g. during login)
 * because the attacker could skip this step. So every request has to be checked!
 * It's also a flaw to allow direct, static access to internal ressources like a config file.
 *
 * The threat is not limited to routes. Sure, the routes are the gate to more hidden functions in the back of the
 * application and thus a good layer for authorisation checks.
 * But the MFLAC threat applies to every server side function.
 * Whether it's a self implemented function or a 3rd party function.
 * Whether it's a function directly attached to a route or a function in the very back of the application.
 * You should restrict critical functions everywhere in the system for authorized users only.
 *
 * Example: A function called "dropDatabase()" in the persistence layer of the app allows the caller to drop the whole database.
 * If this function is mapped to a route that is restricted to admin users everthing is fine.
 * But if a thoughtless programmer somehow (perhaps just indirectly) attaches the function to a less restricted route,
 * than you'd have a serious security flaw.
 * If you could protect the dropDatabase() function itself to the admin role, than it's more protected against misuse.
 *
 * POSSIBLE MEASURES:
 * - Every server side function that is callable via an http request has to be additionally protected by a server side authorisation mechanism.
 * - It's recommanded to disallow access by default and then grant fine grained access to appropriate roles (white list style).
 * - It's also recommended to use a white list for all known file types (e.g. .html, .css, .js, .pdf) and to block every file type that you are not intend to serve directly.
 * - Restrict function calls to authorized users only.
 *
 * SOURCES:
 * https://www.owasp.org/index.php/Top_10_2013-A7-Missing_Function_Level_Access_Control
 * https://www.owasp.org/index.php/Top_10_2007-Failure_to_Restrict_URL_Access
 *
 */

module.exports = function (app) {

	var mflacService = require("../services/mflacService")();

	return {
		readPublicData: function (req, res) {
			res.send(200, mflacService.getPublicData());
		},
		readPrivateData: function (req, res) {
			res.send(200, mflacService.getPrivateData(req.session.user_id));
		}
	}
}