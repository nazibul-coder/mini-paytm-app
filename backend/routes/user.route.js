import express from "express"
import { userDetail, userDetails } from "../controllers/user.controller.js"

const router=express.Router()

router.get('/users',userDetails)
router.get('/user/:userId',userDetail)

export default router