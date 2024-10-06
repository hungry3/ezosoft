

const  Hero =({tittle,subtittle}) => {
  return (
    <>
       <div className='bg-blue -mt-[100px]'>
    <div className='mx-[100px] flex flex-wrap items-center justify-center pt-[100px] lg:gap-[200px]'>

    <div className='pb-[100px]'>
   <div className='flex items-center justify-center'>
    <p className='text-white text-[40px] leading-[70px] mt-[120px] '>{tittle}</p>
    </div>
    <p className=' max-w-[450px] text-center text-white text-[16px] leading-[26px] font-[Poppins] font-[400] mt-[20px]'>{subtittle}</p>
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


