import React from 'react'
import Sidebar from '../../components/documents/Sidebar'
import NavBar from '../../components/documents/NavBar'
import BodyPart from '../../components/templates/Body'

function Template() {
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

export default Template
