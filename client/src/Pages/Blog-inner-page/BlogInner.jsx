import Section1 from '../../components/Blog-Inner-Page/Section1'
import Trial from '../../components/home-page/Trial'
import Footer from '../../components/Footer'
import Hero from '../../components/Blog-Inner-Page/Hero';
import Navbar from '../../components/Navbar'

function BlogInner() {
  return (
    <>
      <Navbar/>
      <Hero tittle='lorem Ipsum tittle' subtittle="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna."/>
      <Section1/>
      <Trial/>
      <Footer/>
    </>
  )
}
export default BlogInner
