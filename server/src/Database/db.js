import mongoose from "mongoose";

import dotenv from 'dotenv'

dotenv.config()
const MONGO_URI = process.env.MONGO_URI

const connectDB = async()=>{
    try{
        await mongoose.connect(MONGO_URI).then((data)=>{
            console.log(`MongoDB connected:`)
        })
    }
    catch(error)
    {
        console.log("Error connecting to MongoDB", error.message)
        process.exit(1)
    }
}

export {connectDB}