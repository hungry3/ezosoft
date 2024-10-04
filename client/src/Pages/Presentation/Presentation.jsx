import React from 'react'
import Sidebar from '../../components/documents/Sidebar'
import NavBar from '../../components/documents/NavBar'
import BodyPart from '../../components/presentation/Body'

function Presentation() {
  return (
    <>
    <div className='flex'>
      <Sidebar/>
 
  <div className='flex flex-col w-full'> 
       <NavBar/>
        <BodyPart/>
        
   </div>
   </div>
 </>
  )
}

export default Presentation
