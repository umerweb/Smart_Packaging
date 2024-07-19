import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  country: { type: String, required: true },
  city: { type: String, required: true },
  address: { type: String, required: true },
  contactNumber: { type: Number, required: true },

});

const itemSchema = new mongoose.Schema({
  id: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  name: { type: String, required: true },
  currency: { type: String, required: true },
  img: { type: String, required: true },
  variations: { type: Map, of: String, required: false } 
});

const orderSchema = new mongoose.Schema({
  cartItems: [itemSchema],
  totalQuantity: { type: Number, required: true },
  totalAmount: { type: Number, required: true },
  userId: { type: String, required: true },
  paymentMethod: { type: String, required: true },
  paymentIntent: { type: String, required: true },
  clientSecret: { type: String, required: true },
  orderStatus: { type: String, required: true },
  userData: userSchema,
  createdAt: { type: Date, default: Date.now },
  // Additional fields as necessary (e.g., user information, shipping details)
});

const Order = mongoose.model('Order', orderSchema);
export default Order;
