import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

function Section2() {
  // Define the state for the active paragraph
  const [activeIndex, setActiveIndex] = useState(0);

  // Data array for the items
  const paragraphs = [
    'Getting Started',
    'Managing Projects',
    'Project views',
    'Getting Started',
    'Managing Projects',
    'Project views',
    'Getting Started',
    'Managing Projects',
    'Project views',
    'Getting Started',
    'Managing Projects',
    'Project views',
    
  ];

  return (
    <>
      <div className='mx-[30px] md:mx-[50px] lg:mx-[200px] xl:mx-[200px] mt-[35px] pb-[100px]'>
        <p className='text-[18px] text-[19px] font-[500] font-[Poppins] text-[#197990]'>
          Ezosoft Knowledge Base / Getting started
        </p>

        <div className='mt-[35px] flex flex-wrap gap-[50px]'>
          <div className='flex flex-col max-w-[213px]  gap-[10px]'>
            {paragraphs.map((text, index) => (
              <div
                key={index}
                onClick={() => setActiveIndex(index)} // Set the active index on click
                className={`text-[16px] text-[19px] font-[400] font-[Poppins] rounded-md px-2 cursor-pointer ${
                  activeIndex === index ? 'bg-[#ADD8E6]' : '' // Change background color if active
                }`}
              >
                {text}
              </div>
            ))}
          </div>
         <div className='flex flex-col'>
            <p className='text-[40px] text-[20px] font-[500] font-bold'>Getting started</p>
            <p className='mt-[19px] text-[16px] text-[20px] font-[400] font-[Poppins]'>Our intuitive software makes it simple for your team to get started with EzoSoft.</p>
            <div className='mt-[29px] max-w-[693px] border border-[#E7E8F1]'></div>

            <div className='flex flex-col mt-[35px]'>
         <p className='text-[24px] leading-[24px] font-[500] font-semibold'>Software Basics</p>
         <p className='text-[16px] leading-[19px] font-[400] font-[Poppins] text-[#197990] mt-[23px]'>Setting Up Your Account</p>
         <NavLink to="/pricing" className='text-[16px] leading-[19px] font-[400] font-[Poppins] text-[#197990] mt-[12px]'>Navigating the Software</NavLink>
         <p className='text-[14px] leading-[16px] font-[400] font-[Poppins] text-[#58595B] mt-[18px]'>See all articles</p>
        </div>
        <div className='mt-[29px] max-w-[693px] border border-[#E7E8F1]'></div>
        
        <div className='flex flex-col mt-[35px]'>
         <p className='text-[24px] leading-[24px] font-[500] font-semibold'>Software Basics</p>
         <p className='text-[16px] leading-[19px] font-[400] font-[Poppins] text-[#197990] mt-[23px]'>Setting Up Your Account</p>
         <NavLink to="/pricing" className='text-[16px] leading-[19px] font-[400] font-[Poppins] text-[#197990] mt-[12px]'>Navigating the Software</NavLink>
         <p className='text-[14px] leading-[16px] font-[400] font-[Poppins] text-[#58595B] mt-[18px]'>See all articles</p>
        </div>
        <div className='mt-[29px] max-w-[693px] border border-[#E7E8F1]'></div>
        
         </div>

        </div>
      </div>
    </>
  );
}

export default Section2;


// import React from 'react'

// function Section2() {
//   return (
//     <>
//       <div className='mx-[100px] mt-[35px]'>
//       <p className='text-[18px] text-[19px] font-[500] font-[Poppins] text-[#197990]'>Ezosoft Knowledge Base / Getting started</p>

//       <div className='mt-[35px] flex flex-wrap'>
//       <div className='flex flex-col max-w-[213px] gap-3'>
//       <p className='text-[16px] text-[19px] font-[400] font-[Poppins]'>Getting Started</p>
//       <p className='text-[16px] text-[19px] font-[400] font-[Poppins]'>Managing Projects</p>
//       <p className='text-[16px] text-[19px] font-[400] font-[Poppins]'>Project views</p>

//       <p className='text-[16px] text-[19px] font-[400] font-[Poppins]'>Getting Started</p>
//       <p className='text-[16px] text-[19px] font-[400] font-[Poppins]'>Managing Projects</p>
//       <p className='text-[16px] text-[19px] font-[400] font-[Poppins]'>Project views</p>

//       <p className='text-[16px] text-[19px] font-[400] font-[Poppins]'>Getting Started</p>
//       <p className='text-[16px] text-[19px] font-[400] font-[Poppins]'>Managing Projects</p>
//       <p className='text-[16px] text-[19px] font-[400] font-[Poppins]'>Project views</p>

//       <p className='text-[16px] text-[19px] font-[400] font-[Poppins]'>Getting Started</p>
//       <p className='text-[16px] text-[19px] font-[400] font-[Poppins]'>Managing Projects</p>
//       <p className='text-[16px] text-[19px] font-[400] font-[Poppins]'>Project views</p>

//       <p className='text-[16px] text-[19px] font-[400] font-[Poppins]'>Getting Started</p>
//       <p className='text-[16px] text-[19px] font-[400] font-[Poppins]'>Managing Projects</p>
//       <p className='text-[16px] text-[19px] font-[400] font-[Poppins]'>Project views</p>




//       </div>

//       </div>

//       </div>
//     </>
//   )
// }

// export default Section2
