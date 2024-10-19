import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { axiosConfig } from '../../utils/axiosConfig';
import Image from '/src/assets/images/admin-dashboard-image-icon.svg';
import { ToastContainer,toast } from 'react-toastify';
const EditBlog = () => {
  const { blogId } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const detailImageRefs = useRef([]);
  const [submit,setSubmit] =  useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm();

  const [blog, setBlog] = useState({
    title: '',
    content: '',
    details: [{ title: '', description: '', image: null }],
    image: null,
    author: '',
    category: ''
  });

  const [categories,setCategories] = useState([])
  const [loading,setLoading] = useState(false)
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true)
      try {
        const { data } = await axiosConfig.get('/admin/blog-categories');
        setCategories(data?.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
      setLoading(false)
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { data } = await axiosConfig.get(`/blog/${blogId}`);
        const blogData = data?.data;
        console.log("blogdata>>>>>>>>>",blogData)
        setBlog({
          title: blogData.title,
          content: blogData.content,
          details: blogData.details || [{ title: '', description: '', image: null }],
          image: blogData.image || null,
          author: blogData.author,
          category: blogData.category
        });
      } catch (error) {
        console.error('Error fetching blog data:', error);
      }
    };
    fetchBlog();
  }, [blogId]);

  const handleBlogChange = (event, field) => {
    setBlog({ ...blog, [field]: event.target.value });
  };

  const handleContentChange = (value) => {
    setBlog({ ...blog, content: value });
  };

  const handleDetailsChange = (value, detailIndex, field) => {
    const updatedDetails = [...blog.details];
    updatedDetails[detailIndex][field] = value;
    setBlog({ ...blog, details: updatedDetails });
  };

  const handleCoverImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setBlog((prevBlog) => ({ ...prevBlog, image: file }));
    }
  };

  const handleDetailImageChange = (event, detailIndex) => {
    const file = event.target.files[0];
    if (file) {
      const updatedDetails = [...blog.details];
      updatedDetails[detailIndex].image = file;
      setBlog({ ...blog, details: updatedDetails });
    }
  };

  const addNewDetail = () => {
    setBlog((prevBlog) => ({
      ...prevBlog,
      details: [...prevBlog.details, { title: '', description: '', image: null }]
    }));
    detailImageRefs.current.push(React.createRef());
  };

  const removeDetail = (index) => {
    const updatedDetails = blog.details.filter((_, detailIndex) => detailIndex !== index);
    setBlog({ ...blog, details: updatedDetails });
    detailImageRefs.current.splice(index, 1);
  };
  const onSubmit = async () => {
    const formData = new FormData();
    formData.append('category', blog.category);
    formData.append('author', blog.author);
    formData.append('title', blog.title);
    formData.append('content', blog.content);
    if (blog.image instanceof File) {
      formData.append('image', blog.image);
    } else {
      formData.append('image', blog.image);
    }
    blog.details.forEach((detail, index) => {
      formData.append(`details[${index}][title]`, detail.title);
      formData.append(`details[${index}][description]`, detail.description);
      if (detail.image instanceof File) {
        formData.append(`details[${index}][image]`, detail.image);
      } else if (detail.image) {
        formData.append(`details[${index}][image]`, detail.image);
      }
    });
    
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }
    try {
      setSubmit(true)
      const response = await axiosConfig.post(`/blog/edit/${blogId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      
      });

      if (response.status === 200) {
        toast.success('Blog updated successfully!');
        navigate('/allblogs');
      } else {
        toast.error('Something went Wrong Please try again later')
        console.error('Error updating blog:', response.statusText);
      }
      setSubmit(false)
    } catch (error) {
      toast.error('Something went Wrong Please try again later')
      console.error('Error updating blog:', error);
    }
  };

  return (
    <>
      <ToastContainer/>
   
    <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
      <div className='flex flex-col w-full bg-[#F9F9F9]'>
        <div className='lg:m-[40px] xl:m-[40px] md:m-[20px] bg-white border rounded-md px-[10px] py-[30px] lg:px-[40px] xl:px-[40px] md:px-[40px] flex flex-col'>
          <h2 className='text-[20px] leading-[30px] font-[500] font-[Poppins]'>Edit Blog</h2>
          
          <div className='flex flex-col md:flex-row lg:flex-row xl:flex-row w-[100%] gap-[20px]'>
            <div className='w-full flex flex-col gap-[50px]'>

              {/* Blog Category and Author */}
              <div className='flex flex-col md:flex-row lg:flex-row xl:flex-row mt-[30px] w-[100%] gap-[30px] xl:items-center lg:items-center md:items-center items-start'>
                <div className='flex flex-col lg:w-[40%] xl:w-[40%] md:w-[40%] w-[100%]'>
                  <p className='text-[14px] leading-[21px] font-[Poppins] font-[400]'>Category</p>
                  <select className='mt-[4px] px-[10px] py-[10px] rounded-md bg-[#F9F9F9] outline-none border border-[#D9D9D9] text-[14px] font-[Poppins]' {...register('category', )} value={blog.category} onChange={(e) => handleBlogChange(e, 'category')}>
                    <option value='' disabled>Please select</option>
                    {categories.map((category)=>(

                      <option key={category._id} value={category.name}>{category.name}</option>
                    ))}
                  
                   
                  </select>
                  {errors.category && <span className='text-red-400'>Please select a category</span>}
                </div>

                <div className='flex flex-col w-[100%]'>
                  <p className='text-[14px] leading-[21px] font-[Poppins] font-[400]'>Author</p>
                  <input type='text' placeholder='Author Name' className='mt-[4px] pl-[22px] py-[8px] rounded-md bg-[#F9F9F9] outline-none border border-[#D9D9D9] text-[14px] font-[Poppins] w-full' {...register('author',)} defaultValue={blog.author} onChange={(e) => handleBlogChange(e, 'author')} />
                  {errors.author && <span className='text-red-400'>Author is required</span>}
                </div>
              </div>

              {/* Blog Title */}
              <div className='flex flex-col'>
                <p className='text-[14px] leading-[21px] font-[Poppins] font-[400]'>Title</p>
                <input type='text' placeholder='Blog Title' className='mt-[4px] pl-[22px] py-[8px] rounded-md bg-[#F9F9F9] outline-none border border-[#D9D9D9] text-[14px] font-[Poppins] w-full' {...register('title', )} defaultValue={blog.title} onChange={(e) => handleBlogChange(e, 'title')} />
              
              </div>

              {/* Blog Content */}
              <div className='flex flex-col mt-[30px]'>
                <p className='text-[14px] leading-[21px] font-[Poppins] font-[400]'>Content</p>
                <ReactQuill theme="snow" value={blog?.content} onChange={handleContentChange} placeholder='Blog content' className='h-[230px]' />
              </div>
              
              {/* Cover Image */}
              <div className='mt-[30px]'>
                <p className='text-[14px] leading-[21px] font-[Poppins] font-[400]'>Cover Image</p>
                <div onClick={() => fileInputRef.current.click()} className='w-[500px] flex flex-col items-center justify-center border border-[#D9D9D9] bg-[#FAFAFA] cursor-pointer rounded-md h-[300px] mt-[4px]'>
                <div className='w-[500px] h-[300px]'>
                {blog.image ? <img src={typeof blog.image === 'string' ? blog.image : URL.createObjectURL(blog.image)} alt='Cover' className='object-cover w-full h-full' /> : <img src={Image} alt="Placeholder" className='object-cover w-full h-full' />}
                </div>
                 
                </div>
                <input type='file' accept='image/*' ref={fileInputRef} onChange={handleCoverImageChange} style={{ display: 'none' }} />
              </div>
              
              {/* Blog Details */}
              <div className='flex flex-col'>
                <p className='text-[24px] leading-[21px] font-[Poppins] font-[600] mt-[30px]'>Details</p>
                {blog.details.map((detail, index) => (
  <div key={index} className='flex flex-col border border-[#D9D9D9] bg-[#FAFAFA] rounded-md p-[20px] mt-[10px] gap-[10px]'>
 <div className='flex items-center justify-start gap-4'><div className='text-[18px]  '>Title:</div>
 <input
      type='text'
      placeholder='Detail Title'
      className='mt-[4px] px-[22px] py-[8px] rounded-md bg-[#F9F9F9] outline-none border border-[#D9D9D9] text-[14px] font-[Poppins] w-full'
      value={detail.title}
      onChange={(e) => handleDetailsChange(e.target.value, index, 'title')}
    />
 </div>

 <div className='flex items-start justify-start gap-4 mt-4'>
<div className='text-[18px]'> Description</div>
<ReactQuill
      theme="snow"
      value={detail.description}
      onChange={(value) => handleDetailsChange(value, index, 'description')}
      className='h-[200px] w-full'
    />
</div>
   
    {/* Display image if exists */}
    <div className='mt-[10px]'>
      {detail.image && (
        <div className=' flex flex-col items-center justify-center border border-[#D9D9D9] bg-[#FAFAFA] cursor-pointer mt-10 rounded-md h-[300px] w-[500px]'>
          {/* Check if it's a File or URL */}
          {typeof detail.image === 'string' ? (
            <div className='w-[500px] h-[300px]'>
            <img src={detail.image} alt='Detail' className='object-cover w-full h-full' />

            </div>
          ) : (
            <div className='w-[500px] h-[300px]'>
            <img src={URL.createObjectURL(detail.image)} alt='Detail' className='object-cover w-full h-full' />

            </div>
          )}
        </div>
      )}
    </div>

    <input
      type='file'
      accept='image/*'
      ref={(el) => (detailImageRefs.current[index] = el)}
      onChange={(e) => handleDetailImageChange(e, index)}
      className='mt-[10px] w'
    />
    {blog.details.length > 1 && (
      <button
        type='button'
        className='mt-[10px] bg-red-500 text-white px-[10px] py-[5px] rounded-md'
        onClick={() => removeDetail(index)}
      >
        Remove
      </button>
    )}
  </div>
))}<div className='flex justify-start'>
  
<button type='button' className='bg-blue text-white px-[20px] py-[10px] rounded-md mt-[10px]' onClick={addNewDetail}>Add New Detail</button>
</div>
              </div>

              {/* Update Blog Button */}
              {submit ? (
                <div className='flex justify-end'><button  className=' cursor-not-allowed bg-lime-500 text-white px-[20px] py-[10px] rounded-md mt-[30px]'>Uploading...</button></div>
              ):(
                  <div className='flex justify-end'> <button type='submit' className=' bg-lime-500 text-white px-[20px] py-[10px] rounded-md mt-[30px]'>Update Blog</button></div>
              )}
            
              
            </div>
          </div>
        </div>
      </div>
    </form>
    </>
  );
};

export default EditBlog;
