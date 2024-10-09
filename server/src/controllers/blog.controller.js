import BlogModel from "../models/Blog.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ErrorHandler } from "../utils/ErrorHandler.js";


const createBlog = asyncHandler(async (req, res, next) => {
    console.log('Files:', req.files); 
    console.log('Body:', req.body);

    const { title, content, details, category, author } = req.body;

    if (!title || !content || !category || !author ) {
      return next(new ErrorHandler("All fields are required", 400));
  }
   

    // Check if an image file is uploaded
    const imageFile = req.files.find(file => file.fieldname === 'image');
    if (!imageFile) {
        return next(new ErrorHandler("Blog image is required", 400));
    }

    try {
       
        const uploadResult = await uploadOnCloudinary(imageFile.path, 'blog_images');
        if (!uploadResult) {
            return next(new ErrorHandler("Failed to upload blog image", 500));
        }

        const imageUrl = uploadResult.url;

        // Process details if provided
        const processedDetails = await Promise.all(details.map(async (detail, index) => {
            const { title, description } = detail;

            if ( !description) {
                throw new ErrorHandler("Detail title and description are required", 400);
            }

            let detailImageUrl = '';
         
            
            const detailImageFile = req.files?.find(file => file.fieldname === `details[${index}][image]`);
            console.log("detailsImagesFile", detailImageFile)
            if (detailImageFile) {
                const detailUploadResult = await uploadOnCloudinary(detailImageFile.path, 'detail_images');
                if (detailUploadResult) {
                    detailImageUrl = detailUploadResult.url;
                    console.log("Details image URL uploaded successfully:", detailImageUrl);
                }
            }
            return {
                title,
                description,
                image: detailImageUrl || "" 
            };
        }));

        // Create the blog post
        const newBlog = await BlogModel.create({
            title,
            content,
            details: processedDetails,
            image: imageUrl,
            author,
            category
        });

        res.status(201).json(
            new ApiResponse(newBlog,201 , 'Blog created successfully')
        );
    } catch (error) {
        console.error("Error in createBlog:", error);
        if (error instanceof ErrorHandler) {
            return next(error);
        } else {
          console.log(error);
          
            return next(new ErrorHandler("Something went wrong", 500));
        }
    }
});


const editBlog = asyncHandler(async (req, res, next) => {
  const blogId = req.params.id; 
  console.log('Files:', req.files);
  console.log('Body:', req.body);

  const { title, content, details, category, author } = req.body;

 
  const existingBlog = await BlogModel.findById(blogId);
  if (!existingBlog) {
      return next(new ErrorHandler("Blog not found", 404));
  }

  
  if (!title || !content || !category || !author) {
      return next(new ErrorHandler("All fields are required", 400));
  }

  let imageUrl = existingBlog.image; 


  const imageFile = req.files.find(file => file.fieldname === 'image');
  if (imageFile) {
      const uploadResult = await uploadOnCloudinary(imageFile.path, 'blog_images');
      if (!uploadResult) {
          return next(new ErrorHandler("Failed to upload blog image", 500));
      }
      imageUrl = uploadResult.url; 
  }


  const processedDetails = await Promise.all(details.map(async (detail, index) => {
      const { title: detailTitle, description } = detail;

      if (!detailTitle || !description) {
          throw new ErrorHandler("Detail title and description are required", 400);
      }

      let detailImageUrl = '';

      const detailImageFile = req.files.find(file => file.fieldname === `details[${index}][image]`);
      console.log("detailsImagesFile", detailImageFile);
      if (detailImageFile) {
          const detailUploadResult = await uploadOnCloudinary(detailImageFile.path, 'detail_images');
          if (detailUploadResult) {
              detailImageUrl = detailUploadResult.url;
              console.log("Details image URL uploaded successfully:", detailImageUrl);
          }
      }

      return {
          title: detailTitle,
          description,
          image: detailImageUrl || undefined
      };
  }));

  existingBlog.title = title;
  existingBlog.content = content;
  existingBlog.details = processedDetails;
  existingBlog.image = imageUrl;
  existingBlog.author = author;
  existingBlog.category = category;

  await existingBlog.save();

  res.status(200).json(
      new ApiResponse(200, existingBlog, 'Blog updated successfully')
  );
});
const deleteBlog = asyncHandler(async (req, res, next) => {
  const {id} = req.body;

  console.log(req.body);
  

  
  const existingBlog = await BlogModel.findById(id);
  if (!existingBlog) {
      return next(new ErrorHandler("Blog not found", 404));
  }

  
  await BlogModel.findByIdAndDelete(id);

  res.status(200).json(
      new ApiResponse(200, null, 'Blog deleted successfully')
  );
});



 const getBlogCountByCategory = asyncHandler(async (req, res, next) => {
    try {
      const blogCounts = await BlogModel.aggregate([
        {
          $group: {
            _id: "$category",
            count: { $sum: 1 }
          }
        },
        {
          $sort: { count: -1 } 
        }
      ]);
  
      res.status(200).json({
        success: true,
        message: "Blog count per category fetched successfully",
        data: blogCounts
      });
    } catch (error) {
        console.log(error);
        
      return next(new ErrorHandler('Error fetching blog count by category', 500));
    }
  });
 const getBlogsByCategory = asyncHandler(async (req, res, next) => {
    try {
      const { category } = req.params;
      const blogs = await BlogModel.find({ category });
  
      if (blogs.length === 0) {
        return next(new ErrorHandler(`No blogs found in category ${category}`, 404));
      }
  
      res.status(200).json({
        success: true,
        message: `Blogs in category ${category} fetched successfully`,
        data: blogs
      });
    } catch (error) {
      return next(new ErrorHandler('Error fetching blogs by category', 500));
    }
  });

  const getAllBlogs = asyncHandler(async(req,res,next)=>{
    try{
        const blogs = await BlogModel.find().select('-details').sort({createdAt:-1});
        res.status(200).json(new ApiResponse(blogs,200,"Blogs fetched successfully"))
    }
    catch(error){
        console.error(error)
        return next (new ErrorHandler("something wrong please try again later",500))
    }
  })

  const getSingleBlog = asyncHandler(async(req,res,next)=>{
    try{
        const {id} = req.params;
        const blog = await BlogModel.findById(id);
    
        
        res.status(200).json(new ApiResponse(blog,200,"Blog fetched successfully"))

    }
    catch(error){
        console.error(error)
        return next (new ErrorHandler("something wrong please try again later",500
            ))
    }
  })
  

export { createBlog ,getBlogCountByCategory ,getBlogsByCategory,getAllBlogs,getSingleBlog ,editBlog,deleteBlog};