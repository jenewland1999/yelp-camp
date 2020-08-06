const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const seedDB = require("./seeds");
const app = express();

seedDB();

// Models
const Campground = require("./models/campground");
const Comment = require("./models/comment");

mongoose.connect("mongodb://localhost/yelpcamp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.static(path.join(__dirname, "/public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  // res.send('This is the homepage of YelpCamp.')
  res.render("landing", { title: "Home" });
});

app.get("/campgrounds", (req, res) => {
  // Retrieve all campgrounds from DB
  Campground.find({}, (err, campgrounds) => {
    if (err) {
      console.error(err);
    } else {
      res.render("campgrounds/index", {
        title: "Campgrounds",
        campgrounds: campgrounds,
      });
    }
  });
});

app.post("/campgrounds", (req, res) => {
  // take the form data and push a new campground to the campgrounds array
  let name = req.body.name;
  let image = req.body.image;
  let desc = req.body.description;
  let newCampground = { name: name, image: image, description: desc };

  // Generate a new campground and save to DB
  Campground.create(newCampground, (err, campground) => {
    if (err) {
      console.error(err);
    } else {
      // redirect back to the campgrounds page
      res.redirect("/campgrounds");
    }
  });
});

app.get("/campgrounds/new", (req, res) => {
  res.render("campgrounds/new", { title: "Campgrounds - New" });
});

app.get("/campgrounds/:id", (req, res) => {
  Campground.findById(req.params.id)
    .populate("comments")
    .exec((err, campground) => {
      if (err) {
        console.error(err);
      } else {
        console.log(campground);
        res.render("campgrounds/show", {
          title: "Campgrounds - Show",
          campground: campground,
        });
      }
    });
});

app.get("/campgrounds/:id/comments/new", (req, res) => {
  Campground.findById(req.params.id, (err, campground) => {
    if (err) {
      console.error(err);
    } else {
      res.render("comments/new", { title: "", campground: campground });
    }
  });
});

app.post("/campgrounds/:id/comments", (req, res) => {
  // Retrieve the campground
  Campground.findById(req.params.id, (err, campground) => {
    if (err) {
      console.error(err);
      res.redirect("/campgrounds");
    } else {
      // Create new comment
      Comment.create(req.body.comment, (err, comment) => {
        if (err) {
          console.error(err);
        } else {
          campground.comments.push(comment._id);
          campground.save();
          res.redirect(`/campgrounds/${campground._id}`);
        }
      });
    }
  });
  // Interlink the comment and campground
});

app.listen(3000, () => {
  console.log("The YelpCamp Server has Started on Port 3000");
});
