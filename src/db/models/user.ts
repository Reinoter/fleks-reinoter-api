import Mongoose from 'mongoose';
import * as Bcrypt from 'bcryptjs';
import * as Jwt from 'jsonwebtoken';

var User = new Mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    created_at: {type: Date, default: Date.now}
});

/* Creating a hashed password before saving user */
User.pre('save',  function (next) {
    var user:any = this;
    Bcrypt.hash(user.password, 10, function (err, hash){
        if (err) return next(err);
        user.password = hash;
        next();
    })
});


/* Validating user based on JWT token */
User.statics.validateToken = function(Model, token, callback) {
    // Handeling invalid token from browser
    if(token == "undefined") return callback("Unauthorized");

    // Descrypt token and confirm its valid by fetching the user.
    Jwt.verify(token, process.env.JWT_SECRET, (err, res) => {
        if(!res?._id) return callback(err, res);
        Model.findOne({_id: res._id}, {password: 0})
        .then((user) => {
            if(!user) return callback(null, undefined);
            return callback(null, user);
        })
        .catch(e => callback("Unauthorized"))
    });
};

/* Generating valid Jwt token */
User.methods.generateJwt = function(user) {
    return Jwt.sign({
        _id: user._id,
        expiry: '720d'
    }, process.env.JWT_SECRET);
};

/* Validating user based on username and password */
User.statics.authenticate = function (Model, email, password, callback) {
    var emailExp = new RegExp("^" + email + "$", 'i')

    // Searching for user using email
    Model.findOne({ email: emailExp })
    .then((user) => {
        if(!user) return callback("We didn't find the username and password combination");
        Bcrypt.compare(password, user.password, function (err, result) {
            if (result !== true) return callback("Wrong password");

            // Removing senstive attributes before returning to frontend
            user.password = undefined;
            return callback(null, user);
        })
    })
    .catch(e => callback("Unauthorized"));
}

export { User };
