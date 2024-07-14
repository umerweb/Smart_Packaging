import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  id: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  name: { type: String, required: true },
  variations: { type: Object, required: false }, // Variations are optional
});

const orderSchema = new mongoose.Schema({
  items: [itemSchema],
  totalQuantity: { type: Number, required: true },
  totalAmount: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  // Additional fields as necessary (e.g., user information, shipping details)
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
