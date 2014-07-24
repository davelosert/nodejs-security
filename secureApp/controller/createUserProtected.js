

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