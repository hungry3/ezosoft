import AllBlogs from './Pages/Blogs-page/AllBlogs'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AllTemplates from './Pages/Templates-page/AllTemplates'
import AddNewTemplates from './Pages/Templates-page/AddNewTemplates'
import Pricing from './Pages/Pricing-page/Pricing'
import EditTemplates from './Pages/Templates-page/EditTemplate-page'
import AddNewBlogs from './Pages/Blogs-page/AddNewBlogs'
import User from './Pages/User-page/User'
import EditedBlog from './Pages/Blogs-page/EditedBlog'
import SingleBlogPage from './Pages/Blogs-page/Single-blog'
function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route exact path='/' element={<User/>} />
      <Route exact path='/allTemplates' element={<AllTemplates/>} />
      <Route exact path='/addnewblogs' element={<AddNewBlogs/>} />
      <Route exact path='/allblogs' element={<AllBlogs/>} />
      <Route exact path='/pricing' element={<Pricing/>} />
      <Route exact path='/user' element={<User/>} />
      <Route exact path='/addTemplates' element={<AddNewTemplates/>} />
      <Route path="/edit/:id" element={<EditTemplates/>} />
      <Route path='/blog/edit/:blogId' element={<EditedBlog/>}/>
      <Route path='/blog/single/:blogId' element={<SingleBlogPage />} />  
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
