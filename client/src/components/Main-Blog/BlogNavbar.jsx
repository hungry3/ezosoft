import React from 'react'
import Hero from '../blog-inner-page/Hero'
import Navbar from '../Navbar'

const BlogNavbar = () => {
  return (
    <>
    <Navbar/>
      <Hero tittle='Blog Page' subtittle='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna' />
    </>
  )
}

export default BlogNavbar
