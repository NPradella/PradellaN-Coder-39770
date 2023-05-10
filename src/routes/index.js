import { Router } from "express"
import products_router from "./api/products.router.js"
import carts_router from "./api/carts.router.js"

const router = Router()

router.use('/api/products',products_router)
router.use('/api/carts',carts_router)

export default router