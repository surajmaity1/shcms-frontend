import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { App } from "./App";
import { BrowserRouter } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  "pk_test_51OI2a2SBsZzmapIXJukuvYNR4awDy4lgT007nch7segINw6uX2ewHSyMcGU4gP59xIEXY7Ns0yu35s8g2Bt2VGfs00QUN5sI3I"
);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <Elements stripe={stripePromise}>
      <App />
    </Elements>
  </BrowserRouter>
);
