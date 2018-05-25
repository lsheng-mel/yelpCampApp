var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

mongoose.connect("mongodb://admin:password@13.236.153.137/yelp_camp_app");

var userSchema = new mongoose.Schema({
	username: String,
	password: String
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);