export const handleStripeWebhook = async (req, res) => {
    const sig = req.headers['stripe-signature'];
  
    let event;
  
    try {
      event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
      console.log(`Webhook signature verification failed:`, err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }
  
    switch (event.type) {
      case 'invoice.payment_succeeded':
        const paymentIntent = event.data.object;
        console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
        // You can mark the subscription as 'active' here if required
        break;
  
      case 'invoice.payment_failed':
        const failedPaymentIntent = event.data.object;
        console.log(`PaymentIntent for ${failedPaymentIntent.amount} failed!`);
        // You can mark the subscription as 'failed' here and notify the user
        break;
  
      case 'customer.subscription.deleted':
        const subscription = event.data.object;
        console.log(`Subscription with ID ${subscription.id} canceled.`);
        // Update your DB to mark the subscription as canceled
        break;
  
      // Handle other events here (like subscription updates, etc.)
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  
    // Return a 200 response to acknowledge receipt of the event
    res.status(200).json({ received: true });
  };
  