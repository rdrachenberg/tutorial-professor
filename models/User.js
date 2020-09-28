const {ObjectId} = require('bson');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
// const Cube = require('./Cube');


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        createIndex: {
            unique: true
        },
    },
    password: {
        type: String,
        required: true,
    },

    isEnrolled: [{type: mongoose.Schema.Types.ObjectId, ref: 'Course'}]
});

userSchema.pre('save', function (next) {
    const user = this;

    if (!user.isModified('password')) return next();

    bcrypt.genSalt(saltRounds, function (err, salt) {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) {
                return next(err);
            } else {
                user.password = hash;
                next();
            }
        });
    });
});

userSchema.methods.comparePassword =
    function (candiatePassword, cb) {
        bcrypt.compare(candiatePassword, this.password, function (err, isMatch) {
            if (err) return cb(err);
            console.log(isMatch);

            cb(null, isMatch)();

        });
    };

module.exports = User = mongoose.model('User', userSchema);