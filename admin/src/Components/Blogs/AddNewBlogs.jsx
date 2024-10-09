import React, { useState, useRef } from 'react';
import Image from '/src/assets/images/admin-dashboard-image-icon.svg';
import { useForm } from 'react-hook-form';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { axiosConfig } from '../../utils/axiosConfig';

const AddNewBlogs = () => {
  const [blog, setBlog] = useState({
    title: '',
    content: '',
    details: [{ title: '', description: '', image: null }],
    image: null,
    author: '',
    category: ''
  });

  const fileInputRef = useRef(null);
  const detailImageRefs = useRef([]); 
  const { register, handleSubmit, setValue, formState: { errors }, refresh } = useForm();

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleCoverImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setBlog((prevBlog) => ({ ...prevBlog, image: file }));
    }
  };

  const handleDetailsChange = (event, detailIndex, field) => {
    const updatedBlog = { ...blog };
    updatedBlog.details[detailIndex][field] = event.target.value;
    setBlog(updatedBlog);
  };

  const handleDetailImageChange = (event, detailIndex) => {
    const file = event.target.files[0];
    if (file) {
      const updatedBlog = { ...blog };
      updatedBlog.details[detailIndex].image = file;
      setBlog(updatedBlog);
    }
  };

  const handleBlogChange = (event, field) => {
    const updatedBlog = { ...blog };
    updatedBlog[field] = event.target.value;
    setBlog(updatedBlog);
  };

  const handleContentChange = (value) => {
    setBlog((prevBlog) => ({ ...prevBlog, content: value }));
  };

  const handleDetailDescriptionChange = (value, detailIndex) => {
    const updatedBlog = { ...blog };
    updatedBlog.details[detailIndex].description = value;
    setBlog(updatedBlog);
  };

  const addNewDetail = () => {
    const newDetail = { title: '', description: '', image: null };
    setBlog((prevBlog) => ({
      ...prevBlog,
      details: [...prevBlog.details, newDetail]
    }));
    detailImageRefs.current.push(React.createRef());
  };

  const removeDetail = (index) => {
    const updatedDetails = blog.details.filter((_, detailIndex) => detailIndex !== index);
    setBlog((prevBlog) => ({
      ...prevBlog,
      details: updatedDetails
    }));
    detailImageRefs.current.splice(index, 1);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('category', blog.category);
    formData.append('author', blog.author);
    formData.append('title', blog.title);
    formData.append('content', blog.content);

    if (blog.image) {
      formData.append('image', blog.image);
    }

    blog.details.forEach((detail, index) => {
      formData.append(`details[${index}][title]`, detail.title);
      formData.append(`details[${index}][description]`, detail.description);
      if (detail.image) {
        formData.append(`details[${index}][image]`, detail.image);
      }
    });

    try {
      const response = await axiosConfig.post('/blog/create', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.status === 201) {
        console.log('Blog created successfully:', response.data);
        refresh()
      } else {
        console.error('Error creating blog:', response.statusText);
      }
    } catch (error) {
      console.error('Error uploading blog:', error);
      if (error.response) {
        console.error('Server responded with:', error.response.data);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error in setting up the request:', error.message);
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleUpload)} encType="multipart/form-data">
        <div className='flex flex-col w-full bg-[#F9F9F9]'>
          <div className='lg:m-[40px] xl:m-[40px] md:m-[20px] bg-white border rounded-md px-[10px] py-[30px] lg:px-[40px] xl:px-[40px] md:px-[40px] flex flex-col'>
            <h2 className='text-[20px] leading-[30px] font-[500] font-[Poppins]'>Add New Blog</h2>
            <div className='flex flex-col md:flex-row lg:flex-row xl:flex-row w-[100%] gap-[20px]'>
              <div className='w-full flex flex-col gap-[50px]'>
                {/* Blog Category and Author */}
                <div className='flex flex-col md:flex-row lg:flex-row xl:flex-row mt-[30px] w-[100%] gap-[30px] xl:items-center lg:items-center md:items-center items-start'>
                  <div className='flex flex-col lg:w-[40%] xl:w-[40%] md:w-[40%] w-[100%]'>
                    <p className='text-[14px] leading-[21px] font-[Poppins] font-[400]'>Category</p>
                    <select className='mt-[4px] px-[10px] py-[10px] rounded-md bg-[#F9F9F9] outline-none border border-[#D9D9D9] text-[14px] font-[Poppins]' {...register('category', { required: true })} value={blog.category} onChange={(e) => handleBlogChange(e, 'category')}>
                      <option value='' disabled>Please select</option>
                      <option value='template'>Template</option>
                      <option value='free template'>Free Template</option>
                      <option value='lifestyle'>Lifestyle</option>
                    </select>
                    {errors.category && <span className='text-red-400'>Please select a category</span>}
                  </div>

                  <div className='flex flex-col w-[100%]'>
                    <p className='text-[14px] leading-[21px] font-[Poppins] font-[400]'>Author</p>
                    <input type='text' placeholder='Author Name' className='mt-[4px] pl-[22px] py-[8px] rounded-md bg-[#F9F9F9] outline-none border border-[#D9D9D9] text-[14px] font-[Poppins] w-full' {...register('author', { required: true })} value={blog.author} onChange={(e) => handleBlogChange(e, 'author')} />
                    {errors.author && <span className='text-red-400'>Author is required</span>}
                  </div>
                </div>

                {/* Blog Title */}
                <div className='flex flex-col'>
                  <p className='text-[14px] leading-[21px] font-[Poppins] font-[400]'>Title</p>
                  <input type='text' placeholder='Blog Title' className='mt-[4px] pl-[22px] py-[8px] rounded-md bg-[#F9F9F9] outline-none border border-[#D9D9D9] text-[14px] font-[Poppins] w-full' {...register('title', { required: true })} value={blog.title} onChange={(e) => handleBlogChange(e, 'title')} />
                  {errors.title && <span className='text-red-400'>Title is required</span>}
                </div>

                {/* Blog Content */}
                <div className='flex flex-col mt-[30px]'>
                  <p className='text-[14px] leading-[21px] font-[Poppins] font-[400]'>Content</p>
                  <ReactQuill theme="snow" value={blog.content} onChange={handleContentChange} placeholder='Blog content' className='h-full' />
                  {errors.content && <span className='text-red-400'>Content is required</span>}
                </div>

                {/* Cover Image */}
                <div className='mt-[30px]'>
                  <p className='text-[14px] leading-[21px] font-[Poppins] font-[400]'>Cover Image</p>
                  <div className='h-[263px] border-2 border-[#293950] border-dashed rounded-lg bg-[#E7E8F1] flex items-center justify-center' onClick={handleImageClick}>
                    {blog.image ? (
                      <img src={URL.createObjectURL(blog.image)} alt='Uploaded preview' className='object-cover w-full h-full rounded-lg' />
                    ) : (
                      <div className='w-[32px]'>
                        <img src={Image} alt='Placeholder' className='cursor-pointer' />
                      </div>
                    )}
                    <input type='file' accept='image/*' ref={fileInputRef} onChange={handleCoverImageChange} style={{ display: 'none' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Blog Details */}
            <div className='mt-[40px]'>
              <p className='text-[14px] leading-[21px] font-[Poppins] font-[400]'>Blog Details</p>
              {blog.details.map((detail, detailIndex) => (
                <div key={detailIndex} className='border rounded-lg mt-[30px]'>
                  <div className='flex justify-end m-[10px]'>
                    <button type='button' className='px-[8px] py-[4px] bg-red-500 text-white rounded-md' onClick={() => removeDetail(detailIndex)}>
                      Remove
                    </button>
                  </div>
                  <div className='p-[30px]'>
                    <div className='flex flex-col'>
                      <p className='text-[14px] leading-[21px] font-[Poppins] font-[400]'>Title</p>
                      <input type='text' placeholder='Detail Title' className='mt-[4px] pl-[22px] py-[8px] rounded-md bg-[#F9F9F9] outline-none border border-[#D9D9D9] text-[14px] font-[Poppins] w-full' value={detail.title} onChange={(e) => handleDetailsChange(e, detailIndex, 'title')} />
                    </div>

                    <div className='flex flex-col mt-[30px]'>
                      <p className='text-[14px] leading-[21px] font-[Poppins] font-[400]'>Description</p>
                      <ReactQuill theme="snow" value={detail.description} onChange={(value) => handleDetailDescriptionChange(value, detailIndex)} placeholder='Detail description' className='h-full' />
                    </div>

                    <div className='mt-[30px]'>
                      <p className='text-[14px] leading-[21px] font-[Poppins] font-[400]'>Detail Image</p>
                      <div className='h-[263px] border-2 border-[#293950] border-dashed rounded-lg bg-[#E7E8F1] flex items-center justify-center' onClick={() => detailImageRefs.current[detailIndex].click()}>
                        {detail.image ? (
                          <img src={URL.createObjectURL(detail.image)} alt='Detail preview' className='object-cover w-full h-full rounded-lg' />
                        ) : (
                          <div className='w-[32px]'>
                            <img src={Image} alt='Placeholder' className='cursor-pointer' />
                          </div>
                        )}
                        <input type='file' accept='image/*' ref={(el) => (detailImageRefs.current[detailIndex] = el)} onChange={(e) => handleDetailImageChange(e, detailIndex)} style={{ display: 'none' }} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div className='mt-[30px]'>
                <button type='button' className='px-[10px] py-[8px] rounded-lg bg-[#293950] text-white' onClick={addNewDetail}>
                  Add New Detail
                </button>
              </div>
            </div>

            <div className='mt-[50px]'>
              <button type='submit' className='px-[20px] py-[10px] rounded-lg bg-[#293950] text-white'>
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default AddNewBlogs;
