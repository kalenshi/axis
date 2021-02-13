
const {Schema, model} = require('mongoose');

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
    auth_provider: {
        type:String,
        required: false
    },
   auth_ID:{
        type:String,
       required:true
    },
});

module.exports = model('User',UserSchema);

