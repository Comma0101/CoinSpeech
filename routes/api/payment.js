const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

const User = require("../../models/User");
router.post("/", auth, async (req, res) => {
  try {
    let user = await User.findById(req.user.id);

    if (user) {
      console.log(req.body);
      user = await User.findByIdAndUpdate(req.user.id, {
        $inc: { coins: req.body.coins }
      });
      res.json(user);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
