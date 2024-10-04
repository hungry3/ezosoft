import React from 'react'
import Sidebar from '../../components/documents/Sidebar'
import NavBar from '../../components/documents/NavBar'
import Body from '../../components/documents/Body'

function Documents() {
  return (
    <>

    <div className='flex'>
         <Sidebar/>
    
     <div className='flex flex-col w-full'> 
          <NavBar/>
           <Body/>
      </div>
      </div>
    </>
  )
}

export default Documents
