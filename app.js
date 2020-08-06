const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const seedDB = require("./seeds");
const app = express();

seedDB();

// Models
const Campground = require("./models/campground");

mongoose.connect("mongodb://localhost/yelpcamp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

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
      res.render("index", { title: "Campgrounds", campgrounds: campgrounds });
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
  res.render("new", { title: "Campgrounds - New" });
});

app.get("/campgrounds/:id", (req, res) => {
  Campground.findById(req.params.id)
    .populate("comments")
    .exec((err, campground) => {
      if (err) {
        console.error(err);
      } else {
        console.log(campground);
        res.render("show", {
          title: "Campgrounds - Show",
          campground: campground,
        });
      }
    });
});

app.listen(3000, () => {
  console.log("The YelpCamp Server has Started on Port 3000");
});
