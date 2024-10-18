import User from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ErrorHandler } from "../utils/ErrorHandler.js";
import { accessTokenOptions, refreshTokenOptions, sendToken } from "../utils/jwt.js";
import bcrypt from 'bcryptjs'
import sendEmail from "../utils/sendMail.js";
import { checkUserSubscription } from "../middleware/subscriptionStatus.middleware.js";
import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken'

const registerUser  =  asyncHandler(async(req,res,next)=>{
    try{
        const {firstName,lastName,email,password,companyName,phone} = req.body;
        if(
            [firstName,lastName,email,password].some((field)=> field?.trim()==="")
        )
        {
            return next(new ErrorHandler("All fields are required",400));
        }
        const isEmailExist = await User.findOne({email})
        if(isEmailExist){
            return next(new ErrorHandler("Email already exist",400));
        }

   const user = await User.create({
    firstName,email,password,lastName,companyName,phone
   })

   const createdUser = await User.findById(user._id).select("-password -refreshtoken")
   if(!user){
    return next(new ErrorHandler("Faild to register user",500))
   }
   res.status(201).json( new ApiResponse(201,createdUser,"user register"))

    }
    catch (error){
        return  next(new ErrorHandler(error.message,500))
  
    }
})

//?  login user

const LoginUser = asyncHandler(async(req,res,next)=>{
    try{
        const {email,password} = req.body;
        if( !email || !password ) {
            return next (new ErrorHandler("please enter email and password", 400))
        }

        const user = await User.findOne({email}).select("+password");
        if(!user){
            return next (new ErrorHandler("Invalid Email or Password",401))
        }
        await  checkUserSubscription(user)


        const isPasswordMatch = await user.comparePassword(password)
        if(!isPasswordMatch){
            return next(new ErrorHandler("Invalid Email or Password",400))
        }
        const loggedInUser = await User.findById(user._id).select("-password")

        sendToken(loggedInUser,200,res)
    }
    catch(err){
        next (new ErrorHandler(err.message,400))
    }
})

const LogoutUser = asyncHandler(async(req,res,next)=>{
    try{
        res.cookie("refresh_token","",{maxAge:1})
        res.cookie("access_token","",{maxAge:1})
        return res.json(new ApiResponse(200,"User logged out"))
    }
    catch(error){
       return  next(new ErrorHandler(error.message,500))
    }
})

const updateAccessToken = asyncHandler(async (req, res, next) => {
    try {
        const { refresh_token } = req.cookies;

        if (!refresh_token) {
            return next(new ErrorHandler("Please Login to access the resource", 401));
        }

        const decoded = jwt.verify(refresh_token, process.env.JWT_REFRESH_SECRET);

        const user = await User.findById(decoded.id);
        if (!user) {
            return next(new ErrorHandler("User not found", 404));
        }

        const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '5m' });
        const refreshToken = jwt.sign({ id: user._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });

       
        res.cookie("access_token", accessToken, accessTokenOptions);
        res.cookie("refresh_token", refreshToken, refreshTokenOptions);


        res.status(200).json({ accessToken,user });

    } catch (err) {
        return next(new ErrorHandler(err.message, 400));
    }
});





const updateInfo = asyncHandler(async(req,res,next)=>{
    try{
        const {firstName,email,lastName,phone,companyName} =  req.body;
        const userId = req.user?._id;
        const user = await User.findByIdAndUpdate(userId,{firstName,email,lastName,phone,companyName},{
            new:true,
            select:"-password"
        })
        if(!user){
            return next (new ErrorHandler("User not found",404))
        }


    }
    catch(err){
        return next (new ErrorHandler(err.message,400))
    }
})

const forgotPassword = asyncHandler(async (req, res, next) => {
    try {
        const { email } = req.body;

        if (!email) {
            return next(new ErrorHandler("Please enter your email", 400));
        }

        const user = await User.findOne({ email });
        if (!user) {
            return next(new ErrorHandler("User not found with this email", 404));
        }

        const resetToken = user.getResetPasswordToken();
        await user.save({ validateBeforeSave: false });

        const resetUrl = `${process.env.CLIENT_URL}/api/auth/reset-password/${resetToken}`;

       
        const template = 'PasswordRecovery.ejs'; 
        const data = { resetUrl }; 

        try {
            await sendEmail({
                email: user.email,
                subject: "Password Recovery",
                template, // Use the EJS template
                data // Pass data to the template
            });

            res.status(200).json(new ApiResponse(200, {}, "Email sent successfully"));

        } catch (error) {
            return next(new ErrorHandler(error.message, 400));
        }

    } catch (error) {
        return next(new ErrorHandler(error.message, 400));
    }
});

const resetPassword = asyncHandler(async(req,res,next)=>{
    try{
        const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");
        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire:{$gt:Date.now()}
        })
        if(!user){
         return next (new ErrorHandler("Password Reset Token is invalid",400))
        }
        user.password = req.body.password
        user.resetPasswordToken = undefined
        user.resetPasswordExpire = undefined
        await user.save()
        res.status(200).json(new ApiResponse(200,{},"Password reset successfully"))
    }
    catch(error){
        return next(new ErrorHandler(error.message,400))
    }
})

const updatePassword = asyncHandler(async (req, res, next) => {
    try {
        const { password, newPassword } = req.body;
//    console.log("req.user>>>>>>>>>>>", req.user);
   
        if (!password) {
            return next(new ErrorHandler("Please enter your current password", 400));
        }
        if (!newPassword) {
            return next(new ErrorHandler("Please enter a new password", 400));
        }

        const userId = req.user?.id;
        // console.log("user id", userId);
        
        const user = await User.findById(userId).select("+password");

        if (!user) {
            return next(new ErrorHandler("User not found", 404));
        }

        const isPasswordMatch = await user.comparePassword(password);

        if (!isPasswordMatch) {
            return next(new ErrorHandler("Invalid current password", 400));
        }

        user.password = await bcrypt.hash(newPassword, 10);
        await user.save(); 

        res.status(200).json(new ApiResponse(200, {}, "Password updated successfully"));
    } catch (error) {
        return next(new ErrorHandler(error.message, 400));
    }
});


const googleLogin = asyncHandler(async (req, res, next) => {
  
    const user = req.user;
    console.log('new user login',user);
    

    const accessToken = user.SignAccessToken();
    const refreshToken = user.SignRefreshToken();

    res.cookie("access_token", accessToken, accessTokenOptions);
    res.cookie("refresh_token", refreshToken, refreshTokenOptions);

    res.status(200).json({
        success: true,
        user: {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            subscription: user.subscription,
            subscriptionStatus: user.subscriptionStatus,
        },
    });
});

const facebookLogin = asyncHandler(async (req, res, next) => {
   
    const user = req.user;

    const accessToken = user.SignAccessToken();
    const refreshToken = user.SignRefreshToken();

    res.cookie("access_token", accessToken, accessTokenOptions);
    res.cookie("refresh_token", refreshToken, refreshTokenOptions);

    res.status(200).json({
        success: true,
        user: {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            subscription: user.subscription,
            subscriptionStatus: user.subscriptionStatus,
        },
    });
});

export {registerUser,LoginUser,LogoutUser,updateAccessToken,updateInfo,resetPassword,updatePassword,forgotPassword,googleLogin,facebookLogin}
