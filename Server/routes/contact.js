
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import Contactschema from '../schema/contact.js';
import sendmail from '../utilities/mailer.js';



import 'dotenv/config'
import cookieParser from 'cookie-parser';
const origin = process.env.origin

const router = express.Router()
router.use(cors({ credentials: true, origin: origin }));
router.use(bodyParser.json())

router.use(cookieParser())


router.get('/', (req, res) => {

    res.send("hello world ia catroute")
})

router.post('/', async (req, res) =>{
    const {name, email, phone, message} = req.body;
    try {
        const con = await Contactschema.create({name, email, phone, message});

        res.json({contact: con, status: true})
        sendmail(email, "Thanks for Contacting", "Thank you for contacting us. We have received your request. We will be in touch with you soon.")
        
        
    } catch (error) {
        res.status(500).json({contact: error})
        
    }
} )



export default router