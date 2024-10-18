import { LinkAuthenticationElement, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";

import { ToastContainer,toast } from 'react-toastify';



const CheckOutForm = ({ planId, customTeamOptionId, plans }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const privateAxios = useAxiosPrivate();

  const navigate = useNavigate()



 

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      console.log("Stripe or elements not loaded yet.");
      return;
    }

    

    setIsLoading(true);

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        
        confirmParams: {
          return_url: window.location.origin,
        },
        redirect: "if_required",
      });

      if (error) {
        setMessage(error.message);
        return;
      }

      if (paymentIntent.status === "succeeded") {
        toast.success("Payment successful!")
        navigate('/dashboard')
        // setMessage("Payment successful!");
        await privateAxios.post("/user/get-subscription", {
          planId,
          customTeamOptionId,
          payment_info: paymentIntent,
        });
      } else if (paymentIntent.status === "requires_action") {
        
        setMessage("Please complete additional authentication.");
      } else {
        setMessage("Payment failed. Please try again.");
      }
    } catch (err) {
      toast.error("An unexpected error occurred.")
      setMessage(err.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

 
  return (
    <>
    <ToastContainer />
          <form id="payment-form" onSubmit={handleSubmit}>
            <LinkAuthenticationElement id="link-authentication-element" />
            <PaymentElement id="payment-element" onReady={() => console.log("Payment element mounted")} />
            <button disabled={isLoading || !stripe || !elements} id="submit" className="flex items-center justify-center w-full m-auto">
              <span id="button-text" className="flex flex-row justify-center items-center py-2 px-4  rounded-full cursor-pointer bg-blue text-white min-h-[45px] w-full text-[16px] font-Poppins text-nowrap font-semibold mt-2 !h-[35px]">
                {isLoading ? "Paying..." : "Pay now"}
              </span>
            </button>
            {message && (
              <div id="payment-message" className="text-[red] font-Poppins pt-2">
                {message}
              </div>
            )}
          </form>
       
    </>
  );
};

export default CheckOutForm;
