const User = require("../models/user");

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
