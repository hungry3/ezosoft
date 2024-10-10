import  { useState } from 'react'
import Navbar from '../../Components/Navbar'
import EditBlog from '../../Components/Blogs/EditBlog'
import Sidebar from '../../Components/Sidebar'

const EditedBlog = () => {
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
<EditBlog/>

</div>

</div>
    </div>
  )
}

export default EditedBlog
