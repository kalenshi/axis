const passport = require('../../services/passportFacebook');
module.exports = (app) => {
    app.get('/auth/facebook', passport.authenticate('facebook'));

    app.get('/auth/facebook/callback',
        passport.authenticate('facebook'),
        (req, res) => {
            console.log(req.user);
            res.redirect('/surveys');
        });
};