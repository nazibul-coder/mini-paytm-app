import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import { dbConnection } from "./dbConnection.js"
import authRoute from "./routes/auth.route.js"
import userRouter from "./routes/user.route.js"
import moneyTransferRouter from "./routes/transcation.route.js"

const app=express()

app.use(cors({origin:'http://localhost:5173',credentials:true}))
app.use(cookieParser())
app.use(express.json())
app.use('/api/v1',authRoute)
app.use('/api/v1',userRouter)
app.use('/api/v1',moneyTransferRouter)

dbConnection()
        .then(()=>{
            app.listen(3000,()=>{
                console.log('Server is running at port 3000');
            })
        })
        .catch((err)=>{
            console.log("Something went wrong",err);
            process.exit(1)
        })
app.use((error,req,res,next)=>{
    const statusCode=error.status|| 500
    const message=error.message || "Something went wrong"
    res.status(statusCode).json({
        statusCode,message
    })
})