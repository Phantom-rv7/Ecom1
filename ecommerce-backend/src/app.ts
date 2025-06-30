import express from 'express';
import { connectDB } from './utils/feautures.js';
import { errorMiddleware } from './middlewares/error.js';
import  NodeCache  from 'node-cache'
import { config } from "dotenv"
import dotenv from "dotenv";
import morgan from "morgan"
import Stripe from "stripe"

//Importing Routes
import userRoutes from "./routes/user.js";
import productRoute from "./routes/products.js"
import orderRoute from "./routes/order.js"
import paymentRoute from "./routes/payment.js"
import dashboardRoute from "./routes/stats.js"

import cors from "cors"
import mongoose from 'mongoose';

dotenv.config({
  path:"./.env",
})

const PORT = 4000;
// const PORT = process.env.PORT || 4000;             
const mongoURI = process.env.MONGO_URI || "";
const stripeKey = process.env.STRIPE_KEY || "";
// const stripeKey = "k_test_51R0FWXFZaGU9Lj77oerKlYotjOHG5brBlkeLMd4KLZhjcCaJhGxpMlmSxit45EiSq951oCWJtY9FMpdAhmFGkGtn00u02IEy5X"

connectDB(mongoURI);



// connectDB();



export const stripe = new Stripe(stripeKey);
export const myCache = new NodeCache();

const app = express(); 

app.use(express.json())
app.use(morgan("dev"));
app.use(cors())

app.get("/",(req,res) => {                                   
  res.send("API working with /api/v1");
})

//Using Routes
app.use("/api/v1/user",userRoutes);
app.use("/api/v1/product",productRoute);
app.use("/api/v1/order",orderRoute);
app.use("/api/v1/payment",paymentRoute);
app.use("/api/v1/dashboard",dashboardRoute);

app.use("/uploads",express.static("upload"))
app.use(errorMiddleware)

app.listen(PORT,() => {
  console.log(`Express is working on http://localhost:${PORT}`);
})



