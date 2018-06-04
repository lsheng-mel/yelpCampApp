var mongoose = require("mongoose");

var databaseURI = process.env.DATABASEURI || "mongodb://localhost/yelp_camp_app";
mongoose.connect(databaseURI);


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

