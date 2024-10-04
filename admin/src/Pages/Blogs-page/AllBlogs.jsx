import React, { useState } from 'react'

import Navbar from '../../Components/Navbar'
import AdminSidebar from '../../Components/Sidebar'
import AddBlogsBody from '../../Components/Blogs/AddNewBlogs'
import BlogsBody from '../../Components/Blogs/AllBlogsBody'

const AllBlogs = () => {
    const [isCollapsed, setColllapsed] = useState(false)
    const toggleSidebar =() =>{
        setColllapsed(!isCollapsed)
   
    }
  return (
    <>
       <div className='relative flex h-full '>
     
                    <AdminSidebar isCollapsed={isCollapsed}  className='absolute'/>
                
   
     <div className='flex flex-col w-full'>
     <Navbar handleToggle={toggleSidebar}/>
     <BlogsBody/>

     </div>

     </div>
    </>
  )
}

export default AllBlogs

