const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const keys = require("./config/keys");
const mongoose = require('mongoose');
const passport = require('passport');
const User = require("./models/user_model");
const app = express();


//middleware
app.use(bodyParser.json());
app.use('/assets', express.static(`${__dirname}/client`));
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
}));
app.use(passport.initialize());
app.use(passport.session());

//Database connection

mongoose.connect(keys.mongoURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(conn => {
        console.log(`Database Connection Successful`);
    })
    .catch(err => {
        console.log(`ERROR: Database Connection Unsuccessful`);
        console.log(err);
    });

//Authentication
function requireAuthentication(req, res){

}
require('./routes/authGoogleRoutes')(app);
app.get('/', (req, res) => {
    console.log(req.user);
    res.send("Welcome home Enthusiasts");
});

//API ROUTES
require('./routes/billingRoutes')(app);

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Now Listening on port ${PORT}...`);
});