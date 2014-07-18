/**
 * Created with IntelliJ IDEA.
 * User: david.losert
 * Date: 18.07.2014
 * Time: 12:49
 */


var csrf = require('csurf');

module.exports = function (app) {
    app.use(csrf());
    app.use(function (req, res, next) {
        res.locals.csrfToken = req.csrfToken();
        next();
    });

    return {

    }
}