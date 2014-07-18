/**
 * Created by David on 05.04.14.
 */

/**
 *
 */
exports.useOnlyHTTPVerbsForStateChanges = function (req, res, next) {
	// At this Point, our CSRF-Middleware will already have verified the request and you can therefore trust it to be
	// coming from your own site
	res.send(200, 'Everything´s safe!');
};


/**
 * TYPE: DoS, DDoS
 * Express gives the request-parameters as an Object
 * @param req // GET ?id=IDFROMDATABASE
 * @param res
 */
exports.checkTypeOfInputParameters = function (req, res, next) {
	// Depending if request was GET or POST, the request-data is in the body or the query
	var data = req.query || req.body;

	if (typeof(data.id) !== 'string') {
		next(new Error('Wrong Input Format!'));
	}
	else {
		// Will not throw since its a string for sure
		data.id.trim();
		res.send(200, 'Everything´s safe!');
	}

};

exports.passParametersAsObject = function (req, res) {

};