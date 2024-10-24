

const  Hero =({tittle,subtittle}) => {
  return (
    <>
       <div className='bg-blue -mt-[100px]'>
    <div className='lg:mx-[100px] xl:mx-[100px] md:mx-[70px] sm:mx-[50px] mx-[30px] flex flex-wrap items-center justify-center pt-[100px] lg:gap-[200px]'>

    <div className='pb-[100px]'>
   <div className='flex items-center justify-center'>
    <p className='text-white lg:text-[40px] xl:text-[40px] md:text-[35px] text-[30px] lg:leading-[70px] xl:leading-[70px] leading-[50px] lg:mt-[120px] xl:mt-[120px] md:mt-[100px] sm:mt-[70px] mt-[50px] '>{tittle}</p>
    </div>
    <p className=' max-w-[500px] text-center text-white text-[16px] leading-[26px] font-[Poppins] font-[400] mt-[20px]'>{subtittle}</p>
     {/*<div className="flex items-center justify-start ">
          <button className="bg-cyan    hover:bg-lightBlue hover:border border-white text-white px-4 py-2 rounded-md hover:bg- font-[Poppins]">
          Use Template 
          </button>
        </div> */}
   </div>

   {/* img */}
   {/* <div className=''> <img src={Dashboard} alt='dashboard image here' loading='lazy'  className='z-10 flex items-end justify-end object-cover translate-y-20'/></div> */}

    </div>
    
 

    </div>
    <div className='w-full h-[16px] bg-cyanDark'></div>
    </>
  )
}

export default Hero


