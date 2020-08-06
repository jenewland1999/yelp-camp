const express = require("express");
const router = express.Router();

// Index - Landing - GET
router.get("/", (req, res) => {
  res.render("landing", { title: "Home" });
});

module.exports = router;
