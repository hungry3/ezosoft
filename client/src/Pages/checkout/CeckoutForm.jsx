import { useState } from "react";

import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import axios from "axios";

const CheckOutForm = ({ data, handleClose, selectedPlan }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if Stripe.js has loaded and Elements is ready
    if (!stripe || !elements) {

      console.log("asfdkjkl");
      
      return;
    }
    
    setIsLoading(true);
    
    // Confirm the payment
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (error) {
      // Handle any error that occurs during payment confirmation
      setMessage(error.message);
      setIsLoading(false);
      return;
    }

    // If payment succeeded, proceed to create subscription
    if (paymentIntent?.status === "succeeded") {
      try {
        // Call your backend to create the subscription
        const response = await axios.post("/user/get-subscription", {
          planId: selectedPlan._id,
          customTeamOptionId: data._id,
          paymentMethodId: paymentIntent.payment_method, // Payment method ID from paymentIntent
        });

        // Handle the response from your backend
        if (response.data.success) {
          // toast.success(response.data.message); // Uncomment this when using toast notifications
          handleClose(); // Close the dialog or modal
        } else {
          // If the subscription creation failed, log the error or show a message
          // toast.error(response.data.message); // Uncomment this when using toast notifications
          console.error("Subscription creation failed:", response.data.message);
        }
      } catch (error) {
        // Handle any errors from the backend call
        console.error("Subscription creation error:", error);
        // toast.error("Failed to create subscription. Please try again."); // Uncomment this when using toast notifications
      }
    }
    
    setIsLoading(false); // Reset loading state
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />
      <button disabled={isLoading || !stripe || !elements} id="submit">
        <span className="mt-2 !h-[35px]">{isLoading ? "Paying..." : "Pay now"}</span>
      </button>
      {message && <div className="text-[red] font-Poppins pt-2">{message}</div>}
    </form>
  );
};

export default CheckOutForm;
