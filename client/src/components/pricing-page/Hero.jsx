import { Link, NavLink, useNavigate } from "react-router-dom";
import RightIcon from "/src/assets/images/correct-icon.svg";
import CrossIcon from "/src/assets/images/cross-icon.svg";
import { useQuery } from "@tanstack/react-query";
import logo from '/src/assets/images/card.logo.svg'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { ToastContainer,toast } from 'react-toastify';
import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import CheckOutForm from "../checkout/CeckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import useAuth from "../../hooks/useAuth";

import fb from '/src/assets/images/fb-icon.svg'
import email from '/src/assets/images/email-icon.svg'
import building from '/src/assets/images/building-icon.svg'
import Google from '/src/assets/images/google.svg'
import GlobalLoader from "../../utils/GlobalLoader";
const stripePromise = loadStripe("pk_test_51PpoZ0JAqu9i4Tpd9eQshFnir4xKLoCn6D54SyChw3yJbHzgwokgmPa20jG4r6njoky3gWQgKyoKfYzFvc9OzKjs00iUUo7Dh5");


function Hero() {
  const [plan, setPlans] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false); 
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedCustomOption, setSelectedCustomOption] = useState(null);
  const [selectedPlanId, setSelectedPlanId] = useState(null); 
const [selectedCustomTeamOptionId, setSelectedCustomTeamOptionId] = useState(null); 
const [showLoginPopup, setShowLoginPopup] = useState(false);
const [clientSecret, setClientSecret] = useState("");
 
const navigate = useNavigate()
  const axiosprivate = useAxiosPrivate()

  const { auth } = useAuth();
  console.log(auth,"authlasfdlk");
  
  
  
const fetchSubscriptionPlans = async () => {
    const { data } = await axiosprivate.get("/admin/get-allSubscriptionPlan");
    setPlans(data?.data);
    return data;
  
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["subscriptionPlans"],
    queryFn: fetchSubscriptionPlans,
  });
  const plans = data?.data || [];
  // setPlans(plans);

  const handleCustomPlanClick = (plan) => {
    setSelectedPlan(plan);
    setOpenPopup(true);
  };
  const handleClose = () => {
    setOpenPopup(false);
    setSelectedPlan(null);
    setSelectedCustomOption(null);
  };



  const calculateAmount = (planId, plans, customTeamOptionId) => {
    const selectedPlan = plans.find((plan) => plan._id === planId);
    if (!selectedPlan) {
      throw new Error("Invalid plan selected.");
    }
  
    let amount = selectedPlan.price;
    if (selectedPlan.customTeamOptions && customTeamOptionId) {
      const selectedCustomOption = selectedPlan.customTeamOptions.find(
        (option) => option._id === customTeamOptionId
      );
      if (selectedCustomOption) {
        amount =
          selectedCustomOption.userCount *
          selectedCustomOption.pricePerUser *
          (1 - selectedCustomOption.discount / 100);
      }
    }
  
    return Math.round(amount * 100);
  };


  useEffect(() => {
    const fetchClientSecret = async () => {
      if(clientSecret)
        return
      try {
        const amount = calculateAmount(selectedPlanId, plan, selectedCustomTeamOptionId);
        const { data } = await axiosprivate.post("/user/payment", { amount });

        console.log("Fetched clientSecret:", data.client_secret);
        

        if (!data.client_secret) {
          throw new Error("Received empty client_secret from the server.");
        }

        setClientSecret(data.client_secret);  
     
      } catch (error) {
        console.log("Failed to initialize payment: " + error.message);
      }
    };

    if (selectedPlanId && plan.length > 0 && selectedCustomTeamOptionId !== undefined) {
      fetchClientSecret(); 
    }
  }, [selectedPlanId, plan, selectedCustomTeamOptionId]);




  const handleGetStarted = async (plan) => {
    console.log(`Selected plan: ${plan.planName}`);
    
    if(!auth){
      setShowLoginPopup(true)
      setOpenPopup(false)
      
      
    }
    else {
      const customOptionId = selectedCustomOption?._id || null;

    setSelectedPlanId(plan._id);
    setSelectedCustomTeamOptionId(customOptionId);
    setShowCheckout(true);  
      
    }
  
    
     
  };

  const handleTrail =()=>{
    if(!auth){
      navigate('/login')
      
    }
    else(
      toast.warning("Already availed this offer.")
    )
  }

  const handleCustomOptionChange = (option) => {
    setSelectedCustomOption(option);
};

  const handleConfirmCustomPlan = async () => {

    if(!auth){
      setShowLoginPopup(true)
      setOpenPopup(false)
      
      
    }

    else if (selectedCustomOption) {
      setSelectedPlanId(selectedPlan._id)    
      setSelectedCustomTeamOptionId(selectedCustomOption._id)
      setShowCheckout(true);
    setOpenPopup(false)
        
        }
      }
      
  return (
    <>
    <ToastContainer/>
      <div className="relative w-full -mt-[100px]  lg:h-[120vh] xl:[110vh] bg-[url('/src/assets/images/mainBg.svg')] bg-cover bg-center">
        <div className="lg:px-[100px] xl:px-[100px] px-[40px] pb-[100px]">
          <div className=" pt-[200px] md:pt-[400px] flex items-center justify-center">
            <p className="max-w-[857px] w-full lg:text-[40px] xl:text-[40px] md:text-[35px] text-[30px] text-center leading-[50px] font-[500] text-white lg:text-center xl:text-center">
            Plan projects and manage resources on one platform. Start free.
            </p>
          </div>
          {/*trial button */}
          <div className=" mt-[70px] flex items-center justify-center flex-shrink-0">
            <NavLink to="/signup">
              <button className="bg-grey  hover:bg-gradient hover:border border-white text-white px-4 py-2 rounded-md hover:bg- font-[Poppins]">
                Start Free Trail
              </button>
            </NavLink>
          </div>
          {/* cards */}

          {/* first card */}
          {isLoading ? (<div><GlobalLoader/></div>):(


            <div className="sm:grid grid-cols-1 flex flex-col justify-center items-center   sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[20px] mt-[200px]">
           
            <div className="border-none elementCard max-w-[293px] w-[100%] pb-[23px] bg-white shadow-custom">
              <div className="mx-[30px] mt-[43px]">
                <p className="pt-[43] text-[18px] leading-[26px] font-[Poppins] text-cyanDark ">
                  Free Trial
                </p>
                <p className="font-[Poppins] text-[40px] leading-[60px] font-[600] text-cyanDark">
                  $0{" "}
                  <span className="text-[16px] leading-[26px] font-[400] text-black">
                    {" "}
                    / 14 Days
                  </span>
               
                </p>
                <p className="max-w-[200px] mt-[8px] font-[Poppins] text-[16px] leading-[26px]">
                  Lorem Ipsum has been the {"industry's"} standard dummy text
                  ever since the 1500s
                </p>
                <div className="mt-[25px] border border-[#58595B]"></div>
                <div className="mt-[35px] flex flex-col gap-[14px]">
                  <div className="flex gap-4">
                    <img src={RightIcon} className="w-[24px] h-[24px]" />
                    <p className="font-[Poppins] text-[16px] leading-[26px]">
                      Lorem Ipsum
                    </p>
                  </div>

                  <div className="flex gap-4">
                    <img src={CrossIcon} className="w-[24px] h-[24px]" />
                    <p className="font-[Poppins] text-[16px] leading-[26px]">
                      Lorem Ipsum
                    </p>
                  </div>

                  <div className="flex gap-4">
                    <img src={CrossIcon} className="w-[24px] h-[24px]" />
                    <p className="font-[Poppins] text-[16px] leading-[26px]">
                      Lorem Ipsum
                    </p>
                  </div>

                  <div className="flex gap-4">
                    <img src={CrossIcon} className="w-[24px] h-[24px]"/>
                    <p className="font-[Poppins] text-[16px] leading-[26px]">
                      Lorem Ipsum
                    </p>
                  </div>

                  <div className="flex gap-4">
                    <img src={CrossIcon} className="w-[24px] h-[24px]"  />
                    <p className="font-[Poppins] text-[16px] leading-[26px]">
                      Lorem Ipsum
                    </p>
                  </div>

                  {/*trial button */}

                  <div className="mt-[47px] flex items-center justify-center flex-shrink-0">
                  
                      <button className="bg-cyanDark text-nowrap hover:bg-gradient border border-white text-white px-[46px] py-4 rounded-md font-[Poppins] transition-all duration-300 ease-in-out hover:translate-2 hover:scale-105" onClick={handleTrail}>
                        Start Free Trial
                      </button>
                   
                  </div>
                </div>
              </div>
            </div>
            {plans.map((plan) => (
              <div
                key={plan._id}
                className="border-none elementCard max-w-[293px] w-[100%] pb-[23px] bg-white shadow-custom"
              >
                <div className="mx-[30px] mt-[43px]">
                  <p className="pt-[43] text-[18px] leading-[26px] font-[Poppins] text-cyanDark ">
                    {plan.planName}
                  </p>
                  <p className="font-[Poppins] text-[40px] leading-[60px] font-[600] text-cyanDark">
                    ${plan.price}{" "}
                    <span className="text-[16px] leading-[26px] font-[400] text-black">
                      {" "}
                      / {plan.duration}
                    </span>
                  </p>
                  <p className="max-w-[200px] mt-[8px] font-[Poppins] text-[16px] leading-[26px]">
                    Lorem Ipsum has been the industry's standard dummy text
                  </p>
                  <div className="mt-[25px] border border-[#58595B]"></div>
                  <div className="mt-[35px] flex flex-col gap-[14px]">
                    {/* Features */}
                    {plan.details.map((detail, index) => (
                      <div key={index} className="flex gap-4">
                      <div className="w-[24px] h-[24px]">
                      <img src={detail.icon} alt="Icon" className="w-full h-full" />
                      </div>
                     
                        <p className="font-[Poppins] text-[16px] leading-[26px]">
                          {detail.title}
                        </p>
                      </div>
                    ))}

                    {/* Plan actions */}
                    <div className="mt-[47px] flex items-center justify-center flex-shrink-0">
                      {/* Show popup only for custom plans */}
                      {plan.planName.includes("Custom") ? (
                        <button
                          onClick={() => handleCustomPlanClick(plan)}
                          className="bg-gradient-to-r from-lime-400 via-lime-500 to-green-500 hover:bg-gradient border border-white text-white px-[28px] py-4 rounded-md font-[Poppins] hover:scale-105 transition-all duration-300 ease-in-out text-nowrap"
                        >
                          Get Custom Plan
                        </button>
                      ) : (
                        <button
                          onClick={() => handleGetStarted(plan)}
                          className="bg-gradient hover:bg-gradient  border border-white text-white px-[58px] py-4 rounded-md font-[Poppins] hover:scale-105 transition-all duration-300 ease-in-out"
                        >
                          Get Started
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          )}
         
        </div>

      </div>

      <Dialog open={openPopup} onClose={handleClose} maxWidth="sm" fullWidth>
       
        <DialogContent>
  {selectedPlan ? (
    <>
    {selectedCustomOption && (
        <div className="p-4 mt-4 border border-gray-300 rounded-lg shadow-xl">
          <h4 className="text-lg font-semibold text-[23px]">Selected Plan</h4>
          <p>{`${selectedCustomOption.userCount} users`}</p>
          <p>{`Price per user: $${selectedCustomOption.pricePerUser}`}</p>
          <p>{`Discount: ${selectedCustomOption.discount}%`}</p>
          <h2>Total Price: ${selectedCustomOption.userCount * selectedCustomOption.pricePerUser *(1-selectedCustomOption.discount/100)}</h2>
        </div>
      )}
    

      {/* Custom Plan Options as Cards */}
      <div className="flex flex-wrap gap-5 mt-5">
        {selectedPlan.customTeamOptions.map((option, index) => (
          <div
            key={index}
            onClick={() => handleCustomOptionChange(option)}
            className={`cursor-pointer border-2 shadow-lg rounded-lg p-5 w-40 flex flex-col gap-4 justify-center items-center ${
              selectedCustomOption === option ? " border-blue" : "border-gray-300"
            }`}
          >
            <h4 className="text-lg font-semibold">
              {`${option.userCount} users`}
            </h4>
            <p className="mt-2 text-sm">
              Price:<span className="text-[20px]"> ${option.pricePerUser} </span>/user
            </p>
            <p className="text-sm">
              Discount: <span className="font-[700] text-[20px]"> {option.discount}%</span> 
            </p>
            <button className="flex items-center justify-center px-8 py-1 text-white rounded bg-gradient">Select</button>
          </div>
        ))}
      </div>

      
    </>
  ) : (
    <p>sorry try again later</p>
  )}
</DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmCustomPlan} sx={{color:"white"}} className="text-white bg-gradient-to-r from-lime-400 via-lime-500 to-green-500 hover:bg-gradient">
            Confirm Plan
          </Button>
          <Button onClick={handleClose} sx={{color:"white"}}  className=" bg-gradient-to-r from-red-400 via-rose-500 to-rose-600 hover:bg-gradient">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      { clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>  
        
        <Dialog open={showCheckout} onClose={() => setShowCheckout(false)} maxWidth="sm" fullWidth>
  <DialogTitle className="flex items-center justify-center "><img src={logo} alt="logo" className="w-[200px] mt-2 mb-2 "/></DialogTitle>
  <DialogContent>
    {selectedPlanId ? (
      <CheckOutForm
        planId={selectedPlanId}
        customTeamOptionId={selectedCustomTeamOptionId}
        plans={plan} 
      />
    ) : (
      <p>Loading...</p>
    )}
  </DialogContent>
 
</Dialog>;
             </Elements>
      ) }



{/* login popup */}


<Dialog open={showLoginPopup} onClose={() => setShowLoginPopup(false)}
 
>
  {/* <DialogTitle></DialogTitle> */}
  <DialogContent sx={{padding:'0px'}}>
    <div className='flex flex-wrap gap-2'>
     
      <div className='w-[100%] h-full mt-[25px] px-3 py-5 '>
      <div className='flex flex-col gap-4 ml-4'>
      <div className='text-[25px]  font-semibold '>Log in or sign up to Purchase This Package</div>
      <div> Use your email or another service to continue
      with ezosoft (it's free)!</div>
        <div>
        <button className="flex items-start justify-start w-full gap-4 py-3 transition border border-gray-300 rounded-md hover:bg-gray-100 cursor">
            <img src={Google} alt="Google" loading='lazy' className="w-5 h-5 ml-4 mr-2" />
            <span className='text-[16px] leading-[20px] font-[Poppins]  font-semibold'> Continue with Google</span>
          </button>
        </div>
        <div>
        <button className="flex items-start justify-start w-full gap-4 py-3 transition border border-gray-300 rounded-md hover:bg-gray-100 cursor" >
            <img src={fb} alt="facebook" loading='lazy' className="w-5 h-5 ml-4 mr-2" />
            <span className='text-[16px] leading-[20px] font-[Poppins]  font-semibold'> Continue with Facebook</span>
          </button>
        </div>
        <div>
        <NavLink to='/login'>
        <button className="flex items-start justify-start w-full gap-4 py-3 transition border border-gray-300 rounded-md hover:bg-gray-100 cursor" >
            <img src={email} alt="email" loading='lazy' className="w-5 h-5 ml-4 mr-2" />
            <span className='text-[16px] leading-[20px] font-[Poppins]  font-semibold'> Continue with Email</span>
          </button>
          </NavLink>
        </div>
        <div>By continuing, you agree to ezosoft's Terms of Use. Read our <Link to='/privacy' className='underline'> Privacy Policy.</Link></div>
        <div className='flex items-center justify-start gap-4'> <div><img src={building} alt='terms'/></div> <div>Sign up with your work email</div></div>
        </div>
      </div>

    
      
       
    
    </div>
  </DialogContent>
  
</Dialog>
      
    
    </>
  );
}

export default Hero;


