import AOS from 'aos';
import 'aos/dist/aos.css';

function Streamline() {

  
  AOS.init({
    duration: 1000, 
    delay: 300,     
  }); 
  return (
    <>
     <div className='w-full h-full lg:p-[100px] xl:p-[100px] p-[30px]'>
     <div className='flex items-center justify-center '>
       <h2 className='max-w-[897px] expo-medium  text-[30px] md:text-[35px] lg:text-[40px] xl:text-[40px] leading-[40px] md:leading-[50px] text-center'>Streamline Your Project Management with Secure, Efficient, and Accessible Tools </h2>
     </div>
     <div className='flex flex-wrap pt-[40px] items-center w-full  justify-between'>
  {/* Component Block 01 */}
  <div className='flex flex-col flex-grow mb-10 min-w-[250px]' data-aos="fade-down-right" data-aos-delay="300">
    <div className='flex flex-row items-center'>
      <div className='h-[50px] w-[50px] bg-cyanDark rounded-full flex items-center justify-center'>
        <p className='text-white text-[16px] font-[Poppins]'>01</p>
      </div>
      <div className='h-[1px] flex-grow border-t border-[#A4AEC6] border-opacity-20'></div>
    </div>
    <div className='mt-[10px] pl-[20px] sm:pl-[0px]'>
      <p className='text-[20px] leading-[27px] font-[600] font-[Poppins]'>Single source of truth</p>
      <p className='max-w-[245px] text-[16px] leading-[26px] mt-[4px] font-[Poppins]'>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry.
      </p>
    </div>
  </div>

  {/* Component Block 02 */}
  <div className='flex flex-col flex-grow mb-10 min-w-[250px]' data-aos="fade-up-right" data-aos-delay="300">
    <div className='flex flex-row items-center'>
      <div className='h-[50px] w-[50px] bg-blue rounded-full flex items-center justify-center'>
        <p className='text-white text-[16px] font-[Poppins]'>02</p>
      </div>
      <div className='h-[1px] flex-grow border-t border-[#A4AEC6] border-opacity-20'></div>
    </div>
    <div className='mt-[10px] pl-[20px] sm:pl-[0px]'>
      <p className='text-[20px] leading-[27px] font-[600] font-[Poppins]'>Peace of mind</p>
      <p className='max-w-[245px] text-[16px] leading-[26px] mt-[4px] font-[Poppins]'>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry.
      </p>
    </div>
  </div>

  {/* Component Block 03 */}
  <div className='flex flex-col flex-grow mb-10 min-w-[250px]' data-aos="fade-up-right" data-aos-delay="300">
    <div className='flex flex-row items-center'>
      <div className='h-[50px] w-[50px] bg-cyanDark rounded-full flex items-center justify-center'>
        <p className='text-white text-[16px] font-[Poppins]'>03</p>
      </div>
      <div className='h-[1px] flex-grow border-t border-[#A4AEC6] border-opacity-20'></div>
    </div>
    <div className='mt-[10px] pl-[20px] sm:pl-[0px]'>
      <p className='text-[20px] leading-[27px] font-[600] font-[Poppins]'>Eliminate busy work</p>
      <p className='max-w-[245px] text-[16px] leading-[26px] mt-[4px] font-[Poppins]'>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry.
      </p>
    </div>
  </div>

  {/* Component Block 04 */}
  <div className='flex flex-col flex-grow mb-10 min-w-[250px]' data-aos="fade-up-right" data-aos-delay="300">
    <div className='flex flex-row items-center'>
      <div className='h-[50px] w-[50px] bg-blue rounded-full flex items-center justify-center'>
        <p className='text-white text-[16px] font-[Poppins]'>04</p>
      </div>
      <div className='h-[1px] flex-grow border-t border-[#A4AEC6] border-opacity-20'></div>
    </div>
    <div className='mt-[10px] pl-[20px] sm:pl-[0px]'>
      <p className='text-[20px] leading-[27px] font-[600] font-[Poppins]'>Access from anywhere</p>
      <p className='max-w-[245px] text-[16px] leading-[26px] mt-[4px] font-[Poppins]'>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry.
      </p>
    </div>
  </div>
</div>



     
  


     {/* text div */}
    

     </div>
    </>
  )
}

export default Streamline
