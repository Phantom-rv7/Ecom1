import express from "express";
import { adminOnly } from "../middlewares/auth.js";
import { allCoupons, appplyDiscount, createPaymentIntent, deleteCoupon, newCoupon } from "../controllers/payment.js";
 
const app = express.Router();

//route * /api/v1/payment/create
app.post("/create",createPaymentIntent);

//route * /api/v1/payment/coupon/new
app.get("/discount",appplyDiscount);

//route * /api/v1/payment/coupon/new
app.post("/coupon/new",adminOnly ,newCoupon);

//route * /api/v1/payment/coupon/all
app.get("/coupon/all",adminOnly, allCoupons);

// //route * /api/v1/payment/coupon/id
app.delete("/coupon/:id",adminOnly ,deleteCoupon);

export default app;

