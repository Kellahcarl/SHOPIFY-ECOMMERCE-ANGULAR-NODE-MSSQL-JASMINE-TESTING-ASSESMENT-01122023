import { Router } from "express";
import { verifyToken } from "../middleware/verifyToken";
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from "../controllers/productsController";



const product_router = Router()

product_router.get("/", verifyToken, getProducts);
product_router.post("/", verifyToken, createProduct);
product_router.put("/", verifyToken, updateProduct);
product_router.get("/:product_id", verifyToken, getProduct);
product_router.delete("/:product_id", verifyToken, deleteProduct);

export default product_router;