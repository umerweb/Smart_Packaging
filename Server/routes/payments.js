import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import 'dotenv/config'
import cookieParser from 'cookie-parser';
import stripe from 'stripe';


const stripekey = stripe(process.env.secret_payment_key);

const router = express.Router()


router.use(cors({ credentials: true, origin: 'http://localhost:5173' }));
router.use(bodyParser.json())
router.use(cookieParser())

router.get('/',  (req, res) => {
  
  res.send("hello world i am payment")
})



router.post('/payment', async (req, res) => {
    const { amount } = req.body;
  
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount * 100, // Convert amount to cents
        currency: 'usd',
      });
  
      res.status(200).send({
        clientSecret: paymentIntent.client_secret,
      });
    } catch (error) {
      res.status(500).send({
        error: error.message,
      });
    }
  });







  export default router;