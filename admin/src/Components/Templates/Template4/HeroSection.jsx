import React from 'react'
import projectInfo from '/src/assets/images/project-information-logo.svg'

const HeroSection = () => {
  return (
    <>
    <div className='w-[100%] bg-green max-h-[546px]'>
      <div className='w-full lg:px-[60px] xl:px-[60px] md:px-[30px] px-[15px] flex lg:flex-row xl:flex-row flex-col'>
        <div className='mt-[40px] lg:w-[50%] xl:w-[50%] w-[100%]'>
         <h2 className='text-[67px] leading-[81px] font-[Inter] text-white'>One Pager Team
         Meeting Charter</h2>
         <p className='mt-[33px] text-[22px] text-white'>This one pager covers meeting charter summarizing project goals & objectives.It also includes elements such as project status, deliverables, constraints assumptions,team members, stakeholders and project milestones, etc</p>
         
         <div className=' mt-[38px] w-[333px] h-[56px] w-full bg-clay text-green flex items-center justify-center'>
         <img src='' alt='Company Logo'/>
         </div>

        </div>

        {/* overlayed div */}

        <div className='lg:w-[50%] xl:w-[50%] w-[100%] w-full bg-clay mt-[40px] h-[1121px]'>
        <div className='mt-[56px] flex gap-2'>
        <div className=' ml-[20px] w-[44px] h-[44px] flex items-center justify-center border border-green bg-white rounded-full'>
          <img src={projectInfo} alt='project information'/>
        </div>
        <h2 className=' font-[Inter] font-[700] text-[30px] leading-[36px] '>Project Information</h2>
        </div>
        <div className='border border-green max-w-[393px] ml-[38px] -translate-y-[1px] rounded-l'></div>
        <div className='m-[35px] border border-lightClay'>
          <div className='flex  items-center gap-[30px] pt-[13px]'>
            <div className=' ml-[20px] w-[10px] h-[10px] -translate-y-[10px] bg-black rounded-full'></div>
            <p className='text-[24px] font-[400] font-[Inter]'>Create cost effective recognition
            program to attain company's goals</p>
          </div>
          <div className='flex  items-center gap-[30px] pt-[13px]'>
            <div className=' ml-[20px] w-[10px] h-[10px] -translate-y-[10px] bg-black rounded-full'></div>
            <p className='text-[24px] font-[400] font-[Inter]'>Establish healthy workplace through
            employee recognition app</p>
          </div>
        </div>


        </div>


      </div>
      </div>
    </>
  )
}

export default HeroSection
