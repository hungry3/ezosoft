const BlogSkeleton = () => {
    return (
      <div className='mx-[100px]'>
        <div className='flex flex-col justify-start'>

          <div className='flex flex-col items-start'>
            <div className='w-[400px] h-[54px] bg-gray-300 rounded-md animate-pulse mt-[100px]'></div>
            <div className='w-[600px] h-[26px] bg-gray-300 rounded-md animate-pulse mt-[10px]'></div>
          </div>
 
          <div className='w-full max-w-[800px] mt-[40px]'>
            <div className='w-full h-[400px] bg-gray-300 rounded-md animate-pulse'></div>
          </div>
  
          <div className='mt-[30px]'>
            {[1, 2, 3].map((_, index) => (
              <div key={index} className='flex flex-col items-start'>
                <div className='w-[300px] h-[24px] bg-gray-300 rounded-md animate-pulse mt-[20px]'></div>
                <div className='w-[700px] h-[26px] bg-gray-300 rounded-md animate-pulse mt-[6px]'></div>
                <div className='w-full h-[300px] bg-gray-300 rounded-md animate-pulse mt-[27px]'></div>
              </div>
            ))}
          </div>
  
      
          <div className='flex flex-col items-start mt-[83px] pb-[100px]'>
            <div className='w-[200px] h-[24px] bg-gray-300 rounded-md animate-pulse'></div>
            <div className='flex flex-wrap gap-[30px] w-full mt-[20px]'>
              {[1, 2, 3].map((_, index) => (
                <div
                  key={index}
                  className='flex flex-col mt-[27px] max-w-[388px] w-full border border-[#EBEBEB] rounded-xl'
                >
            
                  <div className='w-full h-[200px] bg-gray-300 rounded-tr-md rounded-tl-md animate-pulse'></div>
  
               
                  <div className='ml-[31px] pb-[20px]'>
                    <div className='w-[100px] h-[20px] bg-gray-300 rounded-full animate-pulse mt-[20px]'></div>
                    <div className='flex gap-[10px] mt-[24px] items-center'>
                      <div className='w-[50px] h-[14px] bg-gray-300 rounded-md animate-pulse'></div>
                      <div className='w-[50px] h-[14px] bg-gray-300 rounded-md animate-pulse'></div>
                      <div className='w-[3px] h-[3px] rounded-full bg-gray-300 animate-pulse'></div>
                      <div className='w-[50px] h-[14px] bg-gray-300 rounded-md animate-pulse'></div>
                    </div>
                    <div className='w-[200px] h-[28px] bg-gray-300 rounded-md animate-pulse mt-[16px]'></div>
                    <div className='w-[293px] h-[24px] bg-gray-300 rounded-md animate-pulse mt-[16px]'></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default BlogSkeleton;
  