
import Icon from '/src/assets/images/blog-categories-forward-icon.svg'
import { useQuery } from '@tanstack/react-query';
import { axiosConfig } from '../../utils/axiosConfig'
import formatDate from '../../utils/dateFormat'
import BlogLoader from '../Loaders/BlogLoader'
import { NavLink } from 'react-router-dom'

const fetchBlogs = async () => {
  const { data } = await axiosConfig.get('/blog/all'); 
  return data;
};


const fetchCategoryCount = async () => {
  const { data } = await axiosConfig.get('/blog/category-count');
  return data;
};

const BodyContent = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: 'blogs',
    queryFn: fetchBlogs,
  });

  const { data: categoryData, isLoading: isCategoryLoading } = useQuery({
    queryKey: 'category-count',
    queryFn: fetchCategoryCount,
  });

  const categories = categoryData?.data || [];

  console.log(categories);
  



  if (error) {
    console.log(error);
    
  };

 
  const blogs = data?.data || [];
  console.log(blogs);
  

  
  return (
    <>
      <div className='mt-[100px] lg:mx-[100px] xl:mx-[100px] md:mx-[40px] mx-[20px] flex flex-col-reverse md:flex-row lg:flex-row xl:flex-row  gap-[50px]'>
     
        <div className='flex flex-wrap justify-start w-full gap-[20px]'>
            <div className='w-[851px] border border-[#EBEBEB] rounded-md flex lg:flex-row xl:flex-row md:flex-row flex-col justify-between'>

            {/* card */}
            { blogs.slice(0,1).map((blog)=>(

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
            ))}  

                {/* category item */}
              <div className='flex flex-col max-w-[403px]  mt-[31px] px-[31px]'>
              {blogs.slice(1,4).map((blog) =>
               <NavLink to={`/blog/${blog._id}`} key={blog._id}  className='flex flex-col pb-[20px] mx-[13px]'>
                
                <div className='flex gap-[20px]'>
                    <img src={blog.image} alt={blog.title} className='max-w-[110px] max-h-[80px] rounded-lg'/>
                    <div className='flex flex-col gap-2'>
                        <p className='max-w-[162px] w-full text-[15px] leading-[21px] font-[Poppins] font-bold  '>{blog.title}</p>
                        <p className='max-w-[162px] w-full text-[16px] leading-[25px] text-[#58595B] font-[Poppins] font-normal'>{formatDate(blog.createdAt)}</p>
                    </div>
                </div>

                <div className='border border-[#EBEBEB] mt-[20px] '></div>
                
               </NavLink>)}
              </div>
            </div>
            <div>
            {/* <BlogLoader/> */}
            </div>

            { isLoading ?  Array(10).fill(0).map((_, index) => (
                  <BlogLoader key={index} />
                )) :  blogs.slice(4).map((blog)=>
                <NavLink to={`/blog/${blog._id}`} key={blog._id} className='flex flex-col mt-[31px] max-w-[396px] w-full border border-[#EBEBEB] rounded-xl'>
                    <img src={blog.image} alt={blog.title} className='relative rounded-tr-md rounded-tl-md'/>
                    <div className='absolute  ml-[22px] mt-[20px] py-[2px] px-[12px] rounded-full bg-blue text-center text-white'>{blog.category}</div>

                    <div className='ml-[31px] pb-[20px]'>
                    <div className='flex gap-[10px] mt-[24px] items-center'>
                    <p className='text-[14px] font-[Poppins] font-[400] '>Author</p>
                        <p className='text-[14px] font-[Poppins] font-[400] text-darkGrey'>{blog.author}</p>
                        <div className='w-[3px] h-[3px] rounded-full bg-blue'></div>
                        <p className='text-[14px] font-[Poppins] font-[400] text-darkGrey'>{formatDate(blog.createdAt)}</p>  
                    </div>
                    <p className='mt-[16px] max-w-[293px] w-full text-[20px] font-[Poppins] leading-[28px] font-bold '>{blog.title}</p>
                    <p className='mt-[16px] max-w-[293px] w-full text-[16px] font-[Poppins] leading-[24px] font-[400]'>{blog.content.slice(0,130)}{blog.content.length > 130 ? '...' : ''}</p>
                    </div>
                </NavLink>
            )}


        </div>
     
    

       {/* sidebar */}
        <div className='max-w-[356px] w-full border rounded-md border-[#EBEBEB] h-[100%] pt-[46px] items-center justify-start'>
        <p className='text-[24px] leading-[28px] font-[Poppins] font-[600] text-center'>Categories</p>
        
        
        {isCategoryLoading ? (
          <BlogLoader  />
          ) :(
            categories.map((items,index) => <NavLink to={`/blog/category/${items._id}`} key={index} className='mx-[31px]  flex flex-col  cursor-pointer' 
        >
        <div className='flex items-center justify-between w-full'>
            <div className='flex items-center'>
            <img src={Icon} alt={items._id} className='max-w-[28px] max-h-[28px] mr-[16px]' />
            <p className='text-[16px] leading-[44px] font-[Poppins] font-[600] mr-[100px]'>{items._id}</p>
            </div>
            <p className='text-[15px] leading-[44px] font-[Poppins] font-[400] text-[#8F9BAD]'>({items.count})</p>
            
        </div>
        <div className="relative w-full">
          <div className="border-t border-[#EBEBEB] w-full mt-[4px] h-[1px]" style={{
             maskImage: 'linear-gradient(to left, transparent, #fff 25%, #fff 150%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, #fff 25%, #fff 150%, transparent)',

    
           }}>
           </div>



         </div>


        </NavLink>))}

        </div>

      </div>
    </>
  )
}

export default BodyContent
