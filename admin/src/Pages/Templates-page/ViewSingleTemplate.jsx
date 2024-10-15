import { useState } from 'react'
import Sidebar from '../../Components/Sidebar';
import Navbar from '../../Components/Navbar';
import SingleTemplate from '../../Components/Templates/SingleTemplate';

const ViewSingleTemplate = () => {
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
   <SingleTemplate/>
   </div>

   </div>
  </>
)
}

export default ViewSingleTemplate
