import React from 'react'
import Signature from '/src/assets/images/signature2.svg'
import Circle from '/src/assets/images/mobileCircle.svg'
import SmartPhone from '/src/assets/images/smartphone_mockup_isolated_5 1.svg'

function Mobile() {
  return (
    <>
      <div className='flex flex-wrap gap-[20px] justify-between bg-lightBlue lg:px-[100px] xl:px-[100px] px-[30px] overflow-hidden'>
        <div className=' py-[100px] flex flex-col items-start justify-start gap-5'>
          <h2 className='text-[40px] leading-[42px] '>Get Mobile App</h2>
          <p className='max-w-[500px] text-[16px] leading-[26px] text-[Poppins]'>Deliver faster, collaborate better and innovate more effectively  without the high price tag or months-long implementation</p>
          <img src={Signature} alt='comming soon'/>
          </div>
         
         <div className='flex items-end justify-end overflow-hidden'>
         <div className='relative'>
            <img src={Circle} alt='mobile showcase' loading='lazy' className='opacity-20'/>
         </div>
         <div className='absolute justify-center'>
            <img src={SmartPhone} alt='smart phone' loading='lazy'/>
         </div>
         </div>
      </div>
    </>
  )
}

export default Mobile
