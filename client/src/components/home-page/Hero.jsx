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
      className="relative w-full -mt-[100px]   lg:pt-[100px] md:pt-[0px] sm:pt-[100px] xl:pt-[100px] lg:h-[115vh] xl:h-[115vh] md:h-[120vh] sm:h-[90vh] h-[80vh]  bg-[url('/src/assets/images/mainBg.svg')] bg-cover bg-center">
    {/* bg-[url("/src/assets/images/bgTrail.svg")]  */}
    
      <div className="relative z-10 flex flex-col items-center justify-center h-full ">
      
      <div className='max-w-[870.33px] w-full lg:max-w-[1000px] xl:max-w-[1000px] justify-center text-center items-center  md:pt-[0px] lg:pt-[10px] pt-[400px]'>
        <h2 className="lg:text-[70px] xl:text-[70px] md:text-[50px] sm:text-[40px] text-[30px] text-white  md:leading-70 lg:leading-70 xl:leading-70 leading-[40px] font-[500]">Project Management <span className='font-blod' style={{fontWeight:"bold"}}>Software </span> for Business Excellence</h2>

        <div className='flex flex-col items-center justify-center mt-8 '>
        <div className='font-[Poppins] max-w-[540px] text-center  text-white leading-24 mx-[20px]'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.
        </div>

     {/* //! input field section is here */}
     <div className='flex flex-col sm:flex-row md:flex-row lg:flex-row xl:flex-row items-center sm:w-[85%] md:w-[70%] w-[90%] gap-4 mt-8 lg:w-[450px] xl:w-[450px] '>
        <input type="text" className=' outline-none  px-4 py-2 w-full rounded-md font-[Poppins]' placeholder='Enter your email address' />
        <NavLink to="/signup" className='bg-cyanDark rounded-md hover:bg-gradient hover:border border-white sm:w-auto lg:w-auto md:w-auto xl:w-auto w-[100%] '>
        <button className='  text-white  py-2  px-5 rounded text-nowrap font-[Poppins]'>Start Free Trial</button>
        </NavLink>
       
       
        </div>
      </div>
    
    </div>
<div className='mt-32 sm:-mb-[280px] shadow-custom bouncing-image ' >
        
<img src={banner} alt='banner' loading='lazy'/>
</div>

    </div>
    


    </div>
    
    </div>


  );
};

export default Hero;

