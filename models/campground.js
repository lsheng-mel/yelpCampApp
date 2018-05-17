var mongoose = require("mongoose");

// connect to the database
mongoose.connect("mongodb://localhost/yelp_camp_app");

// seed the campgrounds
var campgroundsSchema = new mongoose.Schema({
	name: String,
	description: String,
	image: String
});

// export the campgrounds model
module.exports = mongoose.model("campgrounds", campgroundsSchema);