const User = require("../models/user");
const jwt = require("jsonwebtoken");

exports.signup = (req, res) => {
  User.findOne({ email: req.body.email }).exec((err, user) => {
    if (user) {
      return res.status(400).json({ message: "email already registered!" });
    }

    const { firstname, lastname, username, email, password } = req.body;
    const _user = new User({ firstname, lastname, email, password, username });

    _user.save((error, data) => {
      if (error) {
        return res.status(400).json({ message: "Something went wrong!" });
      }

      if (data) {
        return res.status(400).json({ message: "User Created Successfully" });
      }
    });
  });
};

exports.signin = (req, res) => {
  User.findOne({ email: req.body.email }).exec((err, user) => {
    if (err) return res.status(400).json({ error });
    if (user) {
      if (user.authenticate(req.body.password)) {
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });

        const { firstname, lastname, email, role } = user;

        res.status(200).json({
          token,
          firstname,
          lastname,
          email,
          role,
        });
      }
    } else {
      return res.status(400).json({ message: "Something went wrong!" });
    }
  });
};
