import { useState } from 'react'
import Sidebar from '../../Components/Sidebar';
import Navbar from '../../Components/Navbar';
import EditSingleUser from '../../Components/User/EditSingleUser';

const EditSingleUserPage = () => {
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
   <EditSingleUser/>
   </div>

   </div>
  </>
)
}

export default EditSingleUserPage
