const mongoose = require('mongoose');

const {Schema} = mongoose;

let UserSchema = new Schema({
    first_name:{
        type:String,
        required: false
    },
    last_name: {
        type:String,
        required: false
    },
    email: {
        type:String,
        required: false
    },
    auth_type: {
        type:String,
        required: false
    },
    googleId:{
        type:String
    },
});

module.exports = mongoose.model('User',UserSchema);

