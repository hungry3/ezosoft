import mongoose from "mongoose";

const SubscriptionPlanSchema =  new mongoose.Schema({
    planName :{
       type:String,
       required:true,
       enum:['Single User',"Custom Team"]
    },
    duration:{
        type:String,
        required:true,
        enum:["Monthly","yearly"]
    },
    price:{
        type:Number,
        required:true
    },
    description:{
        type:String
    },
    details: [
      {
        icon: {
          type: String,
          required: true,
        },
        title: {
          type: String, 

          required: true,
        },
      },
    ],


    customTeamOptions:{
        type: [
            {
              userCount: {
                type: Number,
                required: true, 
              },
              pricePerUser: {
                type: Number,
                required: true,
              },
              discount: {
                type: Number,
                default: 0, 
              },
            },
          ],
          required: function () {
            return this.planName === 'Custom Team';
          },
    }
})

const SubscriptionPlan = mongoose.model("SubscriptionPlan",SubscriptionPlanSchema)

export default  SubscriptionPlan;