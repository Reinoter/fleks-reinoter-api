import passport from 'passport';
import {Database} from './db';

const LocalStrategy = require('passport-local').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;

// Did not find an ES6 equvivalent
const jwt = require('express-jwt');

export class Auth{
    static _user; //user authentication middleware for express.

    static get user(){
        return this._user;
    }

    static init(){
        this._user = jwt({
            secret: process.env.JWT_SECRET,
            algorithms: ['HS256']
        });
        
        /*
        #STRATEGIES#
        Add as many passport strategies as we want following here.
        */

        /*LOCAL STRATEGY*/
        passport.use(new LocalStrategy(
            (username, password, done) => {
                Database.User.authenticate(Database.User, username, password, (err, user) => {
                    if(err) return done(null, false, err)
                    if(!user) return done(null, false, "no such user")
                    return done(null, this.formatUserReturn(user));
                });
            }
        ));


        /*BEARER STRATEGY*/
        passport.use(new BearerStrategy(
          (token, done) => {
            Database.User.validateToken(Database.User, token, (err, user) => {
                if (err) return done(null, false, "Invalid username or password");
                if (!user) return done(null, false, "no such user");
                return done(null, this.formatUserReturn(user));
            })
          }
        ));
    }

    /* Removing password from user return */
    static formatUserReturn(user){
        /* Removing variables we dont want to return */
        delete user.password;
        return {user: user, authToken: user.generateJwt(user)};
    }

    /* Passport authenticate */
    static authenticate(location, req, res, next, callback){
        passport.authenticate(location, callback)(req,res,next);
    }
}
