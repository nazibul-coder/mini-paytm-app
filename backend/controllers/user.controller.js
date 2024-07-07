import { User } from "../models/auth.model.js"

const userDetails = async (req, res, next) => {
    const limit = req.query.limit || 0
    const sortDirection = req.query.order == 'asc' ? 1 : -1
    try {
        const users=await User.find({}).sort({updatedAt:sortDirection}).limit(limit)
        res.status(200).json(users)
    } catch (error) {
        console.log(error);
    }
}

const userDetail=async(req,res,next)=>{
    const {userId}=req.params
    try {
        const user=await User.find({_id:userId})
        res.status(200).json(user)
    } catch (error) {
        next(error)
    }
}
export {
    userDetails,
    userDetail
}