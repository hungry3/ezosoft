
import Hero from '../../components/template-page/Hero'
import Items from '../../components/template-page/Items'
import Trial from '../../components/home-page/Trial'
import Footer from '../../components/Footer'
import Navbar from '../../components/Navbar'

function Template() {
  return (
    <>
    <Navbar/>
      <Hero/>
      <Items/>
      
      <Trial/>
      <Footer/>
    </>
  )
}

export default Template
