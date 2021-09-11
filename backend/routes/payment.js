const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE);
const { v4: uuidv4 } = require("uuid");
var braintree = require("braintree");
router.post("/stripe", (req, res) => {
  const { token, email, price, name, phone, address, pin, state } = req.body;
  // console.log(token, price, name, phone, address, pin, state);
  const idempotencyKey = uuidv4();
  return stripe.customers
    .create({
      email: token.email,
      source: token.id,
    })
    .then(
      (customer) => {
        stripe.charges.create({
          amount: parseInt(price) * 100,
          currency: "inr",
          customer: customer.id,
          receipt_email: token.email,
        });
      },
      { idempotencyKey }
    )
    .then((result) => res.json({ result, msg: "Order Successful" }))
    .catch((err) => console.log(err));
});

var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.MERCHANT_ID,
  publicKey: process.env.PUBLIC_KEY,
  privateKey: process.env.SECRET_KEY,
});

router.get("/paypal", (req, res) => {
  gateway.clientToken.generate({}, (err, data) => {
    if (err) {
      return res.json({ err });
    } else {
      return res.json({ data });
    }
  });
});

router.post("/paypalPayment", (req, res) => {
  let nonce = req.body.nonce;
  let amount = req.body.amount;
  gateway.transaction.sale(
    {
      amount: amount,
      paymentMethodNonce: nonce,
      options: {
        submitForSettlement: true,
      },
    },
    (err, res) => {
      if (err) {
        return res.json({ err });
      } else {
        return res.json({ res });
      }
    }
  );
});

module.exports = router;
