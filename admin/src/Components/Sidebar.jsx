
import React, { act, useState } from 'react'
import Logo from '/src/assets/images/Dashboard-Ezosoft-Logo.svg'
import DashboardIcon from '/src/assets/images/admin-dashboard-icon.svg'
import user from '/src/assets/images/admin-dashboard-user-icon.svg'
import Template from '/src/assets/images/admin-dashboard-template-icon.svg'
import Pricing from '/src/assets/images/admin-dashboard-pricing icon.svg'
import Blog from '/src/assets/images/computer.svg'
import {NavLink} from 'react-router-dom'




const Sidebar = ({isCollapsed}) => {
    const [activeTab, setActiveTab] = useState(null)
    const [isTemplateOpen, setTemplateOpen] = useState(false)
    const [isBlogOpen, setBlogOpen] = useState(false)

    const handleActiveTab = (active) =>{
        setActiveTab(active)
    }
   const handleTemplate =() =>{
    setTemplateOpen(!isTemplateOpen)
   }
   const handleBlog =() =>{
    setBlogOpen(!isBlogOpen)
   }
  return (
    <>
       <div className={`relative  min-h-[100vh] bg-grey flex flex-col ${isCollapsed? 'w-[100px]':'w-[281px]'}`}>

<div className='flex flex-col items-center '>
<img src={Logo} alt='EZOSOFT' className={`mt-[28px] h-[30px] ${isCollapsed? 'w-[80px]': 'w-[157px]'}`}/>
<div className='mt-[13px] max-w-[238px] w-full border border-[#A3A3A3] '></div>
{/* items */}
     <div className='flex flex-col '>
     <div className='mt-[44px] flex gap-[20px] items-center cursor-pointer'>
     <img src={DashboardIcon} alt='dashboard' className='w-[20px] h-[20px]'/>
     {!isCollapsed &&(<h2 className=' font-[Poppins] text-[20px] leading-[30px] font-semibold text-white hidden sm:hidden md:block'>Dashboard</h2>)}

      </div>


      <NavLink to='/user' className='mt-[37px] flex items-center gap-[20px] items-center cursor-pointer'>
     <img src={user} alt='dashboard' className='w-[20px] h-[20px]' />
     {!isCollapsed &&(<h2 className=' font-[Poppins] text-[20px] leading-[30px] font-semibold text-white hidden sm:hidden md:block'>User</h2>)}

      </NavLink>

      {/* template */}

       
      <div className='mt-[37px] flex items-center gap-[20px] items-center cursor-pointer' onClick={handleTemplate}>
     <img src={Template} alt='dashboard' className='w-[20px] h-[20px]'/>
     {!isCollapsed &&(<h2 className=' font-[Poppins] text-[20px] leading-[30px] font-semibold text-white hidden sm:hidden md:block'>Template</h2>)}

      </div>

     {isTemplateOpen && (<div className='flex gap-[10px]'>
     {/* lines div */}
     <div className='mt-[9px] flex flex-col'>
      <div className='ml-[5px] w-[1px] h-[30px] bg-[#D9D9D9]'></div>
      <div className='ml-[2px] w-[8px] h-[8px] rounded-full bg-white'></div>
      <div className='ml-[5px] w-[1px] h-[45px] bg-[#D9D9D9]'></div>
      <div className='ml-[2px] w-[8px] h-[8px] rounded-full bg-white'></div>
      </div>
     
    {/* template items */}
    <div className='flex flex-col'>
       <NavLink to='/allTemplates' className={`mt-[20px] py-[6px] pl-[16px] pr-[30px] text-white cursor-pointer ${activeTab ==='All Templates'? 'text-grey bg-lightBlue  rounded-md': ''} `} onClick={() => handleActiveTab('All Templates')}> <h2 className='text-[16px] leading-[24px] font-[600] font-[Poppins]'>All Template</h2></NavLink>


       <NavLink to='/addtemplates' className={`mt-[15px] py-[6px] pl-[16px] pr-[30px] text-white cursor-pointer ${activeTab==='free-template' ? 'bg-lightBlue text-grey  rounded-md':''}`} onClick={() =>{handleActiveTab('free-template')}}> <h2 className='text-[16px] leading-[24px] font-[600] font-[Poppins]'>Add New Templates</h2></NavLink>
    </div>
    </div>)}
   {/* pricing */}
   
    <NavLink to='/pricing' className={`mt-[37px] flex items-center gap-[20px] items-center cursor-pointer ${activeTab==='pricing'? 'bg-lightBlue text-black py-[8px] px-[10px] rounded-md':''}`}  onClick={() =>handleActiveTab('pricing')}>

     <img src={Pricing} alt='pricing' className='w-[20px] h-[20px]'/>
     {!isCollapsed &&(<h2 className=' font-[Poppins] text-[20px] leading-[30px] font-semibold text-white hidden sm:hidden md:block'>Pricing</h2>)}

      </NavLink>

      {/* Blog */}
      <div className='mt-[37px] flex items-center gap-[20px] items-center cursor-pointer' onClick={handleBlog}>
     <img src={Blog} alt='blong' className='w-[20px] h-[20px]' />
     {!isCollapsed &&(<h2 className=' font-[Poppins] text-[20px] leading-[30px] font-semibold text-white hidden sm:hidden md:block'>Blogs</h2>)}
    </div>
     {isBlogOpen && (<div className='flex gap-[10px]'>

        {/* lines div */}
     <div className='mt-[9px] flex flex-col'>
      <div className='ml-[10px] w-[1px] h-[30px] bg-[#D9D9D9]'></div>
      <div className='ml-[7px] w-[8px] h-[8px] rounded-full bg-white'></div>
      <div className='ml-[10px] w-[1px] h-[40px] bg-[#D9D9D9]'></div>
      <div className='ml-[7px] w-[8px] h-[8px] rounded-full bg-white'></div>
      </div>
     
    {/* template items */}
    <div className='flex flex-col'>
       <NavLink to='/allblogs' className={`mt-[20px] py-[6px] pl-[16px] pr-[30px] text-white cursor-pointer ${activeTab ==='blogs'? 'text-grey bg-lightBlue  rounded-md': ''} `} onClick={() => handleActiveTab('blogs')}> <h2 className='text-[16px] leading-[24px] font-[600] font-[Poppins]'>All Blogs</h2></NavLink>


       <NavLink to='/addnewblogs' className={`mt-[15px] py-[6px] pl-[16px] pr-[30px] text-white cursor-pointer ${activeTab==='allBlogs' ? 'bg-lightBlue text-grey  rounded-md':''}`} onClick={() =>{handleActiveTab('allBlogs')}}> <h2 className='text-[16px] leading-[24px] font-[600] font-[Poppins]'>Add New Blogs</h2></NavLink>
    </div>

     </div>)}

      

     </div>
    
         </div>

{/* light and Dark mode */}








</div>
    </>
  )
}

export default Sidebar
