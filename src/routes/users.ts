import { Router } from "express";
import { isAuthorized } from "@/middlewares"
import {
  deleteUserById,
  updateUserById,
  getUserById,
  getAllUsers,
} from "@/controllers/users";

export const user = (router: Router) => {
  router.delete('/user/:id', isAuthorized, deleteUserById);
  router.patch('/user/:id', isAuthorized, updateUserById);
  router.get('/user/:id', isAuthorized, getUserById);
  router.get('/users', isAuthorized, getAllUsers);
};
