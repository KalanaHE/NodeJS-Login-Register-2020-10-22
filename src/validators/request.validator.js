const { check, validationResult } = require("express-validator");
const { response } = require("../helpers/response.helper");

exports.signupvalidator = [
  check("firstname").notEmpty().withMessage("Firstname is required!"),
  check("lastname").notEmpty().withMessage("Lastname is required!"),
  check("username").notEmpty().withMessage("Username is required!"),

  check("email").notEmpty().withMessage("Email is required!"),
  check("email").isEmail().withMessage("Enter a valid email!"),

  check("password").notEmpty().withMessage("Password is required!"),
  check("password")
    .isLength({ min: 4 })
    .withMessage("Password must be at least 2 characters long!"),
];

exports.signinvalidator = [
  check("email").notEmpty().withMessage("Email is required!"),
  check("email").isEmail().withMessage("Enter a valid email!"),

  check("password").notEmpty().withMessage("Password is required!"),
  check("password")
    .isLength({ min: 4 })
    .withMessage("Password must be at least 2 characters long!"),
];

exports.isRequestValidated = async (req, res, next) => {
  const errors = validationResult(req);

  const filtered = await errors.errors.map((error) => {
    return error.msg;
  });

  if (errors.array().length > 0) {
    return response(req, res, 400, {}, { info: filtered });
  } else {
    next();
  }
};
