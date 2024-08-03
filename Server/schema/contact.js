import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically set the current date and time when a new post is created
  },
});

const Contact = mongoose.model("Contact", ContactSchema); // First argument is the name of the collection in DB, second is the schema name

export default Contact;
