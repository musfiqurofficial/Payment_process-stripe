const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");

require("dotenv").config();
app.use(express.json());
app.use(cors());
dotenv.config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});

app.get("/config", (req, res) => {
  const responseData = {
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  };
  console.log("Config Response:", responseData);
  res.json(responseData);
});

app.post("/create-payment-intent", async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      currency: "USD",
      amount: 100000,
      automatic_payment_methods: { enabled: true },
    });

    const responseData = {
      clientSecret: paymentIntent.client_secret,
    };
    console.log("Payment Intent Response:", responseData);
    res.json(responseData);
  } catch (e) {
    console.error("Error creating Payment Intent:", e);
    return res.status(400).json({
      error: {
        message: e.message,
      },
    });
  }
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, console.log("http://localhost:" + PORT));
