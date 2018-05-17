var Campground = require("./models/campground");

module.exports = function()
{
	//  remove all existing data and start from scratch
	Campground.remove({}, function(err){
		if(err)
		{
			console.log("Error removing all records from the database.");
		}
		else
		{
			console.log("removed all campgrounds!");

			// seed the database
			var seedCampgrounds = [
			{
				name: "Steven Pass",
				description: "A green and orange tent for camping in the snow at Stevens Pass, Washington",
				image: "https://images.unsplash.com/photo-1455496231601-e6195da1f841?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=4d1156d3e4dfafbc71a9f293939f3243&auto=format&fit=crop&w=500&q=60"
			},
			{
				name: "Forest Romantics",
				description: "Two People seated in a sofa near a campfire in a forest at night",
				image: "https://images.unsplash.com/photo-1484172340747-54a828bfeb6e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=1edebfd5fd77b6107d2d7e3765cc248a&auto=format&fit=crop&w=500&q=60",
			},
			{
				name: "Morning at Peak",
				description: "Standing on the top of a big moutain in the morning",
				image: "https://images.unsplash.com/19/nomad.JPG?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=c03767eb52b473d99cdf7cf14bf42a58&auto=format&fit=crop&w=500&q=60",
			}
			];

			// create several campgrounds from the seed
			seedCampgrounds.forEach(function(camp){
				Campground.create(camp, function(err, createdCampground){
					if(err)
					{
						console.log("Error creating a new campground from the seed.");
					}
					else
					{
						console.log("Successfully created a new campground from the seed.");
					}
				});
			});
		}
	});
};