import mongoose from "mongoose";

const dbConnection=async()=>{
    try {
        const connection=await mongoose.connect('mongodb+srv://nazibul:nazibul@paytm.zetmajx.mongodb.net/paytmDB?retryWrites=true&w=majority&appName=paytm')
        const res= connection.connection.name
        console.log("MongoDb Connection is successfull & db name is",res);
    } catch (error) {
        console.log("MongoDB connection error",error);
        throw error
    }
}

export {dbConnection}