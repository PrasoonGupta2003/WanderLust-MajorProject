console.log("Starting to insert data...");

const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const Mongo_URL = "mongodb://127.0.0.1:27017/wanderlust";

async function main() {
  console.log("Connecting to MongoDB...");
  await mongoose.connect(Mongo_URL);
  console.log("Connected to MongoDB");
}

const initDB = async () => {
  try {
    console.log("Deleting existing listings...");
    await Listing.deleteMany({});
    console.log("Old data deleted.");
    initData.data=initData.data.map((obj)=>({...obj,owner:"67ef84a025dd8943afb2bf26"}));
    console.log("Inserting new data...");
    const insertedListings = await Listing.insertMany(initData.data);
    console.log("Inserted listings:", insertedListings);
  } catch (error) {
    console.log("Error inserting data:", error);
  }
};

main().then(() => {
  console.log("MongoDB connected, initializing database...");
  initDB();
});
