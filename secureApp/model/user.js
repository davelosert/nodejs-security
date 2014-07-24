/**
 * Created by David on 24.07.14.
 */
var mongoose = require('mongoose');
//var bcrypt = require('bcrypt');

var Schema = mongoose.Schema;


SALT_WORK_FACTOR = 10;

var userSchema = new Schema({
	username: { type: String, required: true, index: { unique: true } },
	pwHash  : String,
	salt    : String
});

//Salt pw and save it to the db
userSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('pwHash')) return next();

    // generate a salt
    /*bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.pwHash, salt, function(err, hash) {
            if (err) return next(err);
            // override the cleartext password with the hashed one
            user.pwHash = hash;
            next();
        });
    });
	*/
});

//Compare PW with the salts
userSchema.methods.comparePassword = function(candidatePassword, cb) {
    /*bcrypt.compare(candidatePassword, this.pwHash, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
    */
};
module.exports = mongoose.model('User', userSchema);