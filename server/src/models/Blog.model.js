import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        index:true,
    },
    content: {
        type: String,
        required: true,
        index:true,
    },
    status:{
        type: String,
        enum:["active","inactive"],
        default:"active"
    },
    details:[
        {
            title:{
                type:String,
               
            },
            description:{
                type: String,
               required:true
            },
            image:{
                type:String,    
                // required: true
            }
        }
    ],
    image: {
        type: String,
        required: true
    },
    author:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
   

},{timestamps:true}
)

export default mongoose.model("Blog", blogSchema)


