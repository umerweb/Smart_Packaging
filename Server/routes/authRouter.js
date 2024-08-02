import express from 'express';
import cors from 'cors';
import userSchema from '../schema/user.js';
import orderSchem from '../schema/order.js';
import bodyParser from 'body-parser';
import 'dotenv/config'
import cookieParser from 'cookie-parser';
import bcrypt from 'bcrypt';
import sendmail from '../utilities/mailer.js';
import jwt from 'jsonwebtoken';
import user from '../schema/user.js';
import { createTestAccount } from 'nodemailer';



const router = express.Router()

const origin = process.env.origin
const userKey = process.env.authUserToken
router.use(cors({ credentials: true, origin: origin }));
router.use(bodyParser.json())
router.use(cookieParser())

router.get('/', (req, res) => {

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
    const newUser = await userSchema.create({
      name, username, email, number, password: hashedPassword,
      role: role || 'user',
      status: status || false
    });

    res.json({ user: 'Sucess Confirm your Email Please!' });

    const verifyLink = `${process.env.origin}/verifyemail/${newUser._id}`
    sendmail(email, 'Confirm Your Email', `Please Confirm Your email ${verifyLink}`)
  } catch (error) {
    res.status(500).json({ user: error.message });
  }
});

/////////             LOGIN API
router.post('/ver', async (req, res) => {
  const { usermail, password } = req.body;

  const checkUser = await userSchema.findOne({
    $or: [{ username: usermail }, { email: usermail }]
  });



  if (!checkUser) {
    res.status(500).json({ user: 'User does not exist' })

  } else {
    const ismatch = await bcrypt.compare(password, checkUser.password);
    if (ismatch) {
      if (checkUser.status === false) {
        res.status(500).json({ user: 'Email Not comfirmed!' })

      } else {

        // Generate JWT
        const token = jwt.sign({ id: checkUser._id }, userKey, { expiresIn: '1h' });
        const userId = checkUser._id;
        res.json({ userId, token, user: "Successfully logged In" })

      }



    } else {
      res.status(500).json({ user: "password is incorrect" })
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

    return res.json({ userData })

  } catch (error) {
    return res.status(500).json({ error })

  }
})


/////////             UPDATE USER DATA

router.put('/update', async (req, res) => {
  const { id, oldpassword, password, name, number } = req.body;

  try {
    const user = await userSchema.findById(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }
    const updatePassword = async () => {
      if (password && oldpassword) {
        
        const isMatch = await bcrypt.compare(oldpassword, user.password);
        if (!isMatch) {
          return false
        } else {
          const newHashedpassword = await bcrypt.hash(password, 10)
          // Update password
          user.password = newHashedpassword;
          return true
        }
  
      }
    }
    const updateName = () => {
      if (name !== "") {
        user.name = name;
        return true
      }
    }
    const updateNumber = () => {
      if (number !== "") {
        user.number = number;
        return true
      }

    }
    const pass = await updatePassword();
    const nam = updateName();
    const num = updateNumber();
    await user.save();

    res.status(200).json({updatedUser: user, message: 'Profile Updated successfully.', password: pass, name: nam, number: num   });
  } catch (error) {
    res.status(500).json({ error: 'Server error', error });
  }
});


/////////               ADD ADDRESSES
router.put('/addaddress', async (req, res) => {
  const {id , formData} = req.body;

  const user = await userSchema.findById(id);
  try {
    if(user.address.length < 3){
      user.address.push(formData)
      user.save();
  
      res.json({ user: user})
    }else{
      res.status(500).json({error: "You have reached the limit of addresses allowed"})
    }
   
  } catch (error) {
    res.status(500).json({error: error})
    
  }
  

  


})


/////////              GET ORDERS
router.post('/getorders', async (req, res) => {
  const { id } = req.body;

  //console.log('Received ID:', id); // Add this line to see what’s being received

  if (!id) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  try {
    const orders = await orderSchem.find({ userId: id }).sort({ createdAt: -1 });
    res.json({ orders });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.post('/getinfo', async (req, res) => {
  const { id } = req.body;

  //console.log('Received ID:', id); // Add this line to see what’s being received

  if (!id) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  try {
    const orders = await orderSchem.findById(id);
    res.json({ orders });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});






export default router;