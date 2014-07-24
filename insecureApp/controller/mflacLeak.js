/**
 * User: armin.weisser
 * Date: 24.07.2014
 */

/**
 * TYPE: MFLAC (MISSING FUNCTION LEVEL ACCESS CONTROL)
 *
 * DANGER: Unauthorized access to server side functions by calling unprotected URLs.
 *
 * EXPLANATION:
 * It's not sufficiant to restrict access to certain functions
 * just by hiding the appropriate functions elements in html.
 * Mapping the function to an obscure URL is also not sufficiant. An attacker can possibly brute force
 * unprotected urls or reach them just by luck.
 * This can become more complex if your application dynamically generates resources,
 * either to provide UGC functionality or caching strategy (e.g. generate a dynamic report and provide
 * a link to an static pdf resource).
 *
 * ??? Gilt das auch für generierte Einmal-URLs mit UUIDs? Z.B. Password-Reset. Ist Security by obscurity
 * mit Hilfe von generierten UUIDs ausreichend sicher ???
 *
 * Furthermore it's not sufficiant to check authorisation only once in the process (e.g. during login)
 * because the attacker could skip this step. So every request has to be checked!
 * It's also a flaw to allow direct, static access to internal ressources like a config file.
 *
 *
 * MEASURES:
 * Every server side function that is callable via an http request
 * has to be additionally protected by a server side authorisation mechanism.
 * It's recommanded to disallow access by default and then grant fine grained access
 * to appropriate roles (white list style).
 * It's also recommended to use a white list for all known file types (e.g. .html, .css, .js, .pdf)
 * and block every file type that you are not intend to serve directly.
 *
 * ???
 *
 * SOURCES:
 * https://www.owasp.org/index.php/Top_10_2013-A7-Missing_Function_Level_Access_Control
 * https://www.owasp.org/index.php/Top_10_2007-Failure_to_Restrict_URL_Access
 *
 */

module.exports = function (app) {

	var mflacService = require("../services/mflacService")();

	return {
		data: function (req, res) {
			res.send(200, mflacService.getData());
		},
		restrictedData: function (req, res) {
			res.send(200, mflacService.getRestrictedData(req.session.user_id));
		}
	}
}