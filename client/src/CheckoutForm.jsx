/* eslint-disable react/prop-types */
import { PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";

export default function CheckoutForm({ closeModal }) {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      return;
    }

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${window.location.origin}/completion`,
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occured.");
    }

    setIsProcessing(false);
  };

  return (
    <form id="payment-form" className="relative" onSubmit={handleSubmit}>
      <h1 className="text-center  font-bold pb-4">
        Pay: <span className="text-[#766efe] text-2xl">$1000.00</span>
      </h1>
      <button
        onClick={closeModal}
        className="w-6 h-6 text-base !font-thin font-mono bg-gray-300 hover:bg-red-700 p-0 flex justify-center items-center rounded-full absolute top-0 right-4"
      >
        X
      </button>
      <PaymentElement id="payment-element" />
      <center>
        <button disabled={isProcessing || !stripe || !elements} id="submit">
          <span id="button-text">
            {isProcessing ? "Processing ... " : "Pay now"}
          </span>
        </button>
      </center>
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}
