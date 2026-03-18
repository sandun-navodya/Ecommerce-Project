import express from "express";
import Product from "../models/products.js";
import { createProduct, deleteProduct, getProductById, getProducts, updateProduct } from "../controllers/productController.js";
import authUser from "../middlwares/authentication.js";

const productRouter = express.Router();

productRouter.post('/', authUser, createProduct); // Admin only route to create product
productRouter.get('/', getProducts);
productRouter.delete('/:productId', deleteProduct);
productRouter.put('/:productId', updateProduct);
productRouter.get('/:productId', getProductById);


export default productRouter;