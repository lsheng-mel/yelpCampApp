var express 			= require("express"),
methodOverride 			= require("method-override"),
Campground 				= require("./models/campground"),
Comment 				= require("./models/comment"),
User 					= require('./models/user'),
seedDB 					= require("./seedDB"),
bodyParser 				= require("body-parser"),

session					= require('express-session'),
passport 				= require("passport"),
passportLocalStrategy 	= require("passport-local").Strategy,
passportLocalMongoose 	= require("passport-local-mongoose"),

app = express();

// set the default view engine
app.set("view engine", "ejs");

app.use(methodOverride('_method'));

// use the body parser
app.use(bodyParser.urlencoded({extended: true}));

////////////////////////////////
// Authentication setup
////////////////////////////////

app.use(session({
	secret: 'li sheng is the best software engineer in the world!',
	resave: false,
	saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session())

passport.use(new passportLocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// use a middleware to set up the user info for partials
app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	next();
});

// seed the DB
// seedDB();

/////////////////////////////////
// routes
/////////////////////////////////

// index
app.get("/", function(req, res){
	res.redirect("/campgrounds");
});

app.get("/campgrounds", function(req, res){
	Campground.find({}, function(err, campgrounds){
		if(err)
		{
			console.log("Error querying all available campgrounds from the database.");
			res.redirect("/");
		}
		else
		{
			res.render("index", {campgrounds: campgrounds});
		}
	});
});

// new
app.get("/campgrounds/new", function(req, res){
	res.render("new");
});

// show
app.get("/campgrounds/:id", function(req, res){
	var id = req.params.id;

	var campground = Campground.findById(id, function(err, campground){
		if(err)
		{
			console.log("Error finding the campground with the ID " + id);
			res.redirect("/");
		}
		else
		{
			Comment.find({campground: {id: campground._id}}, function(err, comments){
				res.render("show", {campground: campground, comments: comments});
			});
		}
	});
});

// update
app.put("/campgrounds/:id", IsLoggedIn, function(req, res){
	var id = req.params.id;

	Campground.findById(id, function(err, campground){
		if(err)
		{
			console.log("Error finding the campground.");
			res.redirect("/");
		}
		else
		{
			Campground.update({_id: id}, req.body.updatedCampground, function(err, updated){
				if(err)
				{
					console.log("Error saving updates that were done on the campground.");
					res.redirect("/");
				}
				else{
					console.log("Saved updates Successfully.");
					res.redirect("/campgrounds/" + req.params.id);
				}
			})
		}
	})
});

// delete
app.delete("/campgrounds/:id/delete", IsLoggedIn, function(req, res){
	var id = req.params.id;

	Campground.findById(id, function(err, campground){
		if(err)
		{
			console.log("Error finding the campground.");
			res.redirect("/");
		}
		else
		{
			Campground.remove({_id: id}, function(err){
				if(err)
				{
					console.log("Error deleting the campground.");
					res.redirect("/");
				}
				else{
					console.log("Deleted the campground Successfully.");
					res.redirect("/");
				}
			})
		}
	})
});


// create a new campground
app.post("/campgrounds", IsLoggedIn, function(req, res){
	Campground.create(req.body.new_campground, function(err, newCampground){
		if(err)
		{
			console.log("Error creating new campground from the form!");
			res.redirect("/");
		}
		else
		{
			console.log(newCampground);
			console.log("Created a new campground based on the user input.");
			res.redirect("/campgrounds");
		}
	})
})

// edit
app.get("/campgrounds/:id/edit", IsLoggedIn, function(req, res){
	var id = req.params.id;

	Campground.findById(id, function(err, campToEdit){
		if(err)
		{
			console.log("Error finding the campground to edit.");
			res.redirect("/");
		}
		else
		{
			res.render("edit", {campground: campToEdit});
		}
	});
});

// comment
app.get("/campgrounds/:id/comment", IsLoggedIn, function(req, res){
	res.render("comment");
});

app.post("/campgrounds/:id/comment", function(req, res){
	var author = {id: req.user._id, name: req.user.username}
	var campground = {id: req.params.id}
	var comment = req.body.comment;

	var commentData = {author: author, campground: campground, comment: comment};
	Comment.create(commentData, function(err, newComment){
		if(err)
		{
			console.log(err);
			return res.redirect("/");
		}
		
		res.redirect("/campgrounds/" + req.params.id);
	});
});

app.get('/campgrounds/:id/comments/:commentid/delete', IsLoggedIn, function(req, res){
	Comment.findByIdAndRemove(req.params.commentid, function(err, comment){
		if(err)
		{
			console.long('Error finding the comment with id ' + req.params.commentid);
		}
		else
		{
			res.redirect('/campgrounds/' + req.params.id);
		}
	});
});

////////////////////////////
// registration/login/logout

// register
app.get('/register', function(req, res){
	res.render('register');
});

app.post('/register', function(req, res){
	User.register({username: req.body.username}, req.body.password, function(err, newUser){
		if(err)
		{
			console.log(err);
			return res.redirect('/login');
		}

		passport.authenticate('local')(req, res, function(){
			res.redirect('/');
		});
	})
});

// login
app.get('/login', function(req, res){
	res.render('login');
})

app.post('/login', passport.authenticate('local', {
		successRedirect: '/',
		failureRedirect: '/login'
	}), function(req, res){
});

// logout
app.get('/logout', function(req, res){
	req.logout();
	res.redirect('/');
});



// middleware for verifying authentication
function IsLoggedIn(req, res, next)
{
	if(req.user)
	{
		return next();
	}

	res.redirect('/login');
}

app.listen(3000, function(){
	console.log("The app is running on port 3000");
});