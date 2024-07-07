import express from "express"
import { sendMoneyController } from "../controllers/transaction.controller.js"
import { verifyToken } from "../utills/verifyUser.js"

const router=express.Router()

router.post('/transferfund/:toAccountId',verifyToken,sendMoneyController)
export default router