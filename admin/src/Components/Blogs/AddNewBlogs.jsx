import React, { useState, useRef } from 'react';
import PlusIcon from '/src/assets/images/admin-dahsboard-+-icon.svg';
import Image from '/src/assets/images/admin-dashboard-image-icon.svg';
import { useForm } from 'react-hook-form';

const AddNewBlogs = () => {
  const [templates, setTemplates] = useState([{ coverImage: '', images: [], document: '', title: '',catrgory:'', description: '' }]);

  const [mainCoverImage, setMainCoverImage] = useState('');
  const fileInputRef = useRef(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const { register, handleSubmit  , watch, formState: { errors },} = useForm();
  const [data, setData] = useState("");

  // Handle image click for file input
  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  // Handle file selection for the main cover image
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setMainCoverImage(imageUrl); // Set main cover image
    }
  };
   // Handle removing an image
   const removeImage = (index, imgIndex) => {
    const updatedTemplates = [...templates];
    updatedTemplates[index].images.splice(imgIndex, 1);
    setTemplates(updatedTemplates);
  };

  // Handle cover image upload for individual templates
  const handleCoverImageChange = (event, index) => {
    const file = event.target.files[0];
    const updatedTemplates = [...templates];
    const imageUrl = URL.createObjectURL(file);
    updatedTemplates[index].coverImage = imageUrl;
    setTemplates(updatedTemplates);
  };

  // Handle multiple images upload
  const handleMultipleImagesChange = (event, index) => {
    const files = Array.from(event.target.files);
    const updatedTemplates = [...templates];
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    updatedTemplates[index].images = [...updatedTemplates[index].images, ...imageUrls];
    setTemplates(updatedTemplates);
  };

  // Handle document uploads for templates
  const handleDocumentChange = (event, index) => {
    const file = event.target.files[0];
    const updatedTemplates = [...templates];
    updatedTemplates[index].document = file ? file.name : null;
    setTemplates(updatedTemplates);
  };

  // Handle text input changes (for title and description)
  const handleInputChange = (event, index, field) => {
    const updatedTemplates = [...templates];
    updatedTemplates[index][field] = event.target.value;
    setTemplates(updatedTemplates);
  };

  // Function to add a new template section
  const addNewTemplate = () => {
    setTemplates([...templates, { coverImage: '', images: [], document: '', title: '', description: '' }]);
  };

  // Function to remove the last template section
  const removeTemplate = () => {
    if (templates.length > 1) {
      setTemplates(templates.slice(0, -1));
    }
  };

  // Function to save all the data
  const handleSave = (data) => {
    console.log('Saved Data:', data
      
    );
  };

  // Function to submit all the templates
  const handleUpload = (data) => {
    console.log('Submitting Data:', data);
  };

  return (
    <>
    <form onSubmit={handleSubmit(handleUpload)}>
      <div className='flex flex-col w-full bg-[#F9F9F9]'>

       <div className='lg:m-[40px] xl:m-[40px] md:m-[20px] bg-white border border-[] rounded-md px-[10px] py-[30px] lg:px-[40px] xl:px-[40px] md:px-[40px] flex flex-col'>
        <h2 className='text-[20px] leading-[30px] font-[500] font-[Poppins]'>Add New Blogs</h2>
         
       <div className='flex flex-col md:flex-row lg:flex-row xl:flex-row w-[100%]  gap-[20px] '>
         
         {/* Category & Title */}
         <div className='w-full flex flex-col w-[60%] gap-[50px]'>
          <div className='flex flex-col md:flex-row lg:flex-row xl:flex-row mt-[30px] w-[100%] gap-[30px] xl:items-center lg:items-center md:items-center items-start'>
            <div className='flex flex-col lg:w-[40%] xl:w-[40%] md:w-[40%] w-[100%]'>
              <p className='text-[14px] leading-[21px] font-[Poppins] font-[400]'>Category</p>
              <select className=' mt-[4px]  px-[10px] py-[10px] rounded-md bg-[#F9F9F9] outline-none border border-[#D9D9D9] text-[14px] font-[Poppins]'  {...register('category' ,{required:true})}>
              

                <option value='' disabled>Please select</option>
                <option value='template'>template</option>
                <option value='free template'>free template</option>
                <option value='pricing'>pricing</option>
              </select>
              {errors.catrgory && <span className='text-red-400'>please select a category</span>}
            </div>

            <div className='flex flex-col w-[100%]'>
              <p className='text-[14px] leading-[21px] font-[Poppins] font-[400]'>Author</p>

              <input type='text' placeholder='Text Here' className='border mt-[4px] border-grey pl-[22px] mr-[30px] py-[8px] rounded-md bg-[#F9F9F9] outline-none border border-[#D9D9D9] text-[14px] font-[Poppins] w-full' {...register('author',{required:true})} />
              {errors.author && <span className='text-red-400'>Author is required</span>}
            </div>
            {/* tittle */}
          </div>

          {/* tittle */}

          <div className='flex mt-[30px] w-full items-center'>
            <div className='flex flex-col'>
              <p className='text-[14px] leading-[21px] font-[Poppins] font-[400]'>Title</p>
              <textarea type='text' placeholder='Text Here' cols={300} className='pl-[10px] resize-none border mt-[4px] w-full border-grey px-[22px] py-[8px] rounded-md bg-[#F9F9F9] outline-none border border-[#D9D9D9] text-[14px] font-[Poppins]' {...register('title',{required:true})} />
              {errors.title && <span className='text-red-400'>Description is required</span>}
            </div>
          </div>
        </div>

        {/* despricption */}
      


        {/* Image Upload Section */}
    <div className='flex flex-col mt-[30px] lg:w-[30%] xl:w-[30%] md:w-[40%] w-[90%]'>
    <div className=' h-[263px] border-2 border-[#293950] border-dashed rounded-lg bg-[#E7E8F1] flex items-center justify-center' {...register('coverImage', {required:true})}>
          <div className='flex items-center justify-center w-full h-full cursor-pointer' onClick={handleImageClick}>
          {mainCoverImage ? (
              <img src={mainCoverImage} alt='Uploaded preview' className='object-cover w-full h-full rounded-lg' />
            ) : (
              <div className='w-[32px] h-[32px] rounded-full bg-white flex items-center justify-center'>
                <img src={Image} alt='Upload icon' />
              </div>
            )}
          </div>
          <input type='file' ref={fileInputRef} onChange={handleFileChange} style={{ display: 'none' }} />
        </div>
        {errors.coverImage && <span className='text-red-400'>please select an image</span>}
      </div>

      
    </div>
    <div className='flex mt-[30px] max-w-[100%] w-full items-center'>
            <div className='flex flex-col'>
              <p className='text-[14px] leading-[21px] font-[Poppins] font-[400]'>Description</p>
              <textarea type='text' placeholder='Text Here' cols={300} className='pl-[10px] resize-none border mt-[4px] w-full border-grey px-[22px] py-[8px] rounded-md bg-[#F9F9F9] outline-none border border-[#D9D9D9] text-[14px] font-[Poppins]' {...register('description',{required:true})} />
              {errors.description && <span className='text-red-400'>Description is required</span>}
            </div>
          </div>


      {/* Template content */}
      {templates.map((template, index) => (
        <div key={index}>
          <h2 className='text-[20px] leading-[30px] font-[Poppins] font-[500] mt-[40px]'>Blog Content {index + 1}</h2>
          <div className='w-full border border-[#D9D9D9] rounded-lg mt-[15px] p-[30px] flex flex-col'>
            {/* Title Input */}
            <div className='w-full flex flex-col lg:flex-row xl:flex-row lg:items-center sm:items-start lg:gap-[50px] xl:gap-[50px] '>
              <p className='text-[16px] leading-[21px] font-[400] font-[Poppins] '>Title</p>
             <div className='flex flex-col w-full'>
             <input 
                type='text' 
                // value={template.title}
                onChange={(e) => handleInputChange(e, index, 'title')}
                placeholder='Text Here' 
                className='w-full border mt-[4px] border-[#D9D9D9] bg-[#F9F9F9] pl-[16px] py-[10px] rounded-md outline-none text-[16px] font-[Poppins]' 
                {...register(`templates.${index}.title`, { required: true })}
              />
              {errors.templates && errors.templates[index]?.title && (
                            <span className='text-red-400'>Title is required</span>
                          )}
             </div>
            </div>

            {/* Description Input */}
            <div className='w-full flex lg:flex-row xl:flex-row flex-col  gap-[8px] mt-[25px]'>
              <p className='text-[16px] leading-[21px] font-[400] font-[Poppins] '>Description</p>
             <div className='flex flex-col w-full'>
             <textarea  
               
                onChange={(e) => handleInputChange(e, index, 'description')}
                placeholder='Text here' 
                className='w-full border border-[#D9D9D9] bg-[#F9F9F9] rounded-md pl-[10px] resize-none' 
                {...register(`templates.${index}.description`, { required: true })}
              />
               {errors.templates && errors.templates[index]?.description && (
                            <span className='text-red-400'>Description is required</span>
                          )}
             </div>
            </div>

            {/* Upload Buttons */}
            <div className='gap-[20px] mt-[25px] flex flex-row justify-between'>
              <div className='flex md:flex-row lg:flex-row xl:flex-row flex-col gap-[30px]'>
                <button
                  className='py-[8px] px-[9px] bg-[#E7E8F1] border border-[#293950] rounded-md hover:bg-blue hover:text-white'
                  onClick={() => document.getElementById(`coverImageInput-${index}`).click()}
                >
                  Upload cover image
                </button>
                <input
                  type='file'
                  id={`coverImageInput-${index}`}
                  style={{ display: 'none' }}
                  onChange={(e) => handleCoverImageChange(e, index)}
                />
                
                <button
                  className='py-[8px] px-[9px] bg-[#E7E8F1] border border-[#293950] rounded-md hover:bg-blue hover:text-white'
                  onClick={() => document.getElementById(`imagesInput-${index}`).click()}
                >
                  Upload images
                </button>
                <input
                  type='file'
                  id={`imagesInput-${index}`}
                  multiple
                  style={{ display: 'none' }}
                  onChange={(e) => handleMultipleImagesChange(e, index)}
                />

                <button
                  className='py-[8px] px-[9px] bg-[#E7E8F1] border border-[#293950] rounded-md hover:bg-blue hover:text-white'
                  onClick={() => document.getElementById(`docInput-${index}`).click()}
                >
                  Upload Template
                </button>
                <input
                  type='file'
                  id={`docInput-${index}`}
                  style={{ display: 'none' }}
                  onChange={(e) => handleDocumentChange(e, index)}
                  accept='.pdf,.doc,.docx'
                />
              </div>

            
            </div>

            {/* Display the uploaded cover image */}
            {template.coverImage && (
              <div className='mt-4'>
                <img src={template.coverImage} alt='Cover Preview' className='w-[100px] h-[100px] object-cover rounded-lg' />
              </div>
            )}

            {/* Display the uploaded images */}
            {template.images.length > 0 && (
              <div className='flex flex-wrap gap-4 mt-4'>
                {template.images.map((image, imgIndex) => (
                 <div className='relative'> <img
                    key={imgIndex}
                    src={image}
                    alt={`Image Preview ${imgIndex}`}
                    className='w-[100px] h-[100px] object-cover rounded-lg'
                  />
                    <button
                      onClick={() => removeImage(index, imgIndex)}
                      className="absolute top-0 right-0 p-1 text-xs text-white bg-red-500 rounded-full"
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Display the uploaded document */}
            {template.document && (
              <div className='mt-4'>
                <p>Uploaded Document: {template.document}</p>
              </div>
            )}

            <div className='flex items-end justify-end mt-[20px]'>
            <button
                className='py-[8px] px-[65px] bg-[#293950] border rounded-md text-white hover:bg-blue'
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Add/Remove Template Buttons */}
      <div className='flex flex-row gap-[30px] justify-start mt-[40px]'>
        <button className='py-[8px] px-[9px] bg-[#293950] border border-[#293950] rounded-md hover:bg-blue text-white' onClick={addNewTemplate}>
         + Add blog
        </button>
        {templates.length>1 && (<button className='py-[8px] px-[9px] bg-[#293950] border border-[#293950] rounded-md hover:bg-blue text-white' onClick={removeTemplate}>
          - Remove blog
        </button>)}
      </div>

      {/* Upload All Button */}
      <div className='flex justify-end mt-[30px]'>
        <button className='py-[8px] px-[65px] bg-[#293950] border rounded-md text-white hover:bg-blue' >
          Upload
        </button>
      </div>



       </div>
      </div>
      </form>
    </>
  );
};

export default AddNewBlogs;

