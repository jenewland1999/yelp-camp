const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

mongoose.connect("mongodb://localhost/yelpcamp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// SCHEMA SETUP
const campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
});

const Campground = mongoose.model("Campground", campgroundSchema);

Campground.create(
  {
    name: "Granite Hill",
    image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo nam reprehenderit fugit, dolorem itaque libero ut hic neque fuga sit sed a dolore cupiditate quisquam, suscipit debitis, nostrum quis ex.",
  },
  (err, campground) => {
    if (err) {
      console.error(err);
    } else {
      console.log("New Campground, Created!");
      console.log(campground);
    }
  }
);

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
  Campground.findById(req.params.id, (err, campground) => {
    if (err) {
      console.error(err);
    } else {
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
