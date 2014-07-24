/**
 * MFLAC (MISSING FUNCTION LEVEL ACCESS CONTROL)
 * ========================
 * created by: armin.weisser
 *
 * What it is
 * ===========
 * TBD
 *
 * !IMPORTANT!
 * TBD
 *
 * See here for more Information:
 * TBD
 *
 */

/**
 * DESCRIPTION OF SECURITY MEASURES WITHIN THIS COMPONENT
 * tbd
 */

module.exports = function (app) {
    app.use(function (req, res, next) {
		// inject authorisation mapping of roles to routes.(AccessControl-List).
		// Use a declarative json config for this.
		// -> Timo
        next();
    });
	app.use(function (req, res, next) {
		// inject authorisation check at route level.
		// send 401 Unauthorized
		// -> Timo
		next();
	});

	app.use(function (req, res, next) {
		// inject authorisation mapping of roles to functions.
		// Use something close to annotations? Better json config
		next();
	});
	app.use(function (req, res, next) {
		// inject authorisation check at function level.
		// something like aspect oriented
		// requireSecure()
		next();
	});

    return {
		getData: function (req, res) {
			res.send(200, "MFLAC: Here's some public data. Everyone can access this.");
		},
		getRestrictedData: function (req, res) {
			res.send(200, "MFLAC: Attention. Here's some restricted data. You should only see this if you're logged in as admin." +
				"<br>" +
				"Your user id is "+ req.session.user_id);
		}
    }
};