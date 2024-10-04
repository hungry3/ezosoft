import React from 'react'
import Image from '/src/assets/images/5thSection-image.svg'

function FifthSection() {
  return (
    <>
       <div className='bg-[#E4F7FF]'>
        <div className='lg:m-[100px] xl:m-[100px] md:m-[50px] m-[30px] flex flex-wrap justify-between gap-[20px]'>
      
       {/* text */}
       <div className='flex flex-col justify-center gap-4'>
        <p className='max-w-[542px] text-[40px] leading-[50px] font-[500]'>We Can Help You Save Time And Money in Your Business</p>
        <p className='max-w-[494px] text-[16pxpx] leading-[23px] font-[400] font-[Poppins]'>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.</p>
        <p className='max-w-[494px] text-[16pxpx] leading-[23px] font-[400] font-[Poppins]'>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.</p>
       </div>
       {/* image */}
       <div>
        <img src={Image} alt='image' loading='lazy'/>
       </div>
        </div>
      </div>
    </>
  )
}

export default FifthSection
