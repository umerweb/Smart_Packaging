import express from 'express';
import cors from 'cors';
import userSchema from '../schema/user.js'
import bodyParser from 'body-parser';
import 'dotenv/config'
import cookieParser from 'cookie-parser';
import bcrypt from 'bcrypt';
import sendmail from '../utilities/mailer.js';
import jwt from 'jsonwebtoken';
import user from '../schema/user.js';



const router = express.Router()

const origin = process.env.origin
const userKey = process.env.authUserToken
router.use(cors({ credentials: true, origin: origin }));
router.use(bodyParser.json())
router.use(cookieParser())

router.get('/',  (req, res) => {
  
  res.send("hell world ia authroute")
})

/////////             REGISTER API
router.post('/', async (req, res) => {
  const { name, username, email, number, password, role, status } = req.body;

  try {
    // Check if the username already exists
    const existingUsername = await userSchema.findOne({ username });
    if (existingUsername) {
      return res.status(500).json({ user: 'Username already exists' });
    }

    // Check if the email already exists
    const existingEmail = await userSchema.findOne({ email });
    if (existingEmail) {
      return res.status(500).json({ user: 'Email already exists' });
    }
    
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);


    // Create new user with plain text password
    const newUser = await userSchema.create({ name, username, email, number, password: hashedPassword,
         role: role || 'user', 
      status: status || false  });

    res.json({ user: 'Sucess Confirm your Email Please!' });

    const verifyLink = `${process.env.origin}/verifyemail/${newUser._id}`
    sendmail(email, 'Confirm Your Email', `Please Confirm Your email ${verifyLink}`)
  } catch (error) {
    res.status(500).json({ user: error.message });
  }
});

/////////             LOGIN API
 router.post('/ver', async(req, res ) => {
  const { usermail, password} = req.body;

  const checkUser = await userSchema.findOne({
    $or: [{ username: usermail }, { email: usermail }]
  });
   
  

  if (!checkUser) {
    res.status(500).json({user: 'User does not exist'})
    
  }else{
    const ismatch = await bcrypt.compare(password, checkUser.password);
    if (ismatch) {
      if(checkUser.status === false){
        res.status(500).json({user: 'Email Not comfirmed!'})

      }else{

        // Generate JWT
        const token = jwt.sign({ id: checkUser._id }, userKey, { expiresIn: '1h' });
        const userId  = checkUser._id;
        res.json({ userId ,token ,user: "Successfully logged In"})

      }

     
      
    }else{
      res.status(500).json({user: "password is incorrect"})
    }
  }
 
   
 })

/////////             EMAIL VERIFICATION API
 router.get('/everify/:id', async (req, res) => {
  const id = req.params.id;
  try {
    await userSchema.updateOne({ _id: id }, { $set: { status: true } });
    res.json({ status: true, user: "Verified" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


/////////             GET USER DATA FOR LOGIN API
router.get('/getuser/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const userData = await userSchema.findById(userId)

    return res.json({userData})
    
  } catch (error) {
    return res.status(500).json({error})
    
  }
})









  export default router;