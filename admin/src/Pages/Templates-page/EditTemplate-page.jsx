import { useState } from 'react'
import AllTemplate from '../../Components/Templates/AllTemplates';
import Sidebar from '../../Components/Sidebar';
import Navbar from '../../Components/Navbar';
import EditTemplates from '../../Components/Templates/EditTemplates';

const EditTemplatePage = () => {
  const [isCollapsed, setColllapsed] = useState(false)

 const toggleSidebar=()=>{
  setColllapsed(!isCollapsed)
 }
 return (
  <>
   <div className='flex h-full '>
   <Sidebar isCollapsed={isCollapsed} className='absolute'/> 
   <div className='flex flex-col w-full'>
   <Navbar handleToggle={toggleSidebar}/>
   <EditTemplates/>
   </div>

   </div>
  </>
)
}

export default EditTemplatePage
