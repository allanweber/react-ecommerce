import React from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey =
    "pk_test_51GrkebI0phXWvebrqVGXxXS8PxdaqI9u35UHZcaMQ4kzbmODVUdILs2zkscPlBaA04ZxYbWi6MIO2tiU5ao3dMNf00zlYb4FIn";

  const onToken = (token) => {
    axios({
      url: "payment",
      method: "post",
      data: {
        amount: priceForStripe,
        token,
      },
    })
      .then((response) => {
        console.log("Successful Payment: " + response);
        alert("Successful Payment.");
      })
      .catch((error) => {
        console.log("Payment error: " + JSON.parse(error));
        alert("There was an issue with your payment.");
      });
  };

  return (
    <StripeCheckout
      label="Pay Now"
      name="React ECommerce"
      billingAddress
      shippingAddress
      image="https://sendeyo.com/up/d/f3eb2117da"
      description={`Your total is ${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;
