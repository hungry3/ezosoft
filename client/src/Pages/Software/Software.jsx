
import Hero from '../../components/software/Hero'
import Transforming from '/src/components/about-page/Transforming'
import SoftServices from '../../components/software/SoftServices'
import FourthSectioin from '../../components/software/FourthSectioin'
import FifthSection from '../../components/software/FifthSection'
import SixthSection from '../../components/software/SixthSection'
import Trial from '/src/components/home-page/Trial'
import Footer from '/src/components/Footer'
import Navbar from '../../components/Navbar'

function software() {
  return (
    <>
    <Navbar/>
      <Hero/>
      <div className='mt-[100px]'><Transforming bgColor="white"/></div>
      <SoftServices/>
      <FourthSectioin/>
      <FifthSection/>
      <SixthSection/>
      <Trial/>
      <Footer/>
    </>
  )
}

export default software
