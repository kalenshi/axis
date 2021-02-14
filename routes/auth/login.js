const mongoose = require('mongoose')
const passport = require('../../services/passportLocal');
const bcrypt = require('bcrypt');
const hash = require('object-hash');
const saltRounds = 12;
const User = mongoose.model('User');

module.exports = app => {
    app.post('/login', passport.authenticate('local'), (req, res) => {
       console.log("****************************************");
        console.log(req.body);
        console.log("****************************************");
    });
    app.post('/register', async (req, res) => {
        try {
            const {email, password} = req.body;
            //encrypt the password
            const passwordHash = await bcrypt.hash(password, saltRounds);
            if (passwordHash) {
                const now = Date.now();
                const auth_ID = await hash({email,passwordHash, now});
                const newUser = await new User({
                    email: email,
                    password: passwordHash,
                    auth_ID:auth_ID
                }).save();
                res.send(newUser);
            }
        } catch (e) {
            console.log(e);
            res.status(500).send({"Error": "Internal Server Error"});
        }

    });
};