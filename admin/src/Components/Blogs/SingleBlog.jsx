import  { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { axiosConfig } from '../../utils/axiosConfig';
import GlobalLoader from '../../utils/GlobalLoader';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';


const ViewBlog = () => {
  const { blogId } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
   const axiosPrivate = useAxiosPrivate()
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { data } = await axiosPrivate.get(`/blog/${blogId}`);
        const blogData = data?.data;
        console.log(blogData);
        
        setBlog(blogData);
      } catch (error) {
        console.error('Error fetching blog data:', error);
        navigate('/allblogs');
      }
    };
    fetchBlog();
  }, [blogId, navigate]);

  if (!blog) {
    return <div><GlobalLoader/></div>; 
  }

  return (
    <div className='flex flex-col w-full bg-[#F9F9F9]'>
      <div className='lg:m-[40px] xl:m-[40px] md:m-[20px] bg-white border rounded-md px-[10px] py-[30px] lg:px-[40px] xl:px-[40px] md:px-[40px] flex flex-col'>
      <div className='flex items-start w-full mt-[20px]'>
      <div className='flex flex-col items-start justify-start w-full'>
      <div className='text-[40px] leading-[54px] font-[600]  items-start'>{blog.title}</div>
      <div className='mt-[6px]  text-[16px] leading-[26px] font-[400] font-[Poppins]' dangerouslySetInnerHTML={{ __html: blog.content }} />
      </div>
      
           
           
            <div className='w-full max-w-[350px] h-[150px] mb-10'>
            <img src={blog.image} alt='image' loading='lazy' className='object-cover w-full h-full rounded-lg '/>  
            </div>
            </div>


<div>
{blog.details && blog.details.map((detail, index) => (
   <div key={index}>
     <div className='flex flex-col items-start'>
      
       
        <div className='mt-[6px]  ' dangerouslySetInnerHTML={{ __html:detail?.description}} />
     </div>
     <div className='w-full max-w-[500px] h-[300px] mt-[27px]'>

    
     </div>
   </div>
))}
          
            </div>
      </div>
    </div>
  );
};

export default ViewBlog;










