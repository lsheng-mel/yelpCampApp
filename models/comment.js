var mongoose = require("mongoose");

mongoose.connect("mongodb://admin:123mtr00@ds147420.mlab.com:47420/yelp_camp_app");


var commentSchema = new mongoose.Schema({
	author: {
		id: mongoose.Schema.Types.ObjectId,
		name: String
	},

	campground: {
		id: mongoose.Schema.Types.ObjectId
	},

	comment: String
});

module.exports = mongoose.model("Comment", commentSchema);

