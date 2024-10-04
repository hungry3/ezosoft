import React from 'react'
import Sidebar from '../../components/documents/Sidebar'
import NavBar from '../../components/documents/NavBar'
import Content from '/src/components/document1/Body'

function Document1() {
  return (
    <>
      <div className='flex'>
         <Sidebar/>
    
     <div className='flex flex-col w-full'> 
          <NavBar/>
           <Content/>
           
      </div>
      </div>
    </>
  )
}

export default Document1
