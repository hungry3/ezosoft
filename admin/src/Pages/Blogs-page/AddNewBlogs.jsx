import React, { useState } from 'react'

import Navbar from '../../Components/Navbar'
import AdminSidebar from '../../Components/Sidebar'
import AddBlogsBody from '../../Components/Blogs/AddNewBlogs'
import BlogsBody from '../../Components/Blogs/AllBlogsBody'
import AddNewBlogs from '../../Components/Blogs/AddNewBlogs'

const AddNewBlog = () => {
    const [isCollapsed, setColllapsed] = useState(false)
    const toggleSidebar =() =>{
        setColllapsed(!isCollapsed)
   
    }
  return (
    <>
       <div className='relative flex w-full min-h-screen'>
      
       <div className={`${isCollapsed ? 'md:w-[80px] w-[30%] h-screen min-h-full' : 'w-[250px]'} transition-all duration-300 z-10 min-h-full `}>
        <AdminSidebar isCollapsed={isCollapsed} />
      </div>


     <div
        className={`flex-1 ${isCollapsed ? 'md:w-[calc(100%-80px)] ' : 'md:w-[calc(100%-250px)]'} transition-all duration-300`}
      >
        <Navbar handleToggle={toggleSidebar} />
        <AddNewBlogs />
      </div>

     </div>
    </>
  )
}

export default AddNewBlog

