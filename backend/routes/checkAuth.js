const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Users = require("../models/users");
router.post("/checkState", (req, res) => {
  const token = req.body.token;
  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) {
      return res.json({ err: "You must be Logged IN" });
    }
    const { _id } = payload;
    Users.findById(_id).exec((err, user) => {
      if (!user || err) {
        return res.json({ err: "error2" });
      }
      return res.json(user);
    });
  });
});

module.exports = router;
