var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/domicileapp');
var db = mongoose.connection; 
var bcrypt = require('bcrypt');

//Admin Schema
var UserSchema = mongoose.Schema({
    id: {
        type: Number,
        index: true
    },
    name: {
        type: String
    },    
    fathername: {
        type: String
    },
    email: {
        type: String
    },
    gender: {
        type: String
    },
    role: {
        type: Number
    },
    address: {
        type: String
    },
    date: {
        type: Date
    },
    bform: {
        type: String
    },
    city: {
        type: String
    },
    bankReciept: {
        type: String
    },
    profileImage: {
        type: String
    },
    utilityBills: {
        type: String
    }
});

var User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function(id,callback){
    User.findById(id, callback);
}

module.exports.checkRole = function(role, callback){
    var query = {role : 3};
    User.findOne(query, callback);
    console.log(role);
}

module.exports.createUser = function(newUser, callback){
    newUser.save(callback);
}

module.exports.countUsers = function(callback){
    User.find().count(callback);
}

