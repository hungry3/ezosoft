import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { axiosConfig } from '../../utils/axiosConfig';
import Image from '/src/assets/images/admin-dashboard-image-icon.svg';
import { ToastContainer,toast } from 'react-toastify';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import TextEditor from '../../utils/TextEditor';
import GlobalLoader from '../../utils/GlobalLoader';
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
   const axiosPrivate = useAxiosPrivate()
  
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true)
      try {
        const { data } = await axiosPrivate.get('/admin/blog-categories');
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
        const { data } = await axiosPrivate.get(`/blog/${blogId}`);
        const blogData = data?.data;
        console.log("blogdata>>>>>>>>>",blogData)
        setBlog({
          title: blogData.title || '',
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
  // console.log(blog,"Blogdata");

  const handleBlogChange = (event, field) => {
    setBlog({ ...blog, [field]: event.target.value });
  };

  const handleContentChange = (event) => {
    const value = event.target.value
    setBlog({ ...blog, content: value });
  };

  const handleDetailsChange = (value, detailIndex, field) => {
    const updatedDetails = [...blog.details];
    updatedDetails[detailIndex][field] = value;
    setBlog({ ...blog, details: updatedDetails });
  };
 console.log(blog);
 
  const handleCoverImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setBlog((prevBlog) => ({ ...prevBlog, image: file }));
    }
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
      const response = await axiosPrivate.post(`/blog/edit/${blogId}`, formData, {
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
      setSubmit(false)
    }
  };

  return (
    <>
      <ToastContainer/>
      {loading? ( <GlobalLoader/>) :(
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
      <div className='flex flex-col w-full bg-[#F9F9F9]'>
        <div className='lg:m-[40px] xl:m-[40px] md:m-[20px] bg-white border rounded-md px-[10px] py-[30px] lg:px-[40px] xl:px-[40px] md:px-[40px] flex flex-col'>
          <h2 className='text-[20px] leading-[30px] font-[500] font-[Poppins]'>Edit Blog</h2>
          
          <div className='flex flex-col md:flex-row lg:flex-row xl:flex-row w-[100%] gap-[20px]'>
            <div className='w-full flex flex-col gap-[50px]'>

             {/* Cover Image */}
             <div className='flex w-full gap-3'>
             <div className='w-full '>

{/* Blog Category and Author */}
<div className='flex flex-col  md:flex-row lg:flex-row xl:flex-row mt-[30px] w-[100%] gap-[30px] xl:items-center lg:items-center md:items-center items-start'>
  <div className='flex flex-col lg:w-[100%] xl:w-[100%] md:w-[100%] w-[100%]'>
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
    <input type='text' placeholder='Author Name' className='mt-[4px] pl-[22px] py-[8px] rounded-md bg-[#F9F9F9] outline-none border border-[#D9D9D9] text-[14px] font-[Poppins] w-full' {...register('author',)} value={blog.author} onChange={(e) => handleBlogChange(e, 'author')} />
    {errors.author && <span className='text-red-400'>Author is required</span>}
  </div>
</div>

{/* Blog Title */}
<div className='flex flex-col mt-5'>
  <p className='text-[14px] leading-[21px] font-[Poppins] font-[400]'>Title</p>
  <input type='text' placeholder='Blog Title' className='mt-[4px] pl-[22px] py-[8px] rounded-md bg-[#F9F9F9] outline-none border border-[#D9D9D9] text-[14px] font-[Poppins] w-full' {...register('title', )} value={blog.title} onChange={(e) => handleBlogChange(e, 'title')} />

</div>
</div>
              

              <div className='mt-[30px]'>
                <p className='text-[14px] leading-[21px] font-[Poppins] font-[400]'>Cover Image</p>
                <div onClick={() => fileInputRef.current.click()} className='w-[350px] flex flex-col items-center justify-center border border-[#D9D9D9] bg-[#FAFAFA] cursor-pointer rounded-md h-[150px] mt-[4px]'>
                <div className='w-[350px] h-[150px] rounded'>
                {blog.image ? <img src={typeof blog.image === 'string' ? blog.image : URL.createObjectURL(blog.image)} alt='Cover' className='object-cover w-full h-full rounded-lg' /> : <img src={Image} alt="Placeholder" className='object-cover w-full h-full rounded' />}
                </div>
                 
                </div>
                <input type='file' accept='image/*' ref={fileInputRef} onChange={handleCoverImageChange} style={{ display: 'none' }} />
              </div>
             </div>
            
             

              {/* Blog Content */}
              <div className='flex flex-col mt-[30px]'>
                <p className='text-[14px] leading-[21px] font-[Poppins] font-[400]'>Description</p>
                <input type='text'  value={blog?.content} onChange={handleContentChange} placeholder='Blog content' className='mt-[4px] pl-[22px] py-[8px] rounded-md bg-[#F9F9F9] outline-none border border-[#D9D9D9] text-[14px] font-[Poppins] w-full' />
              </div>
              
             
              
              {/* Blog Details */}
              <div className='flex flex-col'>
              <div className=''> Content</div>
              
                {blog.details.map((detail, index) => (
  <div key={index} className="">
 <div className='flex items-start justify-start gap-4 mt-4'>
<TextEditor
      theme="snow"
      value={detail.description}
      onChange={(value) => handleDetailsChange(value, index, 'description')}
      className='h-[200px] w-full'
    />
</div>
   

  </div>
))}<div className='flex justify-start'>
  

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
      )}
   
    
    </>
  );
};

export default EditBlog;
