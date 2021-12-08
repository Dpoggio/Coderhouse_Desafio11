var mongoose = require('../lib/mongoConnected.js');

module.exports = mongoose.model('Users',{
    username: String,
    password: String,
    email: String,
    firstName: String,
    lastName: String
});
