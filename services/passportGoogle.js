const passportGoogle = require('passport');
const keys = require('../config/keys');
const mongoose = require('mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = mongoose.model('User');

passportGoogle.serializeUser((user, done) => {
    //we take our user and convert it into some hash
    done(null, user.id)
});

passportGoogle.deserializeUser((id, done)=>{
    //take the hash and find a model associated with this has
    User.findById(id)
        .then(foundUser=>{
            done(null, foundUser);
        })
        .catch(err=>{
            console.log("This is a Bogus user");
            console.log(err);
        });
});

passportGoogle.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: "/auth/google/callback"
}, (accessToken, refreshToken, profile, done) => {
    const {id} = profile;
    const {given_name: first_name, family_name: last_name, email} = profile._json;
    //check if anyone in our database has this ID
    User.findOne({googleId: id})
        .then(existingUser => {
            if (existingUser) {
                done(null, existingUser);
            } else {
                new User({
                    first_name,
                    last_name,
                    email,
                    auth_type: 'googleOauth',
                    googleId: id

                }).save()
                    .then(newUser => {
                       done(null, newUser);
                    });
            }
        })
        .catch(err => {
            console.log("Error accessing the Database");
            console.log(err);
        });

}));
module.exports = passportGoogle;
