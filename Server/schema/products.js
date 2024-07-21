import { mongoose } from "mongoose";





const product = new mongoose.Schema({
  name: String,
  shortDesc: {
    type: String,
    required: true
  },
  longDesc: {
    type: String,
    required: true
  },
  category: String,
  price: Number,
  discount: Number,
  currency: String,
  sku: Number,
  size: String,
  color: String,
  mainImgSrc: String,
  imageUrls: [String], // Array of image URLs
  variations: [
    {
      name: String,
      values: [String],
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});




const pro = mongoose.model('mainProducts' , product )//first argument is the name of collection in db second is schema name

export default pro;