import { NavLink } from "react-router-dom"


function Trial() {
  return (
    <div className='bg-blue bg-[url("/src/assets/images/bgTrail.svg")] bg-no-repeat bg-cover '>
      <div className='w-[100%]  Lg:px-[100px] xl:px-[100px] px-[30px] py-[132px]'>
      <div className='relative z-10 flex flex-col items-center justify-center '>
       <p className=' text-white expo-medium text-center text-[40px] leadind-[42px]'>Start your free 14 days trial</p>
       <p className='max-w-[693px] mt-[13px] text-white  text-center text-[16px] font-[Poppins] leadind-[26px]'>Deliver faster, collaborate better and innovate more effectively without the high price tag or months-long implementation required by other products.</p>
     
         {/* //! input field section is here */}
      <div className='flex items-center justify-center lg:w-1/2 xl:w-1/2 w-[85%] lg:gap-4 xl:gap-4 gap-2 mx-[30px] mt-8'>
        <input type="text" className=' outline-none  px-4 py-2  rounded-md font-[Poppins]' placeholder='Example@gmail.com' />
       <NavLink to="/signup">
       <button className=' bg-cyanDark hover:bg-gradient hover:border border-white text-white  py-2 px-2 lg:px-4 xl:px-5 rounded text-nowrap font-[Poppins]'>Start Free Trial</button>
       </NavLink>
       
      
       
        </div>
        
      </div>
      
     
      </div>
    </div>
  )
}

export default Trial
