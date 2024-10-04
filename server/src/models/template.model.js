import mongoose from "mongoose";

const templateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        index:true,
    },
    description: {
        type: String,
        required: true,
        index:true,
    },
    avatar:{
        type: String,
        required: true,
        default: 'https://via.placeholder.com/150'
    },
    templates:[{
        templateTitle:{ 
            type: String,
            required: true,
            index:true,
        },
        templateContent:{
            type: String,
            required: true
        },
        templateImage:{
            type: String,
            required: true
        },
        templatePageImage: [{
            type: String,
        }],
        templateUrl:{
            type: String,
            required: true
        }
    }],
    category:{
        type:String,
        required: true
    }
},
{
    timestamps:true
})
templateSchema.index({
    name:'text',
    description:"text",
    'templates.templateTitle':'text'
})


const Template = mongoose.model("Template", templateSchema);

export default Template