import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const connectDB = async () => {
  try {
    // MongoDB Connection String: replace this with your connection string,
    //only reason I have exposed mine instead of putting it in the .env file is to make it easier for you to follow along
    const conn = await mongoose.connect(
      "mongodb+srv://saurabhsingh9637:C0Gn0OITwzqRjDFt@weather-app.yhcex.mongodb.net/?retryWrites=true&w=majority&appName=weather-app",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
