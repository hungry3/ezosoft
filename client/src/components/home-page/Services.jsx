import  { useState } from 'react';
import Profile from '/src/assets/images/profile.svg'
import HomeImage from '/src/assets/images/home-tab-planning 1.svg'

import AOS from 'aos';
import 'aos/dist/aos.css';

function Services() {
  const [activeTab, setActiveTab] = useState('overview'); // Default active tab
  AOS.init({
    duration: 1000, 
    delay: 300,     
  }); 
  return (
    <>
      <div className='bg-lightBlue w-full  py-[100px]'>
     <div className='lg:px-[100px] w-full'>
     <div className='flex items-center justify-center w-full ' data-aos="zoom-in-down"  data-aos-delay="400">  
          <h2 className='text-center max-w-[887px] text-[40px] md:text-[40px] lg:text-[40px] xl:text-[45px] leading-[50px] expo-medium'>
            Bring agility, accuracy and insights to your project portfolios
          </h2>
        </div>
       
        <div className='flex gap-[50px] lg:flex-col xl:flex-col pl-5 '>
         {/* Menu bar */}
        <div className=' mt-[100px] lg:mt-[30px] xl:mt-[40px] flex lg:items-center  lg:justify-center xl:items-center  xl:justify-center'>
          <div className='flex items-start lg:items-center  max-w-[1123px] md:flex-col flex-col lg:flex-row xl:flex-row gap-[20px] lg:gap-0 xl:gap-0 md:gap-0'>
            <div
              onClick={() => setActiveTab('overview')}
              className={`flex flex-col items-center lg:border-b-[2px] border-black border-solid cursor-pointer lg:pr-[100px]   ${   activeTab === 'overview' && '-mt-[2px]'}`}
            >
            
              <div
                className={ ` text-[18px] lg:text-[24px]  text-left font-[Poppins] ]  ${
                  activeTab === 'overview' ?  'text-cyan   border-b-[2px] border-solid border-cyan   lg:pb-[20px] font-semibold text-left' : 'text-black border-none pb-[20px]'
                } text-nowrap` } 
              >
                Overview
              </div>
            </div>

            <div
              onClick={() => setActiveTab('manufacturing')}
              className={`flex flex-col items-center   lg:border-b-[2px] border-black border-solid cursor-pointer lg:pr-[100px]   ${   activeTab === 'manufacturing' && '-mt-[2px]'} `}
            >
              <div
                className={`text-[18px] lg:text-[24px] font-[Poppins] expo-medium text-left  ${
                  activeTab === 'manufacturing' ?   'text-cyan   border-b-[2px] border-solid border-cyan   pb-[20px] font-semibold' : 'text-black border-none pb-[20px]'
                }`}
              >
                Manufacturing
              </div>
            </div>

            <div
              onClick={() => setActiveTab('construction')}
              className={`flex flex-col items-left lg:border-b-[2px] border-black border-solid cursor-pointer lg:pr-[100px]  ${   activeTab === 'construction' && '-mt-[2px]'}`}
            >
              <div
                className={`text-[18px] lg:text-[24px] text-left font-[Poppins] expo-medium ${
                  activeTab === 'construction' ?   'text-cyan   border-b-[2px] border-solid border-cyan   pb-[20px] font-semibold' : 'text-black border-none pb-[20px]'
                }`}
              >
                Construction
              </div>
            </div>

            <div
              onClick={() => setActiveTab('it_teams')}
              className={`flex flex-col lg:items-center  lg:border-b-[2px] border-black border-solid cursor-pointer lg:pr-[100px] ${   activeTab === 'it_teams' && '-mt-[2px]'} `}
            >
              <div
                className={`text-[16px] lg:text-[24px] text-nowrap text-left font-[Poppins] expo-medium ${
                  activeTab === 'it_teams' ?   'text-cyan   border-b-[2px] border-solid border-cyan   pb-[20px] font-semibold' : 'text-black border-none pb-[20px]'
                }`}
              >
                IT Teams
              </div>
            </div>

            <div
              onClick={() => setActiveTab('pro_services')}
              className={`flex flex-col lg:items-center  lg:border-b-[2px] border-black border-solid cursor-pointer lg:pr-[5px] ${   activeTab === 'it_teams' && '-mt-[2px]'} `}
            >
              <div
                className={` text-nowrap  lg:text-[24px] text-left font-[Poppins] expo-medium ${
                  activeTab === 'pro_services' ?   'text-cyan   border-b-[2px] border-solid border-cyan   pb-[20px] font-semibold' : 'text-black border-none pb-[20px]'
                }`}
              >
                Pro Services
              </div>
            </div>

            {/* <div
              onClick={() => setActiveTab('pro_services')}
              className={`flex flex-col lg:items-center  lg:border-b-[2px] border-black border-solid cursor-pointer ${   activeTab === 'pro_services' && ''} `}
            >
              <div
                className={`text-[18px] lg:text-[24px] text-center font-[Poppins] expo-medium ${
                  activeTab === 'pro_services' ?  'text-cyan   border-b-[2px] border-solid border-cyan   pb-[20px] font-semibold' : 'text-black border-none pb-[20px]'
                }`}
              >
              Pro Services
              </div>
            </div> */}

           
          </div>
        </div>
     
{activeTab==="overview" && (
  <div className='mt-[73px]  flex flex-col lg:flex-row xl:flex-row  justify-between items-center'>
        <div className='' data-aos="zoom-in-right" data-aos-delay="400"> 
        <p className='max-w-[497px]  mt-[30px] text-[30px] leading-[31px] font-[600]'>Detailed planning and execution</p>
        <p className='max-w-[518px] mt-[16px] text-[16px] leading-[26px] font-[Poppins] font-[400] '> For projects that require vigorous planning, forecasting, cost analysis, resource allocation, task management and reporting, ProjectManager outperforms the competition.</p>
        <div className='flex flex-col md:flex-row lg:flex-row xl:flex-row items-center mt-[25px] gap-4'>
       <div> <img src={Profile} alt='profile' loading='lazy' className='h-[110px] w-[110px]'/></div>
        <div className='flex flex-col'>
       <div className='max-w-[300px]'> <p className=' text-[16px] leading-[26px] font-[Poppins] font-[400]'>The value of formal project management pays for itself quickly.</p></div>
        <p className='text-[#6DC2ED] text-[14px] leading-[27px] font-[Poppins] expo-medium'>Namrata Parmar</p>
        <p className='text-[12px] leading-[27px] font-[Poppins] font-[400]'>Kaiser Aluminum</p>

        </div>

        </div>
        <div className='bg-[#6DC2ED] text-white h-[54px] w-[151px]  rounded-md flex items-center justify-center mt-[42px] hover:bg-[#E9F5F8] hover:border-2 border-black hover:text-black transition-all duration-200 cursor-pointer'>Learn More</div>
        </div>


        <div className='mt-[30px]' data-aos="zoom-in-left" data-aos-delay="400">
          <img src={HomeImage} alt='image'  loading='lazy'/>
        </div>
        
       
        </div>
)}

{/*  2nd tab */}
{activeTab==="manufacturing" && (
  <div className='mt-[73px]  flex flex-col lg:flex-row xl:flex-row  justify-between items-center'>
        <div className='' data-aos="zoom-in-right" data-aos-delay="400">
        <p className='max-w-[497px]  mt-[30px] text-[30px] leading-[31px] font-[600]'>Detailed planning and execution</p>
        <p className='max-w-[518px] mt-[16px] text-[16px] leading-[26px] font-[Poppins] font-[400] '> For projects that require vigorous planning, forecasting, cost analysis, resource allocation, task management and reporting, ProjectManager outperforms the competition.</p>
        <div className='flex flex-col md:flex-row lg:flex-row xl:flex-row items-center mt-[25px] gap-4'>
       <div> <img src={Profile} alt='image' loading='lazy' className='h-[110px] w-[110px]'/></div>
        <div className='flex flex-col'>
       <div className='max-w-[300px]'> <p className=' text-[16px] leading-[26px] font-[Poppins] font-[400]'>The value of formal project management pays for itself quickly.</p></div>
        <p className='text-[#6DC2ED] text-[14px] leading-[27px] font-[Poppins] expo-medium'>Namrata Parmar</p>
        <p className='text-[12px] leading-[27px] font-[Poppins] font-[400]'>Kaiser Aluminum</p>

        </div>

        </div>
        <div className='bg-[#6DC2ED] text-white h-[54px] w-[151px]  rounded-md flex items-center justify-center mt-[42px] hover:bg-[#E9F5F8] hover:border-2 border-black hover:text-black transition-all duration-200 cursor-pointer'>Learn More</div>
        </div>


        <div className='mt-[30px]' data-aos="zoom-in-left" data-aos-delay="300" >
          <img src={HomeImage} alt='image' loading='lazy'/>
        </div>
        
       
        </div>
)}
    {/* 3rd tab */}
    {activeTab==="construction" && (
      <div className='mt-[73px]  flex flex-col lg:flex-row xl:flex-row  justify-between items-center'>
        <div className='' data-aos="zoom-in-right" data-aos-delay="400">
        <p className='max-w-[497px]  mt-[30px] text-[30px] leading-[31px] font-[600]'>Detailed planning and execution</p>
        <p className='max-w-[518px] mt-[16px] text-[16px] leading-[26px] font-[Poppins] font-[400] '> For projects that require vigorous planning, forecasting, cost analysis, resource allocation, task management and reporting, ProjectManager outperforms the competition.</p>
        <div className='flex flex-col md:flex-row lg:flex-row xl:flex-row items-center mt-[25px] gap-4'>
       <div> <img src={Profile} alt='profile' loading='lazy' className='h-[110px] w-[110px]'/></div>
        <div className='flex flex-col'>
       <div className='max-w-[300px]'> <p className=' text-[16px] leading-[26px] font-[Poppins] font-[400]'>The value of formal project management pays for itself quickly.</p></div>
        <p className='text-[#6DC2ED] text-[14px] leading-[27px] font-[Poppins] expo-medium'>Namrata Parmar</p>
        <p className='text-[12px] leading-[27px] font-[Poppins] font-[400]'>Kaiser Aluminum</p>

        </div>

        </div>
        <div className='bg-[#6DC2ED] text-white h-[54px] w-[151px]  rounded-md flex items-center justify-center mt-[42px] hover:bg-[#E9F5F8] hover:border-2 border-black hover:text-black transition-all duration-200 cursor-pointer'>Learn More</div>
        </div>


        <div className='mt-[30px]' data-aos="zoom-in-left" data-aos-delay="300" >
          <img src={HomeImage} alt='image' loading='lazy'/>
        </div>
        
       
        </div>
)}
    {/* 4th tab */}
    {activeTab==="it_teams" && (
      <div className='mt-[73px]  flex flex-col lg:flex-row xl:flex-row  justify-between items-center'>
        <div className='' data-aos="zoom-in-right" data-aos-delay="300" >
        <p className='max-w-[497px]  mt-[30px] text-[30px] leading-[31px] font-[600]'>Detailed planning and execution</p>
        <p className='max-w-[518px] mt-[16px] text-[16px] leading-[26px] font-[Poppins] font-[400] '> For projects that require vigorous planning, forecasting, cost analysis, resource allocation, task management and reporting, ProjectManager outperforms the competition.</p>
        <div className='flex flex-col md:flex-row lg:flex-row xl:flex-row items-center mt-[25px] gap-4'>
       <div> <img src={Profile} alt='profile' loading='lazy' className='h-[110px] w-[110px]'/></div>
        <div className='flex flex-col'>
       <div className='max-w-[300px]'> <p className=' text-[16px] leading-[26px] font-[Poppins] font-[400]'>The value of formal project management pays for itself quickly.</p></div>
        <p className='text-[#6DC2ED] text-[14px] leading-[27px] font-[Poppins] expo-medium'>Namrata Parmar</p>
        <p className='text-[12px] leading-[27px] font-[Poppins] font-[400]'>Kaiser Aluminum</p>

        </div>

        </div>
        <div className='bg-[#6DC2ED] text-white h-[54px] w-[151px]  rounded-md flex items-center justify-center mt-[42px] hover:bg-[#E9F5F8] hover:border-2 border-black hover:text-black transition-all duration-200 cursor-pointer'>Learn More</div>
        </div>


        <div className='mt-[30px]' data-aos="zoom-in-left" data-aos-delay="300" >
          <img src={HomeImage} alt='image' loading='lazy'/>
        </div>
        
       
        </div>
)}
    {/* 5th tab */}
    {activeTab==="pro_services" && (
      <div className='mt-[73px]  flex flex-col lg:flex-row xl:flex-row  justify-between items-center'>
        <div className='' data-aos="zoom-in-right" data-aos-delay="300" >
        <p className='max-w-[497px]  mt-[30px] text-[30px] leading-[31px] font-[600]'>Detailed planning and execution</p>
        <p className='max-w-[518px] mt-[16px] text-[16px] leading-[26px] font-[Poppins] font-[400] '> For projects that require vigorous planning, forecasting, cost analysis, resource allocation, task management and reporting, ProjectManager outperforms the competition.</p>
        <div className='flex flex-col md:flex-row lg:flex-row xl:flex-row items-center mt-[25px] gap-4'>
       <div> <img src={Profile} alt='proflie' loading='lazy' className='h-[110px] w-[110px]'/></div>
        <div className='flex flex-col'>
       <div className='max-w-[300px]'> <p className=' text-[16px] leading-[26px] font-[Poppins] font-[400]'>The value of formal project management pays for itself quickly.</p></div>
        <p className='text-[#6DC2ED] text-[14px] leading-[27px] font-[Poppins] expo-medium'>Namrata Parmar</p>
        <p className='text-[12px] leading-[27px] font-[Poppins] font-[400]'>Kaiser Aluminum</p>

        </div>

        </div>
        <div className='bg-[#6DC2ED] text-white h-[54px] w-[151px]  rounded-md flex items-center justify-center mt-[42px] hover:bg-[#E9F5F8] hover:border-2 border-black hover:text-black transition-all duration-200 cursor-pointer'>Learn More</div>
        </div>
        <div className='mt-[30px]' data-aos="zoom-in-left" data-aos-delay="300" >
          <img src={HomeImage} alt='image' loading='lazy'/>
        </div> 
        </div>
)}
     </div>
     </div>
      </div>
    </>
  );
}

export default Services;
