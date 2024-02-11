import { Router } from "express"
import { adminLogin, register } from "@/controllers/auth"

export const adminAuth = (router: Router) => {
  router.post('/auth/login', adminLogin)
}

export const clientAuth = (router: Router) => {
  router.post('/auth/register', register)
}
