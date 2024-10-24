
import CardIcon from '/src/assets/images/about-transformin-icon.svg'
import CardBackGround from '/src/assets/images/aboutPageSwap.svg'
import PropTypes from 'prop-types';
import AOS from 'aos';
import 'aos/dist/aos.css';
function Transforming({bgColor}) {
  AOS.init({
    duration: 1000, 
    delay: 300,     
  });
  return (
    <>
      <div className={`bg-${bgColor}`}>
        <div className='py-[30px] md:py-[100px]  px-[50px] '>
         <div className='text-center sm:text-[40px] text-[30px] leading-[40px] md:leading-[50px] expo-medium '>Transforming the way you work</div>
        {/* first Card */}
         <div className='flex flex-wrap items-center justify-center gap-[26px] mt-[50px]'>
         {/* first card */}
         <div className='w-[396px] h-[333px] border-t border-[#6DC2ED] bg-white shadow-lg overflow-hidden'  data-aos="fade-up-right" data-aos-delay="400">
         <div className='ml-[38px] mt-[54px]'> 
         <div className='flex items-center justify-between'>
         <div className=''><img src={CardIcon} alt='icon' loading='lazy' /></div>
         <div className='-mt-16'> <img src={CardBackGround} alt='icon-2' loading='lazy'/></div>
         
         </div>
         <p className='mt-[21px] font-[Poppins] text-[24px] leading-[26px] expo-medium'>Lorem Ipsum</p>
         <p className='max-w-[314px] mt-[4px] font-[Poppins] text-[16px] leading-[26px] font-[400]'>The Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary</p>
         </div>
         </div>
         {/* second card */}
         <div className='w-[396px] h-[333px] border-t border-[#6DC2ED] bg-white shadow-lg overflow-hidden'    data-aos="fade-up-bottom" data-aos-delay="400">
         <div className='ml-[38px] mt-[54px]'> 
         <div className='flex items-center justify-between'>
         <div className=''><img src={CardIcon} alt='icon' loading='lazy' /></div>
         <div className='-mt-16'> <img src={CardBackGround} alt='icon-2' loading='lazy' /></div>
         
         </div>
         <p className='mt-[21px] font-[Poppins] text-[24px] leading-[26px] expo-medium'>Lorem Ipsum</p>
         <p className='max-w-[314px] mt-[4px] font-[Poppins] text-[16px] leading-[26px] font-[400]'>The Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary</p>
         </div>
         </div>
          {/* third card */}
          <div className='w-[396px] h-[333px] border-t border-[#6DC2ED] bg-white shadow-lg overflow-hidden'   data-aos="fade-down-right" data-aos-delay="400">
         <div className='ml-[38px] mt-[54px]'> 
         <div className='flex items-center justify-between'>
         <div className=''><img src={CardIcon} alt='icon' loading='lazy' /></div>
         <div className='-mt-16'> <img src={CardBackGround} alt='icon-2' /></div>
         
         </div>
         <p className='mt-[21px] font-[Poppins] text-[24px] leading-[26px] expo-medium'>Lorem Ipsum</p>
         <p className='max-w-[314px] mt-[4px] font-[Poppins] text-[16px] leading-[26px] font-[400]'>The Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary</p>
         </div>
         </div>

         </div>
         
        
        </div>
      
      </div>
    </>
  )
}

Transforming.propTypes = {
  bgColor: PropTypes.string,
};
export default Transforming
