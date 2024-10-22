import mongoose from "mongoose";


const blogCategorySchema = new mongoose.Schema({
    name:{
        type:String,
        lowercase: true,
        unique:true,
    },

},
{timestamps:true}
// {
//     timestamps:true
// }

)

 const BlogCategory = mongoose.model('BlogCategory',blogCategorySchema)

export default BlogCategory