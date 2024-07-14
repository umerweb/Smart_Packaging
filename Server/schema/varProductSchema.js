import { mongoose } from "mongoose";



const varProduct = new mongoose.Schema({
    "mainProductId":String,
    "mainProductname":String,
    "mainProductdesc":String,
    "mainProductcat": String,
    "mainProductimg":String,
    "price": Number,
    "sku": Number,
    "size": String,

    "createdAt": {
        type: Date,
        default: Date.now // Automatically set the current date and time when a new post is created
      },
   
});


const varPro = mongoose.model('variationProducts' , varProduct )//first argument is the name of collection in db second is schema name

export default varPro;