const Campground = require("./models/campground");
const Comment = require("./models/comment");

const data = [
  {
    name: "Cloud's Rest",
    image: "https://source.unsplash.com/1920x1080/?campgrounds",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    name: "Desert Mesa",
    image: "https://source.unsplash.com/1920x1080/?camping",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    name: "Canyon Floor",
    image: "https://source.unsplash.com/1920x1080/?tent",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    name: "Rainbow Valley",
    image: "https://source.unsplash.com/1920x1080/?hiking",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
];

function seedDB() {
  // Remove all campgrounds
  Campground.deleteMany({}, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("Campgrounds removed");
      // Add a few campgrounds
      data.forEach((campground) => {
        Campground.create(campground, (err, campground) => {
          if (err) {
            console.error(err);
          } else {
            console.log("Campground added");
            // Create a comment
            Comment.create(
              {
                text: "This place is great, but needs more WiFi",
                author: "Homer",
              },
              (err, comment) => {
                if (err) {
                  console.error(err);
                } else {
                  campground.comments.push(comment);
                  campground.save();
                  console.log("Comment created");
                }
              }
            );
          }
        });
      });
    }
  });
}

module.exports = seedDB;
