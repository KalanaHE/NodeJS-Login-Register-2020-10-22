const User = require("../../models/user");
const jwt = require("jsonwebtoken");

exports.signup = (req, res) => {
  User.findOne({ email: req.body.email }).exec((err, user) => {
    if (user) {
      return res.status(400).json({ message: "User already registered!" });
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

        const { _id, firstname, lastname, email, role } = user;

        res.status(200).json({
          token,
          user: { _id, email, firstname, lastname, role },
        });
      } else {
        return res.status(400).json({ message: "Invalid Password!" });
      }
    } else {
      return res
        .status(400)
        .json({ message: "User not found, Please Register first!" });
    }
  });
};

exports.requireSignIn = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(400).json({ message: "Token must be provided!" });
  } else {
    const token = req.headers.authorization.split(" ")[1];
    try {
      const user = jwt.verify(token, process.env.JWT_SECRET);
      req.user = user;
      next();
      console.log("verified");
    } catch (e) {
      res.status(400).json({ message: "Invalid token!", errors: e });
    }
  }
};
