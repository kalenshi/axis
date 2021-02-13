const passport = require('passport');
const keys = require('../config/keys');
const mongoose = require('mongoose');
const FacebookStrategy = require('passport-facebook').Strategy;
const User = mongoose.model('User');


passport.serializeUser((user, done) => {
    //we take our user and convert it into some hash
    done(null, user.id)
});

passport.deserializeUser(async (id, done) => {
    //take the hash and find a model associated with this has
    try {
        const existingUser = await User.findOne({auth_ID: id});
        if (existingUser) {
            done(null, existingUser);
        }
    } catch (err) {
        console.log("This is a Malicious  user");
        console.log(err);
    }

});

passport.use(new FacebookStrategy({
        clientID: keys.facebookAppID,
        clientSecret: keys.facebookAppSecret,
        callbackURL: "/auth/facebook/callback",
        profileFields: ['id', 'displayName', 'email'],
        enableProof: true
    },
    async (accessToken, refreshToken, profile, done) =>{
        try {
            const {id, displayName} = profile;
            const existingUser = await User.findOne({auth_ID: id});
            if (existingUser) {
                return done(null, existingUser);
            }
            const newUser = await new User({
                first_name: displayName.split(" ")[0],
                last_name: displayName.split(" ")[1] || "NotProvided",
                auth_provider: 'facebook',
                auth_ID: id
            }).save();
            return done(null, newUser);
        } catch (err) {
            console.log("Malicious User!");
            return done(err, null);
        }
    }
));
module.exports = passport;