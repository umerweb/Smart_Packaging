import express from "express";
import bodyParser from "body-parser";
import authRouter from './routes/authRouter.js';
import category from './routes/category.js';
import product from './routes/productroute.js';
import order from './routes/payments.js'
import cookieParser from "cookie-parser";
import { mongoose } from "mongoose";
import 'dotenv/config';
import cors from 'cors';



/// Data base connected
mongoose.connect(process.env.mongo_url)
.then(()=> console.log("Conected to database"))
.catch((err)=> console.log("Database not connected", err))



const app = express()
const port = process.env.port
const origin = process.env.origin

app.use(express.json()) 
app.use(cors({ credentials: true, origin: origin  }));

app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: false}))


///Routes
app.use('/auth', authRouter)
app.use('/cat', category)
app.use('/product', product)
app.use('/order',order)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})