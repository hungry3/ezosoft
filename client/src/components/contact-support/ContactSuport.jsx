import React from 'react'
import  Bg from '/src/assets/images/mainBg.svg'

function ContactSuport() {
  return (
    <>
     <div
        className="relative w-full -mt-[100px]   bg-cover md:h-[80vh] lg:h-[120vh] xl:h-[100vh] h-[100vh] bg-[url('/src/assets/images/mainBg.svg')]  bg-no-repeat bg-center"
      
      >
        
      </div>

      <div className='relative flex items-center justify-center -mt-[400px] mb-[100px]'>
     <div className='bg-white rounded-md shadow-lg max-w-[571px] w-full '>
        <div className='m-[60px]  flex flex-col gap-6'>
        <div className='flex items-center justify-center '>Contact Support</div>
        <input type='email' placeholder=' Email Address*' className='pl-[24px] py-[15px] text-[16px] font-[400] font-[Poppins] outline-none border border-black rounded-md focus:border-lightBlue'/>
         
        
            <input type='text' placeholder=' First Name*' className='pl-[24px] py-[15px] text-[16px] font-[400] font-[Poppins] outline-none border border-black rounded-md focus:border-lightBlue'/>
            <input type='text' placeholder=' Last Name*' className='pl-[24px] py-[15px] text-[16px] font-[400] font-[Poppins] outline-none border border-black rounded-md focus:border-lightBlue'/> 
           <input type='tel' placeholder=' Phone*' className='pl-[24px] py-[15px] text-[16px] font-[400] font-[Poppins] outline-none border border-black rounded-md focus:border-lightBlue'/>
           <input type='text' placeholder=' Your role*' className='pl-[24px] py-[15px] text-[16px] font-[400] font-[Poppins] outline-none border border-black rounded-md focus:border-lightBlue'/>
           <input type='text' placeholder=' Country*' className='pl-[24px] py-[15px] text-[16px] font-[400] font-[Poppins] outline-none border border-black rounded-md focus:border-lightBlue'/>
           
            <button className="w-full py-[15px] text-white bg-blue transition rounded-md  hover:bg-gradient text-[18px] font-[500] font-[Poppins] text-center leading-[20px]">
            Start Your Free Trial
          </button>
        </div>
      </div>
     </div>
      {/* <div className='flex items-center justify-center -mt-[200px] '> 
      <div className='absolute bg-white rounded-md shadow-custom mb-[100px]'>
        <div className='m-[60px] lg:w-[571px] xl:w-[571px] md:w-[500px] flex flex-col gap-6'>
          <input type='email' placeholder=' Email Address*' className='pl-[24px] py-[15px] text-[16px] font-[400] font-[Poppins] outline-none border border-black rounded-md focus:border-lightBlue'/>

            <input type='text' placeholder=' First Name*' className='pl-[24px] py-[15px] text-[16px] font-[400] font-[Poppins] outline-none border border-black rounded-md focus:border-lightBlue'/>
            <input type='text' placeholder=' Last Name*' className='pl-[24px] py-[15px] text-[16px] font-[400] font-[Poppins] outline-none border border-black rounded-md focus:border-lightBlue'/>
            <input type='tel' placeholder=' Phone*' className='pl-[24px] py-[15px] text-[16px] font-[400] font-[Poppins] outline-none border border-black rounded-md focus:border-lightBlue'/>
            <textarea className='h-[124px] w-full  pl-[24px] py-[15px] text-[16px] font-[400] font-[Poppins] outline-none border border-black rounded-md focus:border-lightBlue' placeholder='Let us know how we can help?'/>
            <button className="w-full py-[15px] text-white bg-blue transition rounded-md  hover:bg-gradient text-[18px] font-[500] font-[Poppins] text-center leading-[20px]">
            Start Your Free Trial
          </button>
        </div>
      </div>
      </div> */}

      
    </>
  )
}

export default ContactSuport
