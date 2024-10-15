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
          <p className='text-center text-[40px] mt-[100px] leading-[50px]'>
            What Our Clients Say About Us
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-[40px] w-full'>
          {testimonials.map((testimonial, index) => (
            <div key={index} className='flex items-center justify-center w-full'>
              <div className='w-full '>
                <div className='w-full h-[291px] bg-[url("/src/assets/images/bg-slider.svg")] bg-cover bg-center rounded-md'>
                  <p className='pl-[40px] py-[50px] max-w-[343px] font-[Poppins] text-[16px] leading-[26px]'>
                    {testimonial.text}
                  </p>
                  <div className='pl-[40px] flex gap-2'>
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className='w-[60px] h-[60px] rounded-full'
                    />
                    <div>
                      <h4 className='text-[18px] font-[Poppins] font-[400]'>{testimonial.name}</h4>
                      <p className='text-[14px] font-[Poppins]'>{testimonial.role}</p>
                    </div>
                    <div className='lg:ml-[109px] w-[143px] h-[200px]'></div>
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