const app = require('./app');
const express = require("express");

const { resolve } = require('path');
const env = require('dotenv').config({ path: './.env' });


function init(){
    


const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2023-10-16',
    appInfo: { // For sample support and debugging, not required for production:
      name: "stripe-samples/accept-a-payment/payment-element",
      version: "0.0.2",
      url: "https://github.com/stripe-samples"
    }
  });
  
  app.use(
    express.json({
      // We need the raw body to verify webhook signatures.
      // Let's compute it only when hitting the Stripe webhook endpoint.
      verify: function (req, res, buf) {
        if (req.originalUrl.startsWith('/webhook')) {
          req.rawBody = buf.toString();
        }
      },
    })
  );
  
  app.get('/config', (req, res) => {
    res.send({
      publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    });
  });
  
  async function calculatePrice(dishIDList) {
    
    const Controllers = require("./controllers");
  
    let orderAmount = 0;
  
    for(let dishID of dishIDList){
  
      const ldish = await Controllers.dishController.getDish(dishID); 
      
      orderAmount += parseFloat(ldish[0].Price)
    }  
  
    return orderAmount;
  }
  
  app.get('/create-payment-intent', async (req, res) => {
    // Create a PaymentIntent with the amount, currency, and a payment method type.
    //
    // See the documentation [0] for the full list of supported parameters.
    //
    // [0] https://stripe.com/docs/api/payment_intents/create
    let orderAmount = 0;
    let paymentIntent;
  
    try {

        let dishIDList = [];
  
  
      if (req.query.hasOwnProperty("dishList")){  
        
        dishIDList = req.query.dishList.split(",");
        
        orderAmount = await calculatePrice(dishIDList);        
      }    
  
      orderAmount = orderAmount * 100;
  
      paymentIntent = await stripe.paymentIntents.create({
        currency: 'usd',
        amount: orderAmount,
        automatic_payment_methods: { enabled: true }
      });
  
      // Send publishable key and PaymentIntent details to client
      res.send({
        clientSecret: paymentIntent.client_secret,
      });
    } catch (e) {
      return res.status(400).send({
        error: {
          message: e.message,
        },
      });
    }
  });
  
  // Expose a endpoint as a webhook handler for asynchronous events.
  // Configure your webhook in the stripe developer dashboard
  // https://dashboard.stripe.com/test/webhooks
  app.post('/webhook', async (req, res) => {
    let data, eventType;
  
    // Check if webhook signing is configured.
    if (process.env.STRIPE_WEBHOOK_SECRET) {
      // Retrieve the event by verifying the signature using the raw body and secret.
      let event;
      let signature = req.headers['stripe-signature'];
      try {
        event = stripe.webhooks.constructEvent(
          req.rawBody,
          signature,
          process.env.STRIPE_WEBHOOK_SECRET
        );
      } catch (err) {
        console.log(`⚠️  Webhook signature verification failed.`);
        return res.sendStatus(400);
      }
      data = event.data;
      eventType = event.type;
    } else {
      // Webhook signing is recommended, but if the secret is not configured in `config.js`,
      // we can retrieve the event data directly from the request body.
      data = req.body.data;
      eventType = req.body.type;
    }
  
    if (eventType === 'payment_intent.succeeded') {
      // Funds have been captured
      // Fulfill any orders, e-mail receipts, etc
      // To cancel the payment after capture you will need to issue a Refund (https://stripe.com/docs/api/refunds)
      console.log('💰 Payment captured!');
    } else if (eventType === 'payment_intent.payment_failed') {
      console.log('❌ Payment failed.');
    }
    res.sendStatus(200);
  });
}


module.exports = {
    init
};