import mongoose from "mongoose";

let connected = false;

const connect = async () => {
  if (connected) {
    console.log("Already connected to database");
    return;
  }

  try {
    const uri = process.env.MONGODB_URI as string;
    await mongoose.connect(uri);
    console.log("Connected to database");
    connected = true;
  } catch (error) {
    console.error("Error connecting to database", error);
  }
};

export default connect;
