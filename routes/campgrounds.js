const express = require("express");
const router = express.Router();

// Models
const Campground = require("../models/campground");

// Campgrounds - n/a - GET
router.get("/", (req, res) => {
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

// Campgrounds - n/a - POST
router.post("/", isLoggedIn, (req, res) => {
  // take the form data and push a new campground to the campgrounds array
  let { name, image, description } = req.body.campground;
  let { username, id } = req.user;
  let newCampground = {
    name: name,
    image: image,
    description: description,
    author: { username: username, id: id },
  };
  console.log(newCampground);

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

// Campgrounds - New - GET
router.get("/new", isLoggedIn, (req, res) => {
  res.render("campgrounds/new", { title: "Campgrounds - New" });
});

// Campgrounds - Show - GET
router.get("/:id", (req, res) => {
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

// Middleware
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

module.exports = router;
