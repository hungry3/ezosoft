import React from 'react'
import Image from '/src/assets/images/5thSection-image.svg'
import AOS from 'aos';
import 'aos/dist/aos.css';
function FifthSection() {
  AOS.init({
    duration: 1000, 
    delay: 300,     
  });
  return (
    <>
       <div className='bg-lightBlue'>
        <div className='lg:m-[100px] xl:m-[100px] md:m-[50px] m-[30px] lg:py-[100px] py-[50px]  flex flex-wrap justify-between gap-[20px]'>
      
       {/* text */}
       <div className='flex flex-col justify-center gap-4'  data-aos="zoom-in-right" data-aos-delay="400">
        <p className='max-w-[542px] text-[30px] sm:text-[40px] leading-[40px] md:leading-[50px] font-[500]'>We Can Help You Save Time And Money in Your Business</p>
        <p className='max-w-[494px] text-[16pxpx] leading-[23px] font-[400] font-[Poppins]'>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.</p>
        <p className='max-w-[494px] text-[16pxpx] leading-[23px] font-[400] font-[Poppins]'>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.</p>
       </div>
       {/* image */}
       <div  data-aos="zoom-out-right" data-aos-delay="400">
        <img src={Image} alt='image' loading='lazy'/>
       </div>
        </div>
      </div>
    </>
  )
}

export default FifthSection
