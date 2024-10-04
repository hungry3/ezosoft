

// const getAllUsers = asyncHandler(async(req,res,next)=>{
//     try{
//         const users = await User.find().sort({createAt:-1})

//         res.status(200).json({
//             success:true,
//             users
//         })
//     }

//     catch(err){
//         return next (new ErrorHandler(err.message,500))
//     }
// })

// const deleteById = asyncHandler(async(req,res,next)=>{
//     try{
//         const {id}= req.params
//         const user = await User.findById(id)
//         if(!user){
//             return next (new ErrorHandler("User not found",404))
//         }

//         await user.deleteOne({id})

//         res.json(new ApiResponse(201,user,"user Deleted successfuly"))
//     }
//     catch(error){
//         return  next(new ErrorHandler(error.message,500))
//     }
// })


import SubscriptionPlan from '../models/subcription.model.js';
import Template from '../models/template.model.js';
import User from '../models/user.model.js'
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/AsyncHandler.js'
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import { ErrorHandler } from '../utils/ErrorHandler.js';



const getAllUsers = asyncHandler(async(req,res,next)=>{

    try{
        const user = await User.find().select("-password");
        res.status(200).json(new ApiResponse(200,user,"success"))
    }
    catch(error){
        next(new ErrorHandler(error.message,500));
    }
})

//! get single user

 const getUserById = asyncHandler(async(req,res,next)=>{

    try{
        const userId = req.params.id;
        const user = await User.findById(userId).select('-password');

        if(!user){
            return next(new ErrorHandler("User not found",404))
        }

        res.status(200).json(new ApiResponse(200,user,' user retrieved Successfuly'))
    }
    catch(error){
        next(new ErrorHandler(error.message,500))
    }
 })

 const updateUser =  asyncHandler(async (req,res,next)=>{
    try{
        const userId = req.params.id;
        const { name , email,role} = req.body;
        if(role && !["user", "admin"].includes(role)){
            return next(new ErrorHandler("Invalid role",400));
        }
        const updatedUser = await User.findByIdAndUpdate(userId,{name,email,role}, {new:true,select:"-password"})

        if(!updatedUser){
            return next(new ErrorHandler("User not found",404))
        }

        res.status(200).json(new ApiResponse(200,updatedUser,"User updated successfully"))
    }

    catch(error){
        next(new ErrorHandler(error.message,500))
    }
 })


 const deleteUser = asyncHandler(async (req,res,next)=>{
    try{
         const userId = req.params.id;
         const deletedUser = await User.findByIdAndDelete(userId);
         if(!deletedUser){
            return next (new ErrorHandler("user not found",404));

         }
         res.status(200).json(new ApiResponse(200,{}, "User Deleted successfully"))
    }
    catch(error){
        next(new ErrorHandler(error.message,500))
    }
 })

 const createTemplate = asyncHandler(async (req, res, next) => {
  console.log('Files:', req.files); 
  console.log('Body:', req.body);

  const { name, description, templates, category } = req.body;

  if (!name || !description || !templates || !category) {
      return next(new ErrorHandler("All fields are required", 400));
  }

  const templateExists = await Template.findOne({ name });
  if (templateExists) {
      return next(new ErrorHandler("Template with this name already exists", 400));
  } 

  
  if (!Array.isArray(templates) || templates.length === 0) {
      return next(new ErrorHandler("Templates must be a non-empty array", 400));
  }

  try {
    
      let avatarUrl = '';
      const avatarFile = req.files.find(file => file.fieldname === 'avatar');
      if (avatarFile) {
          const uploadResult = await uploadOnCloudinary(avatarFile.path, 'template_avatars');
          if (!uploadResult) {
              return next(new ErrorHandler("Failed to upload avatar", 500));
          }
          avatarUrl = uploadResult.url;
      }

  
      const processedTemplatesPromises = templates.map(async (templateData, index) => {
          const { templateTitle, templateContent } = templateData;
          
    
          if (!templateTitle || !templateContent) {
              throw new ErrorHandler(`Template ${index} is missing required fields`, 400);
          }
     
          const templateImageFile = req.files.find(file => file.fieldname === `templates[${index}][templateImage]`);
          if (!templateImageFile) {
              throw new ErrorHandler(`Template ${index} is missing templateImage`, 400);
          }
          const uploadImageResult = await uploadOnCloudinary(templateImageFile.path, "template_thumbnail");
          if (!uploadImageResult) {
              throw new ErrorHandler("Failed to upload template image", 500);
          }
          const templateImageUrl = uploadImageResult.url;
        
          let templateUrl = '';
          const templateUrlFile = req.files.find(file => file.fieldname === `templates[${index}][templateUrl]`);
          if (templateUrlFile) {
              const uploadFileResult = await uploadOnCloudinary(templateUrlFile.path, "template_files");
              if (!uploadFileResult) {
                  throw new ErrorHandler("Failed to upload template file", 500);
              }
              templateUrl = uploadFileResult.url;
          }
        
          const templatePageImageFiles = req.files.filter(file => file.fieldname.startsWith(`templates[${index}][templatePageImage]`));
          const templatePageImageUrls = await Promise.all(
              templatePageImageFiles.map(async (file) => {
                  const uploadPageImageResult = await uploadOnCloudinary(file.path, "template_page_images");
                  return uploadPageImageResult.url;
              })
          );
        
          return {
              templateTitle,
              templateContent,
              templateUrl: templateUrl || '', 
              templateImage: templateImageUrl,
              templatePageImage: templatePageImageUrls
          };
      });
    
      const processedTemplates = await Promise.all(processedTemplatesPromises);
    
      const newTemplate = await Template.create({
          name,
          description,
          avatar: avatarUrl,
          templates: processedTemplates,
          category
      });
  
      res.status(200).json(new ApiResponse( newTemplate,200, 'Template created successfully'));

  } catch (error) {
      console.error("Error in createTemplate:", error);

      if (error instanceof ErrorHandler) {
          return next(error);
      } else {
        console.log(error);
        
          return next(new ErrorHandler("Something went wrong", 500));
      }
  }
});

const updateTemplate = asyncHandler(async (req, res, next) => {
  // console.log('Files:', req.files); 
  // console.log('Body:', req.body); 

  const  id  = req.params.id;
  console.log(id);
  
  const { name, description, templates, category } = req.body;

  

  const templateExists = await Template.findOne({ name });
  if (templateExists) {
      return next(new ErrorHandler("Template with this name already exists", 400));
  } 

 

  const template = await Template.findByIdAndUpdate(id);
  console.log(template ,"template >>>>>>>>>>>>>>>>>>>>>>>>>>");
  
  if (!template) {
      return next(new ErrorHandler("Template not found", 404));
  }

  try {
      let avatarUrl = template.avatar;
      const avatarFile = req.files.find(file => file.fieldname === 'avatar');
      if (avatarFile) {
          const uploadResult = await uploadOnCloudinary(avatarFile.path, 'template_avatars');
          if (!uploadResult) {
              return next(new ErrorHandler("Failed to upload avatar", 500));
          }
          avatarUrl = uploadResult.url;
      }

      const updatedTemplates = await Promise.all(templates.map(async (templateData, index) => {
          const { templateTitle, templateContent } = templateData;

          if (!templateTitle || !templateContent) {
              throw new ErrorHandler(`Template ${index} is missing required fields`, 400);
          }

          const templateImageFile = req.files.find(file => file.fieldname === `templates[${index}][templateImage]`);
          if (!templateImageFile) {
              throw new ErrorHandler(`Template ${index} is missing templateImage`, 400);
          }
          const uploadImageResult = await uploadOnCloudinary(templateImageFile.path, "template_thumbnail");
          if (!uploadImageResult) {
              throw new ErrorHandler("Failed to upload template image", 500);
          }
          const templateImageUrl = uploadImageResult.url;

          let templateUrl = '';
          const templateUrlFile = req.files.find(file => file.fieldname === `templates[${index}][templateUrl]`);
          if (templateUrlFile) {
              const uploadFileResult = await uploadOnCloudinary(templateUrlFile.path, "template_files");
              if (!uploadFileResult) {
                  throw new ErrorHandler("Failed to upload template file", 500);
              }
              templateUrl = uploadFileResult.url;
          }

          const templatePageImageFiles = req.files.filter(file => file.fieldname.startsWith(`templates[${index}][templatePageImage]`));
          const templatePageImageUrls = await Promise.all(
              templatePageImageFiles.map(async (file) => {
                  const uploadPageImageResult = await uploadOnCloudinary(file.path, "template_page_images");
                  return uploadPageImageResult.url;
              })
          );

          return {
              templateTitle,
              templateContent,
              templateImageUrl,
              templateUrl: templateUrl || '',
              templatePageImage: templatePageImageUrls
          };
      }));

      const updatedTemplate = await Template.findByIdAndUpdate(templateId, {
          name,
          description,
          avatar: avatarUrl,
          templates: updatedTemplates,
          category
      }, { new: true });

      if (!updatedTemplate) {
          return next(new ErrorHandler("Failed to update template", 500));
      }
      
      res.status(200).json(new ApiResponse(updatedTemplate, 200, "Template updated successfully"));

  } catch (error) {
      console.error("Error in updateTemplate:", error);
      if (error instanceof ErrorHandler) {
          return next(error);
      } else {
        console.log(error);
        
          return next(new ErrorHandler("Something went wrong", 500));
      }
  }
});


  const deleteTemplate = asyncHandler(async (req, res, next) => {
    const { tempId } = req.params;

    const template = await Template.findById(tempId);

    if (!template) {
        return next(new ErrorHandler("Template not found", 404));
    }

    try {
        await Template.findByIdAndDelete(tempId);
        res.status(200).json(new ApiResponse(200, {}, "Template deleted successfully"));
    } catch (error) {
        console.error("Error in deleteTemplate:", error);
        return next(new ErrorHandler("Failed to delete template", 500));
    }
});


  const  getAllTemplates = asyncHandler( async(req,res,next)=>{
    try{
        const templates = await Template.find().sort({createdAt:-1})
   
    if (templates.length===0){
        return next(new ErrorHandler("no template found",404))

    }

    res.status(200).json(new ApiResponse(200,templates))
}
catch(error){
    console.error("Error in getAllTemplates:", error);
    return next (new ErrorHandler("something went wrong",500))
}
   }) 


   const CreateSubscriptionPlan = asyncHandler(async(req,res,next)=>{
    const {planName, duration,price , customTeamOptions,details, description} = req.body
    console.log(req.body);
    console.log(req.files)

try{
  if (!planName || !duration || (planName === 'Single User' && !price)) {
    return res.status(400).json({
      success: false,
      message: "Please provide all required fields for Single User plan",
    });
  }

  if (planName === 'Custom Team' && (!customTeamOptions || customTeamOptions.length === 0)) {
    return res.status(400).json({
      success: false,
      message: "Please provide custom team options for Custom Team plan",
    });
  }

 const processedDetailsPromises = details.map(async (detailData, index) => {
  const { title } = detailData;


  if (!title) {
      throw new ErrorHandler(`Detail ${index} is missing required title`, 400);
  }


  const iconFile = req.files.find(file => file.fieldname === `details[${index}][icon]`);
  if (!iconFile) {
      throw new ErrorHandler(`Detail ${index} is missing an icon`, 400);
  }


  const uploadIconResult = await uploadOnCloudinary(iconFile.path, "subscription_icons");
  if (!uploadIconResult) {
      throw new ErrorHandler("Failed to upload detail icon", 500);
  }

  return {
      title,
      icon: uploadIconResult.url,
  };
});


const processedDetails = await Promise.all(processedDetailsPromises);

  const newPlan = await SubscriptionPlan.create({
    planName,
    duration,
    price:price,
    description,
    customTeamOptions: planName === 'Custom Team' ? customTeamOptions : [],
    details: processedDetails, 
  })

  res.status(201).json({
    success: true,
    message: `${planName} Subscription Plan created successfully`,
    data: newPlan,
  });

}
catch(error){
  console.log(error);
  
  return next (new ErrorHandler("something went wrong",500))
}
   
   })


   const UpdateSubscriptionPlan = asyncHandler(async (req, res, next) => {
    const { planName, duration, price, customTeamOptions,details,description } = req.body;
  
    try {
      // Find the subscription plan by ID
      let subscriptionPlan = await SubscriptionPlan.findById(req.params.id);
  
      if (!subscriptionPlan) {
        return res.status(404).json({
          success: false,
          message: "Subscription Plan not found",
        });
      }
  
      // Validate required fields for Single User plan
      if (!planName || !duration || (planName === 'Single User' && !price)) {
        return res.status(400).json({
          success: false,
          message: "Please provide all required fields for Single User plan",
        });
      }
  
      // Validate required fields for Custom Team plan
      if (planName === 'Custom Team' && (!customTeamOptions || customTeamOptions.length === 0)) {
        return res.status(400).json({
          success: false,
          message: "Please provide custom team options for Custom Team plan",
        });
      }

      const processedDetails = [];
    if (details && details.length > 0) {
      for (const detail of details) {
        if (detail.icon && detail.title) {
          const iconFile = req.files?.[detail.icon];
          const uploadedIconUrl = iconFile ? await uploadOnCloudinary(iconFile.path, 'subscription_icons') : detail.icon;
          processedDetails.push({
            icon: uploadedIconUrl, 
            title: detail.title,
          });
        }
      }
    }
  
      // Update fields based on the provided data
      subscriptionPlan.planName = planName;
      subscriptionPlan.duration = duration;
      subscriptionPlan.price = planName === 'Single User' ? price : 0;
      subscriptionPlan.customTeamOptions = planName === 'Custom Team' ? customTeamOptions : [];
      subscriptionPlan.details = processedDetails || [];
      subscriptionPlan.description = description;
  
      // Save the updated subscription plan
      await subscriptionPlan.save();
  
      res.status(200).json({
        success: true,
        message: `${planName} Subscription Plan updated successfully`,
        data: subscriptionPlan,
      });
    } catch (error) {
      return next(new ErrorHandler("Something went wrong during update", 500));
    }
  });
  
  
   const GetAllSubcriptionPlans = 
   asyncHandler(async (req,res,next)=>{

    try{
      const plans = await SubscriptionPlan.find();
      res.status(200).json({
       success: true,
       data: plans,
     });
    }
    catch(error){
      return next (new ErrorHandler("something Went wrong ",500))
    }
    
   })

   const GetSingleSubcriptionPlan = asyncHandler(async(req,res,next)=>{
    const plan = await SubscriptionPlan.findById(req.params.id)


    if (!plan) {
      return res.status(404).json({
        success: false,
        message: "Subscription Plan not found",
      });
    }

  res.status(200).json({
    success: true,
    data: plan,
  });
   })


   

 export { getAllUsers, getUserById, updateUser, deleteUser,createTemplate,updateTemplate,deleteTemplate,getAllTemplates,CreateSubscriptionPlan,UpdateSubscriptionPlan,GetAllSubcriptionPlans,GetSingleSubcriptionPlan}