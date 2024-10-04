import React, { useState } from 'react';

const Faq = ({ faqItems, faqItems2 }) => {
  const [expanded1, setExpanded1] = useState(null);
  const [expanded2, setExpanded2] = useState(null);

  const handleChange = (panel, setExpanded) => {
    return () => {
      setExpanded(prevPanel => (prevPanel === panel ? null : panel));
    };
  };

  return (
    <div className='bg-lightBlue'>
    <div className="py-20">
      <div className="flex items-center justify-center">
        <h1 className="mb-10 text-4xl font-bold tracking-tight text-center uppercase">
          Frequently Asked Questions
        </h1>
      </div>

      <div className="grid max-w-6xl grid-cols-1 gap-8 px-4 mx-auto md:grid-cols-2">
        {/* Left Column */}
        <div>
  {faqItems?.map((faq, i) => (
    <div
      key={i}
      className={`mb-5  rounded-md border-none shadow-none transition-all duration-300 ${
        expanded1 === `panel1-${i}` ? 'bg-cyanDark text-white shadow-lg' : 'bg-gray-200'
      }`}
    >
      <div
        className="flex justify-between p-4 cursor-pointer "
        onClick={handleChange(`panel1-${i}`, setExpanded1)}
      >
        <h2 className="font-semibold">{faq.category}</h2>
        <span className="text-xl">
          {expanded1 === `panel1-${i}` ? '-' : '+'}
        </span>
      </div>
      {expanded1 === `panel1-${i}` && (
        <div className="p-4 text-gray-800 bg-white border-none shadow-none">
          <p>{faq.description}</p>
        </div>
      )}
    </div>
  ))}
</div>


        {/* Right Column */}
        <div>
          {faqItems2?.map((faq, i) => (
            <div
              key={i}
              className={`mb-5  rounded-md border-none shadow-none transition-all duration-300 ${
                expanded2 === `panel2-${i}` ? 'bg-cyanDark text-white shadow-lg' : 'bg-gray-200'
              }`}
            >
              <div
                className="flex justify-between p-4 cursor-pointer"
                onClick={handleChange(`panel2-${i}`, setExpanded2)}
              >
                <h2 className="font-semibold">{faq.category}</h2>
                <span className="text-xl">
                  {expanded2 === `panel2-${i}` ? '-' : '+'}
                </span>
              </div>
              {expanded2 === `panel2-${i}` && (
                <div className="p-4 text-gray-800 bg-white">
                  <p>{faq.description}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
};

export default Faq;
