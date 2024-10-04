import React from 'react';
import DocSetting from '/src/assets/images/documents-setting-icon.svg';

const cardData = [
  {
    id: 1,
    count: '13',
    title: 'Project Initiation',
    description: 'In publishing and design, Lorem ipsum is a placeholder text to.',
    buttonLabel: 'view',
    image: DocSetting,
  },
  {
    id: 2,
    count: '15',
    title: 'Project Planning',
    description: 'Planning is the process of thinking about the activities required.',
    buttonLabel: 'view',
    image: DocSetting,
  },
  {
    id: 3,
    count: '20',
    title: 'Project Execution',
    description: 'Execution is about implementing the plan and monitoring progress.',
    buttonLabel: 'view',
    image: DocSetting,
  },
  {
    id: 4,
    count: '30',
    title: 'Project Closure',
    description: 'Project closure is the formal termination of a project.',
    buttonLabel: 'view',
    image: DocSetting,
  },
  {
    id: 5,
    count: '25',
    title: 'Project Monitoring',
    description: 'Monitoring ensures the project stays on track.',
    buttonLabel: 'view',
    image: DocSetting,
  },
];

function Body() {
  return (
    <>
      <div className='m-[32px]'>
        <div className='bg-[#F9F9F9] rounded-lg'>
          {/* cards */}
          <div className='p-[30px] flex flex-wrap justify-between gap-[20px]'>
            {/* Map over the cardData array to render each card */}
            {cardData.map((card) => (
              <div
                key={card.id}
                className='relative max-w-[243px] w-full border border-[#E8EDF1] rounded-lg shadow-[#E8EDF1]'
              >
                <div className='p-[20px] flex flex-col'>
                  {/* 1st div */}
                  <div className='flex items-center flex-start gap-[20px]'>
                    <div className='border-[#01ADC3] border rounded-lg border-2'>
                      <div className='border-4 rounded-md border-lightBlue p-[10px]'>
                        <img src={card.image} alt={card.title} />
                      </div>
                    </div>
                    <h2 className='font-semibold font-[Poppins] text-[20px]'>{card.count}</h2>
                  </div>

                  {/* 2nd div */}
                  <div className='text-[16px] font-[500px] font-[Poppins] mt-[15px]'>
                    {card.title}
                  </div>

                  {/* 3rd div */}
                  <div className='mt-[18px] text-[12px] font-[400] font-[Poppins] max-w-[190px] w-full'>
                    {card.description}
                  </div>

                  {/* 4th div */}
                  <button className='mt-[19px] bg-[#006BC5] max-w-[191px] text-center text-white rounded-lg font-[Poppins] py-1'>
                    {card.buttonLabel}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Body;
