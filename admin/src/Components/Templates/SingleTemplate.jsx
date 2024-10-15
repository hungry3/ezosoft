import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { axiosConfig } from '../../utils/axiosConfig';

const SingleTemplate = () => {
  const { id } = useParams(); 
  const [template, setTemplate] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTemplate = async () => {
      try {
        const response = await axiosConfig.get(`/admin/template/${id}`);
        console.log("response:>>>>>>>>>>",response?.data?.data)
        setTemplate(response?.data?.data); 
      } catch (error) {
        console.error('Error fetching template:', error);
       
        navigate('/allTemplates');
      }
    };

    fetchTemplate();
  }, [id, navigate]);

//   if (!template) {
//     return <div>Loading...</div>;
//   }

  return (
    <div className='flex flex-col w-full bg-[#F9F9F9]'>
      <div className='lg:m-[40px] xl:m-[40px] md:m-[20px] bg-white border rounded-md px-[10px] py-[30px] lg:px-[40px] xl:px-[40px] md:px-[40px]'>
        <h2 className='text-[20px] leading-[30px] font-[500] font-[Poppins]'>Template Details</h2>

        <div className='flex flex-col md:flex-row lg:flex-row xl:flex-row w-[100%] gap-[20px] mt-[30px]'>
          {/* Main Cover Image */}
          <div className='flex flex-col mt-[30px] lg:w-[30%] xl:w-[30%] md:w-[40%] w-[90%]'>
            <div className='h-[263px] border-2 border-[#293950] border-dashed rounded-lg bg-[#E7E8F1] flex items-center justify-center'>
              {template?.avatar ? (
                <img src={template?.avatar} alt='Main Cover' className='object-cover w-full h-full rounded-lg' />
              ) : (
                <p>No cover image available</p>
              )}
            </div>
          </div>

          <div className='flex flex-col w-full lg:w-[60%]'>
            <div className='flex flex-col'>
              <p className='text-[14px] leading-[21px] font-[Poppins] font-[400]'>Category</p>
              <p className='mt-[4px] px-[10px] py-[10px] rounded-md bg-[#F9F9F9] outline-none border border-[#D9D9D9] text-[14px] font-[Poppins]'>{template?.category}</p>
            </div>

            <div className='flex flex-col mt-[20px]'>
              <p className='text-[14px] leading-[21px] font-[Poppins] font-[400]'>Title</p>
              <p className='mt-[4px] px-[10px] py-[10px] rounded-md bg-[#F9F9F9] outline-none border border-[#D9D9D9] text-[14px] font-[Poppins]'>{template?.name}</p>
            </div>

            <div className='flex flex-col mt-[20px]'>
              <p className='text-[14px] leading-[21px] font-[Poppins] font-[400]'>Description</p>
              <p className='mt-[4px] px-[10px] py-[10px] rounded-md bg-[#F9F9F9] outline-none border border-[#D9D9D9] text-[14px] font-[Poppins]'>{template?.description}</p>
            </div>
          </div>
        </div>

        <div className='mt-[30px]'>
          <h3 className='text-[18px] leading-[30px] font-[Poppins] font-[500]'>All Templates</h3>
          <div className='flex gap-[10px] mt-[20px] flex-col'>
          {template?.templates?.map((template, index) => (
            <div key={index} className='mt-[30px]'>
              <div className='flex justify-between'>
                <h3 className='text-[18px] leading-[30px] font-[Poppins] font-[500]'>Template {index + 1}</h3>
              
              </div>
              <div className='flex flex-col md:flex-row lg:flex-row xl:flex-row mt-[20px] gap-[20px]'>
                {/* Template Image */}
                <div className='flex flex-col lg:w-[30%] xl:w-[30%] md:w-[40%] w-[100%]'>
                  <p className='text-[14px] leading-[21px] font-[Poppins] font-[400]'>Template Image</p>
                  <div className='h-[150px] border-2 border-[#D9D9D9] border-dashed rounded-lg bg-[#E7E8F1] flex items-center justify-center' onClick={() => document.getElementById(`coverImageInput-${index}`).click()}>
                    {template.templateImage ? (
                      <img src={template?.templateImage} alt='Template preview' className='object-cover w-full h-full rounded-lg' />
                    ) : (
                      <div className='flex items-center justify-center w-full h-full cursor-pointer'>
                        not available
                      </div>
                    )}
                  </div>
                
                </div>

                <div className='flex flex-col w-1/2'>
                <div className='flex flex-col w-[100%]'>
                  <p className='text-[14px] leading-[21px] font-[Poppins] font-[400]'>Template Title</p>
    
                  <div className=' mt-[4px]  pl-[22px] mr-[30px] py-[8px] rounded-md bg-[#F9F9F9] outline-none border border-[#D9D9D9] text-[14px] font-[Poppins] w-full'>
                  {template.templateTitle}
                  </div>
                </div>

                {/* Template Description */}
                <div className='flex flex-col w-[100%]'>
                  <p className='text-[14px] leading-[21px] font-[Poppins] font-[400]'>Template Description</p>
                  <div type='text' placeholder='Template Description' className=' mt-[4px] pl-[22px] mr-[30px] py-[8px] rounded-md bg-[#F9F9F9] outline-none border border-[#D9D9D9] text-[14px] font-[Poppins] w-full'  >
                  {template.templateContent}
                  </div>
                </div>
                </div>
              </div>

              {/* Template Page Images */}
              <div className='flex flex-col mt-[20px]'>
                <p className='text-[14px] leading-[21px] font-[Poppins] font-[400]'>Template Images</p>
                <div className='flex items-center gap-[10px]'>
                  {template?.templatePageImage.map((img, imgIndex) => (
                    <div key={imgIndex} className='relative'>
                      <img src={img} alt={`Template Page ${imgIndex + 1}`} className='w-[100px] h-[100px] rounded-lg' />
                      
                    </div>
                  ))}
                
                </div>
              </div>

              <div className='flex flex-col mt-[30px]'>
            <p className='text-[14px] leading-[21px] font-[Poppins] font-[400]'>Template Document</p>
            <a
              href={template?.templateUrl}
              target='_blank'
              rel='noopener noreferrer'
              className='p-2 border rounded border-blue w-fit text-bold '>
              View Document
            </a>
          </div>
            </div>
          ))}
          </div>
        </div>

       
        {template?.templateUrl && (
          <div className='flex flex-col mt-[30px]'>
            <p className='text-[14px] leading-[21px] font-[Poppins] font-[400]'>Template Document</p>
            <a
              href={template?.templateUrl}
              target='_blank'
              rel='noopener noreferrer'
              className='text-blue-500 underline'>
              View Document
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleTemplate;
