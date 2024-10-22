
import { NavLink, useParams } from 'react-router-dom'
import { axiosConfig } from '../../utils/axiosConfig'
import { useQuery } from '@tanstack/react-query';
import formatDate from '../../utils/dateFormat'
// import BlogLoader from '../Loaders/blogLoader'
import BlogSkeleton from '../Loaders/BlogSekeleton'
import { truncateContent } from '../../utils/TextLimmit';

function Section1() {
 
const {id} = useParams()

const fetchBlog = async () => {
  const response = await axiosConfig.get(`/blog/${id}`);
  return response.data;
};


const fetchAllBlogs = async () => {
  const response = await axiosConfig.get('/blog/all');
  return response.data;
};
const { data: allBlogsData, isLoading: allBlogsLoading } = useQuery({
  queryKey: ['allBlogs'],
  queryFn: fetchAllBlogs,
});
const allBlogs = allBlogsData?.data || [];
console.log(allBlogs);


const { data, isLoading } = useQuery({
  queryKey: ['blog', id],
  queryFn: fetchBlog,
});


const blog = data?.data || [];
console.log(blog);


const similarBlogs = allBlogs
  .filter((item) => item.category === blog.category && item.id !== id)
  .sort(() => 0.5 - Math.random()) 
  .slice(0, 3);
console.log("similarBlogs",similarBlogs);

  return (
    <>
    {isLoading ? ( <BlogSkeleton/>):(


  <div className='mx-[100px]'>
        <div className='flex flex-col justify-start'>
  
            <div className='flex flex-col items-start'> <p className='text-[40px] leading-[54px] font-[600] mt-[100px] items-start'>{blog.title}</p>
            <div className='mt-[6px]  text-[16px] leading-[26px] font-[400] font-[Poppins]' dangerouslySetInnerHTML={{ __html: blog.content }} />
           
            </div>
            


<div>
{blog.details && blog.details.map((detail, index) => (
   <div key={index}>
     <div className='flex flex-col items-start'>
      
       
        <div className='mt-[6px]  text-[16px] leading-[26px] font-[400] font-[Poppins]' dangerouslySetInnerHTML={{ __html:detail?.description}} />
     </div>
    
   </div>
))}
          
            </div>
            <div  className='flex flex-col items-start mt-[83px] pb-[100px]'>
           
           <p className='mt-[20px] text-[24px] font-[Poppins] font-[500]'>Similar Blog</p>
           <div className='flex flex-wrap gap-[30px] w-full'>

                
{similarBlogs.map((items)=>
  
   <NavLink to={`/blog/${items._id}`} key={items._id} className='flex flex-col mt-[27px] max-w-[388px] w-full border border-[#EBEBEB] rounded-xl'>
        <img src={items.image} alt={items.title} className='relative rounded-tr-xl rounded-tl-xl w-[400px] h-[237px]'/>
        <div className='absolute  ml-[22px] mt-[20px] py-[2px] px-[8px] rounded-full bg-blue text-center text-white'>{items.category}</div>

        <div className='ml-[31px] pb-[20px]'>
        <div className='flex gap-[10px] mt-[24px] items-center'>
        <p className='text-[14px] font-[Poppins] font-[400] '>Author:</p>
            <p className='text-[14px] font-[Poppins] font-[400] text-darkGrey text-nowrap'>{items.author}</p>
            <div className='w-[3px] h-[3px] rounded-full bg-blue'></div>
            <p className='text-[14px] font-[Poppins] font-[400] text-darkGrey text-nowrap'>{formatDate(items.createdAt)}</p>  
        </div>
        <p className='mt-[16px] max-w-[293px] w-full text-[20px] font-[Poppins] leading-[28px] font-bold '>{items.title}</p>
          <p className='mt-[16px] max-w-[293px] w-full text-[16px] font-[Poppins] leading-[24px] font-[400]' dangerouslySetInnerHTML={{__html:truncateContent(items.content)}}/>
        </div>
    </NavLink>
   
)}
  </div>

            </div>

          

        </div>


      </div>
  

      
    )}
     
    </>
  )
}

export default Section1
