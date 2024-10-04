import  { useState } from 'react';

import HomeImage from '/src/assets/images/home-tab-planning 1.svg'

function SoftServices() {
  const [activeTab, setActiveTab] = useState('overview'); // Default active tab

  return (
    <>
       <div className='bg-lightBlue w-full  py-[100px]'>
     <div className='lg:px-[100px] w-full'>
     <div className='flex items-center justify-center w-full '>
          <h2 className='text-center max-w-[887px] text-[40px] md:text-[40px] lg:text-[40px] xl:text-[45px] leading-[50px] expo-medium'>
          Standout Gantt chart maker features
          </h2>
        </div>
       
        <div className='flex pl-5 lg:flex-col xl:flex-col '>
         {/* Menu bar */}
        <div className=' mt-[50px] lg:mt-[30px] xl:mt-[40px] flex items-start justify-start lg:items-center  lg:justify-center xl:items-center  xl:justify-center'>
          <div className='flex items-start lg:items-center  max-w-[1123px] md:flex-col flex-col lg:flex-row xl:flex-row gap-[20px] lg:gap-0 xl:gap-0 md:gap-0 mr-[10px]'>
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
  <div className='mt-[46px]  flex flex-col lg:flex-row xl:flex-row gap-[20px] justify-between items-center'>
        <div className='flex flex-col items-start justify-center'>
        <p className='max-w-[497px]   text-[30px] leading-[31px] font-semibold'>Detailed planning and execution</p>
        <p className='max-w-[518px] mt-[16px] text-[16px] leading-[26px] font-[Poppins] font-[400] '> For projects that require vigorous planning, forecasting, cost analysis, resource allocation, task management and reporting, ProjectManager outperforms the competition..For projects that require vigorous planning, forecasting.</p>

        <p className='max-w-[518px] mt-[16px] text-[16px] leading-[26px] font-[Poppins] font-[400] '>For projects that require vigorous planning, forecasting, cost analysis, resource allocation, task management and reporting, ProjectManager outperforms the competition.For projects that require vigorous planning, forecasting.</p>
      
        </div>


        <div className=''>
          <img src={HomeImage} alt='image' loading='lazy'/>
        </div>
        
       
        </div>
)}

{/*  2nd tab */}
{activeTab==="manufacturing" && (
  <div className='mt-[46px]  flex flex-col lg:flex-row xl:flex-row gap-[20px] justify-between items-center'>
        <div className='flex flex-col items-start justify-center'>
        <p className='max-w-[497px]   text-[30px] leading-[31px] font-semibold'>Detailed planning and execution</p>
        <p className='max-w-[518px] mt-[16px] text-[16px] leading-[26px] font-[Poppins] font-[400] '> For projects that require vigorous planning, forecasting, cost analysis, resource allocation, task management and reporting, ProjectManager outperforms the competition..For projects that require vigorous planning, forecasting.</p>

        <p className='max-w-[518px] mt-[16px] text-[16px] leading-[26px] font-[Poppins] font-[400] '>For projects that require vigorous planning, forecasting, cost analysis, resource allocation, task management and reporting, ProjectManager outperforms the competition.For projects that require vigorous planning, forecasting.</p>
      
        </div>


        <div className=''>
          <img src={HomeImage} alt='image' loading='lazy'/>
        </div>
        
       
        </div>
)}
    {/* 3rd tab */}
    {activeTab==="construction" && (
      <div className='mt-[46px]  flex flex-col lg:flex-row xl:flex-row gap-[20px] justify-between items-center'>
        <div className='flex flex-col items-start justify-center'>
        <p className='max-w-[497px]   text-[30px] leading-[31px] font-semibold'>Detailed planning and execution</p>
        <p className='max-w-[518px] mt-[16px] text-[16px] leading-[26px] font-[Poppins] font-[400] '> For projects that require vigorous planning, forecasting, cost analysis, resource allocation, task management and reporting, ProjectManager outperforms the competition..For projects that require vigorous planning, forecasting.</p>

        <p className='max-w-[518px] mt-[16px] text-[16px] leading-[26px] font-[Poppins] font-[400] '>For projects that require vigorous planning, forecasting, cost analysis, resource allocation, task management and reporting, ProjectManager outperforms the competition.For projects that require vigorous planning, forecasting.</p>
      
        </div>


        <div className=''>
          <img src={HomeImage} alt='image' loading='lazy'/>
        </div>
        
       
        </div>
)}
    {/* 4th tab */}
    {activeTab==="it_teams" && (
      <div className='mt-[46px]  flex flex-col lg:flex-row xl:flex-row gap-[20px] justify-between items-center'>
        <div className='flex flex-col items-start justify-center'>
        <p className='max-w-[497px]   text-[30px] leading-[31px] font-semibold'>Detailed planning and execution</p>
        <p className='max-w-[518px] mt-[16px] text-[16px] leading-[26px] font-[Poppins] font-[400] '> For projects that require vigorous planning, forecasting, cost analysis, resource allocation, task management and reporting, ProjectManager outperforms the competition..For projects that require vigorous planning, forecasting.</p>

        <p className='max-w-[518px] mt-[16px] text-[16px] leading-[26px] font-[Poppins] font-[400] '>For projects that require vigorous planning, forecasting, cost analysis, resource allocation, task management and reporting, ProjectManager outperforms the competition.For projects that require vigorous planning, forecasting.</p>
      
        </div>


        <div className=''>
          <img src={HomeImage} alt='image' loading='lazy'/>
        </div>
        
       
        </div>
)}
    {/* 5th tab */}
    {activeTab==="pro_services" && (
      <div className='mt-[46px]  flex flex-col lg:flex-row xl:flex-row gap-[20px] justify-between items-center'>
        <div className='flex flex-col items-start justify-center'>
        <p className='max-w-[497px]   text-[30px] leading-[31px] font-semibold'>Detailed planning and execution</p>
        <p className='max-w-[518px] mt-[16px] text-[16px] leading-[26px] font-[Poppins] font-[400] '> For projects that require vigorous planning, forecasting, cost analysis, resource allocation, task management and reporting, ProjectManager outperforms the competition..For projects that require vigorous planning, forecasting.</p>

        <p className='max-w-[518px] mt-[16px] text-[16px] leading-[26px] font-[Poppins] font-[400] '>For projects that require vigorous planning, forecasting, cost analysis, resource allocation, task management and reporting, ProjectManager outperforms the competition.For projects that require vigorous planning, forecasting.</p>
      
        </div>

        <div className=''>
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

export default SoftServices;
