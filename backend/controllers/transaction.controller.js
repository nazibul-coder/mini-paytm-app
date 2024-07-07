import { Account } from "../models/account.model.js";

const sendMoneyController = async (req,res,next) => {
    const amount = parseInt(req.body.amount)
    const {toAccountId}=req.params
    if (!toAccountId || !amount) {
        return res.status(400).json({ message: "All fields are mandatory" });
    }
    let x=req.user
    // console.log(x);
    try {
        const a=await Account.find({userId: x.id})
        // console.log(a);
        if(!a){
            return res.status(404).json("User not found")
        }
        if(a[0].account<amount){
            return res.status(400).json("Insufficient balance")
        }
        const p=await Account.findOneAndUpdate({userId:x.id},{$inc:{account:-amount}},{new:true})
        const q=await Account.findOneAndUpdate({userId:toAccountId},{$inc:{account:amount}},{new:true})
        console.log(p);
        console.log(q);
        res.status(200).json("Transaction is successfull")
    } catch (error) {
        next(error)
    }
}

export { sendMoneyController }