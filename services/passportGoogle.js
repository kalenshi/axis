const passportGoogle = require('passport');
const keys = require('../config/keys');
const mongoose = require('mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = mongoose.model('User');

passportGoogle.serializeUser((user, done) => {
    //we take our user and convert it into some hash
    done(null, user.id)
});

passportGoogle.deserializeUser(async (id, done) => {
    //take the hash and find a model associated with this has
    try {
        let foundUser = await User.findById(id);
        if (foundUser) {
            done(null, foundUser);
        }
    } catch (err) {
        console.log("This is a Malicious  user");
        console.log(err);
    }

});

passportGoogle.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: "/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const {id} = profile;
        const {given_name: first_name, family_name: last_name, email} = profile._json;
        const existingUser = await User.findOne({googleId: id});
        if (existingUser) {
            return done(null, existingUser);
        }
        const newUser = await new User({
            first_name,
            last_name,
            email,
            auth_type: 'googleOauth',
            googleId: id

        }).save();
        return done(null, newUser);

    } catch (e) {
        console.log("Error Accessing the database");
        console.log(e);
        done(e, null);
    }


}));
module.exports = passportGoogle;

