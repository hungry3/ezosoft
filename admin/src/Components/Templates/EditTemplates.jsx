import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Image from '/src/assets/images/admin-dashboard-image-icon.svg';
import axios from 'axios';

const EditTemplates = () => {
  const [templates, setTemplates] = useState([{ coverImage: '', images: [], document: '', title: '', category: '', description: '' }]);
  const [values, setValues] = useState({ name: '', email: '' });
  const [mainCoverImage, setMainCoverImage] = useState('');
  const fileInputRef = useRef(null);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  // Fetch existing data on component mount
  const getApiData = async () => {
    try {
      const res = await axios.get(`https://ezosoft-server.vercel.app/api/admin/update-user`);
      setValues({ ...values, name: res.data.name, email: res.data.email });
      setTemplates(res.data.templates); // Prepopulate templates
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getApiData();
  }, []);

  // Function to handle form submission (send updated data to backend)
  const handleSave = async (data) => {
    try {
      await axios.put(`https://ezosoft-server.vercel.app/api/admin/update-template/${id}`, {
        name: values.name,
        email: values.email,
        templates: data.templates, // Updated templates
      });
      console.log('Data updated successfully!');
      navigate('/allTemplates');
    } catch (error) {
      console.log('Error updating data:', error);
    }
  };

  // Handle file selection for cover image
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setMainCoverImage(imageUrl); // Set main cover image
    }
  };

  return (
    <form onSubmit={handleSubmit(handleSave)}>
      <div className="flex flex-col w-full bg-[#F9F9F9]">
        <div className="lg:m-[40px] xl:m-[40px] md:m-[20px] bg-white border border-[] rounded-md px-[10px] py-[30px] lg:px-[40px] xl:px-[40px] md:px-[40px]">
          <h2 className="text-[20px] leading-[30px] font-[500] font-[Poppins]">Edit Template</h2>

          <div className="flex flex-col md:flex-row lg:flex-row xl:flex-row w-[100%] gap-[20px]">
            <div className="w-full flex flex-col w-[60%] gap-[50px]">
              {/* Category & Title */}
              <div className="flex flex-col md:flex-row lg:flex-row xl:flex-row mt-[30px] w-[100%] gap-[30px] xl:items-center lg:items-center md:items-center items-start">
                <div className="flex flex-col lg:w-[40%] xl:w-[40%] md:w-[40%] w-[100%]">
                  <p className="text-[14px] leading-[21px] font-[Poppins] font-[400]">Category</p>
                  <select
                    className=" mt-[4px] px-[10px] py-[10px] rounded-md bg-[#F9F9F9] outline-none border border-[#D9D9D9] text-[14px] font-[Poppins]"
                    {...register('category', { required: true })}
                    defaultValue={templates[0]?.category || ''}
                  >
                    <option value="" disabled>Please select</option>
                    <option value="template">template</option>
                    <option value="free template">free template</option>
                    <option value="pricing">pricing</option>
                  </select>
                  {errors.category && <span className="text-red-400">Please select a category</span>}
                </div>

                <div className="flex flex-col w-[100%]">
                  <p className="text-[14px] leading-[21px] font-[Poppins] font-[400]">Title</p>
                  <input
                    type="text"
                    defaultValue={templates[0]?.title || ''}
                    placeholder="Text Here"
                    className="border mt-[4px] border-grey pl-[22px] mr-[30px] py-[8px] rounded-md bg-[#F9F9F9] outline-none border border-[#D9D9D9] text-[14px] font-[Poppins] w-full"
                    {...register('title', { required: true })}
                  />
                  {errors.title && <span className="text-red-400">Title is required</span>}
                </div>
              </div>

              {/* Description */}
              <div className="flex mt-[30px] max-w-[100%] w-full items-center">
                <div className="flex flex-col">
                  <p className="text-[14px] leading-[21px] font-[Poppins] font-[400]">Description</p>
                  <textarea
                    defaultValue={templates[0]?.description || ''}
                    placeholder="Text Here"
                    cols={300}
                    className="pl-[10px] resize-none border mt-[4px] w-full border-grey px-[22px] py-[8px] rounded-md bg-[#F9F9F9] outline-none border border-[#D9D9D9] text-[14px] font-[Poppins]"
                    {...register('description', { required: true })}
                  />
                  {errors.description && <span className="text-red-400">Description is required</span>}
                </div>
              </div>
            </div>

            {/* Image Upload Section */}
            <div className="flex flex-col mt-[30px] lg:w-[30%] xl:w-[30%] md:w-[40%] w-[90%]">
              <div
                className="h-[263px] border-2 border-[#293950] border-dashed rounded-lg bg-[#E7E8F1] flex items-center justify-center"
                onClick={() => fileInputRef.current.click()}
              >
                {mainCoverImage ? (
                  <img src={mainCoverImage} alt="Uploaded preview" className="object-cover w-full h-full rounded-lg" />
                ) : (
                  <div className="w-[32px] h-[32px] rounded-full bg-white flex items-center justify-center">
                    <img src={Image} alt="Upload icon" />
                  </div>
                )}
              </div>
              <input type="file" ref={fileInputRef} onChange={handleFileChange} style={{ display: 'none' }} />
              {errors.coverImage && <span className="text-red-400">Please select an image</span>}
            </div>
          </div>

          {/* Template Content */}
          {templates.map((template, index) => (
            <div key={index}>
              <h2 className="text-[20px] leading-[30px] font-[Poppins] font-[500] mt-[40px]">Template Content {index + 1}</h2>
              <div className="w-full border border-[#D9D9D9] rounded-lg mt-[15px] p-[30px] flex flex-col">
                {/* Title Input */}
                <div className="w-full flex flex-col lg:flex-row xl:flex-row lg:items-center sm:items-start lg:gap-[50px] xl:gap-[50px]">
                  <p className="text-[16px] leading-[21px] font-[400] font-[Poppins]">Title</p>
                  <div className="flex flex-col w-full">
                    <input
                      type="text"
                      defaultValue={template.title || ''}
                      onChange={(e) => handleInputChange(e, index, 'title')}
                      placeholder="Text Here"
                      className="w-full border mt-[4px] border-[#D9D9D9] bg-[#F9F9F9] pl-[16px] py-[10px] rounded-md outline-none text-[16px] font-[Poppins]"
                      {...register(`templates.${index}.title`, { required: true })}
                    />
                    {errors.templates && errors.templates[index]?.title && (
                      <span className="text-red-400">Title is required</span>
                    )}
                  </div>
                </div>
                {/* Other template fields... */}
              </div>
            </div>
          ))}
        </div>

        <div className="w-full flex justify-end mt-[40px]">
          <button type="submit" className="bg-[#293950] text-white px-[40px] py-[10px] rounded-lg">Save Changes</button>
        </div>
      </div>
      <lable htmlFor='email'>email</lable>
      <input value={values.email} className='border-2 border-black'/>
    </form>
  );
};

export default EditTemplates;
