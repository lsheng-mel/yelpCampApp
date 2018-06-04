var mongoose = require("mongoose");

// connect to the database
var databaseURI = process.env.DATABASEURI || "mongodb://localhost/yelp_camp_app";
mongoose.connect(databaseURI);

// seed the campgrounds
var campgroundsSchema = new mongoose.Schema({
	name: String,
	description: String,
	image: String
});

// export the campgrounds model
module.exports = mongoose.model("campgrounds", campgroundsSchema);