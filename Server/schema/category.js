import  mongoose  from "mongoose";


const category = new mongoose.Schema({
    "cat": {
      type: String,
      required: true,
      
    },
  
    "img":{
      type: String,
      required: true,
    },
    "tagline":{
      type: String,
      required: true,
    },
    "createdAt": {
        type: Date,
        default: Date.now // Automatically set the current date and time when a new post is created
      }
   
})


const Cat = mongoose.model('categos' , category )//first argument is the name of collection in db second is schema name

export default Cat;