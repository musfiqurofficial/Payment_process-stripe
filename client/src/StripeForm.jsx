import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51MBFPyAJ2iDBUUuTHR2t5XlE5Dv9GBvfv1JQLU9G09HGiDWxn0Fya9idmCNu6aaVtEljGtc56beX7HiLSZ65xaZc00a1mPIO99"
);

const StripeForm = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default StripeForm;
