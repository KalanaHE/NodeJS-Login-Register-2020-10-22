const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const {
  signup,
  signin,
  requireSignIn,
} = require("../../controllers/user/auth");
const { response } = require("../../helpers/response.helper");
const {
  signupvalidator,
  isRequestValidated,
} = require("../../validators/signup.validator");

router.post("/signup", signupvalidator, isRequestValidated, signup);

router.post("/signin", signin);

router.post("/profile", requireSignIn, (req, res) => {
  response(
    req,
    res,
    200,
    { message: "This is your profile", data: req.user },
    {}
  );
});

module.exports = router;
