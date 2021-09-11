const express = require("express");
const router = express.Router();
const Cart = require("../models/cart");
const jwt = require("jsonwebtoken");

router.post("/cartitems", (req, res) => {
  const token = req.body.token;
  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err || !payload) {
      return res.json({ err: "You must be Logged IN" });
    } else {
      const { _id } = payload;
      Cart.find({ addedby: _id }).exec((err, user) => {
        if (err) {
          return res.json({ err });
        } else {
          return res.json({ user });
        }
      });
    }
  });
});

router.post("/addtocart", (req, res) => {
  const token = req.body.token;
  let quantity = 1;
  if (req.body.quantity) {
    quantity = req.body.quantity;
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err || !payload) {
      return res.json({ err: "You must be Logged IN" });
    } else {
      const { _id } = payload;
      const cart = new Cart({
        name: req.body.name,
        url: req.body.url,
        price: req.body.price,
        quantity,
        addedby: _id,
        productId: req.body.productId,
      });
      cart.save((err, user) => {
        if (err || !user) {
          return res.json({ err });
        } else {
          return res.json({ user });
        }
      });
    }
  });
});

router.delete("/deletefromcart", (req, res) => {
  const token = req.body.token;
  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err || !payload) {
      return res.json({ err: "You must be Logged IN" });
    } else {
      Cart.deleteOne({ productId: req.body.productId }).exec((err, user) => {
        if (err || !user) {
          return res.json({ err });
        } else {
          return res.json({ user });
        }
      });
    }
  });
});

module.exports = router;
