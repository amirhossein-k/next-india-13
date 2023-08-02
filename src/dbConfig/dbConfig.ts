import mongoose from "mongoose";

export const ConnectDb = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDb connected successfuly");
    });

    connection.on("error", (err) => {
      console.log("MongoDb connection error" + err);
      process.exit();
    });
  } catch (err) {
    console.log("somting wrong!", err);
  }
};
