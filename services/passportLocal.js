const passport = require('passport');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = mongoose.model('User');
const LocalStrategy = require('passport-local').Strategy;


passport.serializeUser((user, done) => {
    //we take our user and convert it into some hash
    done(null, user.id)
});

passport.deserializeUser(async (id, done) => {
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


passport.use( new LocalStrategy(async (email,password, done)=>{
    try{
        const existingUser = await User.findOne({email:email});
        console.log("++++++++++++++++++++++++++++++++++++++++++++++");
        console.log(existingUser);
        console.log("++++++++++++++++++++++++++++++++++++++++++++++");
        if(existingUser){
            const match = await bcrypt.compare(password, existingUser.auth_ID);
            if(match){
             return done(null, existingUser);
            }
            return done(null, false);
        }
        return done(null, false);
    }catch (err){
        console.log(err);
        return done(err)
    }
}));

module.exports = passport;