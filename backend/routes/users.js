const Users = require("../models/users");
var jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();

router.post("/signup", (req, res) => {
  const user = new Users(req.body);
  user.save((err, user) => {
    if (err || !user) {
      return res.json({ err: err });
    } else {
      res.json({ message: "Success" });
    }
  });
});

router.post("/signin", (req, res) => {
  const signupUID = req.body.signupUID;
  Users.findOne({ signupUID }).exec((err, user) => {
    if (err || !user) {
      return res.json({ err: "Something Went Wrong!" });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.json({
      name: user.name,
      role: user.role,
      message: "Success",
      token,
    });
  });
});

module.exports = router;
