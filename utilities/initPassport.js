/* Local modules */
import { authenticationMiddleware } from '../middleware/passportMiddleware.js'
import { getUserModel } from '../db/userModel.js';
const User = getUserModel();

/* Built-in or third party modules */
import bcrypt from 'bcrypt';
import passport from 'passport';
import LocalStrategy from 'passport-local';

/*
Exports a function that initializes passport and defines a local strategy
for authenticating users from the Mongoose Database.

Parameters:
    req : request
        HTTP request
    res : response
        HTTP response
    next : next  
        Middleware next function
Return:  
    function
        Initializes and configures passport
*/
export function initPassport() {

    // Establish passport session logic to use session to keep track user
    passport.serializeUser(function (user, cb) {
        cb(null, user.username);
    });

    passport.deserializeUser(function(username, done) {
        User.findOne({ username: username }, function(err, user) {
            done(err, user);
        });
    });

    // Define local strategy
    passport.use(new LocalStrategy(
        function(username, password, done) {
            // Try to locate user in database
            User.findOne({ username: username }, function(err, user) {
                if (err) { 
                    return done(err);
                }
                // User not found
                if (!user) {
                    return done(null, false, { message: 'Incorrect username' });
            }
            // User found; Compare password sent via POST with database password
            bcrypt.compare(password, user.password, (err, result) => {           
                if (err) {
                    return done(err);
                }
                // Invalid password
                if (result == false) {
                    return done(null, false, { message: 'Incorrect password' });
                }
                // Sets user object session
                return done(null, user);
            })
        });
        }
    ));

    // Passport middleware to be used with authenticated routes
    passport.authenticationMiddleware = authenticationMiddleware;
}