import express from "express";
import { deleteProduct, getAdminProducts, getAllCategories, getAllProducts, getlatestProducts, getSingleProduct, newProduct, updateProduct } from "../controllers/product.js";
import { singleUpload } from "../middlewares/multer.js";
import { adminOnly } from "../middlewares/auth.js";
 
const app = express.Router();

//Create New Product - /api/v1/product/new
app.post( "/new", adminOnly , singleUpload , newProduct )

//To get all products with filter- /api/v1/product/all
app.get("/all", getAllProducts)

//To get last 10 products - /api/v1/product/latest
app.get("/latest", getlatestProducts)

//To get all unique categories - /api/v1/product/categories
app.get("/categories", getAllCategories)

//To get all Products - /api/v1/product/admin-products
app.get("/admin-products", getAdminProducts)

//to get update, delete of Product
app
  .route("/:id")
  .get(getSingleProduct)
  .put(adminOnly, singleUpload,updateProduct)
  .delete(deleteProduct)
  
app.route("/:id").get(getSingleProduct)

export default app;

