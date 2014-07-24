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