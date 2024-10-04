import React from 'react'
import { useForm } from "react-hook-form"

const PricingBody = () => {
  

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

    // Function to submit all the templates
    const handleUpload = (data) => {
      console.log('Submitting Data:', data);
    };
  return (
    <>
    <form onSubmit={handleSubmit(handleUpload)}>
       <div className='bg-[#F9F9F9] w-full flex flex-col'>
       <h2 className='mt-[53px] text-[20px] mx-[20px] leading-[30px] font-[500] font-[Poppins]'>Pricing</h2>
        <div className='mt-[33px] mx-[17px]  border border-[#D9D9D9] rounded-md px-[10px] py-[30px] lg:px-[40px] xl:px-[40px] md:px-[40px] bg-white flex flex-col'>
        <h2 className='text-[20px] mx-[20px] leading-[30px] font-[500] font-[Poppins]'>Single User Monthly</h2>
        
        {/* single user monthly */}
        <div className='w-full border border-[#D9D9D9] rounded-md py-[30px] px-[23px] mt-[30px]'>
            <div className='flex flex-col lg:items-center xl:items-center gap-[35px] md:flex-row xl:flex-row lg:flex-row '>
                <label className='font-[Poppins] text-[14px] max-w-[8%] w-full '>Name</label>
                <div className='flex flex-col w-full'>
                <input type='text' placeholder='type here' className='w-full py-[9px] pl-[16px] outline-none border border-[#D9D9D9] rounded-md bg-[#F9F9F9]'
                   {...register('name1',{required:true})}

                />
                {errors.name1 && <span className="text-red-400">Name is required</span>}
                </div>


                <label className='font-[Poppins] text-[14px] max-w-[5%] w-full '>Price</label>
               <div className='flex flex-col w-full'>
               <input type='text' placeholder='type here' className='w-full py-[9px] pl-[15px] outline-none border border-[#D9D9D9] rounded-md bg-[#F9F9F9]'
                  {...register('price1',{required:true})}
                />
                {errors.price1 && <span className="text-red-400">Price is required</span>}
               </div>
            </div>
            <div className='mt-[25px] flex flex-col md:flex-row lg:flex-row xl:flex-row  lg:gap-[45px] xl:gap-[45px] md:gap-[30px]'>
            <label className='font-[Poppins] text-[14px] max-w-[6%] w-full'>Desription</label>
            <div className='flex flex-col w-full'>
            <input type='text' placeholder='type here' className='w-full py-[9px] pl-[15px] outline-none border border-[#D9D9D9] rounded-md bg-[#F9F9F9]'
              {...register('description1',{required:true})}
            />
            {errors.description1 && <span className="text-red-400">Description is required</span>}
            </div>
            </div>
          
          {/* save buton */}
          <div className='flex justify-end mt-[30px]'>
        <button className='py-[8px] px-[65px] text-[18px] font-semibold font-[Poppins] leading-[27px] bg-[#293950] border rounded-md text-white hover:bg-blue'>
          Save
        </button>
      </div>

        </div>
        
        <h2 className='mt-[25px] text-[20px] mx-[20px] leading-[30px] font-[500] font-[Poppins]'>Single User Yearly</h2>
         {/* single user yearly */}
         <div className='w-full border border-[#D9D9D9] rounded-md py-[30px] px-[23px] mt-[30px]'>
            <div className='flex flex-col lg:items-center xl:items-center gap-[35px] md:flex-row xl:flex-row lg:flex-row '>
                <label className='font-[Poppins] text-[14px] max-w-[8%] w-full '>Name</label>
                <div className='flex flex-col w-full'>
                <input type='text' placeholder='type here' className='w-full py-[9px] pl-[16px] outline-none border border-[#D9D9D9] rounded-md bg-[#F9F9F9]'
                   {...register('name2',{required:true})}

                />
                {errors.name2 && <span className="text-red-400">Name is required</span>}
                </div>


                <label className='font-[Poppins] text-[14px] max-w-[8%] w-full '>Price</label>
               <div className='flex flex-col w-full'>
               <input type='text' placeholder='type here' className='w-full py-[9px] pl-[15px] outline-none border border-[#D9D9D9] rounded-md bg-[#F9F9F9]'
                  {...register('price2',{required:true})}
                />
                {errors.price2 && <span className="text-red-400">Price is required</span>}
               </div>
            </div>
            <div className='mt-[25px] flex flex-col md:flex-row lg:flex-row xl:flex-row  lg:gap-[45px] xl:gap-[45px] md:gap-[30px]'>
            <label className='font-[Poppins] text-[14px] max-w-[7%] w-full'>Desription</label>
            <div className='flex flex-col w-full'>
            <input type='text' placeholder='type here' className='w-full py-[9px] pl-[15px] outline-none border border-[#D9D9D9] rounded-md bg-[#F9F9F9]'
              {...register('description2',{required:true})}
            />
            {errors.description2 && <span className="text-red-400">Description is required</span>}
            </div>
            </div>
          
          {/* save buton */}
          <div className='flex justify-end mt-[30px]'>
        <button className='py-[8px] px-[65px] text-[18px] font-semibold font-[Poppins] leading-[27px] bg-[#293950] border rounded-md text-white hover:bg-blue'>
          Save
        </button>
      </div>

        </div>


      {/* custom */}
      <h2 className='mt-[25px] text-[20px] mx-[20px] leading-[30px] font-[500] font-[Poppins]'>Custom</h2>

      <div className='w-full max-w-[100%] border border-[#D9D9D9] rounded-md py-[30px] px-[23px] mt-[15px]'>
           <div className='flex lg:flex-row xl:flex-row md:flex-col flex-col w-full gap-[35px]'>
              <div className='w-full max-w-[100%]'>
              <div className='flex lg:flex-row xl:flex-row md:flex-col flex-col w-full max-w-[100%]  lg:items-center xl:items-center lg:gap-[70px] xl:gap-[70px]'>
                <label className='font-[Poppins] text-[14px] '>Name</label>
                <input type='text' placeholder='type here' className=' w-full max-w-[100%] py-[9px] pl-[16px] outline-none border border-[#D9D9D9] rounded-md bg-[#F9F9F9]'/>
              
            </div>

            <div className='mt-[20px] flex lg:flex-row xl:flex-row md:flex-col flex-col w-full  lg:items-center xl:items-center lg:gap-[70px] xl:gap-[70px]'>
                <label className='font-[Poppins] text-[14px]  max-w-[100%] '>Users</label>
                <input type='text' placeholder='type here' className='w-[100%] py-[9px] pl-[16px] outline-none border border-[#D9D9D9] rounded-md bg-[#F9F9F9]'/>
                
            </div>

            <div className='mt-[20px] flex lg:flex-row xl:flex-row md:flex-col flex-col w-full  lg:items-center xl:items-center lg:gap-[70px] xl:gap-[70px]'>
                <label className='font-[Poppins] text-[14px]  max-w-[100%] '>Users</label>
                <input type='text' placeholder='type here' className='w-[100%] py-[9px] pl-[16px] outline-none border border-[#D9D9D9] rounded-md bg-[#F9F9F9]'/>
               
            </div>

            <div className='mt-[20px] flex lg:flex-row xl:flex-row md:flex-col flex-col w-full  lg:items-center xl:items-center lg:gap-[70px] xl:gap-[70px]'>
                <label className='font-[Poppins] text-[14px]  max-w-[100%] '>Users</label>
                <input type='text' placeholder='type here' className='w-[100%] py-[9px] pl-[16px] outline-none border border-[#D9D9D9] rounded-md bg-[#F9F9F9]'/>
               
            </div>

            <div className='mt-[20px] flex lg:flex-row xl:flex-row md:flex-col flex-col w-full  lg:items-center xl:items-center lg:gap-[70px] xl:gap-[70px]'>
                <label className='font-[Poppins] text-[14px]  max-w-[100%] '>Users</label>
                <input type='text' placeholder='type here' className='w-[100%] py-[9px] pl-[16px] outline-none border border-[#D9D9D9] rounded-md bg-[#F9F9F9]'/>
                
            </div>
             



              <div className='w-full'></div>
            </div>

            <div className='w-full max-w-[100%]'>
              <div className='flex lg:flex-row xl:flex-row md:flex-col flex-col w-full max-w-[100%]  lg:items-center xl:items-center gap-4'>
                <label className='font-[Poppins] text-[14px] text-nowrap '>User Per Price</label>
                <input type='text' placeholder='type here' className=' w-full max-w-[100%] py-[9px] pl-[16px] outline-none border border-[#D9D9D9] rounded-md bg-[#F9F9F9]'/>
              
            </div>

            <div className='mt-[20px] flex lg:flex-row xl:flex-row md:flex-col flex-col w-full  lg:items-center xl:items- gap-3 '>
                <label className='font-[Poppins] text-[14px]  max-w-[13%] w-full '>Discount</label>
                <input type='text' placeholder='type here' className='w-[100%] py-[9px] pl-[16px] outline-none border border-[#D9D9D9] rounded-md bg-[#F9F9F9]'/>
                
            </div>

            <div className='mt-[20px] flex lg:flex-row xl:flex-row md:flex-col flex-col w-full  lg:items-center xl:items-center gap-3 '>
            <label className='font-[Poppins] text-[14px]  max-w-[13%] w-full '>Discount</label>
                <input type='text' placeholder='type here' className='w-[100%] py-[9px] pl-[16px] outline-none border border-[#D9D9D9] rounded-md bg-[#F9F9F9]'/>
               
            </div>

            <div className='mt-[20px] flex lg:flex-row xl:flex-row md:flex-col flex-col w-full  lg:items-center xl:items-center gap-3'>
            <label className='font-[Poppins] text-[14px]  max-w-[13%] w-full '>Discount</label>
                <input type='text' placeholder='type here' className='w-[100%] py-[9px] pl-[16px] outline-none border border-[#D9D9D9] rounded-md bg-[#F9F9F9]'/>
               
            </div>

            <div className='mt-[20px] flex lg:flex-row xl:flex-row md:flex-col flex-col w-full  lg:items-center xl:items-center gap-3'>
            <label className='font-[Poppins] text-[14px]  max-w-[13%] w-full '>Discount</label>
                <input type='text' placeholder='type here' className='w-[100%] py-[9px] pl-[16px] outline-none border border-[#D9D9D9] rounded-md bg-[#F9F9F9]'/>
                
            </div>
             



            
            </div>
            </div>

           

            <div className='mt-[25px] flex lg:flex-row xl:flex-row md:flex-col flex-col lg:gap-[45px] xl:gap-[45px] md:gap-[30px]'>
            <label className='font-[Poppins] text-[14px] '>Desription</label>
            <input type='text' placeholder='type here' className='w-full pt-[9px] pb-[30px] pl-[15px] outline-none border border-[#D9D9D9] rounded-md bg-[#F9F9F9]'/>
            </div>
          
          {/* save buton */}
          <div className='flex justify-end mt-[30px]'>
        <button className='py-[8px] px-[65px] text-[18px] font-semibold font-[Poppins] leading-[27px] bg-[#293950] border rounded-md text-white hover:bg-blue'>
          Save
        </button>
      </div>

        </div>



        </div>
       </div>
       </form>
    </>
  )
}

export default PricingBody
