import { loadStripe } from '@stripe/stripe-js';
import { CardElement } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51PpoZ0JAqu9i4Tpd9eQshFnir4xKLoCn6D54SyChw3yJbHzgwokgmPa20jG4r6njoky3gWQgKyoKfYzFvc9OzKjs00iUUo7Dh5');

export const getPaymentMethodId = async (elements) => {
    
  try {
    const stripe = await stripePromise;
    if (!stripe || !elements) {
      console.error('Stripe or elements is not loaded.');
      return null;
    }

    // Retrieve the card element
    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      console.error('Card element not found.');
      return null;
    }

    // Create payment method using the card element
    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.error('Payment method creation error:', error);
      return null;
    }

    return paymentMethod.id;
  } catch (err) {
    console.error('Error fetching payment method ID:', err);
    return null;
  }
};
