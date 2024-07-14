
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import catschema from '../schema/category.js';
import productschema from '../schema/products.js'



import 'dotenv/config'
import cookieParser from 'cookie-parser';
const origin = process.env.origin

const router = express.Router()
router.use(cors({ credentials: true, origin: origin }));
router.use(bodyParser.json())

router.use(cookieParser())


router.get('/', (req, res) => {

    res.send("hello world ia product route")
})

router.get('/prod', async (req,res) => {
    try {
        const data = await productschema.find().limit(10).sort({createdAt: -1 });

        res.send({ success: true, product: data });

        
    } catch (error) {
        
        res.status(500).json({ error: 'Failed to create category', details: error.message });
        
    }
})

router.get('/productall', async (req,res) => {
    try {
        const data = await productschema.find().sort({createdAt: -1 });

        res.send({ success: true, product: data });

        
    } catch (error) {
        
        res.status(500).json({ error: 'Failed to create category', details: error.message });
        
    }
})

router.get('/id/:id', async (req, res) => {
    const id = req.params.id;
    const product = await productschema.findById(id).lean();
    
  
    if (!product) {
      return res.status(404).json({ error: 'Post not found' });
      
    }
  
    res.json(product);
  });



router.post('/', async (req, res) => {
    const {
        name,
        shortDesc,
        longDesc,
        category,
        price,
        discount,
        currency,
        sku,
        size,
        color,
        mainImgSrc,
        imageUrls,
        variations,
    } = req.body;

    try {
        console.log(req.body); // Log received request body for debugging
        const newProduct = await productschema.create({
            name,
            shortDesc,
            longDesc,
            category,
            price,
            discount,
            currency,
            sku,
            size,
            color,
            mainImgSrc,
            imageUrls,
            variations,
        });
        res.json({ success: true, product: newProduct });
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ error: 'Failed to create product', details: error.message });
    }
});


router.post('/varproduct', async (req, res) => {
    const {mainProductId , mainProductname , mainProductdesc, mainProductcat, price, sku, size } = req.body
   
   try {
       const newProductVar = await catschema.create({ 
           mainProductId,
           mainProductname,
           mainProductdesc,
           mainProductcat,
           price,
           sku,
           size
        });
       res.json({ success: true, category: newProductVar });
   } catch (error) {
       console.error('Error creating Product Variation:', error);
       res.status(500).json({ error: 'Failed to create Product Variation', details: error.message });
   }
})
router.post('/order', async (req, res) => {
    const {mainProductId , varProductId , mainProductName, userId, mainProductImg, username, userAddress, price, status, size } = req.body
   
   try {
       const newOrder = await catschema.create({ 
           mainProductId,
           varProductId,
           mainProductName,
           userId,
           mainProductImg,
           username,
           userAddress,
           price,
           status,
           size
        });
       res.json({ success: true, category: newOrder });
   } catch (error) {
       console.error('Error creating Order:', error);
       res.status(500).json({ error: 'Failed to create Order', details: error.message });
   }
})









export default router;