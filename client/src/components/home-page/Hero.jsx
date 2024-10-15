// import React from 'react';

import banner from '../../assets/images/bannerHomePage.svg'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { NavLink } from 'react-router-dom';
const Hero = () => {
    AOS.init({
      duration: 1000, 
      delay: 200,     
    });
  
  return (
    <div>
    <div
      className="relative w-full -mt-[100px] lg:h-[126vh] xl:[110vh]  bg-[url('/src/assets/images/mainBg.svg')] bg-cover bg-center">
    {/* bg-[url("/src/assets/images/bgTrail.svg")]  */}
    
      <div className="relative z-10 flex flex-col items-center justify-center h-full "
      >
      <div className='mt-[130px]'>
      <div className='max-w-[870.33px] w-full justify-center text-center items-center  lg:pt-[300px]'>
        <h2 className="text-4xl text-white lg:text-6xl xl:text-6xl md:text-4xl sm:text-3xl expo-medium lg:leading-70 xl:leading-70 leading-[50px]">Project Management <span className='font-bold text-[]'>Software </span> for Business Excellence</h2>

        <div className='flex flex-col items-center justify-center mt-8 '>
        <div className='font-[Poppins] max-w-[540px] text-center  text-white leading-24 mx-[20px]'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.
        </div>

     {/* //! input field section is here */}
      <div className='flex items-center sm:w-[85%] gap-2 mt-8 lg:w-1/2 xl:w-1/2 '>
        <input type="text" className=' outline-none  px-4 py-2 w-full rounded-md font-[Poppins]' placeholder='Enter your email address' />
        <NavLink to="/signup">
        <button className=' bg-cyanDark hover:bg-gradient hover:border border-white text-white  py-2  px-8 rounded text-nowrap font-[Poppins]'>Sign Up</button>
        </NavLink>
       
      
       
        </div>
      </div>
    </div>
    </div>
<div className='mt-32 shadow-custom bouncing-image ' >
        
<img src={banner} alt='banner' loading='lazy'/>
</div>

    </div>
    


    </div>
    
    </div>


  );
};

export default Hero;

