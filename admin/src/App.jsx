import Template from './Pages/Templates-page/AddNewTemplates'
import Dashboard from './Pages/Templates-page/AllTemplates'
import AllBlogs from './Pages/Blogs-page/AllBlogs'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Blogs from './Pages/Blogs-page/AddNewBlogs'
import AllTemplates from './Pages/Templates-page/AllTemplates'
import AddNewTemplates from './Pages/Templates-page/AddNewTemplates'
import Pricing from './Pages/Pricing-page/Pricing'
import EditTemplates from './Pages/Templates-page/EditTemplate'
import AddNewBlogs from './Pages/Blogs-page/AddNewBlogs'
import User from './Pages/User-page/User'
import Template4 from './Pages/Templates-page/Template4'



function App() {

  return (
    <>
    {/* <Dashboard/> */}
    {/* <Template/> */}
    
    <BrowserRouter>
    <Routes>
      <Route exact path='/' element={<User/>} />
      <Route exact path='/allTemplates' element={<AllTemplates/>} />
      <Route exact path='/addnewblogs' element={<AddNewBlogs/>} />
      <Route exact path='/allblogs' element={<AllBlogs/>} />
      <Route exact path='/pricing' element={<Pricing/>} />
      <Route exact path='/user' element={<User/>} />
      
      <Route exact path='/addTemplates' element={<AddNewTemplates/>} />
      <Route path="/edit/:_id" element={<EditTemplates/>} />
     
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
