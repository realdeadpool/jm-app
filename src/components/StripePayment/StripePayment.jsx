import React, { useEffect, useState } from 'react'
import {
  useStripe,
  useElements,
  PaymentElement,
} from '@stripe/react-stripe-js'
import { MDBBtn } from 'mdb-react-ui-kit';
import './StripePayment.css';

export default function CheckoutForm({ clientSecret}) {

  const stripe = useStripe();
  const elements = useElements();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);



  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      setMessage("No client secret found.");
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe, clientSecret]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "http://localhost:3002/api/photos",
        payment_method_data: {
          billing_details: {
            name: "",
            email: "",
          },
        },
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs"
  }

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <input
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email address"
        required={true}
      />
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <MDBBtn disabled={isLoading || !stripe || !elements} id="submit">
          {isLoading ? <div className="button-textr" id="spinner"></div> : "Pay now"}
      </MDBBtn>
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}