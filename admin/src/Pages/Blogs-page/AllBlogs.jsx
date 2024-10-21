import React, { useState } from 'react'

import Navbar from '../../Components/Navbar'
import AdminSidebar from '../../Components/Sidebar'

import BlogsBody from '../../Components/Blogs/AllBlogsBody'

const AllBlogs = () => {
    const [isCollapsed, setColllapsed] = useState(false)
    const toggleSidebar =() =>{
        setColllapsed(!isCollapsed)
   
    }
  return (
    <>
       {/* <div className='relative flex h-full '>
     
                    <AdminSidebar isCollapsed={isCollapsed}  className='absolute'/>
                
   
     <div className='flex flex-col w-full'>
     <Navbar handleToggle={toggleSidebar}/>
     <BlogsBody/>

     </div>

     </div> */}
     <div className='relative flex w-full min-h-screen'>
      
      <div className={`${isCollapsed ? 'md:w-[80px] w-[30%] h-screen min-h-screen' : 'w-[250px]'} transition-all duration-300 z-10 min-h-screen `}>
       <AdminSidebar isCollapsed={isCollapsed} />
     </div>


    <div 
     className={`flex-1 ${isCollapsed ? 'md:w-[calc(100%-80px)]' : 'md:w-[calc(100%-250px)]'} transition-all duration-300`}
    >
       <Navbar handleToggle={toggleSidebar} />
       <BlogsBody/>
     </div>

    </div>
    </>
  )
}

export default AllBlogs

