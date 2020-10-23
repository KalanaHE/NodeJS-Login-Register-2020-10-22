const express = require("express");
const router = express.Router();
const {
  signup,
  signin,
  requireSignIn,
} = require("../../controllers/user/auth");

router.post("/signup", signup);

router.post("/signin", signin);

router.post("/profile", requireSignIn, (req, res) => {
  res.status(200).json({ message: "This is your profile", data: req.user });
});

module.exports = router;
