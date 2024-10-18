import SubscriptionPlan from "../models/subscription.model.js";
import Template from "../models/template.model.js";
import User from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ErrorHandler } from "../utils/ErrorHandler.js";
import sendEmail from "../utils/sendMail.js";
import crypto from 'crypto'
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const UserSubscriptionPlan = asyncHandler(async(req,res,next)=>{
  try{
    const {planId,customTeamOptionId,payment_info} =req.body;
    const userId = req.user.id;

    if (payment_info) {
      if ("id" in payment_info) {
        const paymentIntentId = payment_info.id;
        const paymentIntent = await stripe.paymentIntents.retrieve(
          paymentIntentId
        );

        if (paymentIntent.status !== "succeeded") {
          return next(new ErrorHandler("Payment not authorized!", 400));
        }
      }
    }

    // console.log("userid>>>>>>>>>>>>>",userId);
    

    const Plan = await SubscriptionPlan.findById(planId)
    if (!Plan) {
      return next(new ErrorHandler('Subscription Plan not found', 404));
    }
    const user = await User.findById(userId);
    // console.log("userasdlkjfkjahsfk",user)

    if (!user) {
      return next(new ErrorHandler('User not found', 404));
    }

    // let discountPercentage = 0;
    // if (user.paymentCount >= 1) {
    //   discountPercentage = 10; 
    // }

  

    const now = new Date();
    let endDate ;
if(Plan.duration ==="Monthly"){
  endDate = new Date(now.setMonth(now.getMonth()+1))

}
else if(Plan.duration === "Yearly"){
  endDate = new Date(now.setFullYear(now.getFullYear()+1))
}

if(Plan.planName=== 'Custom Team'){
  if(!Plan.customTeamOptions || Plan.customTeamOptions.length === 0){
    return next(new ErrorHandler('Please provide custom team options', 400));
  }



const selectedCustomTeamOption = Plan.customTeamOptions.find(
  (option) => option._id.toString() === customTeamOptionId
);

if (!selectedCustomTeamOption) {
  return next(new ErrorHandler('Invalid custom team option selected', 400));
}

const totalPrice = selectedCustomTeamOption.userCount * selectedCustomTeamOption.pricePerUser * (1 - selectedCustomTeamOption.discount / 100);

Plan.price = totalPrice;

}

  

await Plan.save();

user.subscriptionPlan = Plan._id;
    user.subscriptionStartDate = new Date()
    user.subscriptionEndDate = endDate
    user.subscriptionStatus = 'active';
   


    await user.save();

    res.status(200).json({
      success: true,
      message: 'Subscription Plan selected successfully',
  
    });

  }
  catch (error) {
    console.log("error>>>>>>>", error);
    
    return next(new ErrorHandler('Something went wrong', 500));
  }
})



 const newPayment = asyncHandler(async(req,res,next)=>{
  try{

    const myPayment = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: "USD",
      description: "Project Management Software for Business Excellence",
      metadata: {
        company: "ezosoft",
      },
      automatic_payment_methods: {
        enabled: true,
      },
      shipping: {
        name: "John Doe",
        address: {
          line1: "  jsldkjfals ",
          postal_code: "98140",
          city: "San Francisco",
          state: "CA",
          country: "US",
        },
      },
    });
// console.log("myPayment.client_secret",myPayment);

    res.status(200).json({
      success: true,
      client_secret: myPayment.client_secret,})
  }
  catch(error){
    console.log("error>>>payment", error);

    return next(new ErrorHandler('Something went wrong', 500));
  }
})








const AddnewMember = asyncHandler(async (req, res, next) => {
    try {
      const { email, role,name } = req.body;
      const userId = req.user.id;
  
      const user = await User.findById(userId).populate('subscriptionPlan');;
  
      if (!user) {
        return next(new ErrorHandler("User not found", 404));
      }
// console.log(user.subscriptionPlan);

      if (user.subscriptionPlan.planName !== "Custom Team") {
        return next(new ErrorHandler("User does not have the required plan", 403));
      }
      if (user.team.length >= user.subscriptionPlan.customTeamOptions.userCount) {
        return next(new ErrorHandler("Team member limit reached", 400));
      }

      let member = await User.findOne({ email });
      if(member){
        return next(new ErrorHandler("User already exists with this email", 400));
      }
  
      if (!member) {

        member = await User.create({
          name,
          email,
          password: crypto.randomBytes(20).toString('hex'),
          role: "user",
        });
  

        const inviteToken = crypto.randomBytes(20).toString('hex');
        const inviteLink = `${process.env.FRONTEND_URL}/accept-invite/${inviteToken}`;
  
     
        member.resetPasswordToken = crypto.createHash('sha256').update(inviteToken).digest('hex');
        member.resetPasswordExpire = Date.now() + 48 * 60 * 60 * 1000;

        const data = {
          name: member.name,
          teamOwner: user.name,
          inviteLink,
        };
  
        await member.save();
        
        try {
          await sendEmail({
            email: member.email,
          subject: 'Team Invitation',
          template: 'invitation.ejs',
          data,
          });
        } catch (error) {
          return next(new ErrorHandler("Failed to send the invitation email", 500));
        }
      }

      user.team.push({
        memberId: member._id,
        role: role || 'member',
      });
  
      await user.save();
  
      res.status(201).json({
        success: true,
        message: "Member added successfully",
        team: user.team,
      });
    } catch (error) {
      console.log(error);
      
      next(new ErrorHandler("Something went wrong, please try again later", 500));
    }
  });

  const AcceptInvite = asyncHandler(async (req, res, next) => {
    try {
      const { inviteToken } = req.params;
      const { newPassword } = req.body; 
  
      // console.log("inviteToken>>>>>>>>>>>>>",inviteToken);
      // console.log("newPassword>>>>>>>>>",newPassword);
      const hashedToken = crypto.createHash('sha256').update(inviteToken).digest('hex');
      
      
      
      if (!newPassword) {
        return next(new ErrorHandler("New password is required", 400));
      }
  
      const member = await User.findOne({
        resetPasswordToken: hashedToken,
        resetPasswordExpire: { $gt: Date.now() },
      });
  
      if (!member) {
        return next(new ErrorHandler("Invalid or expired invite token", 400));
      }
      member.password = newPassword;
      member.resetPasswordToken = undefined;
      member.resetPasswordExpire = undefined;
      member.subscriptionStatus = "active"; 
  
      
      await member.save();
  
      res.status(200).json({
        success: true,
        message: "Invite accepted and password updated successfully",
      });
    
    } catch (error) {
      console.log(error);
      next(new ErrorHandler("Something went wrong, please try again later", 500));
    }
  });

// ? unAuthenticated users
  const GetTemplates = asyncHandler(async(req,res,next)=>{
    try{
         
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10
      const searchQuery = req.query.search || "";
    
     
const skip = (page -1) * limit

let searchCondition = {};
if (searchQuery) {
  searchCondition = {
    $or: [
      { name: { $regex: searchQuery, $options: "i" } },
      { description: { $regex: searchQuery, $options: "i" } },
      { "templates.templateTitle": { $regex: searchQuery, $options: "i" } },
    ],
  };
}


const templates = await Template.find(searchCondition)
      .select('-templates')
      .skip(skip)
      .limit(limit);

      const totalTemplates = await Template.countDocuments(searchCondition)
      
      const totalPages = Math.ceil(totalTemplates / limit);

      const response = {
        templates,
        pagination: {
          totalItems: totalTemplates,
          totalPages,
          currentPage: page,
          itemsPerPage: limit,
        },
      };
  
      res.status(200).json( new ApiResponse(response,200,"Templates retrieved successfully"))


    }
    catch(error){
      console.log("error>>>>>>>", error);
      
      return next(new ErrorHandler('Something went wrong', 500));
    }
  })


  const TemplatesWithAuth = asyncHandler(async(req,res,next)=>{
    try{
    
      const templates = await Template.find().select('-templates.templateUrl');
                    const response = {
                      templates
                    };
                    res.status(200).json( new ApiResponse(response,200,"Templates retrieved successfully"))        

    } catch(error){

 return next(new ErrorHandler('Something went wrong', 500));
    }
  })
  
  const getSingleTemplate = asyncHandler(async(req,res,next)=>{
    try{
  
      const {id} =  req.params;
      const  template  = await Template.findOne({ "templates._id": id }).select('-templates.templateUrl')
  
      if (!template) {
        return next(new ErrorHandler("Template not found", 404));
      }
  
      res.status(200).json(new ApiResponse(template, 200, "Template retrieved successfully"));
    }catch(error){
      console.log("error>>>>>>>", error);
      
      return next(new ErrorHandler('Something went wrong', 500));
    }
  })

  const getSingleTemplateUrl = asyncHandler(async(req,res,next)=>{
    try{
      const {id} =  req.params;
      const  templateUrl  = await Template.findOne({ "templates._id": id },).select("templates.templateUrl");
      if (!templateUrl) {
        return next(new ErrorHandler("Template not found", 404));
      }

      res.status(200).json(new ApiResponse(templateUrl, 200, "Template url retrieved successfully"));

    }
    catch(error){
      console.log("error>>>>>>>", error);
      
      return next(new ErrorHandler('Something went wrong', 500));
    }
  }) 


  export {AddnewMember,UserSubscriptionPlan,AcceptInvite,GetTemplates,TemplatesWithAuth,getSingleTemplate,getSingleTemplateUrl,newPayment}