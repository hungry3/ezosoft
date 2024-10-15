
import { NavLink } from 'react-router-dom'
import AOS from 'aos';
import 'aos/dist/aos.css';
function ContactSales() {
  AOS.init({
    duration: 1000, 
    delay: 300,     
  });
  return (
    <>
     <div
        className="relative w-full -mt-[100px]  bg-cover h-[150vh]  bg-[url('/src/assets/images/mainBg.svg')]  bg-no-repeat bg-center"
      
      >
        
      </div>
       <div className='relative xl:mx-[100px] lg:mx-[100px] md:mx-[50px] lg:-mt-[950px] xl:-mt-[1100px] -mt-[1000px]  mx-[30px]  py-[400px] flex md:flex-nowrap flex-wrap items-center justify-between  gap-[100px]'  >
        <div className='flex flex-col items-start gap-[15px]' data-aos="fade-up-right" data-aos-delay="500">
        <p className='text-[40px] leading-[50px] font-[600] text-[white]'>Request a meeting with sales</p>
        <p className='max-w-[500px] text-[16px] leading-[24px] font-[Poppins] text-[white]'>Request a meeting to learn about Ezosoft’s advanced features, how we support large teams or get a custom quote for an Enterprise plan.</p>

        <div className='flex flex-col gap-2'>
        <div className='flex items-center gap-3'>
            <div className='w-2 h-2 bg-white rounded-lg'></div>
            <NavLink to="/signup" className='text-[16px] leading-[27px] font-[Poppins] text-white'>Start a free trial</NavLink>
        </div>

        <div className='flex items-center gap-3'>
            <div className='w-2 h-2 bg-white rounded-lg'></div>
            <NavLink to="/pricing" className='text-[16px] leading-[27px] font-[Poppins] text-white'>View our plans and pricing</NavLink>
        </div>

        <div className='flex items-center gap-3'>
            <div className='w-2 h-2 bg-white rounded-lg'></div>
            <NavLink to="/ContactSupport" className='text-[16px] leading-[27px] font-[Poppins] text-white'>Contact Support</NavLink>
        </div>

        </div>
      </div>
      <div className='m-o w-[580px]  bg-white py-[50px] md:px-[50px] px-[20px] rounded-lg shadow-custom flex flex-col gap-6' data-aos="" data-aos-delay="500">
            <input type='text' placeholder=' First Name*' className='pl-[24px] py-[15px] text-[16px] font-[400] font-[Poppins] outline-none border border-black rounded-md focus:border-lightBlue'/>
            <input type='text' placeholder=' Last Name*' className='pl-[24px] py-[15px] text-[16px] font-[400] font-[Poppins] outline-none border border-black rounded-md focus:border-lightBlue'/>
            <input type='email' placeholder=' Work Email' className='pl-[24px] py-[15px] text-[16px] font-[400] font-[Poppins] outline-none border border-black rounded-md focus:border-lightBlue'/>
            <input type='text' placeholder=' Company Name' className='pl-[24px] py-[15px] text-[16px] font-[400] font-[Poppins] outline-none border border-black rounded-md focus:border-lightBlue'/>
            <input type='text' placeholder=' How many people are on your team' className='pl-[24px] py-[15px] text-[16px] font-[400] font-[Poppins] outline-none border border-black rounded-md focus:border-lightBlue'/>
            <button className="w-full py-[15px] text-white bg-blue transition rounded-md  hover:bg-gradient text-[18px] font-[500] font-[Poppins] text-center leading-[20px]">
            Submit
          </button>
        </div>
      </div>

       
      
    </>
  )
}

export default ContactSales
