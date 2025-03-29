import paypal from 'paypal-rest-sdk';

paypal.configure({
    mode: "sandbox",
  client_id: "YOUR_SANDBOX_CLIENT_ID",
  client_secret: "YOUR_SANDBOX_CLIENT_SECRET",
});

export default paypal;