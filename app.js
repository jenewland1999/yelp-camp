const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

const campgrounds = [
  {
    name: "Salmon Creek",
    image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg",
  },
  {
    name: "Granite Hill",
    image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg",
  },
  {
    name: "Mountain Goat's Rest",
    image: "https://farm7.staticflickr.com/6057/6234565071_4d20668bbd.jpg",
  },
  {
    name: "Salmon Creek",
    image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg",
  },
  {
    name: "Granite Hill",
    image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg",
  },
  {
    name: "Mountain Goat's Rest",
    image: "https://farm7.staticflickr.com/6057/6234565071_4d20668bbd.jpg",
  },
  {
    name: "Salmon Creek",
    image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg",
  },
  {
    name: "Granite Hill",
    image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg",
  },
  {
    name: "Mountain Goat's Rest",
    image: "https://farm7.staticflickr.com/6057/6234565071_4d20668bbd.jpg",
  },
];

app.get("/", (req, res) => {
  // res.send('This is the homepage of YelpCamp.')
  res.render("index", { title: "Home" });
});

app.get("/campgrounds", (req, res) => {
  res.render("campgrounds", { title: "Campgrounds", campgrounds: campgrounds });
});

app.post("/campgrounds", (req, res) => {
  // take the form data and push a new campground to the campgrounds array
  let name = req.body.name;
  let image = req.body.image;
  let newCampground = { name: name, image: image };
  campgrounds.push(newCampground);

  // redirect back to the campgrounds page
  res.redirect("/campgrounds");
});

app.get("/campgrounds/new", (req, res) => {
  res.render("new", { title: "Campgrounds - New" });
});

app.listen(3000, () => {
  console.log("The YelpCamp Server has Started on Port 3000");
});
