const express = require("express");
const router = express.Router({ mergeParams: true });

// Models
const Campground = require("../models/campground");
const Comment = require("../models/comment");

// Comments - New - GET
router.get("/new", isLoggedIn, (req, res) => {
  Campground.findById(req.params.id, (err, campground) => {
    if (err) {
      console.error(err);
    } else {
      res.render("comments/new", { title: "", campground: campground });
    }
  });
});

// Comments - n/a - POST
router.post("/", isLoggedIn, (req, res) => {
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
          // Add username and ID to comment
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          comment.save();
          // Interlink the comment and campground
          campground.comments.push(comment._id);
          campground.save();
          res.redirect(`/campgrounds/${campground._id}`);
        }
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
