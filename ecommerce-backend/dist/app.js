import express from 'express';
import { connectDB } from './utils/feautures.js';
import { errorMiddleware } from './middlewares/error.js';
import NodeCache from 'node-cache';
import { config } from "dotenv";
import morgan from "morgan";
import Stripe from "stripe";
//Importing Routes
import userRoutes from "./routes/user.js";
import productRoute from "./routes/products.js";
import orderRoute from "./routes/order.js";
import paymentRoute from "./routes/payment.js";
import dashboardRoute from "./routes/stats.js";
import cors from "cors";
import dotenv from 'dotenv'
dotenv.config({
    path: "./.env",
});
const port = process.env.PORT || 4000;
const mongoURI = process.env.MONGO_URI || "";
const stripeKey = process.env.STRIPE_KEY || "";
console.log(mongoURI);
connectDB();
dotenv.config();
console.log(process.env.YOUR_ENV_VARIABLE);
export const stripe = new Stripe(stripeKey);
export const myCache = new NodeCache();
const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.get("/", (req, res) => {
    res.send("API working with /api/v1");
});
//Using Routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/order", orderRoute);
app.use("/api/v1/payment", paymentRoute);
app.use("/api/v1/dashboard", dashboardRoute);
app.use("/uploads", express.static("upload"));
app.use('/uploads', express.static('uploads'));

app.use(errorMiddleware);
app.listen(port, () => {
    console.log(`Express is working on http://localhost:${port}`);
});

