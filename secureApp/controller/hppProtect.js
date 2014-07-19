/**
 * Created by David on 19.07.14.
 */


module.exports = function (app) {
	return {
		checkTypeOfInputParameters: function (req, res, next) {
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
		}
	};
};