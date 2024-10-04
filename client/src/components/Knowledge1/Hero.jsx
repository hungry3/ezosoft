import React from 'react'

function Hero() {
  return (
    <>
       <div className='bg-gradient -mt-[100px] '>

       <div className='bg-[url("/src/assets/images/bgTrail.svg")] bg-cover  h-[100%] w-[100%]  bg-no-repeat '>

      
    <div className='lg:mx-[200px] xl:mx-[200px] md:mx-[100px] mx-[30px] flex pb-[94px]'>

    <div className='w-full'>
   <div className='flex items-center justify-start pt-[100px]'>
    <h1 className='text-white text-[40px] lg:leading-[70px] xl:leading-70 leading-[50px] mt-[84px]  '>How can we help you today?</h1>
    </div>
    <input type='text' className='max-w-[944px] w-full h-[44px] outline-none pl-[26px] rounded-md text-[16px] font-[Poppins] mt-[15px]' placeholder='Search for answers'/>
   </div>


    </div>
    
 
   </div>
    </div>
    <div className='w-full h-[16px] bg-cyanDark'></div>
    </>
  )
}

export default Hero
