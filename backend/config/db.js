require('dotenv').config(); // Load environment variables

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Check if MONGO_URI exists in the environment variables
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI not found in environment variables");
    }

    // Mask the MONGO_URI when logging to prevent exposing sensitive information
    const maskedURI = process.env.MONGO_URI.split('@')[1] || process.env.MONGO_URI;
    console.log(`Connecting to MongoDB...`); // Optionally include maskedURI

    // Connect to MongoDB
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true, // Recommended option
      useUnifiedTopology: true, // Recommended option
    });

    console.log(`=== MONGO DB CONNECTED: ${conn.connection.host}`);
  } catch (error) {
    console.error(`=== ERROR: ${error.message}`);
    process.exit(1); // Exit with failure status
  }
};

module.exports = { connectDB };
