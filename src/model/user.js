var mongoose = require('../lib/mongoConnected.js');

module.exports = mongoose.model('Users',{
    username: String,
    password: String
});
