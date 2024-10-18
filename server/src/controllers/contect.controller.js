
import { asyncHandler } from "../utils/AsyncHandler.js";
import sendEmail from "../utils/sendMail.js";

const ClientForm = asyncHandler (async(req,res,next)=>{
    try{

    const {FirstName,LastName, email,companyName,message } = req.body;
     if(!email && ! message){
        return next(new ErrorHandler("Please provide email and message",400))
     }

     const adminEmail =process.env.CONTECT_EMAIL
     if(!adminEmail){
        return next(new ErrorHandler("Admin email not set",500))
     }

     const template='contactSales.ejs'
      const emailOptions ={
        email: adminEmail,
        subject:"New  Sales Meeting Request",
        template,
        data:{
            FirstName,LastName,email ,message,companyName
        },
      }

    try {
        await sendEmail(emailOptions)
        return res.status(200).json({message:" Email sent successfully"})
        
    } catch (error) {
        
    }

    }
    catch(error){
        return next(new ErrorHandler(error.message,500))
    }
})

export {ClientForm}