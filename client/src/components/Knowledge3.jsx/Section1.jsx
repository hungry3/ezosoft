import React, { useState } from 'react'
import Image from '/src/assets/images/knowledge3-image.svg'

function Section1() {
     // Define the state for the active paragraph
  const [activeIndex, setActiveIndex] = useState(0); 
  const [isOpen, setIsOpen] = useState(false); // Control dropdown visibility

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

  const handleDropdownToggle = () => {
    setIsOpen(!isOpen); // Toggle dropdown visibility
  };
  const handleItemClick = (index) => {
    setActiveIndex(index); // Set the clicked index as active
    setIsOpen(false); // Close the dropdown after selecting an item
  };
  return (
    <>
      <div className='mx-[30px] md:mx-[50px] lg:mx-[200px] xl:mx-[200px] mt-[35px] pb-[100px]'>
        <p className=' text-[19px] font-[500] font-[Poppins] text-[#197990]'>
          Ezosoft Knowledge Base / Getting started / Software Basics
        </p>

        <div className='mt-[35px] flex flex-col sm:flex-row md:flex-row lg:flex-row xl:flex-row gap-[50px]'>
          <div className=' flex-col max-w-[213px]  gap-[10px] hidden sm:flex'>  
            {paragraphs.map((text, index) => (
              <div
                key={index}
                onClick={() => setActiveIndex(index)} // Set the active index on click
                className={` text-[19px] font-[400] font-[Poppins] rounded-md p-2 cursor-pointer ${
                  activeIndex === index ? 'bg-[#ADD8E6]' : '' // Change background color if active
                }`}
              >
                {text}
              </div>
            ))}
          </div>
           
          <div
        className="text-[19px] font-[400] font-[Poppins] bg-gray-200 rounded-md py-2 px-2 cursor-pointer sm:hidden"
        onClick={handleDropdownToggle}
      >
        {/* Show selected item or default text */}
        {activeIndex !== null ? paragraphs[activeIndex] : "Select an option"}
      </div>
       {/* Dropdown Menu */}
       {isOpen && (
        <div className="absolute w-full mt-2 bg-white rounded-md shadow-md">
          {paragraphs.map((text, index) => (
            <div
              key={index}
              onClick={() => handleItemClick(index)} // Select an option
              className={`text-[19px] font-[400] font-[Poppins] py-2 px-2 cursor-pointer hover:bg-[#ADD8E6] ${
                activeIndex === index ? "bg-[#ADD8E6]" : ""
              }`}
            >
              {text}
            </div>
          ))}
        </div>
      )}

         {activeIndex === 0 && <div className='flex flex-col pb-[123px] w-[80%]'>
            <p className='text-[40px] text-[20px] font-[500] font-[Poppins]'>Software FAQs</p>
            <p className='mt-[22px] leading-[33px] text-[22px] font-[400] font-[Poppins]'>We've outlined some frequently asked questions. If you don't see your question answered below, please email support@ezosoft.com</p>
            <div className='mt-[33px] text-[24px] leading-[24px] font-[600] font-[Poppins] '>General & Getting Started</div>
            <p className=' mt-[25px] leading-[20px] text-[18px] font-[600] font-[Poppins]'>Q: How does Project Manager differ from other software options?</p>
            <p className=' mt-[5px] leading-[26px] text-[16px] font-[400] font-[Poppins]'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>
            <p className=' mt-[5px] leading-[26px] text-[16px] font-[400] font-[Poppins]'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>

            <p className='mt-[25px] leading-[20px] text-[18px] font-[600] font-[Poppins]'>Q: How does Project Manager differ from other software options?</p>
            <p className=' mt-[5px] leading-[26px] text-[16px] font-[400] font-[Poppins]'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>
            <div className='mt-[25px] flex items-center justify-center'>
                <img src={Image} alt='image' loading='lazy'/>
            </div>

            <p className='mt-[25px] leading-[20px] text-[18px] font-[600] font-[Poppins]'>Q: How does Project Manager differ from other software options?</p>
            <p className=' mt-[5px] leading-[26px] text-[16px] font-[400] font-[Poppins]'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>
        

            <div className='mt-[25px] flex items-center justify-center'>
                <img src={Image}  alt='image' loading='lazy'/>
            </div>

            <p className=' mt-[25px] leading-[20px] text-[18px] font-[600] font-[Poppins]'>Q: How does Project Manager differ from other software options?</p>
            <p className=' mt-[5px] leading-[26px] text-[16px] font-[400] font-[Poppins]'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>
            <p className=' mt-[5px] leading-[26px] text-[16px] font-[400] font-[Poppins]'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>

         </div>}
         {activeIndex === 1 && <div className='flex flex-col pb-[123px] w-[80%]'>
            <p className='text-[40px] text-[20px] font-[500] font-[Poppins]'>Software FAQs</p>
            <p className='mt-[22px] leading-[33px] text-[22px] font-[400] font-[Poppins]'>We've outlined some frequently asked questions. If you don't see your question answered below, please email support@ezosoft.com</p>
            <div className='mt-[33px] text-[24px] leading-[24px] font-[600] font-[Poppins] '>General & Getting Started</div>
            <p className=' mt-[25px] leading-[20px] text-[18px] font-[600] font-[Poppins]'>Q: How does Project Manager differ from other software options?</p>
            <p className=' mt-[5px] leading-[26px] text-[16px] font-[400] font-[Poppins]'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>
            <p className=' mt-[5px] leading-[26px] text-[16px] font-[400] font-[Poppins]'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>

            <p className='mt-[25px] leading-[20px] text-[18px] font-[600] font-[Poppins]'>Q: How does Project Manager differ from other software options?</p>
            <p className=' mt-[5px] leading-[26px] text-[16px] font-[400] font-[Poppins]'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>
            <div className='mt-[25px] flex items-center justify-center'>
                <img src={Image} alt='image' loading='lazy'/>
            </div>

            <p className='mt-[25px] leading-[20px] text-[18px] font-[600] font-[Poppins]'>Q: How does Project Manager differ from other software options?</p>
            <p className=' mt-[5px] leading-[26px] text-[16px] font-[400] font-[Poppins]'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>
        

            <div className='mt-[25px] flex items-center justify-center'>
                <img src={Image}  alt='image' loading='lazy'/>
            </div>

            <p className=' mt-[25px] leading-[20px] text-[18px] font-[600] font-[Poppins]'>Q: How does Project Manager differ from other software options?</p>
            <p className=' mt-[5px] leading-[26px] text-[16px] font-[400] font-[Poppins]'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>
            <p className=' mt-[5px] leading-[26px] text-[16px] font-[400] font-[Poppins]'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>

         </div>}
         {activeIndex === 2 && <div className='flex flex-col pb-[123px] w-[80%]'>
            <p className='text-[40px] text-[20px] font-[500] font-[Poppins]'>Software FAQs</p>
            <p className='mt-[22px] leading-[33px] text-[22px] font-[400] font-[Poppins]'>We've outlined some frequently asked questions. If you don't see your question answered below, please email support@ezosoft.com</p>
            <div className='mt-[33px] text-[24px] leading-[24px] font-[600] font-[Poppins] '>General & Getting Started</div>
            <p className=' mt-[25px] leading-[20px] text-[18px] font-[600] font-[Poppins]'>Q: How does Project Manager differ from other software options?</p>
            <p className=' mt-[5px] leading-[26px] text-[16px] font-[400] font-[Poppins]'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>
            <p className=' mt-[5px] leading-[26px] text-[16px] font-[400] font-[Poppins]'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>

            <p className='mt-[25px] leading-[20px] text-[18px] font-[600] font-[Poppins]'>Q: How does Project Manager differ from other software options?</p>
            <p className=' mt-[5px] leading-[26px] text-[16px] font-[400] font-[Poppins]'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>
            <div className='mt-[25px] flex items-center justify-center'>
                <img src={Image} alt='image' loading='lazy'/>
            </div>

            <p className='mt-[25px] leading-[20px] text-[18px] font-[600] font-[Poppins]'>Q: How does Project Manager differ from other software options?</p>
            <p className=' mt-[5px] leading-[26px] text-[16px] font-[400] font-[Poppins]'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>
        

            <div className='mt-[25px] flex items-center justify-center'>
                <img src={Image}  alt='image' loading='lazy'/>
            </div>

            <p className=' mt-[25px] leading-[20px] text-[18px] font-[600] font-[Poppins]'>Q: How does Project Manager differ from other software options?</p>
            <p className=' mt-[5px] leading-[26px] text-[16px] font-[400] font-[Poppins]'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>
            <p className=' mt-[5px] leading-[26px] text-[16px] font-[400] font-[Poppins]'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>

         </div>}
         {activeIndex === 3 && <div className='flex flex-col pb-[123px] w-[80%]'>
            <p className='text-[40px] text-[20px] font-[500] font-[Poppins]'>Software FAQs</p>
            <p className='mt-[22px] leading-[33px] text-[22px] font-[400] font-[Poppins]'>We've outlined some frequently asked questions. If you don't see your question answered below, please email support@ezosoft.com</p>
            <div className='mt-[33px] text-[24px] leading-[24px] font-[600] font-[Poppins] '>General & Getting Started</div>
            <p className=' mt-[25px] leading-[20px] text-[18px] font-[600] font-[Poppins]'>Q: How does Project Manager differ from other software options?</p>
            <p className=' mt-[5px] leading-[26px] text-[16px] font-[400] font-[Poppins]'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>
            <p className=' mt-[5px] leading-[26px] text-[16px] font-[400] font-[Poppins]'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>

            <p className='mt-[25px] leading-[20px] text-[18px] font-[600] font-[Poppins]'>Q: How does Project Manager differ from other software options?</p>
            <p className=' mt-[5px] leading-[26px] text-[16px] font-[400] font-[Poppins]'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>
            <div className='mt-[25px] flex items-center justify-center'>
                <img src={Image} alt='image' loading='lazy'/>
            </div>

            <p className='mt-[25px] leading-[20px] text-[18px] font-[600] font-[Poppins]'>Q: How does Project Manager differ from other software options?</p>
            <p className=' mt-[5px] leading-[26px] text-[16px] font-[400] font-[Poppins]'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>
        

            <div className='mt-[25px] flex items-center justify-center'>
                <img src={Image}  alt='image' loading='lazy'/>
            </div>

            <p className=' mt-[25px] leading-[20px] text-[18px] font-[600] font-[Poppins]'>Q: How does Project Manager differ from other software options?</p>
            <p className=' mt-[5px] leading-[26px] text-[16px] font-[400] font-[Poppins]'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>
            <p className=' mt-[5px] leading-[26px] text-[16px] font-[400] font-[Poppins]'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>

         </div>}
         {activeIndex === 4 && <div className='flex flex-col pb-[123px] w-[80%]'>
            <p className='text-[40px] text-[20px] font-[500] font-[Poppins]'>Software FAQs</p>
            <p className='mt-[22px] leading-[33px] text-[22px] font-[400] font-[Poppins]'>We've outlined some frequently asked questions. If you don't see your question answered below, please email support@ezosoft.com</p>
            <div className='mt-[33px] text-[24px] leading-[24px] font-[600] font-[Poppins] '>General & Getting Started</div>
            <p className=' mt-[25px] leading-[20px] text-[18px] font-[600] font-[Poppins]'>Q: How does Project Manager differ from other software options?</p>
            <p className=' mt-[5px] leading-[26px] text-[16px] font-[400] font-[Poppins]'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>
            <p className=' mt-[5px] leading-[26px] text-[16px] font-[400] font-[Poppins]'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>

            <p className='mt-[25px] leading-[20px] text-[18px] font-[600] font-[Poppins]'>Q: How does Project Manager differ from other software options?</p>
            <p className=' mt-[5px] leading-[26px] text-[16px] font-[400] font-[Poppins]'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>
            <div className='mt-[25px] flex items-center justify-center'>
                <img src={Image} alt='image' loading='lazy'/>
            </div>

            <p className='mt-[25px] leading-[20px] text-[18px] font-[600] font-[Poppins]'>Q: How does Project Manager differ from other software options?</p>
            <p className=' mt-[5px] leading-[26px] text-[16px] font-[400] font-[Poppins]'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>
        

            <div className='mt-[25px] flex items-center justify-center'>
                <img src={Image}  alt='image' loading='lazy'/>
            </div>

            <p className=' mt-[25px] leading-[20px] text-[18px] font-[600] font-[Poppins]'>Q: How does Project Manager differ from other software options?</p>
            <p className=' mt-[5px] leading-[26px] text-[16px] font-[400] font-[Poppins]'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>
            <p className=' mt-[5px] leading-[26px] text-[16px] font-[400] font-[Poppins]'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>

         </div>}
         {activeIndex === 5 && <div className='flex flex-col pb-[123px] w-[80%]'>
            <p className='text-[40px] text-[20px] font-[500] font-[Poppins]'>Software FAQs</p>
            <p className='mt-[22px] leading-[33px] text-[22px] font-[400] font-[Poppins]'>We've outlined some frequently asked questions. If you don't see your question answered below, please email support@ezosoft.com</p>
            <div className='mt-[33px] text-[24px] leading-[24px] font-[600] font-[Poppins] '>General & Getting Started</div>
            <p className=' mt-[25px] leading-[20px] text-[18px] font-[600] font-[Poppins]'>Q: How does Project Manager differ from other software options?</p>
            <p className=' mt-[5px] leading-[26px] text-[16px] font-[400] font-[Poppins]'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>
            <p className=' mt-[5px] leading-[26px] text-[16px] font-[400] font-[Poppins]'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>

            <p className='mt-[25px] leading-[20px] text-[18px] font-[600] font-[Poppins]'>Q: How does Project Manager differ from other software options?</p>
            <p className=' mt-[5px] leading-[26px] text-[16px] font-[400] font-[Poppins]'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>
            <div className='mt-[25px] flex items-center justify-center'>
                <img src={Image} alt='image' loading='lazy'/>
            </div>

            <p className='mt-[25px] leading-[20px] text-[18px] font-[600] font-[Poppins]'>Q: How does Project Manager differ from other software options?</p>
            <p className=' mt-[5px] leading-[26px] text-[16px] font-[400] font-[Poppins]'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>
        

            <div className='mt-[25px] flex items-center justify-center'>
                <img src={Image}  alt='image' loading='lazy'/>
            </div>

            <p className=' mt-[25px] leading-[20px] text-[18px] font-[600] font-[Poppins]'>Q: How does Project Manager differ from other software options?</p>
            <p className=' mt-[5px] leading-[26px] text-[16px] font-[400] font-[Poppins]'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>
            <p className=' mt-[5px] leading-[26px] text-[16px] font-[400] font-[Poppins]'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>

         </div>}
         {activeIndex === 6 && <div className='flex flex-col pb-[123px] w-[80%]'>
            <p className='text-[40px] text-[20px] font-[500] font-[Poppins]'>Software FAQs</p>
            <p className='mt-[22px] leading-[33px] text-[22px] font-[400] font-[Poppins]'>We've outlined some frequently asked questions. If you don't see your question answered below, please email support@ezosoft.com</p>
            <div className='mt-[33px] text-[24px] leading-[24px] font-[600] font-[Poppins] '>General & Getting Started</div>
            <p className=' mt-[25px] leading-[20px] text-[18px] font-[600] font-[Poppins]'>Q: How does Project Manager differ from other software options?</p>
            <p className=' mt-[5px] leading-[26px] text-[16px] font-[400] font-[Poppins]'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>
            <p className=' mt-[5px] leading-[26px] text-[16px] font-[400] font-[Poppins]'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>

            <p className='mt-[25px] leading-[20px] text-[18px] font-[600] font-[Poppins]'>Q: How does Project Manager differ from other software options?</p>
            <p className=' mt-[5px] leading-[26px] text-[16px] font-[400] font-[Poppins]'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>
            <div className='mt-[25px] flex items-center justify-center'>
                <img src={Image} alt='image' loading='lazy'/>
            </div>

            <p className='mt-[25px] leading-[20px] text-[18px] font-[600] font-[Poppins]'>Q: How does Project Manager differ from other software options?</p>
            <p className=' mt-[5px] leading-[26px] text-[16px] font-[400] font-[Poppins]'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>
        

            <div className='mt-[25px] flex items-center justify-center'>
                <img src={Image}  alt='image' loading='lazy'/>
            </div>

            <p className=' mt-[25px] leading-[20px] text-[18px] font-[600] font-[Poppins]'>Q: How does Project Manager differ from other software options?</p>
            <p className=' mt-[5px] leading-[26px] text-[16px] font-[400] font-[Poppins]'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>
            <p className=' mt-[5px] leading-[26px] text-[16px] font-[400] font-[Poppins]'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>

         </div>}
         {activeIndex === 7 && <div className='flex flex-col pb-[123px] w-[80%]'>
            <p className='text-[40px] text-[20px] font-[500] font-[Poppins]'>Software FAQs</p>
            <p className='mt-[22px] leading-[33px] text-[22px] font-[400] font-[Poppins]'>We've outlined some frequently asked questions. If you don't see your question answered below, please email support@ezosoft.com</p>
            <div className='mt-[33px] text-[24px] leading-[24px] font-[600] font-[Poppins] '>General & Getting Started</div>
            <p className=' mt-[25px] leading-[20px] text-[18px] font-[600] font-[Poppins]'>Q: How does Project Manager differ from other software options?</p>
            <p className=' mt-[5px] leading-[26px] text-[16px] font-[400] font-[Poppins]'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>
            <p className=' mt-[5px] leading-[26px] text-[16px] font-[400] font-[Poppins]'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>

            <p className='mt-[25px] leading-[20px] text-[18px] font-[600] font-[Poppins]'>Q: How does Project Manager differ from other software options?</p>
            <p className=' mt-[5px] leading-[26px] text-[16px] font-[400] font-[Poppins]'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>
            <div className='mt-[25px] flex items-center justify-center'>
                <img src={Image} alt='image' loading='lazy'/>
            </div>

            <p className='mt-[25px] leading-[20px] text-[18px] font-[600] font-[Poppins]'>Q: How does Project Manager differ from other software options?</p>
            <p className=' mt-[5px] leading-[26px] text-[16px] font-[400] font-[Poppins]'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>
        

            <div className='mt-[25px] flex items-center justify-center'>
                <img src={Image}  alt='image' loading='lazy'/>
            </div>

            <p className=' mt-[25px] leading-[20px] text-[18px] font-[600] font-[Poppins]'>Q: How does Project Manager differ from other software options?</p>
            <p className=' mt-[5px] leading-[26px] text-[16px] font-[400] font-[Poppins]'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>
            <p className=' mt-[5px] leading-[26px] text-[16px] font-[400] font-[Poppins]'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>

         </div>}
         {activeIndex === 8 && <div className='flex flex-col pb-[123px] w-[80%]'>
            <p className='text-[40px] text-[20px] font-[500] font-[Poppins]'>Software FAQs</p>
            <p className='mt-[22px] leading-[33px] text-[22px] font-[400] font-[Poppins]'>We've outlined some frequently asked questions. If you don't see your question answered below, please email support@ezosoft.com</p>
            <div className='mt-[33px] text-[24px] leading-[24px] font-[600] font-[Poppins] '>General & Getting Started</div>
            <p className=' mt-[25px] leading-[20px] text-[18px] font-[600] font-[Poppins]'>Q: How does Project Manager differ from other software options?</p>
            <p className=' mt-[5px] leading-[26px] text-[16px] font-[400] font-[Poppins]'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>
            <p className=' mt-[5px] leading-[26px] text-[16px] font-[400] font-[Poppins]'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>

            <p className='mt-[25px] leading-[20px] text-[18px] font-[600] font-[Poppins]'>Q: How does Project Manager differ from other software options?</p>
            <p className=' mt-[5px] leading-[26px] text-[16px] font-[400] font-[Poppins]'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>
            <div className='mt-[25px] flex items-center justify-center'>
                <img src={Image} alt='image' loading='lazy'/>
            </div>

            <p className='mt-[25px] leading-[20px] text-[18px] font-[600] font-[Poppins]'>Q: How does Project Manager differ from other software options?</p>
            <p className=' mt-[5px] leading-[26px] text-[16px] font-[400] font-[Poppins]'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>
        

            <div className='mt-[25px] flex items-center justify-center'>
                <img src={Image}  alt='image' loading='lazy'/>
            </div>

            <p className=' mt-[25px] leading-[20px] text-[18px] font-[600] font-[Poppins]'>Q: How does Project Manager differ from other software options?</p>
            <p className=' mt-[5px] leading-[26px] text-[16px] font-[400] font-[Poppins]'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>
            <p className=' mt-[5px] leading-[26px] text-[16px] font-[400] font-[Poppins]'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>

         </div>}
         {activeIndex === 9 && <div className='flex flex-col pb-[123px] w-[80%]'>
            <p className='text-[40px] text-[20px] font-[500] font-[Poppins]'>Software FAQs</p>
            <p className='mt-[22px] leading-[33px] text-[22px] font-[400] font-[Poppins]'>We've outlined some frequently asked questions. If you don't see your question answered below, please email support@ezosoft.com</p>
            <div className='mt-[33px] text-[24px] leading-[24px] font-[600] font-[Poppins] '>General & Getting Started</div>
            <p className=' mt-[25px] leading-[20px] text-[18px] font-[600] font-[Poppins]'>Q: How does Project Manager differ from other software options?</p>
            <p className=' mt-[5px] leading-[26px] text-[16px] font-[400] font-[Poppins]'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>
            <p className=' mt-[5px] leading-[26px] text-[16px] font-[400] font-[Poppins]'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>

            <p className='mt-[25px] leading-[20px] text-[18px] font-[600] font-[Poppins]'>Q: How does Project Manager differ from other software options?</p>
            <p className=' mt-[5px] leading-[26px] text-[16px] font-[400] font-[Poppins]'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>
            <div className='mt-[25px] flex items-center justify-center'>
                <img src={Image} alt='image' loading='lazy'/>
            </div>

            <p className='mt-[25px] leading-[20px] text-[18px] font-[600] font-[Poppins]'>Q: How does Project Manager differ from other software options?</p>
            <p className=' mt-[5px] leading-[26px] text-[16px] font-[400] font-[Poppins]'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>
        

            <div className='mt-[25px] flex items-center justify-center'>
                <img src={Image}  alt='image' loading='lazy'/>
            </div>

            <p className=' mt-[25px] leading-[20px] text-[18px] font-[600] font-[Poppins]'>Q: How does Project Manager differ from other software options?</p>
            <p className=' mt-[5px] leading-[26px] text-[16px] font-[400] font-[Poppins]'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>
            <p className=' mt-[5px] leading-[26px] text-[16px] font-[400] font-[Poppins]'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>

         </div>}
         {activeIndex === 10 && <div className='flex flex-col pb-[123px] w-[80%]'>
            <p className='text-[40px] text-[20px] font-[500] font-[Poppins]'>Software FAQs</p>
            <p className='mt-[22px] leading-[33px] text-[22px] font-[400] font-[Poppins]'>We've outlined some frequently asked questions. If you don't see your question answered below, please email support@ezosoft.com</p>
            <div className='mt-[33px] text-[24px] leading-[24px] font-[600] font-[Poppins] '>General & Getting Started</div>
            <p className=' mt-[25px] leading-[20px] text-[18px] font-[600] font-[Poppins]'>Q: How does Project Manager differ from other software options?</p>
            <p className=' mt-[5px] leading-[26px] text-[16px] font-[400] font-[Poppins]'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>
            <p className=' mt-[5px] leading-[26px] text-[16px] font-[400] font-[Poppins]'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>

            <p className='mt-[25px] leading-[20px] text-[18px] font-[600] font-[Poppins]'>Q: How does Project Manager differ from other software options?</p>
            <p className=' mt-[5px] leading-[26px] text-[16px] font-[400] font-[Poppins]'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>
            <div className='mt-[25px] flex items-center justify-center'>
                <img src={Image} alt='image' loading='lazy'/>
            </div>

            <p className='mt-[25px] leading-[20px] text-[18px] font-[600] font-[Poppins]'>Q: How does Project Manager differ from other software options?</p>
            <p className=' mt-[5px] leading-[26px] text-[16px] font-[400] font-[Poppins]'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>
        

            <div className='mt-[25px] flex items-center justify-center'>
                <img src={Image}  alt='image' loading='lazy'/>
            </div>

            <p className=' mt-[25px] leading-[20px] text-[18px] font-[600] font-[Poppins]'>Q: How does Project Manager differ from other software options?</p>
            <p className=' mt-[5px] leading-[26px] text-[16px] font-[400] font-[Poppins]'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>
            <p className=' mt-[5px] leading-[26px] text-[16px] font-[400] font-[Poppins]'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>

         </div>}
         {activeIndex === 11 && <div className='flex flex-col pb-[123px] w-[80%]'>
            <p className='text-[40px] text-[20px] font-[500] font-[Poppins]'>Software FAQs</p>
            <p className='mt-[22px] leading-[33px] text-[22px] font-[400] font-[Poppins]'>We've outlined some frequently asked questions. If you don't see your question answered below, please email support@ezosoft.com</p>
            <div className='mt-[33px] text-[24px] leading-[24px] font-[600] font-[Poppins] '>General & Getting Started</div>
            <p className=' mt-[25px] leading-[20px] text-[18px] font-[600] font-[Poppins]'>Q: How does Project Manager differ from other software options?</p>
            <p className=' mt-[5px] leading-[26px] text-[16px] font-[400] font-[Poppins]'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>
            <p className=' mt-[5px] leading-[26px] text-[16px] font-[400] font-[Poppins]'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>

            <p className='mt-[25px] leading-[20px] text-[18px] font-[600] font-[Poppins]'>Q: How does Project Manager differ from other software options?</p>
            <p className=' mt-[5px] leading-[26px] text-[16px] font-[400] font-[Poppins]'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>
            <div className='mt-[25px] flex items-center justify-center'>
                <img src={Image} alt='image' loading='lazy'/>
            </div>

            <p className='mt-[25px] leading-[20px] text-[18px] font-[600] font-[Poppins]'>Q: How does Project Manager differ from other software options?</p>
            <p className=' mt-[5px] leading-[26px] text-[16px] font-[400] font-[Poppins]'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>
        

            <div className='mt-[25px] flex items-center justify-center'>
                <img src={Image}  alt='image' loading='lazy'/>
            </div>

            <p className=' mt-[25px] leading-[20px] text-[18px] font-[600] font-[Poppins]'>Q: How does Project Manager differ from other software options?</p>
            <p className=' mt-[5px] leading-[26px] text-[16px] font-[400] font-[Poppins]'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>
            <p className=' mt-[5px] leading-[26px] text-[16px] font-[400] font-[Poppins]'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>

         </div>}

        </div>
      </div>
    </>
  )
}

export default Section1
