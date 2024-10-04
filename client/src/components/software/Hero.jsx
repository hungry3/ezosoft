import React from 'react'
import Dashboard from '/src/assets/images/about-dashboard.svg'

function Hero() {
  return (
    <>
       <div className='bg-gradient -mt-[100px]'>
    <div className='lg:mx-[100px] xl:mx-[100px] md:mx-[50px] mx-[30px] pt-[100px] flex flex-wrap items-center justify-between'>

    <div>
   <div className='flex items-center justify-start'>
    <p className='text-white text-[40px] leading-[70px] mt-[120px] '>Software Working Page</p>
    </div>
    <p className=' max-w-[607px] w-full text-white text-[16px] leading-[26px] font-[Poppins] font-[400] pb-[127px]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.</p>
   </div>

   {/* img */}
   <div className=''> <img src={Dashboard} alt='dashboard image' loading='lazy' className='z-10 flex items-end justify-end object-cover translate-y-20'/></div>

    </div>
    
 

    </div>
    <div className='w-full h-[16px] bg-cyanDark'></div>
    </>
  )
}

export default Hero;
