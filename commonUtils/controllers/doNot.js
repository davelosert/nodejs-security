var _ = require('underscore');

/**
 * In a get request, you should never mutate the State of your app (e.g. store to DB, authenticate or whatsoever).
 * That is because in a GET-Request, you would need your CSRF-Token to be exposed within the URL, thus it could
 * be easily corrupted by an attacker. For this reason, express-CSRF does NOT validate CSRF for GET-Request.
 *
 * See here for more Information:
 * https://www.owasp.org/index.php/Cross-Site_Request_Forgery_(CSRF)_Prevention_Cheat_Sheet
 */
exports.mutateStateOnGetRequests = function (req, res) {
	// Some DB Delete or Edit Operation
	// for example here we have a request with "/wrong/csrf?action=delete&id=12ßufj2ß939fhß923fh9ß023h9f023
	var action = req.body.action;
	var id = req.body.id;

};

/**
 * TYPE: HPP (HTTP PARAMETER POLUTION)
 * DANGER: DoS (with Single request) / Mutuate State
 * EXPLANATION:
 * The Data of a Request is passed as a Data-Object within req.query (for GET) or req.body (for POST).
 * If there are two fields inside the Request with the same Key (e.g. ?firstname=JOHN&firstname=JOHN), the resulting
 * property of the Data-Object will be an Array instead of a String. This can cause an uncaught Exception in your
 * Application as shown below.
 */
exports.trustParameterTypes = function (req, res) {
	//
	// First we extract the Data from GET ...?id=MYDBID&id=MALICIOUSID
	var data = req.query || req.body;

	// Since there are two Properties with the same key, Id is not a String anymore....
	console.log('Type is not a String: ', typeof(data.id));
	// ... but an instance of Array
	console.log('Id is instance of array: ', data.id instanceof Array);

	// This means typical String-Operations like "trim()" will just cause an TypeError.
	// At this point, EXPRESS still has a try/catch-Block around
	// the route and therefore will safely catch the error...
	data.id.trim();

	// ... this changes if you execute the operation within an async callback
	setTimeout(function () {
		// The TypeError thrown here is not within any try/catch Block and will therefore crash your whole
		// application, making it easy to DoS your App by just one single request.
		data.id.trim();
	}, 0);

	// @todo Show Threat of Mutuating APP-State e.g. by letting App safe Array instead of String in MongoDB
};

/**
 * TYPE: HPP (HTTP PARAMETER POLUTION)
 * DANGER: DoS (with Single Request)
 * EXPLANATION:
 *
 */
exports.passParametersAsArray = function (req, res) {
	var requestParams = req.body
};