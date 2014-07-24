/**
 * Build correct Passwort Hashes
 * ========================
 * created by: Markus.Pleines
 *
 * What it does
 * ===========
 * Check out the user model for implementation
 *
 * The User model should fully encapsulate the password encryption and verification logic
 * The User model should ensure that the password is always encrypted before saving
 * The User model should be resistant to program logic errors, like double-encrypting the password on user updates
 * bcrypt interactions should be performed asynchronously to avoid blocking the event loop (bcrypt also exposes a synchronous API)
 *
 *
 */

module.exports = function (app) {
    return {
        checkLogInState: function (req, res, next) {
            var username123 = req.query.username;
            var pw = req.query.pw;
            User = require('../model/user');

            // attempt to authenticate user
            User.getAuthenticated(username123, pw, function(err, user, reason) {
                if (err) throw err;

                // login was successful if we have a user
                if (user) {
                    // handle login success
                    console.log('login success');
                    res.send(200, 'Login Success');
                    return;
                }

                // otherwise we can determine why we failed
                var reasons = User.failedLogin;
                switch (reason) {
                    case reasons.NOT_FOUND:
                    case reasons.PASSWORD_INCORRECT:
                        res.send(200, 'Wrong LoginDates');
                        break;
                    case reasons.MAX_ATTEMPTS:
                        res.send(200, 'Too much wrong logins');
                        break;
                }
            });
        }
    };
};