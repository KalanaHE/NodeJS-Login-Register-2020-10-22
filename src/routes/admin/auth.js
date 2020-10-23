const express = require("express");
const router = express.Router();
const {
  signup,
  signin,
  requireSignIn,
} = require("../../controllers/admin/auth");

router.post("/signup", signup);

router.post("/signin", signin);

module.exports = router;
