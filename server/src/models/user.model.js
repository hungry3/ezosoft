import mongoose,{Schema} from "mongoose";
import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { type } from "os";
// import { resetPassword } from "../controllers/auth.controller";

const emailPattern =  /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

const userSchema =  new mongoose.Schema(
    {
        firstName:{
            type:String,
            required:[true,"Please enter your name"],
        },
        lastName:{
            type:String,
            required:[true,"Please enter your name"],
        },
        email:{
            type:String,
            required:[true,"Please enter your email"],
            unique:true,
            match:emailPattern,

        },
        companyName:{
            type:String,
            // required:[true,"Please enter your company name"],
        },
        phone:{
            type:String
        },
        password:{
            type:String,
            required:[true,"Please enter your password"],
            minlength:6,
            select:false,
        },
        resetPasswordToken:String,
        resetPasswordExpire:Date,
        role:{
            type:String,
            enum:['user','admin'],
            default:'user'
        },
        subcription:{
            type:String,
            enum:['free','basic','premium','custom'],
            default:'free',
        },
        stripeCustomerId:{
            type:String
        },
        subscriptionStatus:{
            type:String,
            enum:["active", "trial", "expired"],
           default:'trial',
        },
        trialStartDate:{
            type:Date,
            default:Date.now,
        }, 
        trialEndDate:{
            type:Date,
            default: function (){
                const trialPeriod =14;
                return new Date(Date.now() + trialPeriod * 24 * 60 *60 *1000)
            },
        },
        subscriptionPlan: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'SubscriptionPlan',
        },
          subscriptionStartDate: {
            type: Date,
            default: function() {
                return this.subscriptionPlan ? new Date() : null;
            },
        },
        subscriptionEndDate: {
            type: Date,
            default: function() {
                if (this.subscriptionPlan) {
                    const now = new Date();
                    if (this.subscriptionPlan.duration === 'Monthly') {
                        return new Date(now.setMonth(now.getMonth() + 1));
                    } else if (this.subscriptionPlan.duration === 'Yearly') {
                        return new Date(now.setFullYear(now.getFullYear() + 1));
                    }
                }
                return null;
            },
        },
        team: [{
            memberId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            role: { type: String, default: 'member' }
          }],
    },


    {timestamps:true} 
)
userSchema.pre('save', async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password,10)
    }
    next()
});
userSchema.methods.SignAccessToken = function(){
    const token = jwt.sign(
            { id: this._id, role: this.role }, 
            process.env.JWT_SECRET, 
            { expiresIn: "1h" } 
        );
    return token
}
//! refresh token 
userSchema.methods.SignRefreshToken = function(){
    const refreshToken = jwt.sign(
        {id:this._id},
        process.env.JWT_REFRESH_SECRET,
        {expiresIn:"7d"}
    );
    return refreshToken
};
userSchema.methods.comparePassword = async function(enterPassword){
    return await bcrypt.compare(enterPassword,this.password)
};

// reset password

userSchema.methods.getResetPasswordToken= function(){
    const resetToken =crypto.randomBytes(20).toString("hex")

    this.resetPasswordToken =  crypto.createHash('sha256').update(resetToken)
    this.resetPasswordExpire =  Date.now() + 10* 60 * 1000 //! 10 minutes
    return resetToken
}

userSchema.index({email:1});
userSchema.index({resetPassword:1})

const User = mongoose.model("User", userSchema)
export default User