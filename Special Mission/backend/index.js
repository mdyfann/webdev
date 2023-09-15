import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import UserRoute from "./routes/UserRoute.js";

const app = express();
// MongoDB connection options
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000, // Increased timeout value
    maxPoolSize: 50,
    wtimeoutMS: 25000,
    socketTimeoutMS: 60000,
};
      
const mongoURL = 'mongodb://127.0.0.1:27017/webdev_db';
const dbName = 'webdev_db';

app.use(cors()); 
app.use(express.json());

mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
  })
    .then(() => {
      console.log('Database connected successfully!');
    })
    .catch((err) => {
      console.error('Error connecting to the database', err);
      process.exit(1); // Exit the application if database connection fails
    }); 

app.use(UserRoute)
app.listen(5000, ()=> console.log('Server Up and Running ...'));