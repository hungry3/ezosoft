import React from 'react'
import Doc1Image from '/src/assets/images/doc1Image.svg'

function Body() {
  // Create an array of 10 templates
  const templates = Array.from({ length: 10 }, (_, index) => ({
    id: index + 1,
    title: `Template ${index + 1}`,
    description: 'In publishing and design, Lorem ipsum is a placeholder text to.'
  }));

  return (
    <>
      <div className='m-[32px]'>
        <div className='bg-[#F9F9F9] rounded-lg'>
          {/* cards */}
          <div className='p-[30px] flex flex-wrap justify-start gap-[28px]'>
            {/* Map over the templates array to generate cards */}
            {templates.map((template) => (
              <div
                key={template.id}
                className='relative max-w-[243px] w-full border border-[#E8EDF1] rounded-lg shadow-[#E8EDF1]'
              >
                <div className='p-[20px] flex flex-col'>
                  {/* 1st div */}
                  <div className='flex items-center flex-start gap-[20px]'>
                    <div className='border-[#01ADC3] border rounded-lg border-2'>
                      <div className='border-4 rounded-md border-lightBlue p-[10px]'>
                        <img src={Doc1Image} alt={`Template ${template.id}`} />
                      </div>
                    </div>
                  </div>

                  {/* 2nd div */}
                  <div className='text-[16px] leading-[24px] font-[500px] font-[Poppins] mt-[15px]'>
                    {template.title}
                  </div>

                  {/* 3rd div */}
                  <div className='mt-[18px] text-[12px] font-[400] font-[Poppins] max-w-[190px] w-full'>
                    {template.description}
                  </div>

                  {/* 4th div */}
                  <div className='mt-[19px] flex flex-between w-[100%] gap-4'>
                    <button className='bg-[#006BC5] w-full text-[12px] text-center text-white rounded-lg font-[Poppins] py-1 hover:border hover:bg-transparent hover:text-black'>
                      View
                    </button>
                    <button className='bg-[#006BC5] w-full text-[12px] text-center text-white rounded-lg font-[Poppins] py-1 hover:border hover:bg-transparent hover:text-black'>
                      Download
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Body
