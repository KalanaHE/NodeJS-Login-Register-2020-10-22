const express = require("express");
const router = express.Router();
const {
  signup,
  signin,
  requireSignIn,
} = require("../../controllers/admin/auth");

router.post("/admin/signup", signup);

router.post("/admin/signin", signin);

module.exports = router;
