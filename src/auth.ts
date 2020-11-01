import passport from 'passport';
import {Database} from './db';

const LocalStrategy = require('passport-local').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;

export class Auth{
    static init(){
        // passport.serializeUser(function(user, done) {
        //     done(null, user._id);
        // });
        //
        // passport.deserializeUser(function(user_id, done) {
        //     Database.User.findById(user_id).exec()
        //         .then(user => done(null, this.formatUserReturn(user)))
        //         .catch(e => done(e, null));
        // });

        /*
        #STRATEGIES#
        Add as many passport strategies as we want following here.
        */

        /*LOCAL STRATEGY*/
        passport.use(new LocalStrategy(
            (username, password, done) => {
                Database.User.authenticate(Database.User, username, password, (err, user) => {;
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

    static formatUserReturn(user){
        /* Removing variables we dont want to return */
        delete user.password;
        return {user: user, authToken: user.generateJwt(user)};
    }

    static authenticate(location, req, res, next, callback){
        passport.authenticate(location, callback)(req,res,next);
    }
}
