
import CardSection from '../../components/home-page/CardSection'
import Hero from '../../components/home-page/Hero'
import SecondSection from '../../components/home-page/SecondSection'
import Services from '../../components/home-page/Services'
import SolutionSection from '../../components/home-page/SolutionSection'
import Streamline from '../../components/home-page/Streamline'
import ClientReview from '../../components/home-page/ClientReview'
import Trial from '../../components/home-page/Trial'
import Footer from '../../components/Footer'
import Mobile from '../../components/home-page/Mobile'
import Navbar from '../../components/Navbar'

const Home = () => {
  return (
    <div>
    <Navbar/>
      <Hero/>
      <SecondSection/>
      <Streamline/>
      <Services/>
      <CardSection/>
      <SolutionSection/>
      <ClientReview/>
      <Mobile/>
      <Trial/>
      <Footer/>
    </div>
  )
}

export default Home
