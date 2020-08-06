const passport = require("passport");
const express = require("express");
const router = express.Router();

// Models
const User = require("../models/user");

// Authentication - Register - GET
router.get("/register", (req, res) => {
  res.render("register", { title: "Register" });
});

// Authentication - Register - POST
router.post("/register", (req, res) => {
  let newUser = new User({ username: req.body.username });
  User.register(newUser, req.body.password, (err, user) => {
    if (err) {
      console.error(err);
      return res.render("register", { title: "Register" });
    }
    passport.authenticate("local")(req, res, () => {
      res.redirect("/campgrounds");
    });
  });
});

// Authentication - Login - GET
router.get("/login", (req, res) => {
  res.render("login", { title: "Login" });
});

// Authentication - Login - POST
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login",
  })
);

// Authentication - Logout - GET
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/campgrounds");
});

module.exports = router;
