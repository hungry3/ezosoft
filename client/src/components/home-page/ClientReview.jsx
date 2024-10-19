import React, { useState, useEffect } from 'react';
import Nathalia from '/src/assets/images/nathila.svg';
import '/src/components/home-page/ClientReview.css'

const testimonials = [
  {
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.",
    name: "Nathalia Dewi",
    role: "Marketing",
    image: Nathalia
  }, {
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.",
    name: "Nathalia Dewi",
    role: "Marketing",
    image: Nathalia
  }, {
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.",
    name: "Nathalia Dewi",
    role: "Marketing",
    image: Nathalia
  }, {
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.",
    name: "Nathalia Dewi",
    role: "Marketing",
    image: Nathalia
  }, 
 
  // ... (rest of your testimonials)
];

function ClientReview() {




  return (
    <div className='w-[100%] bg-white'>
      <div className='lg:m-[100px] xl:m-[100px] m-[30px] bg-white'>
        <div className='flex items-center justify-center mb-[36px]'>
          <p className='text-center lg:text-[40px] xl:text-[40px] md:text-[35px] text-[30px] lg:mt-[100px] xl:mt-[100px] md:mt-[70px] sm:mt-[50px] leading-[50px]'>
            What Our Clients Say About Us
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-[40px] w-full'>
          {testimonials.map((testimonial, index) => (
            <div key={index} className='flex items-center justify-center w-full'>
              <div className='w-full '>
                <div className='flex flex-col justify-between  w-full  h-auto bg-[url("/src/assets/images/bg-slider.svg")] bg-cover bg-center rounded-md'>
                 <div className='w-full'>
                 <p className='pl-[20px] md:pl-[20px] lg:pl-[50px] xl:pl-[50px] py-[20px] md:py-[30px] lg:py-[50px] xl:py-[50px] max-w-[343px] font-[Poppins] text-[16px] leading-[26px]'>
                    {testimonial.text}
                  </p>
                 </div>
                  <div className='pl-[20px] md:pl-[30px] lg:pl-[30px] xl:pl-[40px] flex items-end  gap-2 mb-auto pb-[20px]'>
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className='w-[60px] h-[60px] rounded-full'
                    />
                    <div>
                      <h4 className='text-[18px] font-[Poppins] font-[400]'>{testimonial.name}</h4>
                      <p className='text-[14px] font-[Poppins]'>{testimonial.role}</p>
                    </div>
                 
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ClientReview;