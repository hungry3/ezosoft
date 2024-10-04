
import Hero from '../../components/pricing-page/Hero'
import ClientReview from '../../components/home-page/ClientReview'
import Trial from '../../components/home-page/Trial'
import Footer from '../../components/Footer'
import Faq from '../../components/Faq';
import Services from '../../components/home-page/Services';
import Navbar from '../../components/Navbar';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const faqItems = [
  { category: "How do I reset my password?", description: "Go to the settings page and click 'Reset Password'." },
  { category: "Can I upgrade my plan?", description: "Yes, you can upgrade by visiting the billing page." },
];

const faqItems2 = [
  { category: "How do I cancel my subscription?", description: "Contact support and they will assist with the cancellation." },
  { category: "Do you offer refunds?", description: "Refunds are offered within the first 30 days of your purchase." },
];

const stripePromise = loadStripe('pk_test_51PpoZ0JAqu9i4Tpd9eQshFnir4xKLoCn6D54SyChw3yJbHzgwokgmPa20jG4r6njoky3gWQgKyoKfYzFvc9OzKjs00iUUo7Dh5');
function Pricing() {
  return (
    <>
    <Navbar/>
    <Elements stripe={stripePromise}>
      <Hero/>
      </Elements>
      <div className='mt-[400px]'></div>
      <Faq faqItems={faqItems} faqItems2={faqItems2}/>
      <ClientReview/>
      <Trial/>
      <Footer/>
    </>
  )
}

export default Pricing
