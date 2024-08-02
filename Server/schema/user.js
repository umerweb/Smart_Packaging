import mongoose from "mongoose";
const address = new mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    trim: true
  },
  contactNumber: {
    type: String
  },
  country: {
    type: String
  },
  address: {
    type: String
  },
  city: {
    type: String
  }
})


const User = new mongoose.Schema({
  "name": {
    type: String,
    required: true,

  },
  "username": {
    type: String,
    required: true,

  },

  "img": {
    type: String,
    required: false,
  },
  "email": {
    type: String,
    required: true,
  },
  "number": {
    type: Number,
    required: true,
  },

  "password": {
    type: String,
    required: true,
  },

  "status": {
    type: Boolean,

    default: false,
  },
  "role": {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },
  "address":[address],
  "createdAt": {
    type: Date,
    default: Date.now // Automatically set the current date and time when a new post is created
  }

})


const user = mongoose.model('users', User)//first argument is the name of collection in db second is schema name

export default user;