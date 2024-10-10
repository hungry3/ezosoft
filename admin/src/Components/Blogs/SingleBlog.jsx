import  { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { axiosConfig } from '../../utils/axiosConfig';


const ViewBlog = () => {
  const { blogId } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { data } = await axiosConfig.get(`/blog/${blogId}`);
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
    return <div>Loading...</div>; 
  }

  return (
    <div className='flex flex-col w-full bg-[#F9F9F9]'>
      <div className='lg:m-[40px] xl:m-[40px] md:m-[20px] bg-white border rounded-md px-[10px] py-[30px] lg:px-[40px] xl:px-[40px] md:px-[40px] flex flex-col'>
        <h2 className='text-[20px] leading-[30px] font-[500] font-[Poppins]'>{blog.title}</h2>
        <p className='text-[14px] leading-[21px] font-[Poppins] mt-[10px]'>By: {blog.author}</p>
        <p className='text-[14px] leading-[21px] font-[Poppins] mt-[10px]'>Category: {blog.category}</p>
        

        {blog.image && (
          <div className='mt-[20px]'>
            <img src={blog.image} alt='Cover' className='object-cover w-full h-[300px]' />
          </div>
        )}
        

        <div className='mt-[30px]'>
          <h3 className='text-[16px] leading-[24px] font-[500] font-[Poppins]'>Content</h3>
          <div className='mt-[10px]' dangerouslySetInnerHTML={{ __html: blog.content }} />
        </div>
        
    
        {blog.details && blog.details.length > 0 && (
          <div className='mt-[30px]'>
            <h3 className='text-[16px] leading-[24px] font-[500] font-[Poppins]'>Details</h3>
            {blog.details.map((detail, index) => (
              <div key={index} className='mt-[20px] border border-[#D9D9D9] p-[20px] bg-[#FAFAFA] rounded-md'>
                <h4 className='text-[14px] leading-[21px] font-[Poppins] font-[400]'>{detail.title}</h4>
                <div className='mt-[10px]' dangerouslySetInnerHTML={{ __html: detail.description }} />
                {detail.image && (
                  <img src={detail.image} alt={`Detail ${index}`} className='object-cover w-full h-[200px] mt-[10px]' />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewBlog;
