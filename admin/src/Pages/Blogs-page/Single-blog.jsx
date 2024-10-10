import  { useState } from 'react'
import Navbar from '../../Components/Navbar'
import SingleBlog from '../../Components/Blogs/SingleBlog'
import Sidebar from '../../Components/Sidebar'

const SingleBlogPage = () => {
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
<SingleBlog/>

</div>

</div>
    </div>
  )
}

export default SingleBlogPage
