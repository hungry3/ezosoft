import { useState } from 'react';
import leftarrow from '/src/assets/images/left arrow.svg'
import rightarrow from '/src/assets/images/right arrow.svg'
import { useQuery } from '@tanstack/react-query';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { Link, NavLink, useParams } from 'react-router-dom';
import { axiosConfig } from '../../utils/axiosConfig';
import { useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import Google from '/src/assets/images/google.svg'
import { ToastContainer,toast } from 'react-toastify';
import fb from '/src/assets/images/fb-icon.svg'
import email from '/src/assets/images/email-icon.svg'
import building from '/src/assets/images/building-icon.svg'
import { Dialog,  DialogContent } from '@mui/material';
import useGoogleLoginHandler from '../../hooks/useGoogleLogin';


// Define the SingleTemplate component
const SingleTemplate = () => {
  const { id: templateId } = useParams();
  const location = useLocation();
  const { someProp } = location.state || {}; 
  const { auth } = useAuth();
 
  const [showLoginPopup, setShowLoginPopup] = useState(false);
   console.log("auth>>>>>>>>>>>>>>>>", auth?.accessToken?.user)

   const user = auth?.accessToken?.user


const axiosPrivate = useAxiosPrivate()
   
   const login = useGoogleLoginHandler();
  const fetchTemplate = async (id) => {
    const response = await axiosPrivate.get(`user/templates/${id}`);
    return response.data;
  };
  

  const { data: template, isLoading, isError } = useQuery({
    queryKey: ['template', templateId],
    queryFn: async () => await fetchTemplate(templateId),
    enabled: !!templateId,
  });
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [startIndex, setStartIndex] = useState(0);
  
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    console.error(isError);
    return <div>Error fetching templates: {isError.message}</div>;
  }

  const data = template?.data?.templates[0] || {};
 
  
  const images = data?.templatePageImage || [];
  // console.log(data);
  
  

  const visibleImages = images.slice(startIndex, startIndex + 7);


  const handleImageClick = (index) => {
    setActiveImageIndex(index);
  };


  const handlePrevClick = () => {
    setStartIndex((prevIndex) => Math.max(prevIndex - 2, 0));
  };

  const handleNextClick = () => {
    setStartIndex((prevIndex) => Math.min(prevIndex + 2, images.length - 7)); 
  };


  console.log(user?.subscriptionStatus,"user subscription")


const handleDownload = async()=>{
  // const axiosPrivate = useAxiosPrivate();
  if(!auth){
    setShowLoginPopup(true)
  }
  else if(user?.subscriptionStatus!=="active") {
    

      console.log("ajhfdkljwe");
      
      setShowLoginPopup(true)
    
    
  }
  else{
    try{
      const response = await axiosPrivate.get(`/user/templateUrl/${templateId}`)
      // console.log(response.data.data.templates[0]);
     
    
        const template = response.data.data.templates[0];
        let url = template.templateUrl;
        if (url.startsWith("http://")) {
          url = url.replace("http://", "https://");
      }
      // console.log(url);
      
        if (url && url.startsWith("https://")) {
        
          const a = document.createElement('a');
      
          a.href = url;
      
        
          a.download = template.templateTitle ? template.templateTitle : 'download';

          document.body.appendChild(a);
      
         
          a.click();
      
          a.remove();
          toast.success("Template downloaded successfully!"); 
        }
        
     
    }
    catch (error) {
      // Check if it's a 401 Unauthorized error and show login popup
      if (error?.response?.status === 401) {
        setShowLoginPopup(true);
      } else {
        toast.error("Error downloading template");
        console.log("Error downloading template:", error);
      }
    }
  }
}

  
  return (
    <>
      <ToastContainer />
    <div className="m-[100px]  flex flex-col justify-center items-center">
      <div className="flex items-center gap-[150px] flex-wrap">
      
        <div className="border-stone-300 border-[2px] rounded max-w-[456px] max-h-[650px]">
          <img src={images[activeImageIndex]} alt="active-image" className="rounded max-w-[456px] max-h-[650px] w-full h-full" />
        </div>

        <div className="flex flex-col items-start justify-start">
          <h2 className="text-[28px]">{data?.templateTitle}</h2>
          <p className="text-[16px] text-[#58595B] mt-[16px]">Document(A4 Portrait)-210 x 297 mm</p>
          <p className="text-[16px] max-w-[512px] mt-[20px]">
           {" It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English."}
          </p>


          <div className='py-3 rounded px-52 bg-blue mt-[50px] cursor-pointer' onClick={handleDownload}>
            <botton className="text-white" >
                Download
            </botton>
          </div>

          <div className='flex items-center gap-4 mt-[40px]'><p className='text-[16px] font-extrabold'>Available formats:</p>
              {someProp === "documents" ? 
            (
              <img src='/src/assets/images/word-icon.svg'/>
            ) : 
            someProp === "presentation" ? 
            (
              <img src='/src/assets/images/pptx-file.png'/>
            ) : someProp === "excel" ? (
              <img src='/src/assets/images/excel.png'/>
            ):
            (
              <img src='/src/assets/images/word-icon.svg'/>
            )}
        
          </div>
        </div>
      </div>

  
      <div className="mt-[50px]">
        <div className="flex items-center">
         
          <button
            onClick={handlePrevClick}
            className={`mr-[10px] w-[62px] h-[62px] flex justify-center items-center border rounded-full bg-gray-200 ${startIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={startIndex === 0}
          >
           <img src={leftarrow} alt='arrow-left'/>
          </button>

       
          <div className="flex gap-[14px] transition-transform duration-500 ease-in-out translate-x-3">
            {visibleImages.map((image, index) => (
              <div
                key={index + startIndex} 
                className={`cursor-pointer max-w-[120px] max-h-[160px] ${startIndex + index === activeImageIndex ? 'border-2 border-blue rounded-lg' : ''}`}
                onClick={() => handleImageClick(startIndex + index)}
              >
                <img src={image} alt={`image-${index}`} className="w-full h-full rounded-lg" />
              </div>
            ))}
          </div>

        
          <button
            onClick={handleNextClick}
            className={`ml-[30px] w-[62px] h-[62px] flex justify-center items-center border rounded-full bg-gray-200 ${
              startIndex + 7 >= images.length ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={startIndex + 7 >= images.length}
          >
          <img src={rightarrow} alt='arrow-right'/>
          </button>
        </div>
      </div>

</div>
   <Dialog open={showLoginPopup} onClose={() => setShowLoginPopup(false)}
  PaperProps={{
    style: {
      width: '80%', 
      maxWidth: '900px', 
    },
  }}
>
  {/* <DialogTitle></DialogTitle> */}
  <DialogContent sx={{padding:'0px'}}>
    <div className='flex flex-wrap gap-2'>
     
      <div className='w-[49%] h-full mt-[25px] pl-3 py-5'>
      <div className='flex flex-col gap-4 ml-4'>
      <div className='text-[25px]  font-semibold '>Log in or sign up to edit this
      template</div>
      <div> Use your email or another service to continue
      with ezosoft (it's free)!</div>
        <div>
        <button className="flex items-start justify-start w-full gap-4 py-3 transition border border-gray-300 rounded-md hover:bg-gray-100 cursor" onClick={login}>
            <img src={Google} alt="Google" loading='lazy' className="w-5 h-5 ml-4 mr-2" />
            <span className='text-[16px] leading-[20px] font-[Poppins]  font-semibold'> Continue with Google</span>
          </button>
        </div>
        <div>
        <button className="flex items-start justify-start w-full gap-4 py-3 transition border border-gray-300 rounded-md hover:bg-gray-100 cursor" >
            <img src={fb} alt="Google" loading='lazy' className="w-5 h-5 ml-4 mr-2" />
            <span className='text-[16px] leading-[20px] font-[Poppins]  font-semibold'> Continue with Facebook</span>
          </button>
        </div>
        <div>
        <button className="flex items-start justify-start w-full gap-4 py-3 transition border border-gray-300 rounded-md hover:bg-gray-100 cursor" >
            <img src={email} alt="Google" loading='lazy' className="w-5 h-5 ml-4 mr-2" />
            <span className='text-[16px] leading-[20px] font-[Poppins]  font-semibold'> Continue with Email</span>
          </button>
        </div>
        <div>By continuing, you agree to ezosoft's Terms of Use. Read our <Link to='/privacy' className='underline'> Privacy Policy.</Link></div>
        <div className='flex items-center justify-start gap-4'> <div><img src={building} alt='terms'/></div> <div>Sign up with you</div></div>
        </div>
      </div>

    
      <div className='flex items-center justify-center w-1/2 min-h-full m-auto overflow-hidden bg-gray-300 h-[500px]'>
      <div className='h-'>
      <img
          src={images[activeImageIndex] || "/src/assets/images/secondSection-img.svg" }
          alt="template-preview"
          style={{ maxWidth: '100%',maxHeight: '500px', borderRadius: '8px' }}
        />
      </div>
      
      </div>
       
    
    </div>
  </DialogContent>
  
</Dialog>





<Dialog open={showLoginPopup} onClose={() => setShowLoginPopup(false)}
  PaperProps={{
    style: {
      width: '80%', 
      maxWidth: '900px', 
    },
  }}
>
  {/* <DialogTitle></DialogTitle> */}
  <DialogContent sx={{padding:'0px'}}>
    <div className='flex flex-wrap items-center justify-center gap-2 '>
     
      <div className='w-[49%] h-full mt-[25px] pl-3 py-5 '>
      <div className='flex flex-col gap-4 m-auto'>
      <div className='text-[30px]  font-semibold   text-center'>Limited access. Purchase to unlock full features.</div>
      <div className='text-center text-[18px]'> In publishing and graphic design, Lorem ipsum is a placeholder text commonly.</div>
      <div>
      <NavLink to='/pricing'>
        <button className="flex items-start justify-center w-full gap-4 py-3 transition border rounded-md hover:bg-gray-100 cursor bg-blue">
          
            <span className='text-[16px] leading-[20px]  text-white  font-semibold'> Buy Now</span>
          </button>
          </NavLink>
        </div>
      
       
        </div>
      </div>

    
      <div className='flex items-center justify-center w-1/2 min-h-full m-auto overflow-hidden bg-gray-300 h-[500px]'>
      <div className='h-'>
      <img
          src={images[activeImageIndex] || "/src/assets/images/secondSection-img.svg" }
          alt="template-preview"
          style={{ maxWidth: '100%', maxHeight: '550px', borderRadius: '8px' }}
        />
      </div>
      
      </div>
       
    
    </div>
  </DialogContent>
  
</Dialog>





    </>
  );
};

export default SingleTemplate;
