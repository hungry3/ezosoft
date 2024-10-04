import React, { useState } from 'react'

import Sidebar from '../../Components/Sidebar'
import Navbar from '../../Components/Navbar'

import AddNewTemplate from '../../Components/Templates/AddNewTemplates';


const AddNewTemplates = () => {
  const [isCollapsed, setColllapsed] = useState(false)

 const toggleSidebar=()=>{
  setColllapsed(!isCollapsed)
 
 }
  return (
    <>
     
     <div className='relative flex h-full'>
     <Sidebar isCollapsed={isCollapsed} className='absolute'/> 
     <div className='flex flex-col w-full'>
     <Navbar handleToggle={toggleSidebar}/>
     <AddNewTemplate/>
     </div>

     </div>
     
    </>
  )
}

export default AddNewTemplates
