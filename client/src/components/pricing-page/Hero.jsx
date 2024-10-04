import { NavLink } from "react-router-dom";
import RightIcon from "/src/assets/images/correct-icon.svg";

import CrossIcon from "/src/assets/images/cross-icon.svg";
import { axiosConfig } from "../../utils/axiosConfig";
import { useQuery } from "@tanstack/react-query";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

function Hero() {
  const [openPopup, setOpenPopup] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedCustomOption, setSelectedCustomOption] = useState(null);


  const axiosprivate = useAxiosPrivate()

const fetchSubscriptionPlans = async () => {
    const { data } = await axiosprivate.get("/admin/get-allSubscriptionPlan");
    return data;
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["subscriptionPlans"],
    queryFn: fetchSubscriptionPlans,
  });
  const plans = data?.data || [];

  const handleCustomPlanClick = (plan) => {
    setSelectedPlan(plan);
    setOpenPopup(true);
  };
  const handleClose = () => {
    setOpenPopup(false);
    setSelectedPlan(null);
    setSelectedCustomOption(null);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  const handleGetStarted = async (plan) => {
    console.log(`Selected plan: ${plan.planName}`);

     const response =  await axiosprivate.post("/user/get-subscription",
        {planId: plan._id},
        
     )
     console.log("response>>>>>>>>>>>>>>>>",response);
     
  };

  const handleCustomOptionChange = (option) => {
    setSelectedCustomOption(option);
};

  const handleConfirmCustomPlan = async () => {
  
    if (selectedCustomOption) {
        console.log(`Selected custom plan: ${selectedPlan.planName}, Option: ${selectedCustomOption.userCount} users at $${selectedCustomOption.pricePerUser}/user with ${selectedCustomOption.discount}% discount`);
        try {
            const response = await axiosConfig.post('/user/get-subscription', {
              planId: selectedPlan._id,
              customTeamOptionId: selectedCustomOption._id,
            });
            console.log('Subscription successful', response.data);
            setOpenPopup(false);
        } catch (error) {
            console.error('Error subscribing to plan:', error);
           
          }
        }
      }

    


  return (
    <>
      <div className="relative w-full -mt-[100px]  lg:h-[120vh] xl:[110vh] bg-[url('/src/assets/images/mainBg.svg')] bg-cover bg-center">
        <div className="lg:px-[100px] xl:px-[100px] px-[40px] pb-[100px]">
          <div className="pt-[200px] flex items-center justify-center">
            <p className="max-w-[857px] w-full text-[40px] leading-[50px] font-[500] text-white lg:text-center xl:text-center">
              Plan projects and manage resources on one platform.Start free.
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
          <div className="justify-between flex items-center flex-wrap mt-[65px] gap-[50px]">
            <div className="border-none rounded-tr-[48px] rounded-md rounded-bl-[48px] max-w-[293px] w-[100%] pb-[23px] bg-white shadow-custom">
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
                    <NavLink to="/signup">
                      <button className="bg-cyanDark hover:bg-gradient border border-white text-white px-[46px] py-4 rounded-md font-[Poppins] transition-all duration-300 ease-in-out hover:translate-2 hover:scale-105">
                        Start Free Trial
                      </button>
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
            {plans.map((plan) => (
              <div
                key={plan._id}
                className="border-none rounded-tr-[48px] rounded-md rounded-bl-[48px] max-w-[293px] w-[100%] pb-[23px] bg-white shadow-custom"
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
                          className="bg-gradient hover:bg-gradient border border-white text-white px-[58px] py-4 rounded-md font-[Poppins] hover:scale-105 transition-all duration-300 ease-in-out"
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
    </>
  );
}

export default Hero;


