const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const auth = require("./middleware/auth");
const bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
// respond with "hello world" when a GET request is made to the homepage
router.get("/", function(req, res) {
  res.send("hello world");
});
router.post("/", async (req, res) => {
  console.log(req.body.email);
});

module.exports = router;
