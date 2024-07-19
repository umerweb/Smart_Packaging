import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import Stripe from 'stripe';
import orderSchema from '../schema/order.js'

const stripe = new Stripe(process.env.secret_payment_testKey);

const router = express.Router();
const origin = process.env.origin;

router.use(cors({ credentials: true, origin: origin }));
router.use(bodyParser.json());
router.use(cookieParser());

router.get('/', (req, res) => {
  res.send("Hello world, I am payment");
});

router.post('/payment', async (req, res) => {
  const { amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Convert amount to cents
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
      
    });
    console.log(amount)
    

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
    console.log(paymentIntent)
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
  }
});

router.post('/ordersuccess', async (req,res) => {
  const { cartItems, totalAmount, totalQuantity, paymentIntent, clientSecret, userId, userData, paymentMethod} = req.body;
  const orderStatus = "Processing";
try {
 
  const NewOrder = await orderSchema.create({ cartItems, totalAmount, totalQuantity, paymentIntent, clientSecret, userId, paymentMethod, userData, orderStatus})

  res.json({ success: true, order: NewOrder });
  console.log('Order created:', NewOrder);
  
} catch (error) {
  console.error('Error creating Order:', error);
  res.status(500).json({ error: 'Failed to create Order', details: error.message });
  
}


});

export default router;
