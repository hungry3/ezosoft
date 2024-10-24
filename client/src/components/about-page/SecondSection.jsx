import Image from '/src/assets/images/secondSection-img.svg'
import AOS from 'aos';
import 'aos/dist/aos.css';
function SecondSection() {
  AOS.init({
    duration: 1000, 
    delay: 300,     
  });
  return (
    <>
      <div className='lg:m-[100px] xl:m-[100px] md:m-[50px] mx-[30px] my-[50px] '>
      <div className='flex flex-col-reverse flex-wrap items-center justify-around gap-3 lg:flex-row lg:flex-nowrap'>
      <div className=''data-aos="zoom-in" data-aos-delay="500"><img src={Image} alt='image-2' loading='lazy'/></div>
      <div className='max-w-[579px] flex flex-col items-center justify-center'>
      <div className='text-[40px] leading-[40px] md:leading-[50px] expo-medium'>We Can Help You Save Time And Money in Your Business</div>
      <div className='text-[16px] leading-[23px] font-[400] font-[Poppins] mt-[16px]'>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which {"don't"} look even slightly believable.</div>
      <div className='grid grid-cols-2 mt-[31px]'>
      {/* first coloumn */}
      <div className='flex gap-2'>
      <div className='w-[30px] h-[15px] rounded-xl bg-cyanDark'></div>
      <div className='flex flex-col gap-2'>
        <p className='text-[24px] leading-[20px] expo-medium font-[Poppins]'>Lorem Ipsum</p>
        <p className='text-[14px] leading-[26px] font-[400] font-[Poppins]'>The Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary</p>
      </div>

      </div>
       {/* second coloumn */}
       <div className='flex gap-2'>
      <div className='w-[30px] h-[15px] rounded-xl bg-cyanDark'></div>
      <div className='flex flex-col gap-2'>
        <p className='text-[24px] leading-[20px] expo-medium font-[Poppins]'>Lorem Ipsum</p>
        <p className='text-[14px] leading-[26px] font-[400] font-[Poppins]'>The Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary</p>
      </div>

      </div>
        
      </div>.
      {/* line */}
      <div className='h-[2px] w-full bg-[#B7B9BB] my-[14px]'></div>
    
      <div className='grid grid-cols-2 mt-[31px]'>
      {/* first coloumn */}
      <div className='flex gap-2'>
      <div className='w-[30px] h-[15px] rounded-xl bg-cyanDark'></div>
      <div className='flex flex-col gap-2'>
        <p className='text-[24px] leading-[20px] expo-medium font-[Poppins]'>Lorem Ipsum</p>
        <p className='text-[14px] leading-[26px] font-[400] font-[Poppins]'>The Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary</p>
      </div>

      </div>
       {/* second coloumn */}
       <div className='flex gap-2'>
      <div className='w-[30px] h-[15px] rounded-xl bg-cyanDark'></div>
      <div className='flex flex-col gap-2'>
        <p className='text-[24px] leading-[20px] expo-medium font-[Poppins]'>Lorem Ipsum</p>
        <p className='text-[14px] leading-[26px] font-[400] font-[Poppins]'>The Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary</p>
      </div>

      </div>
        
      </div>

      </div>

      </div>

      </div>
    </>
  )
}

export default SecondSection
