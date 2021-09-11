const express = require("express");
const router = express.Router();
const Products = require("../models/products");
const jwt = require("jsonwebtoken");

router.post("/addproduct", (req, res) => {
  // const data = new Products(req.body);
  const { name, sellername, stock, imageurl, price, description } = req.body;
  const data = new Products({
    name,
    sellername,
    stock,
    imageurl,
    price,
    description,
  });
  const token = req.body.token;
  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err || !payload) {
      return res.json({ err: "You must be Logged IN" });
    } else {
      data.save((err, user) => {
        if (err || !user) {
          return res.json({ err: "error" });
        }
        return res.json({ success: "success" });
      });
    }
  });
});

router.post("/allproducts", (req, res) => {
  const { startIndex } = req.body;

  Products.find()
    .limit(8)
    .skip(startIndex)
    .exec((err, user) => {
      if (err || !user) {
        return res.json({ err: "Error" });
      }
      return res.json({ user });
    });
});

router.post("/getallproducts", (req, res) => {
  const token = req.body.token;
  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err || !payload) {
      return res.json({ err: "You must be Logged IN" });
    } else {
      Products.find().exec((err, user) => {
        if (err) {
          return res.json({ err });
        }
        return res.json({ user });
      });
    }
  });
});

router.post("/getproductDetails", (req, res) => {
  const id = req.body.id;
  const token = req.body.token;
  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err || !payload) {
      return res.json({ err: "You must be Logged IN" });
    } else {
      Products.findById({ _id: id }).exec((err, user) => {
        if (err || !user) {
          return res.json({ err: err });
        } else {
          return res.json({ user });
        }
      });
    }
  });
});

router.put("/update", (req, res) => {
  const { id, name, sellername, stock, imageurl, price, description } =
    req.body;
  const token = req.body.token;
  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err || !payload) {
      return res.json({ err: "You must be Logged IN" });
    } else {
      Products.findByIdAndUpdate(
        id,
        {
          name,
          sellername,
          stock,
          imageurl,
          price,
          description,
        },
        (err, user) => {
          if (err || !user) {
            return res.json({ err: "error" });
          }
          return res.json({ success: "success" });
        }
      );
    }
  });
});

router.delete("/delete", (req, res) => {
  const token = req.body.token;
  const id = req.body.id;
  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err || !payload) {
      return res.json({ err: "You must be Logged IN" });
    } else {
      Products.deleteOne({ _id: id }).exec((err, user) => {
        if (err || !user) {
          return res.json({ err: err });
        } else {
          return res.json({ user });
        }
      });
    }
  });
});

module.exports = router;
