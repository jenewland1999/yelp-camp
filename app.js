const bodyParser = require("body-parser");
const passport = require("passport");
const mongoose = require("mongoose");
const express = require("express");
const path = require("path");

// Create the App
const app = express();

// DB Seeds File
const seedDB = require("./seeds");
seedDB();

// Express Routes
const indexRoutes = require("./routes/index");
const authenticationRoutes = require("./routes/authentication");
const campgroundRoutes = require("./routes/campgrounds");
const commentRoutes = require("./routes/comments");

// MongoDB Models
const User = require("./models/user");

// Passport Strategies
const LocalStrategy = require("passport-local");

// Connect to DB
mongoose.connect("mongodb://localhost/yelpcamp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

/**
 * 1. Tell Express to use the public directory to serve static files e.g. css, js, images, fonts
 * 2. Use the body-parser lib
 * 3. Use EJS as the templating/view engine (http://ejs.co/)
 */
app.use(express.static(path.join(__dirname, "/public"))); /* 1 */
app.use(bodyParser.urlencoded({ extended: true })); /* 2 */
app.set("view engine", "ejs"); /* 3 */

// AUTH Configuration
app.use(
  require("express-session")({
    secret: "DickIsTotallyTheBest",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Custom middleware to pass the user data through to the templates
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

// Routes
app.use("/", indexRoutes);
app.use("/", authenticationRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

// Start the server on port 3000
app.listen(3000, () =>
  console.log("The YelpCamp Server has Started on Port 3000")
);
