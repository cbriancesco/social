var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10;

var UserSchema = new Schema({
    //userName: { type: String, index: { unique: true } },
    name: {first: String, last: String},
    password: {type: String, required: true},
    email: { type: String, required: true, lowercase: true, index: { unique: true }},
    gender: String,
    lastLogin: Date,
    birth: Date,
    image: {_id: String, name: String},
    verified: Boolean,
    signup: { type: Date, default: Date.now },
    company: String,
    employee: Boolean,
    id: String,
    empId: String,
    phone: String,
    salary: String,
    related: Array
});

UserSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema);
