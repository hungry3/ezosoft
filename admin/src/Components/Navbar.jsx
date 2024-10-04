import React from 'react'
import Profile from '/src/assets/images/navbar-profile-image.svg'
import MenuIcon from '/src/assets/images/menu-icon.svg'

const Navbar = ({handleToggle}) => {
  return (
    <>
       <div className=' h-[72px] border-b border-[#D9D9D9] flex items-center justify-between'>
      {/* first div */}
      <div className='flex items-center justify-between'>
        <div className='w-[34px] h-[34px] rounded-full bg-blue flex -ml-[18px] absolute items-center justify-center cursor-pointer' onClick={handleToggle}>
          <img src={MenuIcon} alt='menu' className='h-[14px] w-[14px]' />
        </div>

        
      </div>

      {/* second div */}
      <div className='flex items-center justify-center'>
       
        {/* Language and Profile */}
        <div className='ml-[34px] flex items-center cursor-pointer'>
          <img src={Profile} alt='profile' className='mx-[17px]' />
        </div>
      </div>
    </div>
    </>
  )
}

export default Navbar
