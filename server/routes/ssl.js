const express = require("express");
const router = express.Router();
const SSLCommerzPayment = require("sslcommerz-lts");

const store_id = 'oxfor65c0d724984dd';
const store_passwd = 'oxfor65c0d724984dd@ssl'
const is_live = false; //for live 

function generateTransactionId() {
  const timestamp = new Date().getTime().toString(); // Get current timestamp
  const randomString = Math.random().toString(36).substring(2, 8); // Generate random string
  return timestamp + "-" + randomString; // Concatenate timestamp and random string
}

router.get("/checkout", (req, res) => {
  const {
    amount,
    shipping_method,
    product_name,
    product_category,
    product_profile,
    cus_name,
    cus_email,
    cus_add1,
    cus_add2,
    cus_city,
    cus_state,
    cus_phone,
    ship_name,
    ship_add1,
    ship_add2,
    ship_city,
    ship_state,
  } = req.query;

  const data = {
    total_amount: amount,
    currency: "BDT",
    tran_id: generateTransactionId(),
    success_url: `http://localhost:8000/api/ssl/order-success`,
    fail_url: `http://localhost:8000/api/ssl/order-fail`,
    cancel_url: `http://localhost:8000/api/ssl/order-cancel`,
    ipn_url: `http://localhost:8000/api/ssl/order-ipn`,
    shipping_method: shipping_method,
    product_name: product_name,
    product_category: product_category,
    product_profile: product_profile,
    cus_name: cus_name,
    cus_email: cus_email,
    cus_add1: cus_add1,
    cus_add2: cus_add2,
    cus_city: cus_city,
    cus_state: cus_state,
    cus_postcode: "1000",
    cus_country: "Bangladesh",
    cus_phone: cus_phone,
    cus_fax: "01711111111",
    ship_name: ship_name,
    ship_add1: ship_add1,
    ship_add2: ship_add2,
    ship_city: ship_city,
    ship_state: ship_state,
    ship_postcode: 1000,
    ship_country: "Bangladesh",
  };
  const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
  sslcz.init(data).then((apiResponse) => {
    let GatewayPageURL = apiResponse.GatewayPageURL;
    res.status(200).send(GatewayPageURL)
  });
});

router.post("/order-success", (req, res) => {
  console.log("Redirect to your client success url");
});

router.post("/order-cancel", (req, res) => {
  console.log("Redirect to your client cancel url");
});

router.post("/order-fail", (req, res) => {
  console.log("Redirect to your client fail url");
});

router.post("/order-ipn", (req, res) => {
  console.log("Redirect to your client ipn url");
});

module.exports = router;
