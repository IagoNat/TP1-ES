import { stripePromise } from '../lib/stripe';

export const createCheckoutSession = async (priceId: string) => {
  const stripe = await stripePromise;
  
  if (!stripe) throw new Error('Stripe failed to load.');

  const { error } = await stripe.redirectToCheckout({
    lineItems: [{ price: priceId, quantity: 1 }],
    mode: 'payment',
    successUrl: window.location.origin + '/success',
    cancelUrl: window.location.origin + '/cancel',
  });

  if (error) throw error;
};
