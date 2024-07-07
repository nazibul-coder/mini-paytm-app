import { User } from "../models/auth.model.js"
import { Account } from "../models/account.model.js";

const signUp = async (req, res, next) => {
    try {
        const { username, email, password, balance } = req.body
        if (!username || !email || !password || username.trim() === "" || email.trim() === "" || password.trim() === "") {
            return res.status(400).json({ message: "All fields are mandatory" });
        }
        const existingUser = await User.findOne({
            $or: [{ username }, { email }]
        })
        if (existingUser) {
            return res.status(400).json("User with email or username already exists")
        }
        const user = await User.create({
            username: username.toLowerCase(), email, password
        })
        const userBlance = await Account.create({
            userId: user._id, account: balance || 0
        })
        const createdUser = await User.findById(user._id).select('-password')
        return res.status(200).json({ createdUser, userBlance })
    } catch (error) {
        next(error)
    }
}

const signIn = async (req, res, next) => {
    try {
        const { email, password } = req.body
        if (!email || !password || email.trim() == "" || password.trim() == "") {
            return res.status(400).json("All fields are mendatory")
        }
        const existingUser = await User.findOne({ email })

        if (!existingUser) {
            return res.status(404).json("User does not exist")
        }
        const isPasswordValid = await existingUser.isPasswordCorrect(password)
        if (!isPasswordValid) {
            return res.status(403).json("Password is not corrct")
        }
        const accountBalance = await Account.findOne({ userId: existingUser._id })
        const accessToken=await existingUser.generateAccessToken()
        await existingUser.save({validateBeforeSave:false})
        const { password: pass, ...rest } = existingUser._doc
        res.status(200).cookie('token',accessToken,{httpOnly:true,secure:true}).json({ rest, "totalbalance": accountBalance.account,accessToken})
    } catch (error) {
        next(error)
    }
}

export {
    signUp,
    signIn
}