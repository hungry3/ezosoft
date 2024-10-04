import React, { useState } from 'react'
import PricingBody from '../../Components/Pricing/PricingBody'
import Sidebar from '../../Components/Sidebar'
import Navbar from '../../Components/Navbar'

const Pricing = () => {
    const [isCollapsed, setColllapsed] = useState(false)
    const toggleSidebar = () => {
      setColllapsed(!isCollapsed)
    }
    return (
      <>
         <div className='relative flex h-full'>
         <Sidebar isCollapsed={isCollapsed} className='absolute'/>
        
     
       <div className='flex flex-col w-full'>
       <Navbar handleToggle={toggleSidebar}/>
       <PricingBody/>
       </div>
  
       </div> 
      </>
  )
}

export default Pricing
