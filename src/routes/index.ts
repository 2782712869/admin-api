import { Router } from "express"
import { adminAuth, clientAuth } from "./auth"
import { product } from "./products"
import { user } from "./users"
import { goods } from "./goods"

const adminRouter = Router()
const clientRouter = Router()

export const admin = () => {
  adminAuth(adminRouter)
  product(adminRouter)
  user(adminRouter)
  goods(adminRouter)

  return adminRouter
}

export const client = () => {
  clientAuth(clientRouter)

  return clientRouter
}
