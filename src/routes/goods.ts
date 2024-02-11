import { Router } from "express";
import { isAuthorized } from "@/middlewares"
import {
  newGoods,
  deleteGoodsById,
  updateGoodsById,
  getGoodsById,
  getAllGoods,
} from "@/controllers/goods";

export const goods = (router: Router) => {
  router.post('/goods', isAuthorized, newGoods);
  router.delete('/goods/:id', isAuthorized, deleteGoodsById);
  router.patch('/goods/:id', isAuthorized, updateGoodsById);
  router.get('/goods/:id', isAuthorized, getGoodsById);
  router.get('/goods', isAuthorized, getAllGoods);
};
