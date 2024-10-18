
import  { useState } from 'react'
import Navbar from '../../Components/Navbar'
import Sidebar from '../../Components/Sidebar'
import BlogCategory from '../../Components/Blogs/BlogCategory'
const BlogCategoryPage = () => {
  const [isCollapsed, setColllapsed] = useState(false)    
    const toggleSidebar =() =>{
        setColllapsed(!isCollapsed)
   
    }
  return (
    <div>
        <div className='relative flex h-full '>
     
     <Sidebar isCollapsed={isCollapsed}  className='absolute'/>
 

<div className='flex flex-col w-full'>
<Navbar handleToggle={toggleSidebar}/>
<BlogCategory/>

</div>

</div>
    </div>
  )
}

export default BlogCategoryPage
