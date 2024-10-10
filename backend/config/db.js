require('dotenv').config(); // Ensure environment variables are loaded

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log('Connecting to MongoDB with URI:', process.env.MONGO_URI); // For debugging

    const conn = await mongoose.connect(process.env.MONGO_URI); // No need for deprecated options
    console.log('=== MONGO DB CONNECTED', conn.connection.host);
  } catch (error) {
      
    console.log(`=== ERROR: ${error.message}`); // Log the specific error
    process.exit(1); // Exit with failure
  }
};




// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = process.env.MONGO_URI || "mongodb+srv://jinusmk:9544531840@cluster0.rgmj9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function connectDB() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }

module.exports = { connectDB };