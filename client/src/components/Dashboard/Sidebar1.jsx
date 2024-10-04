import React from 'react'
import Dashboard from '/src/assets/images/dashboard.svg'
import Profile from '/src/assets/images/dashboard-profile-icon.svg'
import Saved from '/src/assets/images/save-icon.svg'
import Settings from '/src/assets/images/dashboard-setting-icon.svg'

function Sidebar1() {
  return (
    <>
      <div className='w-[40px] bg-darkBlack flex flex-col justify-start items-center min-h-screen'> 
       <div> <img src={Dashboard} className='mt-[77px] w-[20px] h-[20px]'/></div>
       <div> <img src={Profile} className='mt-[27px] w-[20px] h-[20px]'/></div>
       <div> <img src={Saved} className='mt-[27px]'/></div>
       <div> <img src={Settings} className='mt-[27px]'/></div>
      </div>
    </>
  )
}

export default Sidebar1
