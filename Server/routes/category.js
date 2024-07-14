
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import Catschema from '../schema/category.js';



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



router.post('/', async (req, res) => {
    const {cat,  img , tagline} = req.body
   console.log(cat)
   try {
       const newCat = await Catschema.create( {cat, img, tagline} );
       await newCat.save();
       res.json({ success: true, category: newCat });
   } catch (error) {
       console.error('Error creating category:', error);
       res.status(500).json({ error: 'Failed to create category', details: error.message });
   }
})

router.get('/cat', async (req, res) => {
    try {
        // Fetch all posts from the database
        const data = await Catschema.find().limit(9);
        res.json(data); // Send the posts as a JSON response
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

})
router.get('/catall', async (req, res) => {
    try {
        // Fetch all posts from the database
        const data = await Catschema.find();
        res.json(data); // Send the posts as a JSON response
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

})
router.get('/newcat', async (req, res) => {
    try {
        // Fetch all posts from the database
        const data = await Catschema.find().sort({ createdAt: -1 }).limit(4);
        res.json(data); // Send the posts as a JSON response
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

})

router.get('/catid/:id', async (req, res) => {
    const id = req.params.id;
    const category = await Catschema.findById(id).lean();
    
  
    if (!category) {
      return res.status(404).json({ error: 'Post not found' });
      
    }
  
    res.json(category);
  });










export default router;