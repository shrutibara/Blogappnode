const mongoose = require('mongoose');


const connectDB = async () => {
    try {
      const conn = await mongoose.connect('mongodb+srv://twinkle88bara:twinkle88@cluster0.ngrxjbv.mongodb.net/blogapp', {
        useNewUrlParser: true,
      });
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
      console.error(error.message);
    }

  }
  module.exports = {connectDB};