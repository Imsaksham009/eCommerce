const express = require("express");
const { createPaymentOrder, verifypayment } = require("../controllers/paymentController");

const router = express.Router();

router.post("/paymentorder", createPaymentOrder);
router.post("/paymentdone", verifypayment);

module.exports = router;