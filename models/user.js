var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var databaseURI = process.env.DATABASEURI || "mongodb://localhost/yelp_camp_app";
mongoose.connect(databaseURI);

var userSchema = new mongoose.Schema({
	username: String,
	password: String
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);