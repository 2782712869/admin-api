import { Router } from "express";
import { isAuthorized } from "@/middlewares"
import {
  newProduct,
  deleteProductById,
  updateProductById,
  getProductById,
  getAllProducts,
} from "@/controllers/products";

export const product = (router: Router) => {
  router.post('/product', isAuthorized, newProduct);
  router.delete('/product/:id', isAuthorized, deleteProductById);
  router.patch('/product/:id', isAuthorized, updateProductById);
  router.get('/product/:id', isAuthorized, getProductById);
  router.get('/products', isAuthorized, getAllProducts);
};
