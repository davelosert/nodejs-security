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

            console.log(pw);

            // fetch user and test password verification
            User.findOne({ username:  username123}, function(err, user) {
                if(!user) {res.send(200, 'USER NOT FOUND'); return;}
                user.comparePassword(pw, function (err, isMatch) {
                    if(isMatch) {
                        res.send(200, 'PW Correct');
                    }
                    else
                    {
                        res.send(200, 'Incorrect');

                    }

                });
            });
        }
    };
};