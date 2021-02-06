const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;


passport.use(new FacebookStrategy({
    clientID:"",
    clientSecret: "",
    callbackURL: "http://localhost:50000/auth/facebook/callback"
},(accessToken, refreshToken, done)=>{

}));


