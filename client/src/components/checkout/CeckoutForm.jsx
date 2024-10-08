import { LinkAuthenticationElement, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";


// Load Stripe with your public key


const CheckOutForm = ({ planId, customTeamOptionId, plans }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const privateAxios = useAxiosPrivate();



 

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
        setMessage("Payment successful!");
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
      setMessage(err.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  // Ensure that Elements is only rendered if we have a valid clientSecret
  return (
    <>
   
          <form id="payment-form" onSubmit={handleSubmit}>
            <LinkAuthenticationElement id="link-authentication-element" />
            <PaymentElement id="payment-element" onReady={() => console.log("Payment element mounted")} />
            <button disabled={isLoading || !stripe || !elements} id="submit" className="flex justify-center items-center m-auto w-full">
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
