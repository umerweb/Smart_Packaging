import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import 'dotenv/config'
import cookieParser from 'cookie-parser';

const router = express.Router()

const origin = process.env.origin
router.use(cors({ credentials: true, origin: origin }));
router.use(bodyParser.json())
router.use(cookieParser())

router.get('/',  (req, res) => {
  
  res.send("hell world ia authroute")
})










  export default router;