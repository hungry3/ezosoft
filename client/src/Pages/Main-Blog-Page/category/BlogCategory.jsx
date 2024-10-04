import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';



import { axiosConfig } from '../../../utils/axiosConfig';
import BlogLoader from '../../../components/Loaders/blogLoader';
import formatDate from '../../../utils/dateFormat';
import Navbar from '../../../components/Navbar';
import BlogNavbar from '../../../components/Main-Blog/BlogNavbar';
import Footer from '../../../components/Footer';

const fetchBlogsByCategory = async (category) => {
    const { data } = await axiosConfig.get(`/blog/category/${category}`);
    return data;
  };

const CategoryPage = () => {
  const { category } = useParams();
  const { data, isLoading, error } = useQuery({
    queryKey: ['blogsByCategory', category],
    queryFn: () => fetchBlogsByCategory(category), 
  });

  

//   if (error) {
//     return <div>Error fetching blogs: {error.message}</div>;
//   }

  const blogs = data?.data || [];

  return (
    <>
    

    <BlogNavbar/>
    <div className="mx-[100px] mt-[100px]">
      <h1 className="mb-4 text-5xl font-bold">Blogs in {category}</h1>
      <div className="flex flex-wrap justify-start gap-4">

      { isLoading ? ( Array(10).fill(0).map((_, index) => (
                  <BlogLoader key={index} />
                ))) :(

        blogs.map((blog) => (
            <NavLink to={`/blog/${blog._id}`} key={blog._id} className='flex flex-col p-[31px]'>
           
           <img src={blog.image} alt='image' className='relative rounded-tr-md rounded-tl-md'/>
           <div className='absolute mt-[20px] ml-[13px]  py-[2px] px-[12px] rounded-full bg-blue text-center text-white capitalize text-nowrap'>{blog.category}</div>

           <div className='flex gap-[8px] mt-[24px] items-center'>
           <p className='text-[14px] font-[Poppins] font-[400] text-black ml-3'>Author:</p>
               <p className='text-[14px] font-[Poppins] font-[400] text-darkGrey  capitalize text-nowrap'>{blog.author}</p>
               <div className='w-[3px] h-[3px] rounded-full bg-blue'></div>
               <p className='text-[14px] font-[Poppins] font-[400] text-darkGrey text-nowrap mr-3'>{formatDate(blog.createdAt)}</p>  
           </div>
           <p className='mt-[16px] max-w-[293px] w-full text-[20px] font-[Poppins] leading-[28px] font-bold '>{blog.title}</p>
           <p className='mt-[16px] max-w-[293px] w-full text-[16px] font-[Poppins] leading-[24px] font-[400]'>{blog.content.slice(0,130)}{blog.content.length > 130 ? '...' : ''}</p>
      
       </NavLink>
        )
      )
       )}
      </div>
    </div>
    <Footer/>
    
    </>
  );
};

export default CategoryPage;
