
import Dashboard from '/src/assets/images/about-dashboard.svg'
import AOS from 'aos';
import 'aos/dist/aos.css';
function Hero() {
  AOS.init({
    duration: 1000, 
    delay: 300,     
  });
  return (
    <>
    <div className='bg-gradient -mt-[100px]'>
    <div className='lg:ml-[100px] xl:ml-[100px] mx-[30px] flex flex-wrap md:flex-nowrap items-center justify-between'>

    <div   data-aos="fade-up-right" data-aos-delay="500">
   <div className='flex items-center justify-start pt-[100px]'>
    <h2 className='text-white text-[40px] font-[500] leading-[70px] mt-[120px] '>About Us</h2>
    </div>
    <p className=' max-w-[500px] text-white text-[16px] leading-[26px] font-[Poppins] font-[400] pb-[127px]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.</p>
   </div>

   {/* img */}
   <div className='-pt-[100px] md:pt-[100px]'  data-aos="zoom-in" data-aos-delay="500"> <img src={Dashboard} alt='image' loading='lazy' className='z-10 flex items-end justify-end object-cover translate-y-20'/></div>

    </div>
    
 

    </div>
    <div className='w-full h-[16px] bg-cyanDark'></div>
      
    </>
  )
}

export default Hero
