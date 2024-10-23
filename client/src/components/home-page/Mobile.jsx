import React from 'react'
import Signature from '/src/assets/images/signature2.svg'
import Circle from '/src/assets/images/mobileCircle.svg'
import SmartPhone from '/src/assets/images/Iphone14.svg'

function Mobile() {
  return (
    <>
      <div className='flex lg:flex-row xl:flex-row md:flex-row flex-col lg:gap-0 xl:gap-0 gap-[150px] justify-around bg-lightBlue lg:px-[100px] xl:px-[100px] px-[30px] overflow-hidden'>
        <div className=' py-[100px] flex flex-col items-start justify-start gap-5'>
          <h2 className='text-[40px] leading-[42px] '>Get Mobile App</h2>
          <p className='max-w-[500px] text-[16px] leading-[26px] text-[Poppins]'>Deliver faster, collaborate better and innovate more effectively  without the high price tag or months-long implementation</p>
          <img src={Signature} alt='comming soon'/>
          </div>
         
         <div className='flex items-end justify-center overflow-hidden mt-[50px]'>
         <div className='relative'>
            <img src={Circle} alt='mobile showcase' loading='lazy' className='opacity-20'/>
         </div>
        
            <img src={SmartPhone} alt='smart phone' loading='lazy' className='absolute pl-[35px]'/>
         
         </div>
      </div>
    </>
  )
}

export default Mobile
