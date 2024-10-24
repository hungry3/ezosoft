
import React, { act, useEffect, useState } from 'react'
import Logo from '/src/assets/images/Dashboard-Ezosoft-Logo.svg'
import DashboardIcon from '/src/assets/images/admin-dashboard-icon.svg'
import user from '/src/assets/images/admin-dashboard-user-icon.svg'
import Template from '/src/assets/images/admin-dashboard-template-icon.svg'
import Pricing from '/src/assets/images/admin-dashboard-pricing icon.svg'
import Blog from '/src/assets/images/computer.svg'
import {NavLink, useLocation} from 'react-router-dom'




const Sidebar = ({isCollapsed}) => {
    const [activeTab, setActiveTab] = useState(null)
    const [isTemplateOpen, setTemplateOpen] = useState(false)
    const [isBlogOpen, setBlogOpen] = useState(false)

    const location = useLocation(); 
    


    useEffect(() => {
    
      if (location.pathname.includes('/user')) {
        setActiveTab('user');
      } else if (location.pathname.includes('/allTemplates') || location.pathname.includes('/addtemplates')) {
        setActiveTab('template');
      } else if (location.pathname.includes('/pricing')) {
        setActiveTab('pricing');
      } else if (location.pathname.includes('/allblogs') || location.pathname.includes('/addnewblogs') || location.pathname.includes('/blogs-category')) {
        setActiveTab('blogs');
      } else {
        setActiveTab('dashboard');
      }
    }, [location.pathname]);

    console.log(activeTab);
    

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
 <div className={` min-w-[100px] min-h-full  bg-grey flex flex-col  ${isCollapsed ? 'w-[80px]  min-h-full'  : 'w-[250px] min-h-full'}`}>
<div className='flex flex-col items-center '>
<img src={Logo} alt='EZOSOFT' className={`mt-[28px] h-[30px] ${isCollapsed? 'w-[80px]': 'w-[157px]'}`}/>
<div className='mt-[13px] max-w-[238px] w-full border border-[#A3A3A3] '></div>

     <div className='flex flex-col '>
     <div className='mt-[44px] flex gap-[20px] items-center cursor-pointer'>
     <img src={DashboardIcon} alt='dashboard' className='w-[20px] h-[20px]'/>
    
     {!isCollapsed &&(<h2 className=' font-[Poppins] text-[20px] leading-[30px] font-semibold text-white '>Dashboard</h2>)}
    {/* <h2 className=' font-[Poppins] text-[20px] leading-[30px] font-semibold text-white '>Dashboard</h2> */}
      </div>
      <div  className={`mt-[37px] flex  gap-[20px] items-center cursor-pointer ${activeTab==='user' ? 'bg-lightBlue text-black py-[5px] px-[10px] rounded-md' :''} `}>
     <img src={user} alt='dashboard' className={`w-[20px] h-[20px] ${activeTab==='user'?'active_tab':''}`}  />
     {!isCollapsed &&(<h2 className={` font-[Poppins] text-[20px] leading-[30px] font-semibold   ${activeTab === 'user' ? 'text-black' :'text-white'} ` }>User</h2>)}

      </div>

      {/* template */}

       
      <div className='mt-[37px] flex  gap-[20px] items-center cursor-pointer' onClick={handleTemplate}>
     <img src={Template} alt='dashboard' className='w-[20px] h-[20px]'/>
     {!isCollapsed &&(<h2 className=' font-[Poppins] text-[20px] leading-[30px] font-semibold text-white 
     '>Template</h2>)}

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
      <NavLink to='/allTemplates'  className={`mt-[20px] py-[6px] pl-[16px] pr-[30px] text-white cursor-pointer ${activeTab ==='allTemplates'? 'text-grey bg-lightBlue  rounded-md': ''} `} onClick={() => handleActiveTab('All Templates')}> <h2 className='text-[16px] leading-[24px] font-[600] font-[Poppins]'>All Template</h2></NavLink>


       <div  className={`mt-[15px] py-[6px] pl-[16px] pr-[30px] text-white cursor-pointer ${activeTab==='free-template' ? 'bg-lightBlue text-grey  rounded-md':''}`} onClick={() =>{handleActiveTab('free-template')}}> <h2 className='text-[16px] leading-[24px] font-[600] font-[Poppins]'>Add New Template</h2></div>
    </div>
    </div>)}
   {/* pricing */}
   
    <dic  className={`mt-[37px] flex items-center gap-[20px] cursor-pointer ${activeTab==="pricing"? 'bg-lightBlue text-black py-[5px] px-[10px] rounded-md':''}`}  onClick={() =>handleActiveTab('pricing')}>

     <img src={Pricing} alt='pricing' className='w-[20px] h-[20px]'/>
     
     {!isCollapsed &&(<h2 className={`font-[Poppins] text-[20px] leading-[30px] font-semibold   ${activeTab ==="pricing" ? ' text-black' :' text-white'}`}>Pricing</h2>)}

      </dic>

      {/* Blog */}
      <div className='mt-[37px] flex  gap-[20px] items-center cursor-pointer' onClick={handleBlog}>
     <img src={Blog} alt='blong' className='w-[20px] h-[20px]' />
     {!isCollapsed &&(<h2 className=' font-[Poppins] text-[20px] leading-[30px] font-semibold text-white '>Blogs</h2>)}
    </div>
     {isBlogOpen && (<div className='flex gap-[10px]'>

        {/* lines div */}
     <div className='mt-[9px] flex flex-col'>
      <div className='ml-[10px] w-[1px] h-[30px] bg-[#D9D9D9]'></div>
      <div className='ml-[7px] w-[8px] h-[8px] rounded-full bg-white'></div>
      <div className='ml-[10px] w-[1px] h-[40px] bg-[#D9D9D9]'></div>
      <div className='ml-[7px] w-[8px] h-[8px] rounded-full bg-white'></div>

      <div className='ml-[10px] w-[1px] h-[40px] bg-[#D9D9D9]'></div>
      <div className='ml-[7px] w-[8px] h-[8px] rounded-full bg-white'></div>
      </div>
     
    {/* Blog items */}
    <div className='flex flex-col'>
       <NavLink to='/allblogs' className={`mt-[20px] py-[6px] pl-[16px] pr-[30px] text-white cursor-pointer ${activeTab ==='blogs'? 'text-grey bg-lightBlue  rounded-md': ''} `} onClick={() => handleActiveTab('blogs')}> <h2 className='text-[16px] leading-[24px] font-[600] font-[Poppins]'>All Blogs</h2></NavLink>


       <NavLink to='/addnewblogs' className={`mt-[15px] py-[6px] pl-[16px] pr-[30px] text-white cursor-pointer ${activeTab==='allBlogs' ? 'bg-lightBlue text-grey  rounded-md':''}`} onClick={() =>{handleActiveTab('allBlogs')}}> <h2 className='text-[16px] leading-[24px] font-[600] font-[Poppins]'>Add New Blog</h2></NavLink>

       <NavLink to='/blogs-category' className={`mt-[15px] py-[6px] pl-[16px] pr-[30px] text-white cursor-pointer ${activeTab==='category' ? 'bg-lightBlue text-grey  rounded-md':''}`} onClick={() =>{handleActiveTab('category')}}> <h2 className='text-[16px] leading-[24px] font-[600] font-[Poppins]'>Category</h2></NavLink>

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
