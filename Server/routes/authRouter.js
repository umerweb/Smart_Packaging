import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import 'dotenv/config'
import cookieParser from 'cookie-parser';

const router = express.Router()


router.use(cors({ credentials: true, origin: 'http://localhost:5173' }));
router.use(bodyParser.json())
router.use(cookieParser())

router.get('/',  (req, res) => {
  
  res.send("hello world ia authroute")
})










  export default router;