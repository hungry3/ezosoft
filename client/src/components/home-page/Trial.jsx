import { NavLink } from "react-router-dom"


function Trial() {
  return (
    <div className='bg-blue bg-[url("/src/assets/images/bgTrail.svg")] bg-no-repeat bg-cover '>
      <div className='w-[100%]  Lg:px-[100px] xl:px-[100px] px-[30px] lg:py-[132px] xl:py-[132px] md:py-[70px] py-[50px]'>
      <div className='relative z-10 flex flex-col items-center justify-center '>
       <p className=' text-white expo-medium text-center lg:text-[40px] xl:text-[40px] md:text-[35px] text-[30px] leadind-[42px]'>Start your free 14 days trial</p>
       <p className='max-w-[693px] mt-[13px] text-white  text-center text-[16px] font-[Poppins] leadind-[26px]'>Deliver faster, collaborate better and innovate more effectively without the high price tag or months-long implementation required by other products.</p>
     
         {/* //! input field section is here */}
         <div className='flex flex-col sm:flex-row md:flex-row lg:flex-row xl:flex-row items-center sm:w-[85%] md:w-[70%] w-[100%] gap-4 mt-8 lg:w-[450px] xl:w-[450px] '>
        <input type="text" className=' outline-none  px-4 py-2 w-full rounded-md font-[Poppins]' placeholder='Enter your email address' />
        <NavLink to="/signup" className='bg-cyanDark rounded-md  flex justify-center items-center hover:bg-gradient hover:border border-white sm:w-auto lg:w-auto md:w-auto xl:w-auto w-[100%] '>
        <button className='  text-white  py-2  px-5 rounded text-nowrap font-[Poppins]'>Start Free Trial</button>
        </NavLink>
       
       
        </div>
        
      </div>
      
     
      </div>
    </div>
  )
}

export default Trial
