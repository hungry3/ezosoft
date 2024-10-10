import  { useState, useRef } from 'react';
import { useForm } from "react-hook-form";
  import PlusIcon from '/src/assets/images/admin-dahsboard-+-icon.svg';
import Image from '/src/assets/images/admin-dashboard-image-icon.svg';

import { axiosConfig } from '../../utils/axiosConfig';
import { useNavigate } from 'react-router-dom';

const AddNewTemplates = () => {
  const [templates, setTemplates] = useState([{ templateImage: '', templatePageImage: [], templateUrl: '', title: '', description: '' }]);
  const [mainCoverImage, setMainCoverImage] = useState('');
  const fileInputRef = useRef(null);
  const { register, handleSubmit, watch, formState: { errors }, } = useForm();
  
  // Handle image click for file input
  const handleImageClick = () => {
    fileInputRef.current.click();
  };
 const navigate = useNavigate()
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
    updatedTemplates[index].templatePageImage.splice(imgIndex, 1);
    setTemplates(updatedTemplates);
  };

  // Handle template image upload for individual templates
  const handleCoverImageChange = (event, index) => {
    const file = event.target.files[0];
    const updatedTemplates = [...templates];
    const imageUrl = URL.createObjectURL(file);
    updatedTemplates[index].templateImage = imageUrl;
    setTemplates(updatedTemplates);
  };

  // Handle multiple images upload
  const handleMultipleImagesChange = (event, index) => {
    const files = Array.from(event.target.files);
    const updatedTemplates = [...templates];
    updatedTemplates[index].templatePageImage = files.map((file) => URL.createObjectURL(file));
    setTemplates(updatedTemplates);
  };

  const handleInputChange = (event, index, field) => {
    const updatedTemplates = [...templates];
    updatedTemplates[index][field] = event.target.value;
    setTemplates(updatedTemplates);
  };

  // Function to add a new template section
  const addNewTemplate = () => {
    setTemplates([...templates, { templateImage: '', templatePageImage: [], templateUrl: '', title: '', description: '' }]);
  };

  // Function to save all the data
  const handleUpload = async (data) => {
    const formData = new FormData();
    
    // Append main cover image
    const mainCoverImageFile = fileInputRef.current.files[0];
    if (mainCoverImageFile) {
      formData.append('avatar', mainCoverImageFile);
    }
    
    // Append template details
    formData.append('name', data.title); 
    formData.append('description', data.description);
    formData.append('category', data.category);
    
    // Append templates
    templates.forEach((template, index) => {
      formData.append(`templates[${index}][templateTitle]`, template.title);
      formData.append(`templates[${index}][templateContent]`, template.description);
      
      if (template.templateImage) {
        const templateImageFile = document.getElementById(`coverImageInput-${index}`).files[0];
        formData.append(`templates[${index}][templateImage]`, templateImageFile);
      }

      template.templatePageImage.forEach((image, imgIndex) => {
        const templatePageImageFile = document.getElementById(`imagesInput-${index}`).files[imgIndex];
        if (templatePageImageFile) {
          formData.append(`templates[${index}][templatePageImage]`, templatePageImageFile);
        }
      });

      const templateUrlFile = document.getElementById(`docInput-${index}`).files[0];
      if (templateUrlFile) {
        formData.append(`templates[${index}][templateUrl]`, templateUrlFile);
      }
    });

    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }
    

    try {
      const response = await axiosConfig.post('/admin/create-template', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Response:', response.data);
      if(response.data.statusCode===200){
        navigate('/allTemplates')
      }
      // Handle success (e.g., show a success message)
    } catch (error) {
      console.error('Error uploading templates:', error);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <form onSubmit={handleSubmit(handleUpload)}>
      <div className='flex flex-col w-full bg-[#F9F9F9]'>
        <div className='lg:m-[40px] xl:m-[40px] md:m-[20px] bg-white border border-[] rounded-md px-[10px] py-[30px] lg:px-[40px] xl:px-[40px] md:px-[40px]'>
          <h2 className='text-[20px] leading-[30px] font-[500] font-[Poppins]'>Add New Template</h2>
          <div className='flex flex-col md:flex-row lg:flex-row xl:flex-row w-[100%] gap-[20px]'>

            {/* Category & Title */}
            <div className='w-full flex flex-col w-[60%] gap-[50px]'>
              <div className='flex flex-col md:flex-row lg:flex-row xl:flex-row mt-[30px] w-[100%] gap-[30px] xl:items-center lg:items-center md:items-center items-start'>
                <div className='flex flex-col lg:w-[40%] xl:w-[40%] md:w-[40%] w-[100%]'>
                  <p className='text-[14px] leading-[21px] font-[Poppins] font-[400]'>Category</p>
                  <select className='mt-[4px] px-[10px] py-[10px] rounded-md bg-[#F9F9F9] outline-none border border-[#D9D9D9] text-[14px] font-[Poppins]' {...register('category', { required: true })}>
                    <option value='' disabled>Please select</option>
                    <option value='template'>template</option>
                    <option value='free template'>free template</option>
                    <option value='pricing'>pricing</option>
                  </select>
                  {errors.category && <span className='text-red-400'>please select a category</span>}
                </div>

                <div className='flex flex-col w-[100%]'>
                  <p className='text-[14px] leading-[21px] font-[Poppins] font-[400]'>Title</p>
                  <input type='text' placeholder='Text Here' className='border mt-[4px] border-grey pl-[22px] mr-[30px] py-[8px] rounded-md bg-[#F9F9F9] outline-none border border-[#D9D9D9] text-[14px] font-[Poppins] w-full' {...register('title', { required: true })} />
                  {errors.title && <span className='text-red-400'>Title is required</span>}
                </div>
              </div>

              {/* Description */}
              <div className='flex mt-[30px] max-w-[100%] w-full items-center'>
                <div className='flex flex-col'>
                  <p className='text-[14px] leading-[21px] font-[Poppins] font-[400]'>Description</p>
                  <textarea type='text' placeholder='Text Here' cols={300} className='pl-[10px] resize-none border mt-[4px] w-full border-grey px-[22px] py-[8px] rounded-md bg-[#F9F9F9] outline-none border border-[#D9D9D9] text-[14px] font-[Poppins]' {...register('description', { required: true })} />
                  {errors.description && <span className='text-red-400'>Description is required</span>}
                </div>
              </div>
            </div>

            {/* Image Upload Section */}
            <div className='flex flex-col mt-[30px] lg:w-[30%] xl:w-[30%] md:w-[40%] w-[90%]'>
              <div className='h-[263px] border-2 border-[#293950] border-dashed rounded-lg bg-[#E7E8F1] flex items-center justify-center' onClick={handleImageClick}>
                <div className='flex items-center justify-center w-full h-full cursor-pointer'>
                  {mainCoverImage ? (
                    <img src={mainCoverImage} alt='Uploaded preview' className='object-cover w-full h-full rounded-lg' />
                  ) : (
                    <div className='w-[32px] h-[32px] rounded-full bg-white flex items-center justify-center'>
                      <img src={Image} alt='Upload icon' />
                    </div>
                  )}
                </div>
                <input type='file' ref={fileInputRef} onChange={handleFileChange} className='hidden' accept='image/*' />
              </div>
              <p className='text-[12px] text-center leading-[18px] font-[400] mt-2'>Click to upload main cover image</p>
            </div>
          </div>

          {/* Templates Section */}
          {templates.map((template, index) => (
            <div key={index} className='mt-[30px]'>
              <div className='flex justify-between'>
                <h3 className='text-[18px] leading-[30px] font-[Poppins] font-[500]'>Template {index + 1}</h3>
                <button type='button' onClick={() => removeTemplate(index)} className='text-red-500'>Remove</button>
              </div>
              <div className='flex flex-col md:flex-row lg:flex-row xl:flex-row mt-[20px] gap-[20px]'>
                {/* Template Image */}
                <div className='flex flex-col lg:w-[30%] xl:w-[30%] md:w-[40%] w-[100%]'>
                  <p className='text-[14px] leading-[21px] font-[Poppins] font-[400]'>Template Image</p>
                  <div className='h-[150px] border-2 border-[#D9D9D9] border-dashed rounded-lg bg-[#E7E8F1] flex items-center justify-center' onClick={() => document.getElementById(`coverImageInput-${index}`).click()}>
                    {template.templateImage ? (
                      <img src={template.templateImage} alt='Template preview' className='object-cover w-full h-full rounded-lg' />
                    ) : (
                      <div className='flex items-center justify-center w-full h-full cursor-pointer'>
                        <div className='w-[32px] h-[32px] rounded-full bg-white flex items-center justify-center'>
                          <img src={Image} alt='Upload icon' />
                        </div>
                      </div>
                    )}
                  </div>
                  <input id={`coverImageInput-${index}`} type='file' onChange={(event) => handleCoverImageChange(event, index)} className='hidden' accept='image/*' />
                </div>

                {/* Template Title */}
                <div className='flex flex-col w-[100%]'>
                  <p className='text-[14px] leading-[21px] font-[Poppins] font-[400]'>Template Title</p>
                  <input type='text' placeholder='Template Title' className='border mt-[4px] border-grey pl-[22px] mr-[30px] py-[8px] rounded-md bg-[#F9F9F9] outline-none border border-[#D9D9D9] text-[14px] font-[Poppins] w-full' value={template.title} onChange={(event) => handleInputChange(event, index, 'title')} />
                </div>

                {/* Template Description */}
                <div className='flex flex-col w-[100%]'>
                  <p className='text-[14px] leading-[21px] font-[Poppins] font-[400]'>Template Description</p>
                  <input type='text' placeholder='Template Description' className='border mt-[4px] border-grey pl-[22px] mr-[30px] py-[8px] rounded-md bg-[#F9F9F9] outline-none border border-[#D9D9D9] text-[14px] font-[Poppins] w-full' value={template.description} onChange={(event) => handleInputChange(event, index, 'description')} />
                </div>
              </div>

              {/* Template Page Images */}
              <div className='flex flex-col mt-[20px]'>
                <p className='text-[14px] leading-[21px] font-[Poppins] font-[400]'>Upload Multiple Page Images</p>
                <div className='flex items-center gap-[10px]'>
                  {template.templatePageImage.map((img, imgIndex) => (
                    <div key={imgIndex} className='relative'>
                      <img src={img} alt={`Template Page ${imgIndex + 1}`} className='w-[100px] h-[100px] rounded-lg' />
                      <button type='button' onClick={() => removeImage(index, imgIndex)} className='absolute top-0 right-0 p-1 text-white bg-red-500 rounded-full'>X</button>
                    </div>
                  ))}
                  <input id={`imagesInput-${index}`} type='file' multiple onChange={(event) => handleMultipleImagesChange(event, index)} className='hidden' accept='image/*' />
                  <button type='button' onClick={() => document.getElementById(`imagesInput-${index}`).click()} className='px-4 py-2 text-white rounded-md bg-blue'>Upload Images</button>
                </div>
              </div>

              {/* Template URL Upload */}
              <div className='flex flex-col mt-[20px]'>
                <p className='text-[14px] leading-[21px] font-[Poppins] font-[400]'>Upload Template URL</p>
                <div className='flex items-center'>
                  <input id={`docInput-${index}`} type='file' onChange={(event) => handleInputChange(event, index, 'templateUrl')} className='border border-grey pl-[22px] py-[8px] rounded-md bg-[#F9F9F9] outline-none border border-[#D9D9D9] text-[14px] font-[Poppins] w-full' />
                </div>
              </div>
            </div>
          ))}
<div className='flex justify-between'>
          <button type='button' onClick={addNewTemplate} className='mt-[30px] bg-green text-white rounded-md px-4 py-2'>Add Another Template</button>

         
          <button type='submit' className='mt-[30px] bg-blue text-white rounded-md px-8 py-2'>Submit</button>
          </div>
        </div>
        
      </div>
    </form>
  );
};

export default AddNewTemplates;
