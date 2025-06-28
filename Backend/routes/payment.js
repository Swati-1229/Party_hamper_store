const express = require('express');
const Razorpay = require("razorpay")
const route_p = express.Router();
const crypto = require("crypto");
const Payment = require('../models/Payment');
// import crypto from "node:crypto"

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID
    ,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
})
route_p.post('/orders', (req, res) => {
    const { amount } = req.body;
    try {
        const options = {
            amount: Number(amount * 100),
            currency: "INR",
            receipt: "order_rcptid_11"
        }

        razorpay.orders.create(options, (error, order) => {
            if (error) {
                console.log("ERROR", error);
                return res.status(500).json({ message: "something went wrong!" });
            }
            res.status(200).json({ key: process.env.RAZORPAY_KEY_ID, order: order });
            console.log("order", order)
        })
    } catch (error) {
        console.log("ERROR", error)
    }
})

route_p.post("/verify-payment", async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    try {
        // create Sign
        const sign = razorpay_order_id + "|" + razorpay_payment_id

        const secret = process.env.RAZORPAY_KEY_SECRET;

        const generated_signature = crypto
            .createHmac("sha256", secret)
            .update(sign.toString())
            .digest("hex");
        console.log(generated_signature === razorpay_signature)

        const isAuthentic = generated_signature === razorpay_signature;
        if (isAuthentic) {
            const payment = new Payment({
                razorpay_order_id,
                razorpay_payment_id,
                razorpay_signature
            })
            await payment.save()
            // ✅ Payment is verified
            res.status(200).json({ success: true, message: "Payment verified successfully" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Invalid signature, payment not verified" });

    }
});



route_p.get('/get', (req, res) => {
    res.json("payment Details");
})


module.exports = route_p;