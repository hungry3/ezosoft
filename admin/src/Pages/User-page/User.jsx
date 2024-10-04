import React, { useState } from 'react'
import Navbar from '../../Components/Navbar'
import Sidebar from '../../Components/Sidebar'
import UserBody from '../../Components/User/UserBody'

const User = () => {

    const [isCollapsed, setColllapsed] = useState(false)
    const toggleSidebar =() =>{
        setColllapsed(!isCollapsed)
   
    }

  return (
    <>
   <div className='relative flex h-full'>
       <Sidebar isCollapsed={isCollapsed} />
   
     <div className='flex flex-col w-full'>
     <Navbar handleToggle={toggleSidebar}/>
     <UserBody/>

     </div>

     </div>

    </>
  )
}

export default User
