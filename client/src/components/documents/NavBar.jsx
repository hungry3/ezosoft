import React from 'react'
import Search from '/src/assets/images/search.svg'
import Help from '/src/assets/images/navbar-help.svg'
import Bell from '/src/assets/images/navbar-bell.svg'
import Profile from '/src/assets/images/navbar-profile.svg'
function NavBar() {
  return (
    <>
    
      
     <div className=' h-[72px] lg:px-[32px] xl:px-[32px] px-[10px] gap-[30px] border-b border-[#DCDCDC]  flex lg:justify-between items-center'>
    
    <div className=' flex items-center bg-[#F9F9F9] lg:max-w-[300px] xl:max-w-[300px] max-w-[100px] lg:w-full rounded-md px-3 py-2'>

 <img src={Search}  alt='search' />
  <input 
    type='text' 
    placeholder='Search'
    className='w-full ml-2 bg-transparent focus:outline-none' 
   />
  </div>

 <div className='flex items-center gap-2 lg:gap-4'>
   <img src={Help} alt='help' />
   <img src={Bell} alt='bell' />
   <div className='flex items-center gap-2'>
   <img src={Profile} alt='profile' />  {/* Add user image */}
   <h2 className='text-[14px] leading-[21px] font-medium font-[Poppins]'>Katie</h2>
   </div>
   
  </div>


  
    </div>

   
    </>
  )
}

export default NavBar
