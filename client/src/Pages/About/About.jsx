
import SecondSection from '../../components/about-page/SecondSection'
import Transforming from '../../components/about-page/Transforming'
import Hero from '../../components/about-page/Hero'
import Lorem from '../../components/about-page/Lorem'
import Trial from '../../components/home-page/Trial'
import Footer from '../../components/Footer'
import Navbar from '../../components/Navbar'

function About() {
  return (
    <>
    <Navbar/>
      <Hero/>
      <SecondSection/>
      <Transforming bgColor="lightBlue"/>
      <Lorem/>
      <Trial/>
      <Footer/>
    </>
  )
}

export default About
