// Import Mongoose and dotenv (for environment variables)
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Get the MongoDB URI from environment variables
const mongoURI = process.env.MONGO_URI;

// Function to connect to MongoDB
const connectDB = async () => {
  try {
    // Attempt to connect to MongoDB
    await mongoose.connect(mongoURI,{ssl: false}
     
 
    );
    console.log('MongoDB connected successfully');
  } catch (error) {
    // Handle any connection errors
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit process with failure
  }
};

// Export the connection function
export default connectDB;
