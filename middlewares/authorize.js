

module.exports = UserSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password along with our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});


//Because passwords are not hashed until the document is saved, be careful if you're interacting with documents that were not retrieved from the database, as any passwords will still be in cleartext.
//Mongoose middleware is not invoked on update() operations, so you must use a save() if you want to update user passwords.