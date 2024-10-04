import React, { useState } from 'react'

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import AllTemplate from '../../Components/Templates/AllTemplates';
import Sidebar from '../../Components/Sidebar';
import Navbar from '../../Components/Navbar';


const AllTemplates = () => {
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
     <AllTemplate/>
     </div>

     </div>
    </>
  )
}

export default AllTemplates
