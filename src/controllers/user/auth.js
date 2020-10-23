const User = require("../../models/user");
const jwt = require("jsonwebtoken");

const { response } = require("../../helpers/response.helper");

exports.signup = (req, res) => {
  User.findOne({ email: req.body.email }).exec((err, user) => {
    if (user) {
      return response(
        req,
        res,
        400,
        {},
        { message: "User already registered!" }
      );
    }

    const { firstname, lastname, username, email, password } = req.body;
    const _user = new User({ firstname, lastname, email, password, username });

    _user.save((error, data) => {
      if (error) {
        return response(
          req,
          res,
          400,
          {},
          { message: "Something went wrong!", info: error.errors }
        );
      }

      if (data) {
        return response(
          req,
          res,
          200,
          { message: "User Created Successfully" },
          {}
        );
      }
    });
  });
};

exports.signin = (req, res) => {
  User.findOne({ email: req.body.email }).exec((err, user) => {
    if (err) return response(req, res, 400, {}, { err });
    if (user) {
      if (user.authenticate(req.body.password)) {
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });

        const { _id, firstname, lastname, email, role } = user;

        return response(
          req,
          res,
          200,
          {
            token,
            user: { _id, email, firstname, lastname, role },
          },
          {}
        );
      } else {
        return response(req, res, 400, {}, { message: "Invalid Password!" });
      }
    } else {
      return response(
        req,
        res,
        400,
        {},
        { message: "User not found, Please Register first!" }
      );
    }
  });
};

exports.requireSignIn = (req, res, next) => {
  if (!req.headers.authorization) {
    return response(req, res, 400, {}, { message: "Token must be provided!" });
  } else {
    const token = req.headers.authorization.split(" ")[1];
    try {
      const user = jwt.verify(token, process.env.JWT_SECRET);
      req.user = user;
      next();
    } catch (e) {
      return response(
        req,
        res,
        400,
        {},
        { message: "Invalid token!", info: e }
      );
    }
  }
};
