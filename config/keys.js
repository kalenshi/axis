//keys.js
if(process.env.NODE_ENV === 'production'){
    //return production settings
    module.exports = require('./prod');
}else{
    //return Development settings
    module.exports = require('./dev');
}

