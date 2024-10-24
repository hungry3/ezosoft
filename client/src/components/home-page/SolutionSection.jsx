
import WorkLoad from '/src/assets/images/workload-planner.svg.png'
import Retainer from '/src/assets/images/solution3-black.svg'
import ClientSide from '/src/assets/images/solution-2.svg'
import SolutionImage from '/src/assets/images/solution-workload-banner.svg'
import LightIcon1st from '/src/assets/images/solution1-white.svg'
import Solution2White from '/src/assets/images/solution2-white.svg'
import Solution3White from '/src/assets/images/solution3-white.svg'
import { useState } from 'react'

function SolutionSection() {

  const [ active, setActive] = useState(1)
  return (
    <>
      <div className=' py-[50px] sm:py-[100px] lg:pl:[100px] xl:pl-[100px] bg-lightBlue  overflow-hidden'>
       <div className='flex items-center justify-center '>
       <p className='max-w-[787px] expo-medium   text-[30px] md:text-[30px] lg:text-[40px] xl:text-[45px]  leading-[30px] md:leading-[50px] text-center'>One solution for all your client operations challenges </p>
       </div>

       <div className=' gap-[100px] flex flex-col md:[50%] w-[100%]  lg:flex-row xl:flex-row mt-[40px] sm:mt-[86px]'>
         <div className='lg:w-[50%] xl:w-[50%] md] flex flex-col items-center justify-start mt-[27px] px-[20px]'>
         <div><p className='max-w-[475px] font-semibold text-[24px] leading-[36px]'>Deliver projects profitably, streamline client operations, and delight clients</p></div>
         <div
  className={`max-w-[525px] ${active === 1 ? 'bg-gradient ' : 'bg-transparent text-gray-800'} flex gap-5 rounded-md mt-[38px] cursor-pointer transition-transform transform hover:scale-105  group hover:bg-gradient`}
  onClick={() => setActive(1)}
>
  <div className='mt-[32px] ml-[23px]'>
   {active === 1 ?  <img src={LightIcon1st} alt='image' loading='lazy' className='w-[24px] h-[24px]'  />:  <img src={WorkLoad} alt='image' loading='lazy' className='w-[24px] h-[24px]'  />}
  </div>
  <div className='flex flex-col mt-[25px]'>
    <p className={`text-[20px] leading-[29px] expo-medium group-hover:text-white ${active === 1 ? 'text-white' : 'text-gray-800'}`}>
      Balance team capacity
    </p>
    <p className={`max-w-[419px] font-[Poppins] text-[16px] leading-[25px] font-[400] pb-[27px] group-hover:text-white ${active === 1 ? 'text-white' : 'text-gray-600'}`}>
      To ensure healthy utilization across projects and prevent your team from burning out.
    </p>
  </div>
</div>



<div
  className={`max-w-[525px] ${active === 2 ? 'bg-gradient pr-3' : 'bg-transparent'} flex gap-5 rounded-md mt-[38px] cursor-pointer  transition-transform transform hover:scale-105  group hover:bg-gradient hover:pr-3 `}
  onClick={() => setActive(2)}
>
  <div className='mt-[32px] ml-[23px]'>
    {active === 2 ? <img src={Solution2White} alt='image' loading='lazy' className='w-[24px] h-[24px]' /> : <>
    <img src={ClientSide} alt='image' loading='lazy' className='w-[24px] h-[24px] group-hover:hidden'  />
    <img src={Solution2White} alt='image' loading='lazy' className='w-[24px] h-[24px] hidden group-hover:block' />
    </>}
    
  </div>
  <div className='flex flex-col mt-[25px]'>
    <p className={` text-[20px] leading-[29px] expo-medium group-hover:text-white `}>
      Organize everything in one system of record
    </p>
    <p className={`max-w-[419px] font-[Poppins] text-[16px] leading-[25px] font-[400] pb-[27px] group-hover:text-white`}>
      From client assets and project timelines to communications and financial reporting.
    </p>
  </div>
</div>



<div
  className={`max-w-[525px] ${active === 3 ? 'bg-gradient pr-3' : 'bg-transparent'} flex gap-5 rounded-md mt-[38px] cursor-pointer transition-transform transform hover:scale-105 hover:bg-gradient group`}
  onClick={() => setActive(3)}
>
  <div className='mt-[32px] ml-[23px]'>
    {active === 3? <img src={Solution3White} alt='image'  loading='lazy' className='w-[24px] h-[24px]' /> : <img src={Retainer} alt='image'  loading='lazy' className='w-[24px] h-[24px]' />}

  </div>
  <div className='flex flex-col mt-[25px]'>
    <p className={` text-[20px] leading-[29px] expo-medium group-hover:text-white ${active === 3 ? 'text-white' : 'text-gray-800'}`}>
      Optimize recurring revenue from retainers
    </p>
    <p className={`max-w-[419px] font-[Poppins] text-[16px] leading-[25px] font-[400] pb-[27px] group-hover:text-white ${active === 3 ? 'text-white' : 'text-gray-600'}`}>
      By tracking time, rates, and money spent, and balancing budget fluctuations.
    </p>
  </div>
</div>



         </div>
         <div className='lg:w-[50%] xl:w-[50%] w-[100%]  flex items-center justify-end'>
          <div className='bg-blue pt-[28px] pl-[28px]  rounded-md'><img src={SolutionImage} alt='image' loading='lazy' className=''/></div>
         </div>
       </div>
      </div>
    </>
  )
}

export default SolutionSection
