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
       <div className='flex h-full relativ'>
       <AdminSidebar isCollapsed={isCollapsed} className='absolute'/>
   
     <div className='flex flex-col w-full'>
     <Navbar handleToggle={toggleSidebar}/>
     <AddNewBlogs/>

     </div>

     </div>
    </>
  )
}

export default AddNewBlog

