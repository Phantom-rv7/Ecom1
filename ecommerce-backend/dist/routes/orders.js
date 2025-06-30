import express from "express";
import { adminOnly } from "../middlewares/auth.js";
import { allOrders, myOrders, newOrder } from "../controllers/orders.js";
const app = express.Router();
//route * /api/v1/order/new
app.post("/new", newOrder);
//route * /api/v1/order/my
app.get("/my", myOrders);
//route * /api/v1/order/all
app.get("/all", adminOnly, allOrders);
export default app;
