var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/domicileapp');
var db = mongoose.connection; 
var bcrypt = require('bcrypt');

//Admin Schema
var AdminSchema = mongoose.Schema({
    username: {
        type: String,
        index: true
    },
    password: {
        type : String
    },
    email: {
        type: String
    },
    name: {
        type: String
    },
    role: {
        type: Number
    },
    profileImage: {
        type: String
    }
});

var Admin = module.exports = mongoose.model('Admin', AdminSchema);

module.exports.getAdminById = function(id,callback){
    Admin.findById(id, callback);
}

module.exports.getAdminByUsername = function(username, callback){
    var query = {username : username};
    Admin.findOne(query, callback);
}


module.exports.comparePassword = function (candidatePassword, hash ,callback){
    bcrypt.compare(candidatePassword, hash, function(err, isMatch){
        callback(null, isMatch);
    });
}

module.exports.checkRole = function(role, callback){
    var query = {role : 1};
    Admin.findOne(query, callback);
    console.log(role);
}



module.exports.createAdmin = function(newAdmin, callback){
   bcrypt.genSalt(10, function(err,salt){
    bcrypt.hash(newAdmin.password, salt, function(err, hash){
        newAdmin.password = hash;
        newAdmin.save(callback);
    });
   });
}